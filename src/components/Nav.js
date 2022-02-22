import React from 'react'
import Icon from '../media/readit.png'
import magGlass from '../media/mag-glass.png'
import dropDown from '../media/drop-down.png'
import downArrow from '../media/down-arrow.png'
import moon from '../media/moon.png'

export default function Nav() {

  function showMenu(){
    const navMenu = document.querySelector(".Nav-Drop-Down-Menu");
    if(navMenu.classList.contains("Hidden")===true){
      navMenu.classList.remove("Hidden")
    } else {
      navMenu.classList.add("Hidden")
    }
  }
  return (
    <div className = "Nav-Header">
      <img className = "Nav-Icon"src = {Icon}></img>
      <h1 className = "Nav-Title">readit</h1>
      <form className = "Nav-Search-Form">
        <img src = {magGlass} className = "Nav-Search-Image"></img>
        <input className = "Nav-Search" placeholder = "Search Readit" />
      </form>
      <button className = "Nav-Button Button-One">Log In</button>
      <button className = "Nav-Button Button-Two">Sign Up</button>
      <form className = "Nav-Drop-Down-Form" onClick = {showMenu}>
        <img src = {dropDown} className = "Nav-Icon-Drop-Down"></img>
        <img src = {downArrow} className = "Nav-Icon-Drop-Down"></img>
      </form>
      <div className = "Nav-Drop-Down-Menu">
        <h3 className = "Nav-Drop-Down-Header">View Options</h3>
        <form className = "Nav-Menu-Form">
          <img className = "Nav-Drop-Down-Image" src = {moon}></img>
          <button className = "Nav-Drop-Down-Button">Dark Mode</button>
        </form>
        
      </div>
      
    </div>
  )
}
