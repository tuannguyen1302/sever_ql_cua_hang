var mymd = require('../model/sanpham.model');



// exports.sanpham = (r, s, n) => {
//     s.render('sanpham/sanpham');

// }
exports.dssanpham = async (r, s, n) => {

    let list = await mymd.spModel.find().populate('id_theloai');
    console.log(list);
    s.render('sanpham/dssanpham',{ listSp: list } );

}

exports.dslsp = async (r, s, n) => {

    let list = await mymd.theloaimodel.find();
    console.log(list);
    s.render('sanpham/dslsp',{ listSp: list } );

}
exports.addsanpham = async (r, s, n) => {

    let msg = '';


    let list = await mymd.spModel.find();


    let listTl = await mymd.theloaimodel.find();
    if (r.method=='POST') {
        // kiểm tra hợp lệ dữ liệu nếu có 

        // tạo model để gán dữ liệu 
        let objSP = new mymd.spModel();
        objSP.nameSp = r.body.nameSp;
        objSP.giaTien = r.body.giaTien;
        objSP.noiDung  = r.body.noiDung;
        objSP.img = r.body.img;
        objSP.ghiChu  = r.body.ghiChu;
        objSP.id_theloai = r.body.theloai;
        // objSP.id_theloai = r.body.theloai;
        // ghi vào csdl 
        // dùng khối try cash 
        try {
            let newSp = await objSP.save();
            console.log(newSp);
            msg = 'thêm mới thành công '
        } catch (error) {
            msg ='lỗi ' + error.message();
            console.log(error);
        }
    }



    s.render('sanpham/addsp',{msg:msg , list : listTl });

}


exports.addlsp = async (r, s, n) => {

    let msg = '';


    let list = await mymd.spModel.find();


    let listTl = await mymd.theloaimodel.find();
    if (r.method=='POST') {
        // kiểm tra hợp lệ dữ liệu nếu có 

        // tạo model để gán dữ liệu 
        let objTL = new mymd.theloaimodel();
        objTL.nameTl = r.body.nameTl;
       
        objTL.id_theloai = r.body.theloai;


       
        // ghi vào csdl 
        // dùng khối try cash 
        try {
            let newTL = await objTL.save();
            console.log(newTL);
            msg = 'thêm mới thành công '
        } catch (error) {
            msg ='lỗi ' + error.message();
            console.log(error);
        }
    }



    s.render('sanpham/addlsp',{msg:msg , list : listTl });


    
 

}




exports.fileanh = (r, s, n) => {
    s.render('sanpham/khoanh');

}


exports.editSp = async (req,res,next)=>{
    let msg = '';
    let idsp = req.params.idsp;
    // lấy thông tin sản phẩm để sửa, tự thêm khối truy catch để bắt lỗi. 
    let objSP = await mymd.spModel.findById(idsp);
    let listTl = await mymd.theloaimodel.find();

    if(req.method =='POST'){
        // kiểm tra hợp lệ dữ liệu nếu có....

        // tạo model để gán dữ liệu
        let objSP = new mymd.spModel();
        objSP.nameSp = req.body.nameSp;
        objSP.giaTien = req.body.giaTien;
        objSP.noiDung  = req.body.noiDung;
        objSP.ghiChu  = req.body.ghiChu;
        objSP.id_theloai = req.body.theloai;

        objSP._id = idsp;// thêm cho chức năng sửa
        // ghi vào CSDL
        try {
            // let new_sp = await objSP.save();
            // console.log(new_sp);
            // msg = 'Thêm mới thành công';

            await mymd.spModel.findByIdAndUpdate(idsp, objSP);
            msg = 'Đã cập nhật thành công';

        } catch (error) {
            msg = 'Lỗi '+ error.message;
            console.log(error);
        }

    }

    res.render('sanpham/editSp',{msg: msg, objSP: objSP, listTl:listTl});
}


exports.deleteSP = async(req,res,next)=>{
    let idsp = req.params.id;
    console.log(req.params.id);

    let objSP = await mymd.spModel.findById(idsp);
    try {
        await mymd.spModel.findByIdAndDelete(idsp,objSP);
        msg='Đã cập nhập';
        res.redirect('back');
    } catch (err) {
        msg='Lỗi không thêm được';
        console.log(err);
        
    }
    
}

exports.editTL = async (req, res,nest)=>{
    let msg = '';
    let idTL = req.params.idTL;
    
    let listTL = await mymd.theloaimodel.find(idTL);
    if(req.method == "POST"){
        let objSP = new mymd.theloaimodel();
        objSP.nameTl = req.body.nameTl;
        try {
          

            await mymd.theloaimodel.findByIdAndUpdate(idTL, objSP);
            msg = 'Đã cập nhật';
        } catch (error) {
            msg = 'Lỗi' + error.message();            
        }
    }

    res.render('sanpham/editTL',{msg: msg, objSP: objSP, listTL: listTL});
}
exports.xoaTL = async(req, res, next) =>{

    const spid = req.params.idTL;
    let objSP = await mymd.theloaimodel.findById(spid);
    let list = await mymd.spModel.find({id_theloai: spid}).populate('id_theloai');

    if(list.length == 0){
        await mymd.theloaimodel.findByIdAndDelete(spid, objSP);
        msg = 'Đã cập nhật';
        res.redirect('back');
    }else{
        res.redirect('back');
    }
    
}
