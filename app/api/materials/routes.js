var express = require('express')
var router = express.Router()
var controller = require('./controllers')
var categoriesController = require('./categoriesControllers')
var pdfController = require('./pdfControlller')

// Admin panel

router.get('/' , controller.getMaterialsPage)
router.get('/plans/:id' , controller.getPlans) 
// plans
router.post('/plans/edit/:id' , controller.EditMaterial)
router.post('/plans/delete/:id' , controller.deleteMaterial)
// categories 
router.post('/category/edit/:id' , categoriesController.editCategory)
router.post('/category/add' , categoriesController.addCategory)
router.post('/category/del/:id' , categoriesController.deleteCategory)
// pdf
router.get('/pdfs/:id' , pdfController.managePdfs)

// videos



// APIS

router.get('/getMaterials' , controller.getMaterials)
router.post('/getMaterialsBySem' , controller.getMaterialsBySem)
router.post('/getCategoryByMaterial' , controller.getCategoryByMaterial)
router.post('/getTopic' , controller.getTopics)
router.post('/getPdfs' , controller.getPdfs)
router.post('/getVideos' , controller.getVideos)

module.exports = router ;