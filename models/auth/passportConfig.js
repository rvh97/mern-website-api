const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../user/userEntity");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.PASSPORT_GOOGLE_OAUTH20_CLIENT_ID,
      clientSecret: process.env.PASSPORT_GOOGLE_OAUTH20_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("GoogleId:", profile.id);
      user = {
        googleId: profile.id
      };

      User.findOne({ googleId: profile.id })
        .lean()
        .exec()
        .then(user => {
          if (user) {
            console.log("user", user);
            done(null, user);
          } else {
            new User(newUser).save().then(user => {
              console.log("user", user);
              done(null, user);
            });
          }
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .lean()
    .exec((err, user) => {
      done(err, user);
    });
});
