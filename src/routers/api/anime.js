const express = require("express");
const router = express.Router();

const controller = require("../../controllers/api/anime.api.controller");

router.get("/:id/episode/:episode", controller.getVideoSource);

module.exports = router;
