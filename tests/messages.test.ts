import ApiMessages from '../src';

describe('messages', () => {

  let apiMessages: ApiMessages;

  beforeAll(async () => {
    apiMessages = new ApiMessages();
    await apiMessages.configure({
      source: '../tests/test-source.json'
    });
  });

  describe('instantiation', () => {

    it('rejects if source file not found', async () => {
      const nonExistentFilePath = './file-does-not-exist.json';

      await expect(apiMessages.configure({source: nonExistentFilePath}))
        .rejects.toMatchObject({
          code: 'MODULE_NOT_FOUND',
          moduleName: nonExistentFilePath
        });
    });

    it('reads file from provided path', async () => {
      expect(apiMessages.isInitialized).toBeTruthy();
    });
  });

  describe('get property', () => {

    it('gets a property', () => {
      const message = apiMessages.get('appVersion');
      expect(message).toEqual('Version 1.0.1');
    });

    it('gets nested property, one level', () => {
      const message = apiMessages.get('error.general');
      expect(message).toEqual('An error has occurred.');
    });

    it('gets nested property, multiple levels', () => {
      const message = apiMessages.get('error.authorization.emailNotVerified');
      expect(message).toEqual('Your email is not verified.');
    });
  });

  describe('interpolation', () => {

    it('interpolates values', () => {
      const message = apiMessages.get('success.vehiclesArchived', {
        count: 20,
        days: 7
      });

      expect(message).toEqual('You archived 20 vehicles in the last 7 days.')
    });

    it('does not error if given replacements do not match placeholders', async () => {
      expect(() => apiMessages.get('success.vehiclesArchived', {
        badReplacement1: 20,
        badReplacement2: 7
      })).not.toThrow();
    });
  });

  describe('defaults', () => {
    it('default messages are accessible', () => {
      expect(apiMessages.defaults.http.ok).toEqual('Success.');
    })
  });

});
