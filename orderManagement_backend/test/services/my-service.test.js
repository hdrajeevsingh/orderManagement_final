const assert = require('assert');
const app = require('../../source/app');

describe('\'myService\' service', () => {
  it('registered the service', () => {
    const service = app.service('my-service');

    assert.ok(service, 'Registered the service');
  });
});
