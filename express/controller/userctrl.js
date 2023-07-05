var md = require('../model/user.model');

exports.Reg =  async (r,s,n)=>{

    let msg = '';
    if (r.method=='POST'){
        console.log(r.body);
        if (r.body.passwd != r.body.passwd2 ) {
            msg='ko dung mk ';
            return s.render('user/reg',{msg : msg });
        }

        try {
            let objU = new md.userModel();
            objU.username = r.body.username;
            objU.phone = r.body.phone;
            objU.passwd = r.body.passwd;
            objU.email = r.body.email;
            await objU.save();
            msg='dang ki thanh cong ';

        } catch (error) {
            msg='loi';
        }
    }



    s.render('user/reg',{msg : msg });




}
exports.Login = async (r,s,n)=>{
    let msg = '';

    if(r.method == 'POST'){
        // lấy thông tin user đăng nhập
       
        try {
            let objU = await md.userModel.findOne({email: r.body.email});
            console.log(objU);
            if(objU != null){
                // có tồn tại user
                if(objU.passwd == r.body.passwd){
                    // đúng password ==> lưu vào session và chuyển trang
                    r.session.userLogin = objU;
                    console.log(objU);
                    return s.redirect ('/home');
 
 
                }else{
                    console.log('Sai password')
                }
 
 
            }else{
                // không tồn tại user
                console.log('khong ton tai email ')
            }
 
 
 
 
        } catch (error) {
            msg = error.message;
        }
 
 
    }
 


    s.render('user/login',{msg : msg })
}
exports.Logout = (r,s,n)=>{
    
}