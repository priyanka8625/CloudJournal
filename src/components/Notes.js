import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'

const Notes = () => {
    const context = useContext(noteContext)
    const { notes, getNotes } = context

    useEffect(() => {
      getNotes()
      // eslint-disable-next-line
    }, [])
    
    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h2>Your note</h2>
                {
                    notes.map((note) => {
                        return <NoteItem note={note} key={note._id} />;
                    })
                }
            </div>
        </>
    )
}

export default Notes
