const express = require('express');
const router = require('./routes/routes.js')
const path = require('path');

const app = express();

const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
// app.use(express.static(path.join(__dirname, '../client')));
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

mongoose.connect('mongodb://localhost:27017/local');

app.use('/', router);

module.exports=app;