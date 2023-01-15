const jwt=require("jsonwebtoken")
require("dotenv").config()

const authentication=(req,res,next)=>{
    const token=req.headers.autherization
    if(token){
        const decoded=jwt.verify(token,process.env.key)
        if(decoded){
            console.log(decoded)
            const userID=decoded.userID
            req.body.userID=userID
            next()
        }
        else{
            res.send("login first")
        }
    }
    else{
        res.send("login first")
    }
}

module.exports={
    authentication
}