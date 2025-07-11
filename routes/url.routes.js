const express = require("express");

const router = express.Router();
const { shortenUrl, redirectUrl, getClicks } = require("../controllers/url.controller");


router.post("/shorten", shortenUrl);
router.get("/analytics/:code", getClicks);
router.get("/:code", redirectUrl);

module.exports = router;

