require('../config/db.config.js');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    db.query('SELECT * ' +
        'FROM users ' +
        'LEFT JOIN roles ON users.id_role = roles.id_role ' +
        'WHERE email=?;', req.body.email, function(err, rows,) {

        if(err){
            res.status(404).json({ sucess: false, response: 'Erreur serveur' });
            console.log(err)
        } else if (rows[0] === undefined) {
            res.status(404).json({ sucess: false, response: 'Email' });
        } else {
            console.log(rows);
            if (req.body.password === rows[0].password) {
                if (rows[0].id_role === 1) {
                    return res.status(200).json({
                        user: rows[0],
                        token: jwt.sign(
                            { id_user: rows[0].id_user },
                            process.env.TOKEN_KEY,
                            { expiresIn: '3h'}
                        )
                    });
                }

                if (rows[0].id_role === 2) {
                    return res.status(200).json({
                        user: rows[0],
                        token: jwt.sign(
                            {
                                id_user: rows[0].id_user,
                                moderator: true
                            },
                            process.env.TOKEN_KEY,
                            { expiresIn: '3h'}
                        )
                    });
                }

                console.log(process.env.TOKEN_KEY);

                if (rows[0].id_role === 3) {
                    return res.status(200).json({
                        user: rows[0],
                        token: jwt.sign(
                            {
                                id_user: rows[0].id_user,
                                moderator: true,
                                admin: true
                            },
                            process.env.TOKEN_KEY,
                            { expiresIn: '3h'}
                        )
                    });
                }
                return res.status(401).json({ sucess: false, response: 'RoleUser'})
            } else {
                return res.status(401).json({ sucess: false, response: 'Password' });
            }
        }
    });
}

exports.checkConnectionUser = (req, res, next) => {
    res.status(200).json({ sucess: true, response: 'isAuth' });
}
