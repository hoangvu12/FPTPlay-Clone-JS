const corsAnywhere = require("cors-anywhere");

let proxy = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeaders: [], // Do not require any headers.
  removeHeaders: [], // Do not remove any headers.
});

class Proxy {
  static index(req, res) {
    res.sendStatus(200);
  }

  static async video(req, res) {
    req.url = decodeURIComponent(req.url).replace("/video/", "/");
    proxy.emit("request", req, res);
  }
}

module.exports = Proxy;
