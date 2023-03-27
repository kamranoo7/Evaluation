let express=require("express")
let userRouter=express.Router()
let {UserModel}=require("../Model/user.model")
let jwt=require("jsonwebtoken")
let bcrypt=require("bcrypt")
userRouter.post("/register",async(req,res)=>{
    let {name,email,gender,password,age,city,is_Married}=req.body
try{
bcrypt.hash(password,5,async(err,hash)=>{
    let user=new UserModel({email,password:hash,age,name,gender,city,is_Married})
    await user.save()
    res.status(200).send({"msg":"new user added successfully"})
})
}catch(err){
    res.status(400).send({"msg":err.message})
}
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password, (err, result) => {
                if(result){
                    res.status(200).send({"msg":"Login successfull!","token":jwt.sign({"userID":user._id},"masai")})
                } else {
                    res.status(400).send({"msg":"Wrong Credentials"})
                }
            });
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})
module.exports={
    userRouter
}