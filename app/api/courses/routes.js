var router = require('express').Router()
var controller = require('./controllers')

router.get('/getCourses' , controller.getCourses)

module.exports = router ;