const passport=require('passport');
//imported
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const User=require('../models/user');
//created options
let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codeial',
}
//finding user
passport.use(new JWTStrategy(opts,function(jwtPayload,done){
User.findById(jwtPayload._id,function(err,user){
    if(err){
        console.log('Error in finding user from jwwt');
        return
    }
    if(user){
        return done(null,user);
    }
    return done(null,false);
})
}));
module.exports=passport;
//fetching id and finding user is present or 
//jwt: