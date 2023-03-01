const express = require('express');

const router = express.Router();
const makeGroupController = require('../controllers/makeGroup');
const authController = require('../middleware/auth');

router.post('/makegroup', authController.authenticate, makeGroupController.makeGroup);

router.get('/showgroup', authController.authenticate, makeGroupController.showGroups);

module.exports = router;