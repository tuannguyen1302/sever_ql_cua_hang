var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/userctrl');
var check_login = require('../mdware/check_login');

/* GET users listing. */
router.get('/', function(req, res, next) {

  console.log('--->goi vao ---->');
  next(); //thuc hien cong viec tiep theo

  res.send('respond with a resource');
});

router.get('/',check_login.yeu_cau_dang_nhap, function(req, res, next) {
  let uLogin = req.session.userLogin;
  
  
    res.send(uLogin);
  
  });


router.get('/login', userCtrl.Login );
router.post('/login', userCtrl.Login );


router.get('/reg', userCtrl.Reg );
router.post('/reg', userCtrl.Reg );


router.get('/logout', userCtrl.Logout );


module.exports = router;
