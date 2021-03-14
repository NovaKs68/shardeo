require('../config/db.config.js');
const jwt = require('jsonwebtoken');

exports.getAllUsers = (req, res, next) => {
    db.query('SELECT * ' +
            'FROM users ' +
            'LEFT JOIN roles ON users.id_role = roles.id_role;', function(err, rows,) {
        if(err){
            res.status(400).json({ success: false, err });
            console.log(err)
        } else {
            res.status(200).json({ success: true, response: rows });
        }
    });
};

exports.getOneUser = (req, res, next) => {
    db.query('SELECT * ' +
            'FROM users ' +
            'LEFT JOIN roles ON users.id_role = roles.id_role ' +
            'WHERE id_user=?;', req.params.id, function(err, rows,) {
        if(err){
            res.status(404).json({ success: false, err });
            console.log(err)
        } else if(rows[0] === undefined) {
            res.status(404).json({ success: false, response: 'Content is empty' });
        } else {
            res.status(200).json({ success: true, response: rows[0] });
        }
    });
};

exports.createOneUser = (req, res, next) => {
    // check token
    const user = req.body;
    const content = [user.first_name,user.last_name, user.email, user.password, user.id_role]
    db.query('INSERT INTO users (id_user, first_name, last_name, email, password, id_role) VALUES (NULL,?,?,?,?,?)',content, (err, rows) => {
        if(err){
            res.status(400).json({ success: false, err });
            console.log(err);
        } else {
            res.status(200).json({ success: true, response: rows[0] });
        }
    });
};

exports.getUsersPreview = (req, res, next) => {
    // check token
    db.query('SELECT users.id_user, users.first_name, users.last_name, users.banner ' +
    'FROM users ' +
    'LEFT JOIN roles ON users.id_role = roles.id_role;', function(err, rows,) {
        if (err) {
            res.status(404).json({ success: false, err });
            console.log(err)
        } else if (rows[0] === undefined) {
            res.status(404).json({ success: false, response: 'Content is empty' });
        } else {
            res.status(200).json({ success: true, response: rows });
        }
    });
};

exports.putUserByUser = (req, res, next) => {
    const user = req.body.user;
    const content = [user.first_name,user.last_name, user.email, user.password, req.body.id_user]
    console.log(content);
    db.query('UPDATE users AS u ' +
        'SET u.first_name = ?, ' +
        '   u.last_name = ?, ' +
        '   u.email = ?, ' +
        '   u.password = ? ' +
        'WHERE u.id_user = ?', content, (err, rows) => {
        if (err) {
            res.status(404).json({ success: false, err })
        } else {
            res.status(200).json({ success: true });
        }
    });
}

exports.checkPassword = (req, res, next) => {
    db.query('SELECT users.password ' +
        'FROM users ' +
        'WHERE users.id_user=?', req.body.id_user, (err, rows) => {
        if(err){
            res.status(400).json({ success: false, err });
            console.log(err);
        } else if (rows[0] === undefined) {
            res.status(404).json({ success: false, response: 'Content is empty' });
        } else {
            console.log(req.body.password)
            if (rows[0].password === req.body.password) {
                res.status(200).json({ success: true });
            } else {
                res.status(404).json({ success: false, response: 'Password not equal' });
            }

        }
    });
}

exports.putLastName = (req, res, next) => {
    console.log('OK');
    const user = req.body.user;
    const content = [user.last_name, user.id_user];
    console.log(content + "AAAA");
    db.query('UPDATE users AS u ' +
        'SET u.last_name = ? ' +
        'WHERE u.id_user = ?;', content, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(404).json({ success: false, err })
        } else if (!user.last_name || !user.id_user) {
            res.status(404).json({ success: false, response: 'Request content undefined' });
        } else {
            res.status(200).json({ success: true });
        }
    });
}

exports.putFirstName = (req, res, next) => {
    console.log('OK');
    const user = req.body.user;
    const content = [user.first_name, user.id_user];
    console.log(content + "AAAA");
    db.query('UPDATE users AS u ' +
        'SET u.first_name = ? ' +
        'WHERE u.id_user = ?;', content, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(404).json({ success: false, err })
        } else if (!user.first_name || !user.id_user) {
            res.status(404).json({ success: false, response: 'Request content undefined' });
        } else {
            res.status(200).json({ success: true });
        }
    });
}

exports.putEmail = (req, res, next) => {
    console.log('OK');
    const user = req.body.user;
    const content = [user.email, user.id_user];
    console.log(content + "AAAA");
    db.query('UPDATE users AS u ' +
        'SET u.email = ? ' +
        'WHERE u.id_user = ?;', content, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(404).json({ success: false, err })
        } else if (!user.email || !user.id_user) {
            res.status(404).json({ success: false, response: 'Request content undefined' });
        } else {
            res.status(200).json({ success: true });
        }
    });
}

exports.putPassword = (req, res, next) => {
    console.log('OK');
    const user = req.body.user;
    const content = [user.password, user.id_user];
    console.log(content + "AAAA");
    db.query('UPDATE users AS u ' +
        'SET u.password = ? ' +
        'WHERE u.id_user = ?;', content, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(404).json({ success: false, err })
        } else if (!user.password || !user.id_user) {
            res.status(404).json({ success: false, response: 'Request content undefined' });
        } else {
            res.status(200).json({ success: true });
        }
    });
}
