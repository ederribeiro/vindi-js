'use strict';

var Vindi = require('vindi-js'),
    env = require('../../.env.json');

var client = new Vindi(env.apiKey),
    options = {
        uri: 'customers',
        debug: false
    },
    query = "email=eder@ederibeiro.com"; // about searchs and filters look here: https://atendimento.vindi.com.br/hc/pt-br/articles/204163150

client.get(options, query).then((data) => {
  console.log('success', data);
}).catch((err) => {
  console.error('error', err);
});


var newCustomer = {
        name: "Eder Ribeiro",
        email: "eder@ederibeiro.com" //optional, to see more about API look the docs http://vindi.github.io/api-docs/dist/
    };

client.post(options, newCustomer).then((data) => {
    console.log("success your new customer has been created", data);
}).catch((err) => {
    console.log("sorry your customer can't be created", err);
})
