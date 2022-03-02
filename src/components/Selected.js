import React from 'react'
import { Link } from 'react-router-dom';

export default function Selected() {

  function pickPost(){
    window.scrollTo('0px');
  }

  return (
    <div className = "Selected-Post-Card">
      <Link to = "/" className = "Select-Post" onClick = {pickPost}>
      <button className = "Log-In-Close-Modal">X</button>
      </Link>
    </div>
  )
}
