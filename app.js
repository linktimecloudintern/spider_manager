const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use('/static', express.static('public'));

//View engine setup
app.set('view engine', 'pug');

//Routes
const mainRoutes = require('./routes');
// const websiteRoutes = require('./routes/websites');

app.use(mainRoutes);
// app.use('/websites', websiteRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(3333, () => {
    console.log('The application is running on localhost:3333!')
});