var router = require('express').Router()
var controller = require('./controllers')

router.get('/' , controller.getSubjectsPage)
router.post('/getbySem' , controller.getSubjects)

module.exports = router ;