var express = require('express');
var router = express.Router();
var home = require('../controller/homectrl');

router.get('/',home.homeindex);

module.exports = router;
