const express = require('express');

const app = express();
const appName = 'idea-web';

module.exports = (args) => {
  const { port, ipfsConfig } = args;

  app.get('/', (req, res) => {
    res.send(`${appName} COMING SOON! Using ${JSON.stringify(ipfsConfig)} for IPFS...`);
  });

  function run() {
    app.listen(port, () => {
      console.log(`${appName} listening at http://localhost:${port}`);
    });
  }

  return { run };
};
