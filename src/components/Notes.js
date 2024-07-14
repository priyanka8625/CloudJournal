import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'

const Notes = () => {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context
    const [note, setNote] = useState({id: "", etitle:"", edescription:"", etag:"default"})

    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])

    const refLaunch = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currentNote) => {
        refLaunch.current.click();
        setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
    }

    const handleClick = (e)=>{
        // console.log("Updating note.. ", note);
        refClose.current.click();
        editNote(note.id, note.etitle, note.edescription, note.etag);
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }

    return (
        <>
            <AddNote />

            {/* //edit note modal  */}
            <button type="button" ref={refLaunch} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                launch edit note
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose} >Close</button>
                            <button disabled={note.etitle.length<3 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Save note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
            <h2>Your notes</h2>
                <div className="conainer mx-2">
                    {notes.length===0 && "No notes to display"}
                </div>
                {
                    notes.map((note) => {
                        return <NoteItem note={note} key={note._id} updateNote={updateNote} />;
                    })
                }
            </div>
        </>
    )
}

export default Notes
