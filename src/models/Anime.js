const axios = require("axios");
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
  static async getList(type) {
    const URL = getAnimeURL({ type });
    const { data } = await axios.get(URL);

    return data.videos_list;
  }
}

function getAnimeURL({ type, per_page = 1, page = 1 }) {
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
