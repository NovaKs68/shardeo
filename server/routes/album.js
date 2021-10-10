const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config')
const { isUser } = require('../middleware/auth');

const albumControllers = require('../controllers/album');

router.post('/', isUser, multer, albumControllers.createOneAlbum);
router.get('/', albumControllers.getAllAlbums);
router.get('/theme/:id', albumControllers.getAlbumsWithSpecificTheme);
router.get('/:id', albumControllers.getOneAlbum);


module.exports = router
