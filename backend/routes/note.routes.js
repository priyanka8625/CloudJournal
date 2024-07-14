const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser.middleware.js')
const Note = require('../models/note.model.js')
const { body, validationResult } = require('express-validator');
const { default: mongoose } = require('mongoose');


//Route1: Fetch all notes - /api/notes/fetchnotes : log in required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const notes = await Note.find({ user: userId })
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({ error: error.message() })
    }
})

//Route1: add a new notes - /api/notes/addnote : log in required
router.post('/addnote', fetchUser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'enter a valid description').isLength({ min: 5 })
], async (req, res) => {
    //validate data
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
    
        const {title, description, tag} = req.body
    
        const savedNote = await Note.create({
            user: req.user.id,
            title,
            description,
            tag,
        })
        res.status(200).json(savedNote)
    } catch (error) {
        res.status(500).json({error: error.message()})
    }

})


//Route1: update a new notes - /api/notes/updatenode : log in required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const {title, description, tag} = req.body

        const newNote = {};
        if(title) newNote.title = title;
        if(description) newNote.description = description;
        if(tag) newNote.tag = tag;

        //find if user requesting the update operation through params by passing otheruser's note id is matching with the logged in user or not
        //to build a strong backend api
        const noteId = new mongoose.Types.ObjectId(req.params.id);
        let note = await Note.findById(noteId);
        if(!note){
            return res.status(404).send("Note Not found");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed to update")
        }

        note = await Note.findByIdAndUpdate(noteId, {$set: newNote}, {new:true})

        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({error: error.message()})
    }

})


//Route4: delete a note - /api/notes/deletenote : log in required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {

        //find if user requesting the delete operation through params is passing otheruser's note id or what 
        //to build a strong backend api
        const noteId = new mongoose.Types.ObjectId(req.params.id);
        let note = await Note.findById(noteId);
        if(!note){
            return res.status(404).send("Note Not found");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed to delete")
        }

        note = await Note.findByIdAndDelete(noteId)

        res.status(200).json({"Success": "Note is deleted", note:note})
    } catch (error) {
        res.status(500).json({error: error.message})
    }

})


module.exports = router