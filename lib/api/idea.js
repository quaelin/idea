const { has } = require('lodash');
const { assertCid, assertString } = require('../assert');
const ipfs = require('../ipfs');

const jsonEscape = (text) => JSON.stringify(text).slice(1, -1);

async function add(text) {
  assertString(text);
  const content = `{"Idea":"text","content":"${jsonEscape(text)}"}`;
  return ipfs.addContent(content);
}

async function get(iCid) {
  assertCid(iCid);
  const parsed = await ipfs.getJson(iCid);
  if (parsed.Idea && has(parsed, 'content')) return parsed.content;
  return parsed;
}

module.exports = { add, get };
