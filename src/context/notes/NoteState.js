import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const notesInitial = [

    ]
    const [notes, setNotes] = useState(notesInitial);
    // GET AL NOTE
    const getNote = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjYjc5M2M0YWRlZDYyMTIwNGEyODJjIn0sImlhdCI6MTY0MDc4OTU0MH0.m8zi_ZG5E5kO_tNH7DWTh02CoQBuyUR47NFfiIU434Y"
            }
        })
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }
    // ADD NOTE
    const addNote = async (title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjYjc5M2M0YWRlZDYyMTIwNGEyODJjIn0sImlhdCI6MTY0MDc4OTU0MH0.m8zi_ZG5E5kO_tNH7DWTh02CoQBuyUR47NFfiIU434Y"
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = response.json();
        console.log(json)
        // CLIENT
        console.log('adding note')
        let note = {
            "_id": "61cf2c434de2438d2aacbdf4w2d2",
            "user": "61cb793c4aded621204a282c",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-12-31T16:13:55.887Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }
    // DELETE NOTE
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjYjc5M2M0YWRlZDYyMTIwNGEyODJjIn0sImlhdCI6MTY0MDc4OTU0MH0.m8zi_ZG5E5kO_tNH7DWTh02CoQBuyUR47NFfiIU434Y'
            }
        })
        const json = response.json();
        console.log(json)
        // CLIENT 
        console.log('deleted' + id)
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }
    // EDIT NOTE
    const editNote = async (id, description, title, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjYjc5M2M0YWRlZDYyMTIwNGEyODJjIn0sImlhdCI6MTY0MDc4OTU0MH0.m8zi_ZG5E5kO_tNH7DWTh02CoQBuyUR47NFfiIU434Y'
            },
            body: JSON.stringify(title, description, tag)
        })
        const json = response.json();
        //    LOGIC TO EDIT IN CLIENT
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag
            }
        }
    }
   
    return (
        <NoteContext.Provider value={{ notes, getNote, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;