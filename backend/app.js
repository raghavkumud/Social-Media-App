const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const compression = require("compression");
const path = require("path");

app.use(compression());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: __dirname + "/config/config.env" });
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");
app.use("/api/v1", postRoute);
app.use("/api/v1", userRoute);
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
module.exports = app;
