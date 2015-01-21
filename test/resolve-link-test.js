// Load in dependencies
var assert = require('assert');
var resolveLink = require('../');

// Start our tests
describe('resolve-link', function () {
  it('returns awesome', function () {
    assert.strictEqual(resolveLink(), 'awesome');
  });
});
