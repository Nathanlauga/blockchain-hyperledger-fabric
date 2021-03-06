// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const validator = require('express-validator');
const passport = require('passport');
const config = require('./config/index');

// ----------------------------------- Environnement variables
let mongoUrl;

switch (process.env.NODE_ENV) {
    case 'production':
        mongoUrl = config.production.mongo_url;
        break;
    default:
        mongoUrl = config.development.mongo_url;
        break;
}

// Express initialisation
const app = express();

// ------------------------------------------------ Middlewares
app.use(bodyParser.json({
    limit: '500mb',
}));

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(validator());

app.use(cors('*'));

// ---------------------------------------- API Protection with Helmet
app.use(helmet());

// ----------------------------------------- Log les requêtes (development)
app.use(morgan('dev'));

// ------------------------------------- Initialisation de passport
app.use(passport.initialize());

// ------------------------------------------------ Routes
app.use('/', require('./routes/userRoutes'));

// -------------------------------------------------- Start Server
const PORT = 8000;

app.listen(PORT, () => {
    console.log(`API is running on port ${PORT} ...`);
});

// Connection to mongoDB
setTimeout(() => {
    mongoose.connect(mongoUrl);
}, 1000);
mongoose.connection.once('error', (err) => {
    console.log(err);
});
mongoose.connection.once('open', () => {
    console.log('Connected to mongodb database.');
});
