var express = require('express')
var router = express.Router()
var controller = require('./controllers')

router.get('/getMaterials' , controller.getMaterials)
router.post('/getMaterialsBySem' , controller.getMaterialsBySem)
router.post('/getCategoryByMaterial' , controller.getCategoryByMaterial)
router.get('/getTopic' , controller.getTopics)

module.exports = router ;