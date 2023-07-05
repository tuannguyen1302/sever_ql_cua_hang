var db = require('./db');

// định nghĩa cấu trúc 
const spSchema = new db.mongoose.Schema(
    {
        nameSp: { type: String, require: true },
        giaTien: { type: Number, require: true },
        noiDung: { type: String, require: true },
        img:{type: String, require:true},
        ghiChu: { type: String, require: true },
        id_theloai: { type: db.mongoose.Schema.Types.ObjectId, ref: 'theloaimodel' }

    },
    { collection: 'san_pham' }// nếu ko có bảng san pham thì tự sinh ra 
);
let spModel = db.mongoose.model('spModel', spSchema);


const theloaiSchema = new db.mongoose.Schema({
    nameTl: { type: String, require: true }
},
    { collection: 'the_loai' }


);
let theloaimodel = db.mongoose.model('theloaimodel', theloaiSchema);






module.exports = { spModel, theloaimodel };
