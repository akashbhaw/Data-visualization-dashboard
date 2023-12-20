import React from 'react'
import { useNew } from '../ContextProvider/Context'

export default function Blur() {
    const {show,HandleDisplay}=useNew()
  return (
    <div style={{backgroundColor:'transparent',width:'100%',height:'100%',position:'fixed',zIndex:'11',display:show?'':'none',backdropFilter:'blur(3px)'}} onClick={HandleDisplay}></div>
  )
}
