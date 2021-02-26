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
  static async getInfo(id) {
    const endpoint = `vod/${id}`;
    const URL = FPTPlay.getUrl(endpoint);

    const { data } = await axios.get(URL);

    data.result.episodes = data.result.episodes.filter(episode => !episode.is_trailer);
    
    return data.result;
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

  static async getVideoSource({ id, episode = 0, quality = "auto_vip" }) {
    const endpoint = `stream/vod/${id}/${episode}/${quality}`;
    const URL = FPTPlay.getUrl(endpoint);

    const { data } = await axios.get(URL);

    const response = data.data;

    return response;
  }
}

function getAnimeURL({ type, per_page = 12, page = 1 }) {
  if (!structureIds.hasOwnProperty(type)) {
    throw new Error("No structure id");
  }

  const endpoint = "vod";
  const query = {
    structure_id: structureIds[type],
    episode_update: "1",
    per_page,
    page,
  };

  const URL = FPTPlay.getUrl(endpoint, query);

  return URL;
}
