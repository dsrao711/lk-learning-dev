var router = require('express').Router()
var controller = require('./controllers')

router.get('/getCourses' , controller.getCourses)
router.get('/' , controller.getCoursesPage)

module.exports = router ;