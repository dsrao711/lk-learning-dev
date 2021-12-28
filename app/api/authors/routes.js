const requireLogin = require('../utils/requireAdminLogin');
const controller = require('./controllers');
const router = require('express').Router();
//API
router.get('/getAuthors', requireLogin, controller.getAuthors)
// Admin panel
router.get('/' , controller.authorsPage)
router.post('/edit' , controller.editAuthors)
router.get('/delete/:id' , controller.deleteAuthor)

module.exports = router;