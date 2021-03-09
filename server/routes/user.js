const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/user');

router.post('/', userControllers.createOneUser);
router.get('/', userControllers.getAllUsers);
router.get('/previews', userControllers.getUsersPreview)
router.get('/:id', userControllers.getOneUser);

module.exports = router
