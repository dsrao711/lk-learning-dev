var router = require('express').Router()
var controller = require('./controllers')

router.get('/getBranches' , controller.getBranches)
router.get('/' , controller.getBranchesPage)

module.exports = router ;