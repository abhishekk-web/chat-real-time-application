const express = require('express');

const  router = express.Router();
const addUserController = require('../controllers/addUser');
const authController = require('../middleware/auth');

router.post("/adduser", authController.authenticate, addUserController.addUser);

module.exports = router;