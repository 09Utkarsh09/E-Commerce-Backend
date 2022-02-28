var express = require('express');

var app = express();

// view engine setup


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);



module.exports = app;