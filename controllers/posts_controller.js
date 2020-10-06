const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create = async function(req,res){
  try{
 await Post.create({
      content:req.body.content,
      user:req.user._id
  });
    if(req.xhr){
      return res.status(200).json({
        data:{
          post:post
        },
        message:"Post Created"
      })
    }

  req.flash('success','Post Created Successfully');
  return res.redirect('back');
}
catch(err){
  console.log('Error',err);
  return
}
}
module.exports.destroy = async function(req,res){
  try{
 let post=await Post.findById(req.params.id);
    //.id means converting id into string
    if(post.user==req.user.id){
      post.remove();
     await  Comment.deleteMany({post:req.params.id});
     if(req.xhr){
       return res.status(200).json({
         data:{
           post_id:req.params.id
         },
         message:"Post Deleted Successfully"
       })
     }
  req.flash('error','Post and  associated comments deleted Successfully');

      return res.redirect('back');
    }else{
      return res.redirect('back');
    }
  }
  catch(err){
    console.log('err',err);
  }
}