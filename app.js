'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

const authRoutes = require('./routes/authRoutes');
const { checkUser, requireAuth } = require('./middleware/authMiddleware');


const PORT = process.env.PORT || 3333;

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');


// routes
app.get('/test', (req, res) => { res.send({ greetings: 'Hello World !!!' })});
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

// database connection
const dbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.akcvj.mongodb.net/${process.env.MONGODB_NAME}`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then((response) => {
    app.listen(PORT, () => { console.log(`Application is listening to PORT: ${PORT}`); });
}).catch((error) => {
    console.log(error);
});

