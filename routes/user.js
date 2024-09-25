const express=require('express')
const {register,verifyUser,loginUser,myProfile}=require('../controllers/user.js')
const {isAuth}=require('../middlewares/isAuth.js')
const router=express.Router()

router.post('/user/register',register)
router.post('/user/verify',verifyUser)
router.post('/user/login',loginUser)
router.get('/user/me',isAuth,myProfile)

module.exports=router;