import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
    const stateValues = {
        "name": "Priyanka",
        "class": "S1"
    }
    //creating state and updating them utility
    const [state, setState] = useState(stateValues)

    const update = ()=>{
        setTimeout(() => {
            setState({
                "name": state.name+"-Shreyash",
                "class": state.class+"-S2"
            })
        }, 1000);
    }
    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState