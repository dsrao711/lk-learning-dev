var router = require('express').Router()
var controller = require('./controllers')

router.get('/getUniversities' , controller.getUniversities)

module.exports = router ;