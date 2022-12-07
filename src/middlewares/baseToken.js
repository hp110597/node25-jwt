const jwt =require ('jsonwebtoken')

let token = jwt.sign({data:'hello'},'bimat',{algorithm:"HS256",expiresIn:"10y"})

jwt.verify

console.log(token);