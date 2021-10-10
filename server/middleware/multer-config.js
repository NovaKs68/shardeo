const multer = require('multer');

const MIME_TYPES_IMAGE = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const MIME_TYPES_VIDEO = {
    'video/mp4': 'mp4'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log(MIME_TYPES_IMAGE[file.mimetype]);
        if ((MIME_TYPES_IMAGE[file.mimetype] === undefined && MIME_TYPES_VIDEO[file.mimetype] === undefined)) { return; }
        callback(null, (MIME_TYPES_IMAGE[file.mimetype] === undefined) ? 'files' : 'files');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = (MIME_TYPES_IMAGE[file.mimetype] === undefined)  ? MIME_TYPES_VIDEO[file.mimetype] : MIME_TYPES_IMAGE[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).array('image');


/*

const multer = require('multer');



const MIME_TYPES_IMG = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'video/mp4': 'mp4'
};

/!*const MIME_TYPES_VIDEO = {

}*!/

const storageImg = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'media/pictures');
        console.log('OK');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES_IMG[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

/!*const storageVideo = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'media/movies');
        console.log('OK');
    },
    filename: (req, file, callback) => {
        console.log('OK');
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES_VIDEO[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});*!/

module.exports = multer({ storageImg }).array('image');
// module.exports = multer({ storageVideo }).array('video');*/



/*
const multer = require('multer');

const MIME_TYPES_IMAGE = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const MIME_TYPES_VIDEO = {
    'video/mp4': 'mp4'
};

let storage;

if (MIME_TYPES_IMAGE[file.mimeType])
{
    storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'media/pictures');
        },
        filename: (req, file, callback) => {
            const name = file.originalname.split(' ').join('_');
            const extension = MIME_TYPES_IMAGE[file.mimetype];
            callback(null, name + Date.now() + '.' + extension);
        }
    });

    module.exports = multer({ storage }).array('image');
} else if (MIME_TYPES_VIDEO[file.mimeType])
{
    storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'media/movies');
        },
        filename: (req, file, callback) => {
            const name = file.originalname.split(' ').join('_');
            const extension = MIME_TYPES_VIDEO[file.mimetype];
            callback(null, name + Date.now() + '.' + extension);
        }
    });

    module.exports = multer({ storage }).array('video');
}*/
