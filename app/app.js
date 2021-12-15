var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connection = require('./config/connection')
const expressLayouts = require('express-ejs-layouts')

// Routes
var loginRouter = require('./api/adminlogin/routes')
var dashboardRouter = require('./api/dashboard/routers')
var authRouter = require('./api/auth/routes');
var authorsRouter = require('./api/authors/routes')
var studentRouter = require('./api/students/routes')
var materialsRouter = require('./api/materials/routes')
var branchesRouter = require('./api/branches/routes')
var categoriesRouter = require('./api/categories/routes')
var collegesRouter = require('./api/colleges/routes')
var coursesRouter = require('./api/courses/routes')
var ordersRouter = require('./api/orders/routes')
var semestersRouter = require('./api/semesters/routes')
var subjectsRouter = require('./api/subjects/routes')
var universitiesRouter = require('./api/universities/routes');
var locationRouter = require('./api/location/routes');
const { login } = require('./api/auth/controller');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Layoutts
app.set('layouts' , './layouts/layout.ejs')


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/' , dashboardRouter);
app.use('/login' , loginRouter)
app.use('/auth', authRouter);
app.use('/authors', authorsRouter);
app.use('/students', studentRouter);
app.use('/materials', materialsRouter);
app.use('/branches', branchesRouter);
app.use('/categories', categoriesRouter);
app.use('/colleges', collegesRouter);
app.use('/courses', coursesRouter);
app.use('/orders', ordersRouter);
app.use('/semesters', semestersRouter);
app.use('/subjects', subjectsRouter);
app.use('/universities', universitiesRouter);
app.use('/location', locationRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;