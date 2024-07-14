import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
    const notesInitial = [
        {
            "_id": "668eae81d66be093850cb484",
            "user": "668c4710e9a12baf87e80c36",
            "title": "Dinner updated",
            "description": "Have dinner by 9pm updated",
            "tag": "Personal updated",
            "createdAt": "2024-07-10T15:53:37.746Z",
            "updatedAt": "2024-07-10T19:18:02.348Z",
            "__v": 0
        },
        {
            "_id": "6693727b9efac26ab141aca6",
            "user": "668c4710e9a12baf87e80c36",
            "title": "Learn react",
            "description": "complete learning react in depth",
            "tag": "Educational",
            "createdAt": "2024-07-14T06:38:51.148Z",
            "updatedAt": "2024-07-14T06:38:51.148Z",
            "__v": 0
        },
        {
            "_id": "669372b89efac26ab141aca9",
            "user": "668c4710e9a12baf87e80c36",
            "title": "Complete backend assignment",
            "description": "Complete backend assignment ASAP",
            "tag": "Educational",
            "createdAt": "2024-07-14T06:39:52.760Z",
            "updatedAt": "2024-07-14T06:39:52.760Z",
            "__v": 0
        },
        {
            "_id": "669372b89efac26ab141aca0",
            "user": "668c4710e9a12baf87e80c36",
            "title": "Complete backend assignment",
            "description": "Complete backend assignment ASAP",
            "tag": "Educational",
            "createdAt": "2024-07-14T06:39:52.760Z",
            "updatedAt": "2024-07-14T06:39:52.760Z",
            "__v": 0
        },
        {
            "_id": "669372b89efac26ab141aca1",
            "user": "668c4710e9a12baf87e80c36",
            "title": "Complete backend assignment",
            "description": "Complete backend assignment ASAP",
            "tag": "Educational",
            "createdAt": "2024-07-14T06:39:52.760Z",
            "updatedAt": "2024-07-14T06:39:52.760Z",
            "__v": 0
        },
        {
            "_id": "669372b89efac26ab141aca2",
            "user": "668c4710e9a12baf87e80c36",
            "title": "Complete backend assignment",
            "description": "Complete backend assignment ASAP",
            "tag": "Educational",
            "createdAt": "2024-07-14T06:39:52.760Z",
            "updatedAt": "2024-07-14T06:39:52.760Z",
            "__v": 0
        },
        {
            "_id": "669372b89efac26ab141aca3",
            "user": "668c4710e9a12baf87e80c36",
            "title": "Complete backend assignment",
            "description": "Complete backend assignment ASAP",
            "tag": "Educational",
            "createdAt": "2024-07-14T06:39:52.760Z",
            "updatedAt": "2024-07-14T06:39:52.760Z",
            "__v": 0
        },
    ]

    const [notes, setNotes] = useState(notesInitial)

    //add a note
    const addNote = (title, description, tag)=>{
        //TODO: API CALL 
        console.log("Adding a new note");
        const note = {
            "_id": "669372b89efac26ab141a3",
            "user": "668c4710e9a12baf87e80c36",
            "title": title,
            "description": description,
            "tag": tag,
            "createdAt": "2024-07-14T06:39:52.760Z",
            "updatedAt": "2024-07-14T06:39:52.760Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }
    //delete a note
    const deleteNote = ( id)=>{
        //TODO: API CALL
        console.log("Deleting a note with id "+id);
        setNotes(notes.filter( (note)=>{
            return note._id !== id
        }))
    }
    //edit a note
    const editNote = (id, title, description, tag)=>{

    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState