const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');


//for any further router file we use router.use
router.use('/users',require('./users'));



module.exports=router;