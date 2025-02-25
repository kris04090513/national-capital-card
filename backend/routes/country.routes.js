const express = require("express");
const router = express.Router();
const Country = require("../models/country.model");

// 新增一個國家
router.post("/add", async (req, res) => {
  try {
    const newCountry = new Country(req.body);
    await newCountry.save();
    res.status(201).json(newCountry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 取得所有國家
router.get("/", async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 根據洲別查詢國家
router.get("/region/:region", async (req, res) => {
  try {
    const countries = await Country.find({ region: req.params.region });
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
