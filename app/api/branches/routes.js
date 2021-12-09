var router = require('express').Router()
var controller = require('./controllers')

router.get('/getBranches' , controller.getBranches)

module.exports = router ;