const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');
const { isUser, isModerator, isAdmin } = require('../middleware/auth');

const userControllers = require('../controllers/user');

router.post('/', isModerator, multer, userControllers.createOneUser);
router.get('/', userControllers.getAllUsers);
router.get('/previews', userControllers.getUsersPreview);
router.put('/modifyUserByUser', isUser, userControllers.putUserByUser);
router.post('/checkPassword', isUser, userControllers.checkPassword);
router.put('/changeLastName', isUser || isModerator || isAdmin, userControllers.putLastName);
router.put('/changeFirstName', isUser || isModerator || isAdmin, userControllers.putFirstName);
router.put('/changeEmail', isUser || isModerator || isAdmin, userControllers.putEmail);
router.put('/changePassword', isUser || isModerator || isAdmin, userControllers.putPassword);
router.get('/:id', userControllers.getOneUser);

module.exports = router
