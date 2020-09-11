const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/codeial_developnment');
const db=mongoose.connection;
db.on('error',console.error.bind(console,"Error in connecting"));
db.once('open',function(){
    console.log('Coonected to Database::MongoDb');
});

module.exports=db;