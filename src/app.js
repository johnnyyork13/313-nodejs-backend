const express = require('express');
const functions = require('firebase-functions');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

require('dotenv').config();

mongoose.connect(process.env.DB_STRING);

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'mongo connection error'));


const app = express();


const router = require('./routes/routes');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// const sessionStore = new MongoStore({mongooseConnection: db, collection: 'sessions'});

// app.use((req, res, next) => {
//     console.log(req);
//     next();
// })

// app.use(session({
//     secret: 'database',
//     resave: false,
//     saveUninitialized: true,
//     store: sessionStore,
//     cookie: {
//         maxAge: 100 * 60 * 60 * 24
//     }
// }))


// app.use(passport.initialize());
// app.use(passport.session());

const options = {
    origin: 'http://localhost:5173',
    // origin: 'https://johnnyyork13.github.io',
    // credentials: true,
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

