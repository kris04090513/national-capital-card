require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const countryRoutes = require("./routes/countries");

// 連接 MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabase')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));


app.use("/api/countries", countryRoutes);

// 啟動伺服器
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
