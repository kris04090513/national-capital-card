const express = require("express");
const router = express.Router();
const Country = require("../models/Country");

// 取得所有國家
router.get("/", async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 取得特定洲的國家
router.get("/:continent", async (req, res) => {
  try {
    const countries = await Country.find({ continent: req.params.continent });
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
