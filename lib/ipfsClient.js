const createClient = require('ipfs-client');

const client = createClient({
  http: 'http://localhost:5001/api/v0',
});

module.exports = async () => {
  await client.id();
  return client;
};
