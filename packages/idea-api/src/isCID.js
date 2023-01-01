import CID from 'cids';

export function isCID(val) {
  try {
    return CID.isCID(new CID(val));
  } catch (ex) {
    return false;
  }
}
