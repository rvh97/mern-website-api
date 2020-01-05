'use strict';

const dotenv = require('dotenv');
dotenv.config();
[
  'NODE_ENV',
  'PORT',
  'MONGO_URI',
  'PASSPORT_GOOGLE_OAUTH20_CLIENT_ID',
  'PASSPORT_GOOGLE_OAUTH20_CLIENT_SECRET',
  'EXPRESS_SESSION_SECRET',
  'CLIENT_SOCKET'
].forEach(environmentVariable => {
  if(!process.env[environmentVariable]) throw new Error(`Environment variable ${environmentVariable} not set`);
});

const express = require('express');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const passport = require('passport');
require('./models/auth/passportConfig');

const app = express();

app.use(expressSession({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));

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
app.use('/item', require('./models/item/itemRoutes'));
app.use('/auth', require('./models/auth/authRoutes'));

// Connect to db
mongoose
  .connect(process.env.MONGO_URI,
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
})