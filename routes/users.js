const express=require('express');
const router=express.Router();
const passport=require('passport');
const usersController=require('../controllers/users_controller');
const postController=require('../controllers/post_controller');
router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/post',postController.post);
router.get('/sign-up',usersController.sign_up);
router.get('/sign-in',usersController.sign_in);
router.post('/create',usersController.create);
//use passport as the middleware as authenticate
router.post('/createsession',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
    ),usersController.createsession);

module.exports=router;