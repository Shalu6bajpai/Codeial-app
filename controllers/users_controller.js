
const User=require('../models/user');
module.exports.profile = function(req, res){
    if (req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if (user){
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                })
            }else{
                return res.redirect('/users/sign-in');

            }
        });
    }else{
        return res.redirect('/users/sign-in');

    }


    
}

module.exports.sign_up=function(req,res){
    //return res.end('<h1>profile</h1>');
    return res.render('sign_up',{
        title:"sign_up"
    });
}
module.exports.sign_in=function(req,res){
    //return res.end('<h1>profile</h1>');
    return res.render('sign_in',{
        title:"sign_in"
    });
}
//get the sign-up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}

    


//sign-in  and create the seesion
module.exports.createsession=function(req,res){
    //Steps to authenticate
    //find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in creating user while signing in'); return}
        //handle user found
        if(user){
                          //handle mismatching field
                          if(user.password!=req.body.password){
                              return res.redirect('back');
                          }
                           //handle session creation
                          res.cookie('user_id',user.id);
                          return res.redirect('/users/profile');
        }
        else{
            //handle use not found
                      return res.redirect('back');
        }
    }
          
    

 

 

    


    )
}