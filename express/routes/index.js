var express = require('express');
var router = express.Router();
var usersCP = require('../controller/userctrl');

/* GET home page. */
router.get('/',usersCP.Login, function(req, res, next) {
  res.render('home', { title: 'Express', hoTen:'ABC' });
});




module.exports = router;
