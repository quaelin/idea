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
  NotATypeError,
};
