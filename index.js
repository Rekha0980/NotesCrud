const express = require("express")
require("dotenv").config()
const { connection } = require("./configs/db")
const {userRoutes}=require("./routes/user.routes")
const {noteRoutes}=require("./routes/ntes.routes")
const {authentication}=require("./middleware/Authentiication")
const cors=require("cors")

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("homepage")

})

app.use("/user",userRoutes)
app.use(authentication)
app.use("/note",noteRoutes)
// for insert one use this method line 21 and 22



app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected to DB")
    }
    catch (err) {
        console.log("error while connected to db")
        console.log(err)
    }
})