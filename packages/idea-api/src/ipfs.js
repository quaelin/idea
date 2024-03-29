// eslint-disable-next-line import/no-unresolved
import { create } from 'ipfs-client';

export function ipfsInit(ipfsConfig) {
  const ipfs = create(ipfsConfig);

  async function addContent(content) {
    const { cid } = await ipfs.add(content);
    return cid.toString();
  }

  async function getContent(cid) {
    const chunks = [];
    for await (const chunk of ipfs.cat(cid)) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString();
  }

  async function getJson(cid) {
    return JSON.parse(await getContent(cid));
  }

  return { addContent, getContent, getJson };
}
