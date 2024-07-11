import React from 'react'
import { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext.js'

const About = () => {
  //using states from react Context API 
  const a = useContext(NoteContext)
  useEffect(() => {
    a.update()
    // eslint-disable-next-line
  }, [])//pass empty [] to run useEffect only 1 time after component is mount
  
  return (
    <div>
      About {a.state.name} and his class is {a.state.class}
    </div>
  )
}

export default About
