import React from 'react'
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import {bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import { Link } from 'react-router-dom';
import flame from '../media/flame.png';
import dropDown from '../media/down-arrow.png';
import filterNew from '../media/new.png';
import filterTop from '../media/top.png';

export default function MainNav() {
  const [sortButton, setSort] = useState ({
    name:'Hot',
    icon:flame
  }
)
const sort = useSelector((state)=>state.sort);
const dispatch = useDispatch()

const { sortFeed } = bindActionCreators(actionCreators,dispatch)

function showHotMenu(){
    const hotMenu = document.querySelector('.Main-Header-Hot-Button-Menu');
    if (hotMenu.classList.contains('Hidden')===true){
      hotMenu.classList.remove('Hidden')
    } else {
      hotMenu.classList.add('Hidden');
    }
  }
  
  function handleClick(e){
    const hotMenu = document.querySelector('.Main-Header-Hot-Button-Menu');
    let icon;
    let name;
    if (e.target.textContent.length !== 3){
     name = e.target.nextSibling.textContent;
    } else if (e.target.textContent.length === 3){
      name = e.target.parentNode.textContent;
      sortFeed(name);
    }
      if (name == 'Hot'){
        icon = flame
      } else if (name == 'New'){
        icon = filterNew;
      } else if (name == 'Top'){
        icon = filterTop;
      }
      const payload = {
        name:name,
        icon:icon
      }
      setSort(payload)
      changeSelected(name);
      hotMenu.classList.add('Hidden');
    }
    
  
  function changeSelected(name){
    const hotMenuButtons = document.querySelectorAll('.Main-Header-Hot-Menu-Button');
    const hotMenuIcons = document.querySelectorAll('.Hot-Menu-Header-Icon');
    const largeMenuButtons = document.querySelectorAll('.Main-Header-Large-Button');
    const largeMenuIcons = document.querySelectorAll('.Main-Header-Large-Icon');
    for(let i = 0; i < hotMenuButtons.length; i++){
      if (hotMenuButtons[i].textContent !== name){
        hotMenuButtons[i].classList.remove('Hot-Menu-Button-Clicked');
        hotMenuIcons[i].classList.remove('Hot-Menu-Icon-Clicked');
        } else{
        hotMenuButtons[i].classList.add('Hot-Menu-Button-Clicked');
        hotMenuIcons[i].classList.add('Hot-Menu-Icon-Clicked');
        }
      }
    for(let i = 0; i < largeMenuButtons.length;i++){
      if (largeMenuButtons[i].textContent !== name){
        largeMenuButtons[i].classList.remove('Large-Button-Clicked');
        largeMenuIcons[i].classList.remove('Large-Icon-Clicked');
        } else{
        largeMenuButtons[i].classList.add('Large-Button-Clicked');
        largeMenuIcons[i].classList.add('Large-Icon-Clicked');
        }
      }
    }

  return (
    <>
    <Link to = "Post">
       <div className = "Main-Post-Div Hidden">
        <input className = "Main-Post-Input" placeholder = "Create Post"></input>
      </div>
    </Link>
     
      <div className = "Main-Header-Bar-Small">
        <button className = "Main-Header-Hot-Button" onClick = {showHotMenu}>
          <img src = {sortButton.icon} className = "Main-Header-Flame-Icon"></img>
          {sortButton.name}
          <img src = {dropDown} className = "Main-Header-Arrow-Icon"></img>
          </button>
          <div className = "Main-Header-Hot-Button-Menu Hidden">
            
              <div className = "Button-Div">
              <button className = "Main-Header-Hot-Menu-Button Hot-Menu-Button-Clicked" onClick = {handleClick}> 
              <img src = {flame} className = "Hot-Menu-Header-Icon Hot-Menu-Icon-Clicked"></img>
                Hot
              </button>
              </div>

              <div className = "Button-Div">
              <button className = "Main-Header-Hot-Menu-Button" onClick = {handleClick}>
              <img src = {filterNew} className = "Hot-Menu-Header-Icon"></img>
                New
              </button>
              </div>
              
              <div className = "Button-Div">
              <button className = "Main-Header-Hot-Menu-Button" onClick = {handleClick}>
              <img src = {filterTop} className = "Hot-Menu-Header-Icon"></img>
                Top
              </button> 
              </div>
            </div>
        </div>
      
      <div className = "Main-Header-Bar-Large">
          <div className = "Button-Div-Large">
            <button className = "Main-Header-Large-Button Large-Button-Clicked" onClick = {handleClick}>
            <img src = {flame} className = "Main-Header-Large-Icon Large-Icon-Clicked"></img>
              Hot
            </button>
          </div>
          <div className = "Button-Div-Large">
            <button className = "Main-Header-Large-Button" onClick = {handleClick}>
            <img src = {filterNew} className = "Main-Header-Large-Icon"></img>
              New
            </button>
          </div>
          <div className = "Button-Div-Large">
            <button className = "Main-Header-Large-Button" onClick = {handleClick}>
            <img src = {filterTop} className = "Main-Header-Large-Icon"></img>
              Top
            </button>
          </div>
      </div>
    
    </>
  )
}
