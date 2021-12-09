var router = require('express').Router()
var controller = require('./controllers')

router.get('/getSemesters' , controller.getSemesters)

module.exports = router ;