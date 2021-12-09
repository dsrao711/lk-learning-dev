var router = require('express').Router()
var controller = require('./controllers')

router.get('/getCategories' , controller.getCategories)

module.exports = router ;