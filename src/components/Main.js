import React from 'react'
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
  return (
    <div className = "Main-Div">
      <div className = "Main-Header-Bar">
        <button className = "Main-Header-Hot-Button" onClick = {showHotMenu}>
          <img src = {flame} className = "Main-Header-Flame-Icon"></img>
          Hot
          <img src = {dropDown} className = "Main-Header-Arrow-Icon"></img>
        </button>
      <div className = "Main-Header-Hot-Button-Menu">
        <button className = "Main-Header-Hot-Menu-Button Hot-Menu-Button-Clicked">
        <img src = {flame} className = "Hot-Menu-Header-Icon Hot-Menu-Icon-Clicked"></img>
          Hot
        </button>
        <button className = "Main-Header-Hot-Menu-Button _hot">
        <img src = {filterNew} className = "Hot-Menu-Header-Icon"></img>
          New
        </button>
        <button className = "Main-Header-Hot-Menu-Button _hot">
        <img src = {filterTop} className = "Hot-Menu-Header-Icon"></img>
          Top
        </button>
      </div>
        
      </div>
    </div>
  )
}
