const assertCid = require('../assertCid');
const ipfsClient = require('../ipfsClient');

async function ipfsAdd(content) {
  const ipfs = await ipfsClient();
  const { cid } = await ipfs.add(content);
  return cid;
}

async function ipfsRead(iCid) {
  const ipfs = await ipfsClient();
  const chunks = [];
  for await (const chunk of ipfs.cat(iCid)) {
    chunks.push(chunk);
  }
  return chunks.join();
}

async function add(text) {
  const content = `{"Idea":"text","content":"${text}"}`;
  return ipfsAdd(content);
}

async function get(iCid) {
  assertCid(iCid);
  const content = await ipfsRead(iCid);
  const parsed = JSON.parse(content);
  if (parsed.Idea) return parsed.content;
  return content;
}

module.exports = { add, get };
