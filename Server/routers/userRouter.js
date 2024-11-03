const Router = require("express")
const router=new Router()
const userController = require("../controllers/userController")
const authToken=require('../middleware/JWTmiddleware')


router.post('/auth',userController.createUser)

router.post('/login',userController.login)

router.post('/setBalance',userController.setBalance)

router.get('/getUserByNickname/:nickname',userController.getUserByNickname)

router.get('/getUserById/:id',userController.getUserById)

router.get('/getAllUsers',userController.getAllUsers)

router.delete('/deleteUserById/:id',userController.deleteUserById)

router.delete('/deleteUserByNickname/:nickname',userController.deleteUserByNickname)

module.exports=router