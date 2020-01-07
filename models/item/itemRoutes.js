"use strict";

const router = require("express").Router();
const Item = require("./itemEntity");
const { ensureAuthenticated } = require("../auth/authMiddleware");

const STATUS_NOT_FOUND = 404;
const STATUS_UNPROCESSABLE_DATA = 422;

// Get all items
router.get("/", (req, res) => {
  Item.find()
    .lean()
    .exec()
    .then(items => res.json(items));
});

// Create an item
router.post("/", ensureAuthenticated, (req, res) => {
  new Item(req.body)
    .save()
    .then(item => res.json(item))
    .catch(() => res.status(STATUS_UNPROCESSABLE_DATA).send());
});

// Delete an item
router.delete("/:id", ensureAuthenticated, (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(result => {
      if (result) {
        res.json({ msg: "Successfully deleted" });
      } else {
        res
          .status(STATUS_NOT_FOUND)
          .json({ error: `Object with id ${req.params.id} not found` });
      }
    })
    .catch(() =>
      res
        .status(STATUS_UNPROCESSABLE_DATA)
        .json({ error: `Incorrectly formatted id or invalid length of id` })
    );
});

// Update an item
router.put("/:id", ensureAuthenticated, (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        res
          .status(STATUS_NOT_FOUND)
          .json({ error: `Object with id ${req.params.id} not found` });
      }
    })
    .catch(() =>
      res
        .status(STATUS_UNPROCESSABLE_DATA)
        .json({ error: `Incorrectly formatted id or invalid length of id` })
    );
});

module.exports = router;
