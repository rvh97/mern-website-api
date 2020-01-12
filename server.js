"use strict";

const dotenv = require("dotenv");
dotenv.config();
[
  "CLIENT_SOCKET",
  "COOKIE_MAX_AGE_MS",
  "EXPRESS_SESSION_SECRET",
  "MONGO_URI",
  "NODE_ENV",
  "PASSPORT_GOOGLE_OAUTH20_CLIENT_ID",
  "PASSPORT_GOOGLE_OAUTH20_CLIENT_SECRET",
  "PORT"
].forEach(environmentVariable => {
  if (!process.env[environmentVariable])
    throw new Error(`Environment variable ${environmentVariable} not set`);
});

const express = require("express");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const passport = require("passport");
require("./models/auth/passportConfig");

const app = express();

app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: +process.env.COOKIE_MAX_AGE_MS
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Bodyparser middleware
app.use(express.json());

// Middleware logging every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/item", require("./models/item/itemRoutes"));
app.use("/auth", require("./models/auth/authRoutes"));
app.use("/user", require("./models/user/userRoutes"));

// Connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to database"))
  .catch(err => console.log(err));

app.listen(+process.env.PORT, () => {
  console.log(`Server started on port ${+process.env.PORT}`);
});
