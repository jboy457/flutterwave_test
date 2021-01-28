const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const route = require('./route');

const app = express();

//Configure  Application
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Register Routes
app.use(route);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Application running on ${PORT}`)
})