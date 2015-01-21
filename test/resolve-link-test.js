// Load in dependencies
var expect = require('chai').expect;
var resolveLink = require('../');

// Define test helpers
var testUtils = {
  resolveLink: function (srcUrl, targetUrl) {
    before(function resolveLinkFn () {
      this.result = resolveLink(srcUrl, targetUrl);
    });
    after(function cleanup () {
      delete this.result;
    });
  }
};

// Define our test cases
describe('A complete HTTP URL to our target site when resolved', function () {
  testUtils.resolveLink('https://www.linkedin.com/in/toddwolfson', 'https://www.linkedin.com/');

  it('points to the original URL', function () {
    expect(this.result).to.equal('https://www.linkedin.com/in/toddwolfson');
  });
});

describe('An HTTP URL without a protocol to our target site when resolved', function () {
  testUtils.resolveLink('www.linkedin.com/in/toddwolfson', 'https://www.linkedin.com/');

  it('points to the original URL with a protocol', function () {
    expect(this.result).to.equal('https://www.linkedin.com/in/toddwolfson');
  });
});

describe('An HTTP URL with an unexpected path to our target site when resolved', function () {
  testUtils.resolveLink('https://www.linkedin.com/pub/toddwolfson/aa/bb/cc', 'https://www.linkedin.com/');

  it('points to the original URL', function () {
    expect(this.result).to.equal('https://www.linkedin.com/pub/toddwolfson/aa/bb/cc');
  });
});

describe('An HTTP URL with a query string to our target site when resolved', function () {
  testUtils.resolveLink('https://www.linkedin.com/profile/view?id=87904336&trk=nav_responsive_tab_profile_pic',
    'https://www.linkedin.com/');

  it('points to the original URL', function () {
    expect(this.result).to.equal(
      'https://www.linkedin.com/profile/view?id=87904336&trk=nav_responsive_tab_profile_pic');
  });
});

describe('An HTTP URL to a custom site when resolved', function () {
  testUtils.resolveLink('http://underdog.io/', 'https://www.linkedin.com/');

  it('points to the original URL', function () {
    expect(this.result).to.equal('http://underdog.io/');
  });
});

describe('An HTTP URL without a pathname to a custom site when resolved', function () {
  testUtils.resolveLink('http://underdog.io', 'https://www.linkedin.com/');

  it('points to the original URL with a pathname', function () {
    expect(this.result).to.equal('http://underdog.io/');
  });
});

describe('An HTTP URL without a protocol to a custom site when resolved', function () {
  testUtils.resolveLink('underdog.io', 'https://www.linkedin.com/');

  it('points to the original URL with a protocol and pathname', function () {
    expect(this.result).to.equal('http://underdog.io/');
  });
});

describe('A username to our target site when resolved', function () {
  testUtils.resolveLink('underdogio', 'https://github.com/');

  it('points to the username on the target site', function () {
    expect(this.result).to.equal('https://github.com/underdogio');
  });
});
