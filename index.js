let express=require("express")
let cors=require("cors")
const { connection } = require("./db")
const { userRouter } = require("./Routes/user.routes")
const { postRouter } = require("./Routes/post.routes")
const { auth } = require("./Middleware/auth")
require("dotenv").config()
let app=express()


app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postRouter)
app.listen(process.env.port,async()=>{
try{
    await connection
    console.log("connected to DB")

}catch(err){
    console.log("not connected to DB")
    console.log(err)
}
console.log("server is running")
})
