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

    // const animeLists = animeTypes.map((type) => Anime.getList(type));

    // animeLists.push(Anime.getSlides());

    // const [
    //   total,
    //   trending,
    //   winter2021,
    //   action,
    //   scifi,
    //   romantic,
    //   chinese,
    //   slides,
    // ] = await Promise.all(animeLists);

    // this.anime = {
    //   total,
    //   trending,
    //   winter2021,
    //   action,
    //   scifi,
    //   romantic,
    //   chinese,
    //   slides,
    // };

    // console.log("Cache executed");
  }

  static execute() {
    this.run();
    setInterval(this.run.bind(this), 60000 * 5);
  }
}

module.exports = Cache;
