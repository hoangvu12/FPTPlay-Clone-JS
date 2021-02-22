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

const videoSource =
  "http://vod01-cdn.fptplay.net/ovod/_definst_/smil:mp4/encoded/20201207/anime_danet_attackontitan4_2020_ep01/30716154e897b6c3d91980a20f77faca.smil/playlist.m3u8?token=eyJoYXNoX3ZhbHVlIjogImM4YjY5N2MxY2ViMDI3MWNiYzRjMzdkNmQxNjM3YWFmIiwgInZpZGVvX2lkIjogIjVmY2I3YzUzMjA4OWJkMTM0NDdiMjhlMiIsICJzZXJ2ZXJfdGltZSI6IDE2MTM5NjY2NDksICJ2YWxpZF9taW51dGVzIjogNzIwfQ";

videoPlayer.src({
  src: videoSource,
  type: "application/x-mpegURL",
});
videoPlayer.maxQualitySelector({
  defaultQuality: 2,
});

videojs.Hls.xhr.beforeRequest = function (options) {
  let url = encodeURIComponent(options.uri);
  options.uri = `${BASE_URL}/api/v1/proxy/video/${url}`;

  return options;
};
