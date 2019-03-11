/* eslint-disable no-param-reassign */
module.exports = (req, res, next) => {
  if (req.path === '/api/vi/hal/xuser/attachments/access') {
    const images = require('./api/images.json');
    var img = new Buffer(images[req.query.objectPath], 'base64');
    res.header("Content-Type", "image/png");
    res.header("Content-Length", img.length);
    var request = require('request').defaults({ encoding: null });
    request.get(images[req.query.objectPath], function (err, resRe, body) {
      res.send(body);
    });
  } else {
    next();
  }
};