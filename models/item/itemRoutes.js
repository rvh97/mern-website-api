'use strict';

const express = require('express');
const router = express.Router();
const Item = require('./itemEntity');

const STATUS_NOT_FOUND = 404;
const STATUS_UNPROCESSABLE_DATA = 422;

// Get all items
router.get('/', (request, response) => {
  Item.find().lean().exec()
    .then(items => response.json(items))
});

// Create an item
router.post('/', (request, response) => {
  new Item(request.body).save()
    .then(item => response.json(item))
    .catch(() => response.status(STATUS_UNPROCESSABLE_DATA).send());
});

// Delete an item
router.delete('/:id', (request, response) => {
  Item.findByIdAndDelete(request.params.id)
    .then(result => {
      if (result) {
        response.json({ msg: 'Successfully deleted' });
      } else {
        response
          .status(STATUS_NOT_FOUND)
          .json({ msg: `Object with id ${request.params.id} not found` });
      }
    })
    .catch(() =>
      response
        .status(STATUS_UNPROCESSABLE_DATA)
        .json({ error: `Incorrectly formatted id or invalid length of id` })
    );
});

// Update an item
router.put('/:id', (request, response) => {
  Item.findByIdAndUpdate(request.params.id, request.body, { new: true })
    .then(result => {
      if (result) {
        response.json(result);
      } else {
        response
          .status(STATUS_NOT_FOUND)
          .json({ msg: `Object with id ${request.params.id} not found` });
      }
    })
    .catch(() =>
      response
        .status(STATUS_UNPROCESSABLE_DATA)
        .json({ error: `Incorrectly formatted id or invalid length of id` })
    );
});

module.exports = router;