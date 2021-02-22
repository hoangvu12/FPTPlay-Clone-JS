const axios = require("axios");
const cheerio = require("cheerio");
const FPTPlay = require("../utils/fptplay");

const structureIds = {
  trending: "55a77da717dc136d93bd3988",
  total: "5587c83b17dc1353a3624a22",
  winter2021: "5587c8ed17dc1353a2624a12",
  action: "578c8c8817dc1326a5b202c6",
  scifi: "578c8ca217dc1326a6b1ffbd",
  romantic: "578c8cb017dc1326a3b1ff00",
  chinese: "59796ffe5583207ceb4f0cfd",
};

class Anime {
  static async getSlides() {
    const URL = "https://fptplay.vn/danh-muc/anime/5587c83b17dc1353a3624a22";

    const { data } = await axios.get(URL);

    const $ = cheerio.load(data);

    let slides = [];

    $(".slide-item").each((i, e) => {
      const $slide = $(e);

      const style = $slide.find("span").attr("style");
      const name = $slide.find("h2").text().trim();
      const duration = $slide.find("h3").text().trim();
      const description = $slide.find("p").text().trim();
      const id = $slide.find("span").data("ela");

      const thumbnail = style.match(/\((.*?)\)/)[1].replace(/('|")/g, "");

      slides.push({ thumbnail, name, duration, description, id });
    });

    return slides;
  }

  static async getList(type) {
    const URL = getAnimeURL({ type });
    const { data } = await axios.get(URL);

    return data.videos_list;
  }

  static async search(keyword) {
    const endpoint = "search/vod/all";
    const query = { query_str: keyword, per_page: 6, page: 1 };

    const URL = FPTPlay.getUrl(endpoint, query);

    const { data } = await axios.get(URL);

    return data.result;
  }

  static async getVideoSource({ id, episode = 1, quality = "auto_vip" }) {
    const endpoint = `stream/vod/${id}/${Number(episode) - 1}/${quality}`;
    const URL = FPTPlay.getUrl(endpoint);

    const { data } = await axios.get(URL);

    const videoUrl = data.data.url;
    return videoUrl;
  }
}

function getAnimeURL({ type, per_page = 12, page = 1 }) {
  if (!structureIds.hasOwnProperty(type)) {
    return "";
  }

  const endpoint = "vod";
  const query = {
    structure_id: structureIds[type],
    per_page,
    page,
  };

  const URL = FPTPlay.getUrl(endpoint, query);

  return URL;
}

module.exports = Anime;
