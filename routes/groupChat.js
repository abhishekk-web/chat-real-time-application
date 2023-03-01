const express = require('express');

const router = express.Router();
const groupChatController = require('../controllers/groupChat');
const authController = require('../middleware/auth');

router.post("/sendmessage", groupChatController.sendMessage);

module.exports = router;