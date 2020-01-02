'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const { PORT, MONGO_URI } = process.env;

const itemRoutes = require('./models/item/itemRoutes');

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

// Middleware logging every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/item', itemRoutes);

// Connect to db
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})