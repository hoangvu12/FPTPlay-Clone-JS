const express = require("express");
const router = express.Router();

const controller = require("../../controllers/api/proxy.api.controller");

router.get("/", controller.index);
router.get("/video/:url", controller.video);

module.exports = router;
