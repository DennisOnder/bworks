const passport = require("passport");
const passport_jwt = require("passport-jwt");
const config = require("./config");
const User = require("../models/User");

const opts = {
  jwtFromRequest: passport_jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.SECRET_OR_KEY
};

passport.use(
  new passport_jwt.Strategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      user ? done(null, user) : done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);
