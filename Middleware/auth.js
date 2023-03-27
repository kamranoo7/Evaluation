let jwt=require('jsonwebtoken')
let auth=(req,res,next)=>{
    let token=req.headers.authorization.split(" ")[1]
    if(token){
        let decoded=jwt.verify(token,"masai")
        if(decoded){
            req.body.userID=decoded.userID
            next()
        }else{
            res.status(400).send("Please login first")
        }
    }else{
        res.status(400).send("Please login first")
    }
   
}
module.exports={
    auth
}