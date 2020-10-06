const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name: {
        type:String,
        required:true,

    },
    avatar:{
        type:String
    }
},{
    timestamps:true

});
//storing file uploads
let storage=multer.diskStorage({
    //cb callback
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename:function(req,file,cb){
        cb(null,file.filename + '-'+Date.now())
    }
})


const user=mongoose.model('User',userSchema);
module.exports=user;