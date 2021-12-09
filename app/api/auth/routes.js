const controller = require('./controller');
const router = require('express').Router();

router.post('/register', controller.registerStudent)
router.get('/test', controller.test)
router.post('/login' , controller.login)
router.post('/test-accesstoken')

module.exports = router;