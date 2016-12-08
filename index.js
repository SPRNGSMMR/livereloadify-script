var devIp = require('dev-ip');
var assign = require('object-assign');
var through = require('through2');

var ipAddress = devIp()[0];

var defaults = {
  host: 'localhost',
  local: false,
  port: '35729'
};

module.exports = function (bundle, options) {
  options = assign({}, defaults, options);

  if (options.local && ipAddress !== undefined) {
    options.host = ipAddress + '.xip.io';
  }

  var script = "document.write('<script src=\"//" + options.host + ":" + options.port + "/livereload.js?snipver=1\"></script>');";

  bundle.on('bundle', function () {
    var first = true;

    bundle.pipeline
      .get('wrap')
      .push(through.obj(function (chunk, enc, next) {
        if (first) {
          this.push(new Buffer(script));

          first = false;
        }

        this.push(chunk);

        next();
    }));
  });
};

module.exports.defaults = defaults;
