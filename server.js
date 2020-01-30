"use strict";

if (process.env.NODE_ENV !== "production") {
  require("env-app-yaml").config({ path: "env_variables.yaml" });
}

[
  "CLIENT_SOCKET",
  "COOKIE_MAX_AGE_MS",
  "MONGO_URI",
  "NODE_ENV",
  "GOOGLE_OAUTH20_CLIENT_ID",
  "GOOGLE_OAUTH20_CLIENT_SECRET",
  "PORT",
  "SERVER_SOCKET",
  "SESSION_SECRET"
].forEach(environmentVariable => {
  if (!process.env[environmentVariable])
    throw new Error(`Environment variable ${environmentVariable} not set`);
});

const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/auth/passportConfig");

const app = express();

app.use(
  cookieSession({
    name: "session",
    secret: process.env.SESSION_SECRET,
    maxAge: +process.env.COOKIE_MAX_AGE_MS
  })
);

// Rolling session option not supported.
// Updates a value in cookie so that the set-cookie will be sent along with updated maxAge i.e. simulate rolling session
// For performance purpose not changed with every request, only each minute
app.use((req, res, next) => {
  req.session.changedMaxOncePerMinute = Math.floor(Date.now() / 60e3); // Rolling session,
  next();
});

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

(async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log("Connected to database");
  } catch (err) {
    console.log("Could not connect to database");
    console.log(err);
    process.exit(1);
  }

  console.log("Starting server...");
  app.listen(+process.env.PORT, () => {
    console.log(`Server started on port ${+process.env.PORT}`);
  });
})();
