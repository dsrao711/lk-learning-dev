var express = require('express')
var router = express.Router()
var controller = require('./controllers')

router.get('/' , controller.loginPage)
router.post('/' , controller.loginAdmin)


module.exports = router ;