const express = require('express');

const router = express.Router();
const chatController = require('../controllers/chat');
const authController = require('../middleware/auth');

router.get("/allcontacts", authController.authenticate, chatController.allContacts);

module.exports = router;