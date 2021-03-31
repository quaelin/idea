const { has } = require('lodash');
const assertCid = require('../assertCid');
const ipfs = require('../ipfs');

async function add(text) {
  const content = `{"Idea":"text","content":"${text}"}`;
  return ipfs.addContent(content);
}

async function get(iCid) {
  assertCid(iCid);
  const parsed = await ipfs.getJson(iCid);
  if (parsed.Idea && has(parsed, 'content')) return parsed.content;
  return parsed;
}

module.exports = { add, get };
