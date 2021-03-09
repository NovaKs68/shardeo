require('../config/db.config.js');

exports.getAllUsers = (req, res, next) => {
    db.query('SELECT * ' +
            'FROM users ' +
            'LEFT JOIN roles ON users.id_role = roles.id_role;', function(err, rows,) {
        if(err){
            res.status(400).json({ sucess: false, err });
            console.log(err)
        } else {
            res.status(200).json({ sucess: true, response: rows });
        }
    });
};

exports.getOneUser = (req, res, next) => {
    db.query('SELECT * ' +
            'FROM users ' +
            'LEFT JOIN roles ON users.id_role = roles.id_role ' +
            'WHERE id_user=?;', req.params.id, function(err, rows,) {
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

exports.createOneUser = (req, res, next) => {
    // check token
    const user = req.body;
    const content = [user.first_name,user.last_name, user.email, user.password, user.id_role]
    db.query('INSERT INTO users (id_user, first_name, last_name, email, password, id_role) VALUES (NULL,?,?,?,?,?)',content, (err, rows) => {
        if(err){
            res.status(400).json({ sucess: false, err });
            console.log(err);
        } else {
            res.status(200).json({ sucess: true, response: rows[0] });
        }
    });
};

exports.getUsersPreview = (req, res, next) => {
    // check token
    db.query('SELECT users.id_user, users.first_name, users.last_name, users.banner ' +
    'FROM users ' +
    'LEFT JOIN roles ON users.id_role = roles.id_role;', function(err, rows,) {
        if (err) {
            res.status(404).json({sucess: false, err});
            console.log(err)
        } else if (rows[0] === undefined) {
            res.status(404).json({sucess: false, response: 'Content is empty'});
        } else {
            res.status(200).json({sucess: true, response: rows});
        }
    });
}
