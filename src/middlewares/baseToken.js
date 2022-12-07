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
    }
   }catch(err){
    console.log(err.message)
    return {checkData:false,message:err.message}
   }
}

module.exports = {
    parseToken,
    checkToken
}