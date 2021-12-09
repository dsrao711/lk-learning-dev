var express = require('express');
var router = express.Router();
var controller = require('./controllers')
// var mysqlConnection = require('../connection')

// /* GET semesters listing. */
// router.get('/', function(req, res, next) {

//     mysqlConnection.query("SELECT * from student", (err, rows, fields) => {
//         if (!err) {
//             res.send(rows);
//         } else {
//             res.send(err)
//         }
//     })

// });

// module.exports = router;


router.get('/' , controller.getStudents)

module.exports = router