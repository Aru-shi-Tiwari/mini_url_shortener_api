const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const urlRoutes = require("./routes/url.routes");


dotenv.config();
const app = express();

app.use(express.json());
app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 10 })); // 10 requests per minute

app.use("/", urlRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.get('/', (req, res) => {
  res.send('Welcome to the URL Shortener API!');
});