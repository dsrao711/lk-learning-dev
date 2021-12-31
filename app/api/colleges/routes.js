var router = require('express').Router()
var controller = require('./controllers')

// admin panel
router.get('/' , controller.getCollegesPage)
router.post('/add' , controller.addCollege)
router.post('/edit' , controller.editCollege)
router.post('/delete' , controller.deleteCollege)
// APIS
router.get('/getColleges' , controller.getColleges)


module.exports = router ;