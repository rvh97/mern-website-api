"use strict";

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).send({ error: "Not authorized. Please login" });
    }
  }
};
