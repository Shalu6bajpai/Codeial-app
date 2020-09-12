const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParser());


app.use(express.static('./assests'));
app.use(expressLayouts);


//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//Use express router
app.use('/',require('./routes'));


//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');





//Listening to port
app.listen(port,function(err){
    if(err){
        console.log("error",err);
    }
    else{
        console.log('server is running on port:',port);
    }
});