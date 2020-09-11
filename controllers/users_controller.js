module.exports.profile=function(req,res){
    //return res.end('<h1>profile</h1>');
    return res.render('user',{
        title:"user"
    });
}