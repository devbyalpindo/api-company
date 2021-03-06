require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const companyRouter = require("./routes/company");
const productRouter = require("./routes/product");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const keysRouter = require("./routes/keys");

const app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);
app.use("/api/auth", usersRouter);
app.use("/api/company", companyRouter);
app.use("/api/product", productRouter);
app.use("/api/keys", keysRouter);

module.exports = app;
