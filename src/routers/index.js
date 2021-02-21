const siteRoute = require("./site");
const animeRoute = require("./anime");

module.exports = function (app) {
  app.use("/", siteRoute);
  app.use("/anime", animeRoute);
};
