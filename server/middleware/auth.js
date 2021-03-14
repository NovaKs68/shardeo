const jwt = require('jsonwebtoken');

exports = module.exports = {

    isAdmin: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
            const admin = decodedToken['admin'];
            const idAdmin = decodedToken['id_user'];

            if (admin && (req.body.id_user === idAdmin)) next();
            else throw 'invalid admin';
        } catch {
            res.status(401).json({
                errorToken: true,
                message: 'Vous n\'avez rien à faire ici !'
            });
        }
    },

    isModerator: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
            const moderator = decodedToken['moderator'];
            const idModerator = decodedToken['id_user'];

            if (moderator && (req.body.id_user === idModerator)) next();
            else throw 'invalid moderator';
        } catch {
            res.status(401).json({
                errorToken: true,
                message: 'Vous n\'avez rien à faire ici !'
            });
        }
    },

    isUser: (req, res, next) => {
        console.log('AAAAAAAAAAAAAAAAAAA');
        try {
            const token = req.body.token || req.get('Authorization');
            console.log(token);

            const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);

            const idUser = decodedToken['id_user'];
            console.log(req.body.id_user);
            if (req.body.id_user === idUser) next();
            else throw 'Invalid userId!';
        } catch {
            res.status(401).json({
                errorToken: true,
                message: "Vous n'avez rien à faire ici !"
            });
        }
    }
};
