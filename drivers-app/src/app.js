const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

if(process.env.NODE_ENV !== 'test')
  mongoose.connect('mongodb://localhost/driverDb', { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());

routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({error: err.message})
});``

module.exports = app;
