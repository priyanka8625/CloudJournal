import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
    const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //get all notes
    const getNotes = async ()=>{
        //API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')},
        });
        const json = await response.json();
        setNotes(json);
    }

    //add a note
    const addNote = async (title, description, tag)=>{
        //API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            body: JSON.stringify({ title, description, tag }),
            headers: { 
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')},
        });
        const note = await response.json();
        console.log(note);
        // client side logic
        setNotes(notes.concat(note))
    }

    //delete a note
    const deleteNote = async (id)=>{
        //API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')},
        });
        const json = await response.json();
        console.log(json);
        // client side logic
        // console.log("Deleting a note with id "+id);
        setNotes(notes.filter( (note)=>{
            return note._id !== id
        }))
    }

    //edit a note
    const editNote = async (id, title, description, tag)=>{
        //API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            body: JSON.stringify({ title, description, tag }),
            headers: { 
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')},
        });
        const note = await response.json();
        console.log(note);
        //client side logic
        let newNotes = await JSON.parse(JSON.stringify(notes));
        for(let index=0; index<newNotes.length; index++){
            if(newNotes[index]._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState