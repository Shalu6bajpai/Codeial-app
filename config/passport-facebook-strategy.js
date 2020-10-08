const passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
  const crypt=require('crypto');
  const User=require('../models/user');
  passport.use(new FacebookStrategy({
    clientID: "1466219816905023",
    clientSecret: "b7aeabef239034f9e248d713f57c70ee",
    callbackURL: "http://localhost:8002/users/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({email:profile.emails[0].value}).exec(function(err, user) {
      if (err) { return done(err); }
      if(user){
      done(null, user);
      }else{
          User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString('hex')

          }, function(err, user){
            if (err){console.log('error in creating user fb strategy-passport', err); return;}

            return done(null, user);
        });
    }

}); 
}
));


module.exports = passport;