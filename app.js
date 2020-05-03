const express = require('express');
const bodyParser = require('body-parser');
const method = require("method-override");
const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(method('_method'));

const gameRouter = require('./router/GameRouter');
app.use(gameRouter);

module.exports = app;

