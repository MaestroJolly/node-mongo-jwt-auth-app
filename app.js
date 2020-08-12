'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3333;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/test', (req, res) => {
    res.send({
        greetings: 'Hello World !!!'
    })
});

app.get('/', (req, res) => {
    res.render('home');
});


app.listen(PORT, () => {
    console.log(`Application is listening to PORT: ${PORT}`);
})

