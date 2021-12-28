var express = require('express');
var router = express.Router();
var controller = require('./controllers')
const requireLogin = require('../utils/requireAdminLogin')

router.get('/' , requireLogin , controller.getStudents)
router.get('/get-students' , controller.getAllStudents)
router.post('/edit' , requireLogin , controller.editStudent )
router.post('/edit' , requireLogin , controller.editStudent )
router.get('/delete/:id' , requireLogin , controller.deleteStudent )
// router.put('/download-csv' , requireLogin )

// API 
router.post('/feedback' , controller.feedback)

module.exports = router