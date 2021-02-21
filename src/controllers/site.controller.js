const Anime = require("../models/Anime");
const Utils = require("../utils");
const Cache = require("../Cache");

class Site {
  static async index(req, res) {
    res.render("pages/index", { anime: Cache.anime, Utils });
  }
}

module.exports = Site;
