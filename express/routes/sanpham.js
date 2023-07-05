var express = require('express');
var router = express.Router();

/* GET home page. */
var spctrl = require('../controller/sanphamctrl');
router.get('/',spctrl.dssanpham);


router.get('/ds',spctrl.dssanpham);


router.get('/dslsp',spctrl.dslsp);


router.get('/addsp',spctrl.addsanpham);
router.post('/addsp',spctrl.addsanpham);

router.get('/addlsp',spctrl.addlsp);
router.post('/addlsp',spctrl.addlsp);

router.get('/edit/:idsp',spctrl.editSp);
router.post('/edit/:idsp',spctrl.editSp);

router.get('/deleteSP/:id',spctrl.deleteSP);
router.post('/deleteSP/:id',spctrl.deleteSP);

router.get('/editTL/:idTL', spctrl.editTL);
router.post('/editTL/:idTL', spctrl.editTL);

router.post('/xoaTL/:idTL', spctrl.xoaTL);

router.get('/fileanh',spctrl.fileanh);
module.exports = router;
