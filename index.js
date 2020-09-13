const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocalStrategy=require('./config/passport-local-strategy');

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

app.use(session({
    name:'codeial',
    //TODO CAHNGE WHILE PRODUCTION
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }

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