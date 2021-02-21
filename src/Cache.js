const Anime = require("./models/Anime");

class Cache {
  static async run() {
    const animeTypes = [
      "total",
      "trending",
      "winter2021",
      "action",
      "scifi",
      "romantic",
      "chinese",
    ];

    const [
      total,
      trending,
      winter2021,
      action,
      scifi,
      romantic,
      chinese,
    ] = await Promise.all(animeTypes.map((type) => Anime.getList(type)));

    this.anime = {
      total,
      trending,
      winter2021,
      action,
      scifi,
      romantic,
      chinese,
    };

    console.log("Cache executed");
  }

  static execute() {
    this.run();
    setInterval(this.run.bind(this), 60000 * 5);
  }
}

module.exports = Cache;
