const requireLogin = require('../utils/requireAdminLogin');
const controller = require('./controllers');
const router = require('express').Router();

router.get('/getAuthors', requireLogin, controller.getAuthors)
router.get('/' , controller.authorsPage)
router.post('/edit' , controller.editAuthors)

module.exports = router;