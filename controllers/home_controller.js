const Post=require('../models/post');
module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);
// Post.find({},function(err,posts){
    
//     return res.render('home',{
//         title:"Home",
//         posts:posts,
//     });
//     });
//populate the user at each post
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title:"Home",
            posts:posts
        });
        });
}