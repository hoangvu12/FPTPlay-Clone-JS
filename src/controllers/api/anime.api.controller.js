const AnimeModel = require("../../models/Anime");

class Anime {
  static async getVideoSource(req, res) {
    const animeId = req.params.id;
    const episodeIndex = req.params.episode;

    const data = await AnimeModel.getVideoSource({
      id: animeId,
      episode: episodeIndex,
    });

    res
      .status(200)
      .json({ success: true, source: data.url, thumbnail: data.timeline_img });
  }
}

module.exports = Anime;
