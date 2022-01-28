import noteContext from '../context/notes/noteContext';
import React, { useContext, useEffect, useRef } from 'react'
import Noteitem from './Noteitem';
import Addnote from './Addnote';

export default function Notes() {
    const context = useContext(noteContext);
    const { notes, getNote } = context;
    useEffect(() => {
        getNote();
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const updateNote = (note) => {
        ref.current.click();
        console.log('chal ja')
        alert('Done')
    }
    return (
        <>
            <Addnote />

            <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}
