var mymd = require('../model/sanpham.model');
exports.homeindex= async (r,s,n)=>
{

    let list = await mymd.spModel.find().populate('id_theloai');
    console.log(list);
    s.render('user/home',{ listSp: list });
    
}