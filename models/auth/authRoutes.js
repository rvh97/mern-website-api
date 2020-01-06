'use strict';

const router = require('express').Router();
const passport = require('passport');
const { ensureAuthenticated } = require('./authMiddleware');

// Login using Google
router.get('/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/auth/test');
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.send('Logged out!');
});

// Test authentication
router.get('/test', ensureAuthenticated, (req, res) => {
  res.send('Authorized, permission granted!')
});

module.exports = router;