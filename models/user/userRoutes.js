"use strict";

const router = require("express").Router();
const { ensureAuthenticated } = require("../auth/authMiddleware");

// Get current user
router.get("/", ensureAuthenticated, (req, res) => {
  const { email } = req.user;
  res.json({ email });
});

module.exports = router;
