const jwt = require ('jsonwebtoken')

 

//hàm tạo token
const parseToken = (data) =>{
let token = jwt.sign({data},'bimat',{algorithm:"HS256",expiresIn:"5y"})
return token
}

//hàm check token

const checkToken = (token) =>{
   try{
    let checkT =  jwt.verify(token,'bimat')

    if(checkT){
        return {checkData:true,message:""}
    }else{
        return {checkData:false,message:"Token không hợp lệ"}

    }
   }catch(err){
    console.log(err.message)
    return {checkData:false,message:err.message}
   }
}

const verifyToken = (req,res,next)=>{
    const {token} =req.headers
    const verifyToken = checkToken(token)
    if(verifyToken.checkData){
        next()
    }else{
        res.status(401).send(verifyToken.message)
    }
}

module.exports = {
    parseToken,
    checkToken,
    verifyToken
}