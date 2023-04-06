const express = require("express");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const dotenv = require("dotenv");

const app = express();
dotenv.config({ path: __dirname + "/config/config.env" });

app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

const postRoute = require("./routes/post");
const userRoute = require("./routes/user");

app.use("/users", userRoute);
app.use("/", postRoute);

module.exports = app;
