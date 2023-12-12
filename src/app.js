const express = require('express');
const functions = require('firebase-functions');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.DB_STRING);

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'mongo connection error'));


const app = express();


const router = require('./routes/routes');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const options = {
    origin: 'https://johnnyyork13.github.io',
}

app.options('*', cors(options));
app.use(cors(options));

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

app.use('/', router);






app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500);
})

app.listen(3000);

exports.api = functions.https.onRequest(app);

