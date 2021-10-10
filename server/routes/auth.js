const express = require('express');
const router = express.Router();

const { isUser } = require('../middleware/auth');

const authControllers = require('../controllers/auth');

router.post('/checkConnectionUser', isUser, authControllers.checkConnectionUser);
router.post('/login', authControllers.login);


module.exports = router
