const express = require("express");
const router = express.Router();
const userController = require('./controllers/userController')
const BDDController = require('./controllers/BDController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/users-data', userController.getUsers)
router.put('/upl-points', userController.uploadPointsUser)
router.put('/upl-points-math', userController.uploadPointsMathUser)
router.delete('/user/:user_handle', userController.deleteUser)
router.get("/pingBDD",BDDController.verifyBDD)

module.exports = router
