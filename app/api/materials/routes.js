var express = require('express')
var router = express.Router()
var controller = require('./controllers')

router.get('/getMaterials' , controller.getMaterials)
router.get('/getAcademicMaterials' , controller.getAcademicMaterials)
router.get('/getNonAcademicMaterials' , controller.getNonAcademicMaterials)

module.exports = router ;