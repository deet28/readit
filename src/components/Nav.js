import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../media/readit.png'
import magGlass from '../media/mag-glass.png'
import dropDown from '../media/drop-down.png'
import downArrow from '../media/down-arrow.png'
import moon from '../media/moon.png'
import logIn from '../media/log-in.png'

export default function Nav() {

  function logIntoAccount(){
    const logInModal = document.querySelector('.Log-In-Modal');
    const navHeader = document.querySelector('.Nav-Header');
    const smallHeader = document.querySelector(".Main-Header-Bar-Small");
    const largeHeader = document.querySelector(".Main-Header-Bar-Large");
    const mainBody = document.querySelector('.Main-Body-Div');
    logInModal.classList.remove('Hidden');
    navHeader.classList.add('Opaque');
    smallHeader.classList.add('Opaque');
    largeHeader.classList.add('Opaque');
    mainBody.classList.add('Opaque')
    document.body.style.overflow = 'hidden';
  }

    function closeLogIn(){
    const logInModal = document.querySelector('.Log-In-Modal');
    const navHeader = document.querySelector('.Nav-Header');
    const smallHeader = document.querySelector(".Main-Header-Bar-Small");
    const largeHeader = document.querySelector(".Main-Header-Bar-Large");
    const mainBody = document.querySelector('.Main-Body-Div');
    logInModal.classList.add('Hidden');
    navHeader.classList.remove('Opaque');
    smallHeader.classList.remove('Opaque');
    largeHeader.classList.remove('Opaque');
    mainBody.classList.remove('Opaque')
    document.body.style.overflow = 'auto';
  }

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
    
      <>
      <div className = "Log-In-Modal Hidden">
        <div className = "Log-In-Sidebar"></div>
        <div className = "Log-In-Main">
          <button className = "Log-In-Close-Modal" onClick = {closeLogIn}>X</button>
          <h3 className = "Log-In-Title">Login</h3>
          <div className = "Log-In-Inputs">
            <input className = "Log-In-Email" placeholder = "Email"></input>
            <input className = "Log-In-Password" placeholder = "Password"></input>
          </div>
          <button className = "Log-In-Login">Log In</button>
        </div>
        </div>
      <div className = "Nav-Header">
      
      <Link to = "/"> 
        <img className = "Nav-Icon"src = {Icon}></img>
      </Link>
      <Link to = "/" className = "Title-Link"><h1 className = "Nav-Title">readit</h1></Link>
      <form className = "Nav-Search-Form">
        <img src = {magGlass} className = "Nav-Search-Image"></img>
        <input className = "Nav-Search" placeholder = "Search Readit" />
      </form>
        <button className  = "Nav-Button Button-One" onClick = {logIntoAccount}>Log In</button>
        <Link to = "Post" className = "Nav-Button Button-Two">
        <button className = "Nav-Button Button-Two">Sign Up</button>
        </Link>
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

      </>
    ) 
  }
