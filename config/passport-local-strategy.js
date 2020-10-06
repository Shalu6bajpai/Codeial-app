const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');
//Authentication using passport.js
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
function(req,email,password,done){
  //find the function and establish the identity
  User.findOne({email:email},function(err,user){
          if(err){
              req.flash('error',err);
              return done(err);
          }
          if(!user || user.password!=password){
              req.flash('error','Invalid username/password');
              return done(null,false);
          }
          return done(null,user);
  });
}


));




//Serilaization the user to decide which key is kept in the cookies

passport.serializeUser(function(user,done){
     done(null,user.id);
});
//deserilization the user from the key
passport.deserializeUser(function(id,done){
     User.findById(id,function(err,user){
         if(err){
             console.log("Error in finding user---->passport");
             return done(err);
         }
         return done(null,user);
     });
});

//check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
    //if user is signed in,then pass on the request to the next fun(controlller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signed in
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the sesiion cookie and we are just sending this to the locals for the views
        res.locals.user=req.user;
    }
    next();
}
module.exports=passport;