const createClient = require('ipfs-client');

module.exports = (ipfsConfig) => {
  const ipfs = createClient(ipfsConfig);
  // http: 'http://localhost:5001/api/v0',

  async function addContent(content) {
    const { cid } = await ipfs.add(content);
    return cid.toString();
  }

  async function getContent(cid) {
    const chunks = [];
    for await (const chunk of ipfs.cat(cid)) {
      chunks.push(chunk);
    }
    return chunks.join();
  }

  async function getJson(cid) {
    return JSON.parse(await getContent(cid));
  }

  return { addContent, getContent, getJson };
};
