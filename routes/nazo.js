var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/nazo', function(req, res, next) {
  res.render('./nazo.ejs');
});

module.exports = router;
