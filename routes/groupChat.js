const express = require('express');

const router = express.Router();
const groupChatController = require('../controllers/groupChat');
const authController = require('../middleware/auth');

router.get('/allusersgroup',authController.authenticate, groupChatController.allUserGroups);

router.post("/sendmessage", authController.authenticate, groupChatController.sendMessage);

router.get("/messages/:id", authController.authenticate, groupChatController.messages);

module.exports = router;