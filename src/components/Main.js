import React from 'react';
import { useState } from 'react';
import flame from '../media/flame.png'
import dropDown from '../media/down-arrow.png';
import filterNew from '../media/new.png';
import filterTop from '../media/top.png';

export default function Main() {

  function showHotMenu(){
    const hotMenu = document.querySelector('.Main-Header-Hot-Button-Menu');
    if (hotMenu.classList.contains('Hidden')===true){
      hotMenu.classList.remove('Hidden')
    } else {
      hotMenu.classList.add('Hidden');
    }
  }

  const [sortButton, setSort] = useState ({
      name:'Hot',
      icon:flame
    }
  )
  function handleClick(e){
    let icon;
    let name;
    if (e.target.textContent.length !== 3){
     name = e.target.nextSibling.textContent;
    } else if (e.target.textContent.length ===3){
      name = e.target.parentNode.textContent;
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
    }
    
  
  function changeSelected(name){
    const hotMenuButtons = document.querySelectorAll('.Main-Header-Hot-Menu-Button');
    const hotMenuIcons = document.querySelectorAll('.Hot-Menu-Header-Icon');
    for(let i = 0; i < hotMenuButtons.length; i++){
      if (hotMenuButtons[i].textContent !== name){
        hotMenuButtons[i].classList.remove('Hot-Menu-Button-Clicked');
        hotMenuIcons[i].classList.remove('Hot-Menu-Icon-Clicked');
        } else{
        hotMenuButtons[i].classList.add('Hot-Menu-Button-Clicked');
        hotMenuIcons[i].classList.add('Hot-Menu-Icon-Clicked');
        }
      }
    }

  return (
    <div className = "Main-Div">
      <div className = "Main-Header-Bar">
        <button className = "Main-Header-Hot-Button" onClick = {showHotMenu}>
          <img src = {sortButton.icon} className = "Main-Header-Flame-Icon"></img>
          {sortButton.name}
          <img src = {dropDown} className = "Main-Header-Arrow-Icon"></img>
          </button>
          <div className = "Main-Header-Hot-Button-Menu">
            
            <div className = 'Button-Div'>
              <button className = "Main-Header-Hot-Menu-Button Hot-Menu-Button-Clicked" onClick = {handleClick}> 
              <img src = {flame} className = "Hot-Menu-Header-Icon Hot-Menu-Icon-Clicked"></img>
                Hot
              </button>
            </div>

            <div className = 'Button-Div'>
              <button className = "Main-Header-Hot-Menu-Button" onClick = {handleClick}>
              <img src = {filterNew} className = "Hot-Menu-Header-Icon"></img>
                New
              </button>
              </div>

            <div>
              <button className = "Main-Header-Hot-Menu-Button" onClick = {handleClick}>
              <img src = {filterTop} className = "Hot-Menu-Header-Icon"></img>
                Top
              </button> 
            </div>
          </div>
        <button className = "Main-Header-Hot-Button Hidden"></button>
        <button className = "Main-Header-Hot-Button Hidden"></button>
      </div>
    </div>
  )
}
