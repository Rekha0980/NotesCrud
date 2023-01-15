const express=require("express")
require("dotenv").config()
const {UserModel}=require("../models/users.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRoutes=express.Router()



userRoutes.post("/register", async (req, res) => {
    const { name, email, age, pass } = req.body
    try {
        bcrypt.hash(pass, 5, async (err, secure_pass) => {
            if (err) {
                console.log(err)
            }
            else {
                const user = new UserModel({ name, email, age, pass: secure_pass })
                await user.save()
                res.send("Register")
            }
        });

    }
    catch (err) {
        console.log("error while connected to db")
        console.log(err)
    }

})



userRoutes.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await UserModel.find({ email })
        const hased_pass=user[0].pass
         console.log(user)
        if (user.length > 0) {
            bcrypt.compare(pass,hased_pass, (err, result) => {
                if (result) {
                    const token = jwt.sign({userID:user[0]._id},process.env.key);
                    res.send({ "mess": "login Done", "token": token })
                }
                else {
                    res.send("wrong credential")
                }
            });

        }
        else {
            res.send("wrong credential")
        }
    }
    catch (err) {
        console.log("error in login")
        console.log(err)
    }

})


// userRoutes.get("/data", async (req, res) => {
//     const token = req.query.token
//     jwt.verify(token, 'masai', (err, decoded) => {
//         if (err) {
//             res.send("invalid token")
//         }
//         else {
//             res.send("Data...")
//         }
//     })


// })


module.exports={
    userRoutes
}