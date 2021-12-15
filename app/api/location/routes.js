var router = require('express').Router()
var controller = require('./controllers')

router.get('/states' , controller.getState) ;
router.get('/district' , controller.getDistrict) ;
router.get('/city' , controller.getCity) ;

module.exports = router ; 