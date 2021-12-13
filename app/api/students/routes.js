var express = require('express');
var router = express.Router();
var controller = require('./controllers')
const requireLogin = require('../utils/requireAdminLogin')

router.get('/' , requireLogin , controller.getStudents)

module.exports = router