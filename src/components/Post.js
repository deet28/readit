import React from 'react';
import { Link } from 'react-router-dom';
import { app } from '../firebase';
import { storage } from '../firebase';
import { getFirestore,doc,setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable,getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import docIcon from '../media/document.png';
import picIcon from '../media/picture.png';
import linkIcon from '../media/link.png';


export default function Post() {
  
  const imageButton = `Images & Video`;
  const [images, setImages] = useState([
  ]) 
  let image;

  const db = getFirestore(app);

  async function pushToFirebase(){
    const title = document.querySelector('.Post-Content-Title');
    const text  = document.querySelector('.Post-Content-Text');
    const picture = images;
    const url = document.querySelector('.Post-Content-Url');
    let id = uuidv4();
    if (title.value.length < 1){
      return alert('Title required.')
    } else {
    try {
    const payload = {
      title:title.value,
      text:text.value,
      picture:picture,
      url:url.value
    }
    await setDoc(doc(db,"Posts",id),payload).then (returnHome());
    }
      catch (error){
        console.log('Error adding to Post database')
      }
    }
  }

  function returnHome(){
    let postAlert = document.querySelector('.Post-Submitted');
    let postContentHeader = document.querySelector('.Post-Header');
    let postContentSection = document.querySelector('.Post-Content-Section');

    postAlert.classList.remove('Hidden');
    postContentHeader.classList.add('Hidden');
    postContentSection.classList.add('Hidden');
  }

  //image upload

  const uploadHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    let image = file.name;
    uploadImages(file);
  };

  const uploadImages = (file) => {
    if (!file) return;
    const storageRef = ref(storage,`/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef,file)
    
    uploadTask.on(
      "state_changed",
      (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred/snapshot.totalBytes) * 100
        );
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
      .then(url => {
        image = url.toString();
        setImages(image);
        }
      )
    }
  );
  };
  function removeUpload(){
    const imageDiv = document.querySelector('.Upload-Image-Display');
    imageDiv.src = null;
    return setImages([]);
  }

  //ui button changer

  function getButtonName(e){
    let name; 
      if (e.target.textContent.length < 1){
      name = e.target.nextSibling.textContent;
      } else if (e.target.textContent.length > 1){
      name = e.target.textContent;
    }
     return name; 
  }

  function changeSelected(e){
    let name = getButtonName(e);
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
      changeBody(name);
      }
    function changeBody(name){
      const postBody = document.querySelector('.Post-Content-Text');
      const imageBody = document.querySelector('.Post-Content-Media');
      const urlBody = document.querySelector('.Post-Content-Url');
      if (name == 'Post'){
        postBody.classList.remove('Hidden');
        imageBody.classList.add('Hidden');
        urlBody.classList.add('Hidden');
      } else if (name == 'Link'){
        urlBody.classList.remove('Hidden');
        postBody.classList.add('Hidden');
        imageBody.classList.add('Hidden')
      } else {
        imageBody.classList.remove('Hidden');
        postBody.classList.add('Hidden');
        urlBody.classList.add('Hidden');
      }
    }
  
  }
  return (
    <>
  <div className = "Post-Main-Div">

  <div className = "Post-Submitted Hidden">
    <h2>Post Submitted Successfully!</h2> 
    <Link to = "/">
      <button className = "Success-Button">Home</button> 
    </Link>
    
  </div> 
    
    <div className = "Post-Header">
      <h3>Create a post</h3>
    </div>
  
  <div className = "Post-Content-Section">
      
      <div className = "Post-Content-Button-Nav">
        
        <button className = "Post-Content-Button Post-Content-Button-Clicked" onClick = {changeSelected}>
          <img src = {docIcon} className = "Post-Content-Icon Post-Content-Icon-Clicked"></img>
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
      
      <div className = "Post-Content-Body">
        
        <div className = "Post-Content-Title-Parent">
          <textarea className = "Post-Content-Title" maxLength = {300} placeholder = "Title">
          </textarea>
        </div>
        
        <div className = "Post-Content-Text-Parent">
            <textarea className = "Post-Content-Text" placeholder = "Text(Optional)"></textarea>
            <div className = "Post-Content-Media Hidden"> 
            <div className = "Image-Test">
              <img className = "Upload-Image-Display"src = {images}></img>
              <button className = "Remove-Image" onClick = {removeUpload}>Remove</button>
            </div>
            <label>
              <input className = "Hidden" type = "file"onChange = {uploadHandler}></input>
              <span className = "Upload-Button" >Upload</span>
            </label>
            </div>
          <textarea className = "Post-Content-Url Hidden" placeholder = "Url"></textarea>
        </div>    

        <div className = "Post-Content-Footer-Buttons">
          <Link to = "/">
          <button className = "Footer-Button">Cancel</button>
          </Link>
          <button className = "Footer-Button" onClick = {pushToFirebase}>Post</button>
        </div>    
      </div>
    </div>
    </div>
  </>
  )
}


