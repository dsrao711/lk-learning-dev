var router = require('express').Router()
var controller = require('./controllers')

router.get('/getColleges' , controller.getColleges)

module.exports = router ;