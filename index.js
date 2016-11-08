var prepend = require('prepend-file');

module.exports = function (bundle, options) {
  if (!bundle.argv && !options.outfile) {
    throw new Error('Browserify option --outfile must be specified.');
  }

  var outfile = options.outfile || bundle.argv.outfile;
  var host = options.host || 'localhost';
  var port = options.port || 35729;

  bundle.on('bundle', function (stream) {
    stream.on('end', function () {
      prepend(outfile, "document.write('<script src=\"//" + host + ":" + port + "/livereload.js?snipver=1\"></script>');", function (err) {
        if (err) {
          throw err;
        }
      });
    });
  });
};
