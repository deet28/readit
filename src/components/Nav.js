import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../media/readit.png'
import magGlass from '../media/mag-glass.png'
import dropDown from '../media/drop-down.png'
import downArrow from '../media/down-arrow.png'
import moon from '../media/moon.png'
import logIn from '../media/log-in.png'

export default function Nav() {

  function showMenu(){
    const navMenu = document.querySelector(".Nav-Drop-Down-Menu");
    const mainBar = document.querySelector(".Main-Header-Bar")
    if(navMenu.classList.contains("Hidden")===true){
      navMenu.classList.remove("Hidden");
      mainBar.classList.add("Background")
    } else {
      navMenu.classList.add("Hidden")
      mainBar.classList.remove("Background");
    }
  }
  return (
    <div className = "Nav-Header">
      <Link to = "/"> 
        <img className = "Nav-Icon"src = {Icon}></img>
      </Link>
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
      <div className = "Nav-Drop-Down-Menu Hidden">
        <h3 className = "Nav-Drop-Down-Header">View Options</h3>
        
        <form className = "Nav-Menu-Form">
          <img className = "Nav-Drop-Down-Moon" src = {moon}></img>
          <button className = "Nav-Drop-Down-Button">Dark Mode</button>
          <label className = "Dark-Mode-Switch">
            <input type = "checkbox" className = "Slider-Input"></input>
              <span className = "Dark-Mode-Slider"></span>
            </label>
          </form>
          
        <form className = "Nav-Menu-Form">
          <img className = "Nav-Drop-Down-Login" src = {logIn}></img>
          <button className = "Nav-Drop-Down-Button Log-In-Button">Log In / Sign Up</button>
        </form>
        
        <form className = "Nav-Menu-Form-Empty"></form>
        
        <form className = "Nav-Menu-Form">
          <img className = "Nav-Drop-Down-Login" src = {logIn}></img>
          <button className = "Nav-Drop-Down-Button Log-In-Button">Log In / Sign Up</button>
        </form>
        </div>
      </div>
    ) 
  }
