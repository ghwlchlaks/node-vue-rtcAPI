var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var cors = require('cors')
var mongoose = require('mongoose')
var passport = require('passport')
var flash = require('connect-flash')
var session = require('express-session')

var index = require('../routes/index')
var users = require('../routes/users')

var app = express()
mongoose.connect('mongodb://localhost/test5')
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function (callback) {
  console.log('mongo db connected..')
})
require('../config/passport')(passport)

// view engine setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true,
  cookie: {expires: new Date(Date.now() + (60 * 60 * 1000))}
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.use('/register', index)
app.use('/status', index)
app.use('/', index)
app.use('/users', users)

app.use('/signup', index)
app.use('/login', index)
app.use('/profile', index)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
app.listen(process.env.PORT || 8082)
module.exports = app
