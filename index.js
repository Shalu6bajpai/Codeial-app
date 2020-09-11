const express=require('express');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');

app.use(express.static('./assests'));
app.use(expressLayouts);
//Use express router
app.use('/',require('./routes'));


//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');






app.listen(port,function(err){
    if(err){
        console.log("error",err);
    }
    else{
        console.log('server is running on port:',port);
    }
});