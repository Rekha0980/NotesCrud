const express=require("express")
const {NoteModel}=require("../models/notes.model")

const noteRoutes=express.Router()

noteRoutes.get("/",async(req,res)=>{
    let note=await NoteModel.find()
    res.send(note)
})


noteRoutes.post("/create", async (req, res) => {
    const payload = req.body
    try {
        const note = new NoteModel(payload)
     await note.save()
     res.send("note created")

    }
    catch (err) {
        console.log({"err":"error creating note"})
        console.log(err)
    }

})




noteRoutes.patch("/update/:id", async (req, res) => {
    const payload = req.body
    const id=req.params.id
    const note=await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userId_makeing_req=req.body.userID
    
    try {
        if(userId_makeing_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})

        }
        else{
            await NoteModel.findByIdAndUpdate({"_id":id},payload)
            res.send("note updated")
        }
    }
    catch (err) {
        console.log({"err":"error creating note"})
        console.log(err)
    }

})



noteRoutes.delete("/delete/:id", async (req, res) => {
    const id=req.params.id
    const note=await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userId_makeing_req=req.body.userID
    
    try {
        if(userId_makeing_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})

        }
        else{
            await NoteModel.findByIdAndDelete({"_id":id})
            res.send("note DELETED")
        }
    }
    catch (err) {
        console.log({"err":"error creating note"})
        console.log(err)
    }

})

module.exports={
    noteRoutes
}


// "title":"pinky story",
// "note":"pinky note1",
// "category":"live"


// "name":"god",
// "email":"god@gmail.com",
// "age":2000,
// "pass":"god"