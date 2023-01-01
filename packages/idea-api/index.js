import { ipfsInit } from './src/ipfs.js';
import { initIdeaApi } from './src/api/idea.js';
import { initPerspectiveApi } from './src/api/perspective.js';
import { initRelationApi } from './src/api/relation.js';

export { RELATION_TYPES } from './src/relationTypes.js';

export function initApi(options) {
  const ipfsClient = ipfsInit(options && options.ipfsConfig);

  return {
    ...initIdeaApi(ipfsClient, options),
    perspective: initPerspectiveApi(ipfsClient, options),
    relation: initRelationApi(ipfsClient, options),
  };
}
