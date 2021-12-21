var express = require('express')
var router = express.Router()
var controller = require('./controllers')

// Admin panel
router.get('/' , controller.getMaterialsPage)
router.get('/plans/:id' , controller.getPlans)
router.post('/plans/edit/:id' , controller.EditMaterial)
router.post('/plans/delete/:id' , controller.deleteMaterial)

// APIS
router.get('/getMaterials' , controller.getMaterials)
router.post('/getMaterialsBySem' , controller.getMaterialsBySem)
router.post('/getCategoryByMaterial' , controller.getCategoryByMaterial)
router.post('/getTopic' , controller.getTopics)
router.post('/getPdfs' , controller.getPdfs)
router.post('/getVideos' , controller.getVideos)

module.exports = router ;