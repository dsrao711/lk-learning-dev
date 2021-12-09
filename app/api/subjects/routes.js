var router = require('express').Router()
var controller = require('./controllers')

router.get('/' , controller.getSubjects)

module.exports = router ;