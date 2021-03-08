require('../config/db.config.js');


exports.getAllAlbums = (req, res, next) => {
    db.query('SELECT album.*, theme.* ' +
        'FROM album ' +
        '   LEFT OUTER JOIN album_theme_junction ' +
        '      ON album.id_album = album_theme_junction.id_album ' +
        '   LEFT OUTER JOIN theme ' +
        '      ON album_theme_junction.id_theme = theme.id_theme ' +
        '   GROUP BY album.id_album;', function(err, rows,) {
        if(err){
            res.status(400).json({ sucess: false, err });
            console.log(err)
        } else {
            res.status(200).json({ sucess: true, response: rows });
        }
    });
};

exports.getOneAlbum = (req, res, next) => {
    db.query('SELECT m.*, t.* ' +
        'FROM album AS m ' +
        'JOIN album_theme_junction AS mt ' +
        '   ON m.id_album = mt.id_album ' +
        'JOIN theme AS t ' +
        '   ON mt.id_theme = t.id_theme ' +
        'WHERE m.id_album = ?;', req.params.id, function(err, rows,) {
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

exports.getAlbumsWithSpecificTheme = (req, res, next) => {
    db.query('SELECT album.*, theme.* ' +
        'FROM album ' +
        'JOIN album_theme_junction ON album.id_album = album_theme_junction.id_album ' +
        'JOIN theme ON album_theme_junction.id_theme = theme.id_theme ' +
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

exports.createOneAlbum = (req, res, next) => {
    // check token
    const album = JSON.parse(req.body.album);
    const name_file = `${req.protocol}://${req.get('host')}/api/files/${req.files[0].filename}`;

    const content = [name_file, album.title, album.description_album, album.upload_date, album.number_view, album.number_like, album.id_theme]
    db.query('INSERT INTO album (`id_album`, `name_file`, `title`, `description_album`, `upload_date`, `number_view`, `number_like`) VALUES (NULL, ?,?,?,?,?,?); ' +
        'SET @id_album = LAST_INSERT_ID(); ' +
        'INSERT INTO album_theme_junction (`id_album`, `id_theme`) VALUES (@id_album,?);',content, (err, rows) => {
        if(err){
            res.status(400).json({ sucess: false, err });
            console.log(err);
        } else {
            res.status(200).json({ sucess: true, response: rows[0] });
        }
    });
};
