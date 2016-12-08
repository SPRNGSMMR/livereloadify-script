var livereloadifyScript = require('../');
var defaults = livereloadifyScript.defaults;

var browserify = require('browserify');
var concatStream = require('concat-stream');
var devIp = require('dev-ip');
var path = require('path');
var test = require('tape');

var ipAddress = devIp()[0];
var regexp = /^document\.write\('<script src="\/\/([\S]+):([\d]+)\/livereload\.js\?snipver=1"><\/script>'\);/i;

var entry = path.resolve(__dirname, 'test.js');

var b = browserify({entries: [entry]});

test('plugin with default options', function (t) {
  t.plan(3);

  b.plugin(livereloadifyScript);
  b.bundle()
    .pipe(concatStream(function (output) {
      var bundle = output.toString();

      t.equal(regexp.test(bundle), true, 'bundle responds to regexp');
      t.equal((bundle.match(regexp) || [])[1], defaults.host, 'host is correct');
      t.equal((bundle.match(regexp) || [])[2], defaults.port, 'port is correct');
    }));
});

test('plugin with default options in local mode', function (t) {
  t.plan(3);

  b.plugin(livereloadifyScript, {
    local: true
  });
  b.bundle()
    .pipe(concatStream(function (output) {
      var bundle = output.toString();
      var host = ipAddress !== undefined ? ipAddress + '.xip.io' : defaults.host;

      t.equal(regexp.test(bundle), true, 'bundle responds to regexp');
      t.equal((bundle.match(regexp) || [])[1], host, 'host is correct');
      t.equal((bundle.match(regexp) || [])[2], defaults.port, 'port is correct');
    }));
});

test('plugin with custom options', function (t) {
  t.plan(3);

  var config = {
    host: '127.0.0.1',
    port: '3000'
  };

  b.plugin(livereloadifyScript, config);
  b.bundle()
    .pipe(concatStream(function (output) {
      var bundle = output.toString();

      t.equal(regexp.test(bundle), true, 'bundle responds to regexp');
      t.equal((bundle.match(regexp) || [])[1], config.host, 'host is correct');
      t.equal((bundle.match(regexp) || [])[2], config.port, 'port is correct');
    }));
});

test('plugin with custom options in local mode', function (t) {
  t.plan(3);

  var config = {
    host: '127.0.0.1',
    local: true,
    port: '3000'
  };

  b.plugin(livereloadifyScript, config);
  b.bundle()
    .pipe(concatStream(function (output) {
      var bundle = output.toString();
      var host = ipAddress !== undefined ? ipAddress + '.xip.io' : config.host;

      t.equal(regexp.test(bundle), true, 'bundle responds to regexp');
      t.equal((bundle.match(regexp) || [])[1], host, 'host is correct');
      t.equal((bundle.match(regexp) || [])[2], config.port, 'port is correct');
    }));
});
