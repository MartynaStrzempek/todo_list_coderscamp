var express = require('express');
var router = express.Router();
/** NEW */
var mongodb = require('mongodb');

/*
router.engine('ejs', require('ejs').renderFile);
router.set('view engine', 'ejs');
*/

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
