'use strict';

var Vindi = require('vindi-js'),
    env = require('../../.env.json');

var client = new Vindi(env.apiKey),
    options = {
        uri: 'customers',
        debug: false
    };

client.get(options).then((data) => {
  console.log('success', data);
}).catch((err) => {
  console.error('error', err);
});
