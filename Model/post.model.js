let mongoose=require("mongoose")
let userSchema=mongoose.Schema({
    title :String,
    body :String,
    device :String,
    no_of_comments :Number
})

let PostModel=mongoose.model("post",userSchema)
module.exports={
    PostModel
}