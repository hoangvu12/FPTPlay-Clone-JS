const nextButton = videojs.getComponent("Button");
const builtNextButton = videojs.extend(nextButton, {
  constructor: function () {
    nextButton.apply(this, arguments);
    this.addClass("vjs-icon-next-item");
    /* initialize your button */
  },
  handleClick: function () {
    Player.nextEpisode();
  },
});

videojs.registerComponent("nextEpisode", builtNextButton);
