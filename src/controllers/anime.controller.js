const AnimeModel = require("../models/Anime");
const Utils = require("../utils");
class Anime {
  static index(req, res) {
    res.render("pages/anime/index.ejs");
  }

  static async watch(req, res) {
    const animeInfo = await AnimeModel.getInfo(req.params.id);

    animeInfo.episodes = animeInfo.episodes.filter(
      (episode) => !episode.is_trailer
    );

    res.render("pages/anime/watch", { anime: animeInfo, Utils });
  }
}

module.exports = Anime;
