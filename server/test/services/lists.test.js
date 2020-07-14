const assert = require('assert');
const app = require('../../src/app');

describe('\'Lists\' service', () => {
  it('registered the service', () => {
    const service = app.service('lists');

    assert.ok(service, 'Registered the service');
  });
});
