const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');
const { isUser } = require('../middleware/auth');

const movieControllers = require('../controllers/media');

router.post('/', isUser, multer, movieControllers.createOneMedia);
router.get('/', movieControllers.getAllMedias);
router.get('/theme/:id', movieControllers.getMediasWithSpecificTheme);
router.get('/user/:id', movieControllers.getMediasByCreator)
router.get('/:id', movieControllers.getOneMedia);


module.exports = router
