const express = require('express');
const AuthValidator = require('../../middlewares/index')

const UserController = require("../../controllers/user-controller");
const router = express.Router();

router.post('/signup',
    AuthValidator.authValidator,
     UserController.create
);

router.post('/signin',
    AuthValidator.authValidator,
     UserController.signIn
);

router.get('/authenticate', 
    UserController.isAuthenticated
);

router.post('/admin',
    AuthValidator.adminValidator,
     UserController.isAdmin );


module.exports = router;