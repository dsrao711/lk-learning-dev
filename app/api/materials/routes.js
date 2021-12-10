var express = require('express')
var router = express.Router()
var controller = require('./controllers')

router.get('/getMaterials' , controller.getMaterials)
router.get('/getAcademicMaterials' , controller.getAcademicMaterials)
router.get('/getNonAcademicMaterials' , controller.getNonAcademicMaterials)
router.get('/getMaterialsBySem' , controller.getMaterialsBySemester)
router.get('/getMaterialsByCategoryandSem' , controller.getMaterialsByCategoryandSem)

module.exports = router ;