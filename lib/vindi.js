'use strict';

const url = require('url');
const request = require('request');
const _ = require('lodash');

const defaults = {
    origin: 'https://app.vindi.com.br',
    apiVersion: 'v1'
};

const resolveUri = function(origin, uri) {
    if (!/^http/.test(uri)) {
        uri = url.resolve(origin, uri);
    }
    return uri;
};

const Vindi = function(apiKey, options) {

    this.apiKey = apiKey;

    if (typeof this.apiKey === 'undefined') {
        throw new Error('Client requires an API key');
    }

    options = options || {};
    options.origin = options.origin || options.endpoint || defaults.origin;

    this.defaultHeaders = _.merge({
        'Content-Type': 'application/json'
    }, options.headers);

};

Vindi.prototype.request = function(options) {
    const baseUrl = `${defaults.origin}/api/${defaults.apiVersion}/`;

    if (!_.isPlainObject(options)) {
        throw new TypeError('options argument are required');
    }

    options.uri = resolveUri(baseUrl, options.uri);

    options.headers = _.merge({}, this.defaultHeaders, options.headers);

    options.auth = {
        user: this.apiKey
    };

    options.strictSSL = true;

    if (typeof options.gzip === 'undefined') {
        options.gzip = true;
    }

    options.debug = (typeof options.debug === 'boolean') ? options.debug : this.debug;

    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            const invalidCodeRegex = /(5|4)[0-9]{2}/;
            let response;
            if (err) {
                reject(err);
            } else if (res && invalidCodeRegex.test(res.statusCode)) {
                reject(body);
            } else {
                response = body;
                if (options.debug) {
                    response.debug = res;
                }
                resolve(response);
            }
        });
    });

};

Vindi.prototype.get = function(options, query) {
    options.method = 'GET';
    options.json = true;
    query = query || {};

    options.qs = {
        query: query
    };

    return this.request(options);
};

Vindi.prototype.post = function(options, json) {
    options.method = 'POST';

    options = _.merge(options, {json: json});

    return this.request(options);
};

Vindi.prototype.put = function(options, json) {
    options.method = 'PUT';

    options = _.merge(options, {json: json});

    return this.request(options);
};


module.exports = Vindi;
