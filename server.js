'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { SERVER_PORT, MONGO_URI } = require('./config');

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

app.listen(SERVER_PORT, () => {
    console.log(`Server started on port ${SERVER_PORT}`);
})