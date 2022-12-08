//tạo ra các API trong các đối tượng Route

//GET POST PUT DELETE
const express = require('express');
const userRoute = express.Router();
const { getUser, createUser, updateUser, signUp, login } = require('../controllers/userController');

const multer = require('multer')
const storage = multer.diskStorage({
    //định nghĩa đường dẫn lưu file
    destination:(req,file,cb)=>{
        cb(null,process.cwd()+"/public/img")
    },
    //Đổi tên file khi upload( trước khi lưu file)
    filename:(req,file,cb)=>{
        let fileName = Date.now()+"_"+file.originalname //tên file gốc chứa định dạng file để hiển thị
        cb(null,fileName)
    } 
})

const upload = multer({storage})

const fs = require("fs");
const { checkToken, verifyToken } = require('../middlewares/baseToken');

//upload base64
userRoute.post("/upload_base",upload.single("dataUpload"),(req,res)=>{
    if(req.file.size>400000){
        fs.unlinkSync(process.cwd()+"/public/img/"+req.file.filename)
        res.send("chỉ được phép upload 4Mb")
        return
    }
    if(req.file.mimetype!=="image/jpeg" && req.file.mimetype!=="image/jpg"){
        fs.unlinkSync(process.cwd()+"/public/img/"+req.file.filename)
        res.send("sai định dạng")
        return
    }
    fs.readFile(process.cwd()+"/public/img/"+req.file.filename,(err,data)=>{
        let dataBase = `data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}`
        //lưu database

        //xử lí xóa file
        setTimeout(() => {
        fs.unlinkSync(process.cwd()+"/public/img/"+req.file.filename)
            
        }, 2000);
        res.send(dataBase)
    })
})

//localhost:8080/api/user/upload=>upload:api
//POST upload
userRoute.post("/upload",upload.single("dataUpload"),(req,res)=>{
    console.log(req.file );
})

//GET user
userRoute.get("/getUser",verifyToken, getUser); 

//POST create user
userRoute.post("/createUser",verifyToken, createUser);

//PUT update user
userRoute.put("/updateUser/:user_id",verifyToken, updateUser);

//Signup
userRoute.post("/signup",signUp);

//Signin
userRoute.get("/login",login);



module.exports = userRoute;
