require('../config/db.config.js');


exports.getAllMedias = (req, res, next) => {
    db.query('SELECT media.*, theme.* ' +
        'FROM media ' +
        '   LEFT OUTER JOIN media_theme_junction ' +
        '      ON media.id_media = media_theme_junction.id_media ' +
        '   LEFT OUTER JOIN theme ' +
        '      ON media_theme_junction.id_theme = theme.id_theme ' +
        '   GROUP BY media.id_media;', function(err, rows,) {
        if(err){
            res.status(400).json({ sucess: false, err });
            console.log(err)
        } else {
            res.status(200).json({ sucess: true, response: rows });
        }
    });
};

exports.getOneMedia = (req, res, next) => {
    db.query('SELECT m.*, t.* ' +
        'FROM media AS m ' +
        'JOIN media_theme_junction AS mt ' +
        '   ON m.id_media = mt.id_media ' +
        'JOIN theme AS t ' +
        '   ON mt.id_theme = t.id_theme ' +
        'WHERE m.id_media = ?;', req.params.id, function(err, rows,) {
        if(err){
            res.status(404).json({ sucess: false, err });
            console.log(err)
        } else if(rows[0] === undefined) {
            res.status(404).json({ sucess: false, response: 'Content is empty' });
        } else {
            res.status(200).json({ sucess: true, response: rows });
        }
    });
};

exports.getMediasWithSpecificTheme = (req, res, next) => {
    db.query('SELECT media.*, theme.* ' +
        'FROM media ' +
        'JOIN media_theme_junction ON media.id_media = media_theme_junction.id_media ' +
        'JOIN theme ON media_theme_junction.id_theme = theme.id_theme ' +
        'WHERE theme.id_theme=?;', req.params.id, function(err, rows,) {
        if(err){
            res.status(404).json({ sucess: false, err });
            console.log(err)
        } else if(rows[0] === undefined) {
            res.status(404).json({ sucess: false, response: 'Content is empty' });
        } else {
            res.status(200).json({ sucess: true, response: rows });
        }
    });
};

exports.createOneMedia = (req, res, next) => {
    // check token
    console.log(req.body)
    const media = JSON.parse(req.body.media);
    const name_file = `${req.protocol}://${req.get('host')}/api/files/${req.files[0].filename}`;

    if (!media.number_like)
        media.number_like = 0;

    if (!media.number_view)
        media.number_view = 0;
    console.log(media.title);

    const content = [name_file, media.title, media.description_media, media.number_view, media.number_like, media.id_user, 1]
    db.query('INSERT INTO media (`id_media`, `name_file`, `title`, `description_media`, `upload_date`, `number_view`, `number_like`, `id_user`) VALUES (NULL, ?,?,?, NOW(),?,?,?); ' +
        'SET @id_media = LAST_INSERT_ID(); ' +
        'INSERT INTO media_theme_junction (`id_media`, `id_theme`) VALUES (@id_media,?);',content, (err, rows) => {
        if(err){
            res.status(400).json({ sucess: false, err });
            console.log(err);
        } else {
            res.status(200).json({ sucess: true, response: rows[0] });
        }
    });
};

exports.getMediasByCreator = (req, res, next) => {
    db.query('SELECT m.*, t.* ' +
        'FROM media AS m ' +
        '   LEFT OUTER JOIN media_theme_junction AS mt ' +
        '      ON m.id_media = mt.id_media ' +
        '   LEFT OUTER JOIN theme AS t ' +
        '      ON mt.id_theme = t.id_theme ' +
        '   WHERE m.id_user = ? ' +
        'GROUP BY m.id_media;', req.params.id, function(err, rows,) {
        if(err){
            res.status(404).json({ sucess: false, err });
            console.log(err)
        } else if(rows[0] === undefined) {
            res.status(404).json({ sucess: false, response: 'Content is empty' });
        } else {
            res.status(200).json({ sucess: true, response: rows });
        }
    });
}
