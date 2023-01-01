export const ipfsTestConfig = { http: process.env.IDEA_IPFS_HTTP || 'http://localhost:5001/api/v0' };

export class NotATypeError extends Error {
}

export async function expectTypeError(promise) {
  try {
    await promise; // should throw
    throw new NotATypeError();
  } catch (ex) {
    expect(ex).toBeInstanceOf(TypeError);
  }
}
