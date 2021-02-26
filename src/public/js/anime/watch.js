const BASE_URL = window.location.origin;
let videoPlayer = videojs("player", {
  autoplay: true,
  controlBar: {
    children: {
      playToggle: {},
      volumePanel: {
        inline: true,
      },
      previousEpisode: {},
      nextEpisode: {},
      ProgressControl: {},
      RemainingTimeDisplay: {},
      fullscreenToggle: {},
    },
  },
});

videoPlayer.hotkeys({
  volumeStep: 0.1,
  seekStep: 5,
  enableModifiersForNumbers: false,
});

videojs.Vhs.xhr.beforeRequest = function (options) {
  let url = encodeURIComponent(options.uri);
  options.uri = `${BASE_URL}/api/v1/proxy/video/${url}`;

  return options;
};

class Player {
  static init(animeId) {
    this.animeId = animeId;
  }

  static load() {
    const savedAnimeInfo = localStorage[this.animeId];

    if (!savedAnimeInfo) {
      return this.loadEpisode();
    }

    const animeInfo = JSON.parse(savedAnimeInfo);

    animeInfo.date = Date.now();

    localStorage[this.animeId] = JSON.stringify(animeInfo);

    const recentEpisode = animeInfo.recent;
    const time = animeInfo[recentEpisode].time;

    this.loadEpisode(recentEpisode, time);
  }

  static async loadEpisode(episode = 0, time = 0) {
    this.currentEpisode = episode;

    if (episode < 0) episode = 0;

    const chosenEpisode = await getEpisode(this.animeId, episode);

    videoPlayer.src({
      src: chosenEpisode.source,
      type: "application/x-mpegURL",
    });

    videoPlayer.maxQualitySelector({
      defaultQuality: 2,
    });

    videoPlayer.currentTime(time);
  }

  static nextEpisode() {
    this.loadEpisode(this.currentEpisode + 1);
  }

  static previousEpisode() {
    this.loadEpisode(this.currentEpisode - 1);
  }
}

videoPlayer.on("timeupdate", function () {
  const currentEpisode = Player.currentEpisode;
  const animeId = Player.animeId;
  const rawEpisodes = localStorage[Player.animeId] || "{}";
  const episodes = JSON.parse(rawEpisodes);

  const currentPlayTime = videoPlayer.currentTime();

  episodes.recent = currentEpisode;
  episodes[currentEpisode] = { time: currentPlayTime };

  localStorage[animeId] = JSON.stringify(episodes);

  // if (currentPlayTime >= player.duration) {
  //   player.nextEpisode();
  // }
});

async function getEpisode(animeId, episode) {
  const data = await Anime.getVideoSource({
    id: animeId,
    episode,
  });

  return { success: true, source: data.url, thumbnail: data.timeline_img };
}
