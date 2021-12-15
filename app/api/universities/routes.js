var router = require('express').Router()
var controller = require('./controllers')

router.get('/getUniversities' , controller.getUniversities)
router.get('/' , controller.getUniversitiesPage)

module.exports = router ;