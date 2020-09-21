const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8002;
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocalStrategy=require('./config/passport-local-strategy');
const db = require('./config/mongoose');
const MongoStore=require('connect-mongo')(session);
const sassMiddleware =require('node-sass-middleware');
app.use(sassMiddleware({
   src:'./assests/scss',
   dest:'./assests/css',
   debug:true,
   outputStyle:'extended',
   prefix:'/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());


app.use(express.static('./assests'));
app.use(expressLayouts);


//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);





//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');
//mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    //TODO CAHNGE WHILE PRODUCTION
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect-mongo setup ok');
        }
    )

}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//Use express router
app.use('/',require('./routes'));



//Listening to port
app.listen(port,function(err){
    if(err){
        console.log("error",err);
    }
    else{
        console.log('server is running on port:',port);
    }
});
//kya issue hai ?>>actually when i m signing up cookies is created but not redirection to the sign-in page