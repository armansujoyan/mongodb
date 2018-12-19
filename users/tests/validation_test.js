const assert = require('assert');
const User = require('../src/user');

describe('User validation tests', () => {
  it('Requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required');
  });

  it('Requires a user name to be longer than 2 characters', () => {
    const user = new User({ name: 'ps' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters');
  });

  it('Disallow invalid users from being saved', (done) => {
    const user = new User({ name: 'AL' });
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than 2 characters');
        done();
      });
  });
});
