require("dotenv").config();

const Url = require("../models/url.model");
const generateCode = require("../utils/generateShortCode");
const validator = require("validator");

const BASE_URL = process.env.BASE_URL;

exports.shortenUrl = async (req, res) => {
  try {
    const { url, expiryDays } = req.body;
    console.log("Received URL:", url);
    console.log("ExpiryDays:", expiryDays);

    if (!url || !validator.isURL(url)) {
      console.log("Invalid URL");
      return res.status(400).json({ error: "Invalid URL" });
    }

    const code = await generateCode();
    console.log("Generated Code:", code);

    const expiryDate = expiryDays
      ? new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000)
      : null;

    const shortUrl = `${BASE_URL}/${code}`;
    console.log("Short URL:", shortUrl);

    await Url.create({
      originalUrl: url,
      shortCode: code,
      expiryDate,
    });

    res.status(201).json({ shortUrl });
  } catch (err) {
    console.error("Error in shortenUrl:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.redirectUrl = async (req, res) => {
  const { code } = req.params;
  try {
    const url = await Url.findOne({ shortCode: code });

    if (!url) return res.status(404).json({ error: "URL not found" });

    if (url.expiryDate && new Date() > url.expiryDate) {
      return res.status(410).json({ error: "URL expired" });
    }

    url.clickCount += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getClicks = async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });

    if (!url) return res.status(404).json({ error: "URL not found" });

    return res.json({ originalUrl: url.originalUrl, clickCount: url.clickCount });
  } catch (err) {
    console.error("Analytics error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};