const AnimeModel = require("../models/Anime");
const Utils = require("../utils");
const Cache = require("../Cache");

class Anime {
  static index(req, res) {
    res.render("pages/anime/index.ejs", { anime: Cache.anime, Utils });
  }

  static async watch(req, res) {
    res.render("pages/anime/watch", { anime: { _id: req.params.id }, Utils });
  }
}

module.exports = Anime;
