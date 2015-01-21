// Load in dependencies
var tldRegexp = /\.([a-zA-Z]*?)$/;
var url = require('url');

// Define our helper
function resolveLink(srcUrl, targetUrl) {
  // Parse the src URL
  var srcUrlObj = url.parse(srcUrl);

  // If there isn't a protocol
  if (srcUrlObj.protocol === null) {
    // With no protocol, we have everything in pathname. Add on `//` and force treatment of `host`
    var tmpSrcUrl = '//' + srcUrl;
    var tmpSrcUrlObj = url.parse(tmpSrcUrl, null, true);

    // If this new hostname has a TLD, then keep it as the srcUrlObj
    // DEV: We are trading accuracy for size (technically not all dots mean a tld
    //   If we want to be accurate, use https://github.com/ramitos/tld.js/blob/305a285fd8f5d618417178521d8729855baadb37/src/tld.js
    if (tmpSrcUrlObj.hostname && tldRegexp.test(tmpSrcUrlObj.hostname)) {
      srcUrl = tmpSrcUrl;
      srcUrlObj = tmpSrcUrlObj;
    }
  }

  // Fallback pathname
  srcUrlObj.pathname = srcUrlObj.pathname || '/';

  // If we still have no protocol
  if (srcUrlObj.protocol === null) {
    // Parse our targetUrl
    var targetUrlObj = url.parse(targetUrl);

    // If there is a hostname
    if (srcUrlObj.hostname !== null) {
      // If the hostname is the same as our original, add on a protocol
      if (srcUrlObj.hostname === targetUrlObj.hostname) {
        srcUrlObj.protocol = targetUrlObj.protocol;
      // Otherwise, default to HTTP
      } else {
        srcUrlObj.protocol = 'http:';
      }
    // Otherwise, pickup the target protocol and hostname
    } else {
      srcUrlObj.protocol = targetUrlObj.protocol;
      srcUrlObj.hostname = targetUrlObj.hostname;
    }
  }

  // Return our completed src url
  return url.format(srcUrlObj);
}

// Export our helper
module.exports = resolveLink;
