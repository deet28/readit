import React from 'react'
import flame from '../media/flame.png'

export default function Main() {
  return (
    <div className = "Main-Div">
      <div className = "Main-Header-Bar">
        <button className = "Main-Header-Hot-Button">
          <img src = {flame} className = "Main-Header-Flame-Icon"></img>
          Hot
        </button>
        
      </div>
    </div>
  )
}
