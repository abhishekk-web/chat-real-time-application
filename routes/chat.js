const express = require('express');

const router = express.Router();
const chatController = require('../controllers/chat');
const authController = require('../middleware/auth');

router.get("/allcontacts", authController.authenticate, chatController.allContacts);

router.post("/sendmessage", authController.authenticate, chatController.sendMessage)
router.get("/messages/:id", authController.authenticate, chatController.messages);

module.exports = router;