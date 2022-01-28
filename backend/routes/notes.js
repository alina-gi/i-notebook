const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');

// ROUTE 1
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

// ROUTE 2
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be 5 characters.').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

// ROUTE 3
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    // find the note to be updated and update it
    let note= await Notes.findById(req.params.id);
    if(!note){return res.status(404).send('Not Found')}

    if(note.user.toString()!== req.user.id){
       return res.status(401).send('Not Allowed')
    }
    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.json({note})
})

// ROUTE 4
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    // find the note to be deleted and delete it
    let note= await Notes.findById(req.params.id);
    if(!note){return res.status(404).send('Not Found')}

 // Allow deletion only if user owns this note
    if(note.user.toString()!== req.user.id){
       return res.status(401).send('Not Allowed')
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success": "Note has been deleted", note : note})
})

module.exports = router;