let express=require("express")
let postRouter=express.Router()
let jwt=require("jsonwebtoken")
const { PostModel } = require("../Model/post.model")


postRouter.get("/",async(req,res)=>{
    let token=req.headers.authorization.split(" ")[1]
    let decoded=jwt.verify(token,"masai")
    try{
        if(decoded){
            let posts=await PostModel.find({"userID":decoded.userID})
            res.status(200).send(posts)
        }

    }catch(err){
res.status(400).send({"msg":err.message})
    }
})
postRouter.post("/add",async(req,res)=>{

    try{
        let post=new PostModel(req.body)
await post.save()
res.status(200).send({"msg":"new post has been added"})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})
postRouter.patch("/update/:postID",async(req,res)=>{
    let {postID}=req.body
    let payload=req.body
    try{
await PostModel.findByIdAndRemove({_id:postID},payload)
res.status(200).send({"msg":"new post has been updated"})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})
postRouter.delete("/delete/:postID",async(req,res)=>{
    let token=req.headers.authorization.split(" ")[1]
    let decoded=jwt.verify(token,"masai")
    let postID=req.params.postID
    let reqid=decoded.userID
    let post=PostModel.findOne({_id:postID})
    let postid_in=post.userID
    try{
if(reqid===postid_in){
    await PostModel.findByIdAndDelete({_id:postID})
    res.status(200).send({"msg":"post has been deleted"})
}else{
    res.status(400).send("not authorised")
}
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})


module.exports={
    postRouter
}