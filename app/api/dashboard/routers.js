const controller = require('./controllers')
const router = require('express').Router()
const requireLogin = require('../utils/requireAdminLogin')

router.get('/' , requireLogin , controller.displayDashboard)

module.exports = router