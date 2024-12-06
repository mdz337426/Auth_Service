const express = require('express');
const {authValidator} = require('../../middlewares/index')

const UserController = require("../../controllers/user-controller");
const router = express.Router();

router.post('/signup',
    authValidator,
     UserController.create
);

router.post('/signin',
    authValidator,
     UserController.signIn
);

module.exports = router;