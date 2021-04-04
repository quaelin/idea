const ipfsTestConfig = { http: process.env.IDEA_IPFS_HTTP || 'http://localhost:5001/api/v0' };

class NotATypeError extends Error {
}

async function expectTypeError(promise) {
  try {
    await promise; // should throw
    throw new NotATypeError();
  } catch (ex) {
    expect(ex).toBeInstanceOf(TypeError);
  }
}

module.exports = {
  expectTypeError,
  ipfsTestConfig,
  NotATypeError,
};
