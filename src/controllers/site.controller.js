const Anime = require("../models/Anime");
const Utils = require("../utils");

class Site {
  static async index(req, res) {
    res.render("pages/index");
  }
}

module.exports = Site;
