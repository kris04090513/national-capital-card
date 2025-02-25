const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  name_en: { type: String, required: true }, // 英文名稱
  name_zh: { type: String, required: true }, // 中文名稱
  capital: { type: String, required: true }, // 首都
  region: { type: String, required: true },  // 洲別
  flag: { type: String, required: true },    // 國旗圖片 URL
  languages: { type: [String], required: true }, // 語言陣列
  currency: { type: [String], required: true },  // 貨幣陣列
});

const Country = mongoose.model("Country", CountrySchema);
module.exports = Country;
