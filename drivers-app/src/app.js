const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

if(process.env.NODE_ENV !== 'test')
  mongoose.connect('mongodb://localhost/driverDb', { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());

routes(app);

module.exports = app;
