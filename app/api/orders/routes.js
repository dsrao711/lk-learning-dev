var router = require('express').Router()
var controller = require('./controllers')

router.get('/' , controller.getOrders)

module.exports = router ;