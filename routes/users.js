const express=require('express');
const router=express.Router();
const usersController=require('../controllers/users_controller');
const postController=require('../controllers/post_controller');
router.get('/profile',usersController.profile);
router.get('/post',postController.post);
router.get('/sign-up',usersController.sign_up);
router.get('/sign-in',usersController.sign_in);
router.post('/create',usersController.create);
router.post('/createsession',usersController.createsession);

module.exports=router;