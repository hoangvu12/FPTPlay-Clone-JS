const siteRoute = require("./site");
const animeRoute = require("./anime");

const proxyAPIRoute = require("./api/proxy");
const animeAPIRoute = require("./api/anime");

module.exports = function (app) {
  app.use("/", siteRoute);
  app.use("/anime", animeRoute);

  app.use("/api/v1/proxy", proxyAPIRoute);
  app.use("/api/v1/anime", animeAPIRoute);
};
