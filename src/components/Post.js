import React from 'react'
import docIcon from '../media/document.png';
import picIcon from '../media/picture.png'
import linkIcon from '../media/link.png'

export default function Post() {
  const imageButton = `Images & Video`

  function getName(e){
    let name; 
      if (e.target.textContent.length < 1){
      name = e.target.nextSibling.textContent;
      } else if (e.target.textContent.length > 1){
      name = e.target.textContent;
    }
     return name; 
  }

  function changeSelected(e){
    let name = getName(e);
    const postContentButtons = document.querySelectorAll('.Post-Content-Button');
    const postContentIcons = document.querySelectorAll('.Post-Content-Icon');
    for(let i = 0; i < postContentButtons.length; i++){
      if (postContentButtons[i].textContent !== name){
        postContentButtons[i].classList.remove('Post-Content-Button-Clicked');
        postContentIcons[i].classList.remove('Post-Content-Icon-Clicked');
        } else{
        postContentButtons[i].classList.add('Post-Content-Button-Clicked');
        postContentIcons[i].classList.add('Post-Content-Icon-Clicked');
        }
      }
    }
  return (
    <>
    <div className = "Post-Main-Div">
    
    <div className = "Post-Header">
      <h3>Create a post</h3>
    </div>
    <div className = "Post-Content-Section">
      <div className = "Post-Content-Button-Nav">
        <button className = "Post-Content-Button" onClick = {changeSelected}>
          <img src = {docIcon} className = "Post-Content-Icon"></img>
          <span>Post</span>
        </button>
        <button className = "Post-Content-Button" onClick = {changeSelected}>
          <img src = {picIcon} className = "Post-Content-Icon"></img>
          <span>{imageButton}</span>
        </button>
        <button className = "Post-Content-Button" onClick = {changeSelected}>
          <img src = {linkIcon} className = "Post-Content-Icon"></img>
          <span>Link</span>
        </button>
      </div>
    </div>
    
    </div>
  </>
  )
}
