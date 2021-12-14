var express = require('express');
var router = express.Router();
var controller = require('./controllers')
const requireLogin = require('../utils/requireAdminLogin')

router.get('/' , requireLogin , controller.getStudents)
// router.post('/add-student' , requireLogin )
// router.put('/download-csv' , requireLogin )
module.exports = router