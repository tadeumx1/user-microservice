const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require ('./middleware/auth')

const userController = require ('./controllers/userController')
const userLoginValidator = require('./validators/userLogin')
const userSignUpValidator = require('./validators/userLogin')
const userPasswordValidator = require('./validators/userResetPassword')

routes.post('/user/signup', validate(userSignUpValidator), handle(userController.signUp))
routes.post('/user/login', validate(userLoginValidator), handle(userController.login))

// All the routes after need authentication

routes.use(authMiddleware)

routes.post('/user/password', validate(userPasswordValidator), handle(userController.resetPassword))

module.exports = routes