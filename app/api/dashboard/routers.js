const controller = require('./controllers')
const router = require('express').Router()

router.get('/' , controller.displayDashboard)

module.exports = router