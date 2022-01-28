import noteContext from '../context/notes/noteContext';
import React, { useState, useContext } from 'react'

export default function Addnote() {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "default" })

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title , note.description, note.tag);
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">TITLE</label>
                        <input onChange={onChange} type="text" className="form-control"
                            id="title" name="title" aria-describedby="emailHelp"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">DESCRIPTION</label>
                        <input onChange={onChange} type="text" className="form-control" id="description"
                            name='description'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">TAG</label>
                        <input onChange={onChange} type="text" className="form-control" id="tag"
                            name='tag'/>
                    </div>
                    <button type="submit" className=" my-3 btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}
