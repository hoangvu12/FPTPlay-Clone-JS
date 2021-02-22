const siteRoute = require("./site");
const animeRoute = require("./anime");

const proxyAPIRoute = require("./api/proxy");

module.exports = function (app) {
  app.use("/", siteRoute);
  app.use("/anime", animeRoute);

  app.use("/api/v1/proxy", proxyAPIRoute);
};
