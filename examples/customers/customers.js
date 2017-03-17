const Vindi = require('vindi-js');

const client = new Vindi('APIKEY');

client.get({
  uri: 'customers',
  debug: false
}).then((data) => {
  console.log('success', data);
}).catch((err) => {
  console.error('error', err);
});
