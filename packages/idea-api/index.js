import { ipfsInit } from './src/ipfs';
import { initIdeaApi } from './src/api/idea';
import { initPerspectiveApi } from './src/api/perspective';
import { initRelationApi } from './src/api/relation';

export { RELATION_TYPES } from './src/relationTypes';

export function initApi(options) {
  const ipfsClient = ipfsInit(options && options.ipfsConfig);

  return {
    ...initIdeaApi(ipfsClient, options),
    perspective: initPerspectiveApi(ipfsClient, options),
    relation: initRelationApi(ipfsClient, options),
  };
}
