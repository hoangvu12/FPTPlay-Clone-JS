const previousButton = videojs.getComponent("Button");
const builtPreviousButton = videojs.extend(previousButton, {
  constructor: function () {
    previousButton.apply(this, arguments);
    this.addClass("vjs-icon-previous-item");
    /* initialize your button */
  },
  handleClick: function () {
    Player.previousEpisode();
  },
});

videojs.registerComponent("previousEpisode", builtPreviousButton);
