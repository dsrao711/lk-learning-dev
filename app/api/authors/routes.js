const controller = require('./controllers');
const router = require('express').Router();

router.get('/getAuthors', controller.getAuthors)
router.get('/' , controller.authorsPage)

module.exports = router;