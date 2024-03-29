const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

const userRoutes = require('./routes/user');
const mediaRoutes = require('./routes/media')
const albumRoutes = require('./routes/album');
const authRoutes = require('./routes/auth')

const app = express();

// Va rendre les informations exploitables
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // A changer avec les variables d'environnement
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Permet de donner l'accès aux images
app.use('/files', express.static(path.join(__dirname, 'files')));

// Routes de l'application
app.use('/user', userRoutes);
app.use('/media', mediaRoutes);
app.use('/album', albumRoutes);
app.use('/auth', authRoutes)

module.exports = app;
