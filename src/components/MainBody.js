import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { app } from '../firebase';
import {
  getFirestore,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  collection,
} from "firebase/firestore";
import upArrow from '../media/up-arrow.png';
import downArrow from '../media/down-arrow2.png';
import upVoteArrow from '../media/upvote-arrow.png';
import downVoteArrow from '../media/downvote-arrow.png'
import chat from '../media/chat.png';
import ReactPlayer from 'react-player/youtube';

export default function MainBody() {
  
  const [posts,setPosts] = useState([]);
  const [selected,setSelected] = useState([]);
  let array = [];


  //firestore
  const db = getFirestore(app);
  //redux
  const state = useSelector((state)=>state);

  useSelector (state => {
    if(state.sort == 'New'){
        posts.sort((t1,t2)=>
        t2.timestamp-t1.timestamp);
    } else if (state.sort == 'Top'){
      posts.sort((t1,t2)=>
      t2.likes-t1.likes);
    }
  })


  async function upvoteButton(e){
    e.preventDefault();
    let postID = e.target.id;
    const collectionRef = collection(db,"Posts");
    const q = query(collectionRef,where("id","==",postID))
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map(doc=> ({...doc.data(),id:postID}));
    results.forEach(async (result) => {
      const docRef = doc(db,"Posts",result.id);
      result.likes ++; 
    
    const payload = result;
    await setDoc(docRef,payload).then(likePost(postID));
  })
  }

  async function downvoteButton(e){
    e.preventDefault();
    let postID = e.target.id;
    const collectionRef = collection(db,"Posts");
    const q = query(collectionRef,where("id","==",postID))
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map(doc=> ({...doc.data(),id:postID}));
    results.forEach(async (result) => {
      const docRef = doc(db,"Posts",result.id);
      result.likes --; 
    
    const payload = result;
    await setDoc(docRef,payload).then(dislikePost(postID));
  })
  }


  function likePost(postID){
    const postCards = document.querySelectorAll('.Main-Body-Likes');
    for(let i = 0; i < postCards.length; i++){
      if (postCards[i].id == postID){
        return postCards[i].firstChild.nextSibling.textContent++;
      }
    }
  }

  function dislikePost(postID){
    const postCards = document.querySelectorAll('.Main-Body-Likes');
    for(let i = 0; i < postCards.length; i++){
      if (postCards[i].id == postID){
        return postCards[i].firstChild.nextSibling.textContent--;
        }
      }
    }

  function selectPost(e){
    const selectedPost = document.querySelector('.Selected-Post-Card');
    const mainBody = document.querySelector('.Main-Body-Div');
    const smallHeader = document.querySelector(".Main-Header-Bar-Small");
    const largeHeader = document.querySelector(".Main-Header-Bar-Large");
    const rightCard = document.querySelector(".Right-Card-Div");
    selectedPost.classList.remove('Hidden');
    mainBody.classList.add('Hidden');
    smallHeader.classList.add('Hidden');
    largeHeader.classList.add('Hidden')
    rightCard.classList.add('Hidden');
    let id = e.target.id;
    displayPost(id);
  }

  async function displayPost(input){
    const collectionRef = collection(db,"Posts");
    const q = query(collectionRef,where("id","==",input))
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map(doc=> ({...doc.data(),id:input}));
    results.forEach(async (result) => {
    const docRef = doc(db,"Posts",result.id);
    const payload = result;
    setSelected([payload]);
  })
  
}
console.log(selected)

  function unselectPost(){
    const selectedPost = document.querySelector('.Selected-Post-Card');
    const mainBody = document.querySelector('.Main-Body-Div');
    const smallHeader = document.querySelector(".Main-Header-Bar-Small");
    const largeHeader = document.querySelector(".Main-Header-Bar-Large");
    const rightCard = document.querySelector(".Right-Card-Div");
    selectedPost.classList.add('Hidden');
    mainBody.classList.remove('Hidden');
    smallHeader.classList.remove('Hidden');
    largeHeader.classList.remove('Hidden')
    rightCard.classList.remove('Hidden');
    setSelected([]);
  }
  
    useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db,'Posts'));
      querySnapshot.forEach((doc)=>{
        let post = (doc.id, "=>",doc.data())
        let result = {
          title:post.title,
          text:post.text,
          picture:post.picture,
          url:post.url,
          embed:post.embed,
          likes:post.likes,
          id:post.id,
          date:post.date,
          timestamp:post.timestamp
        }
        array.push(result)
      })
      setPosts(array);
    }
    getData('Posts');
  },[state])

  return (
    <>
    <div className = "Selected-Post-Card Hidden">
    {selected.map((index => (
        <div className = "Selected-Post-Card-Outer">
          <button className = "Selected-Card-Close-Button" onClick = {unselectPost}>X</button>
          
              <div className = "Selected-Post-Header">
                  
                  <div className = "Selected-Post-Likes"id = {index.id}>
                    <img className = "Selected-Post-Like-Button" id = {index.id} src = {upVoteArrow} onClick = {upvoteButton}></img>
                    <p className = "Selected-Post-Likes-Div" id = {index.id}>{index.likes}</p>
                    <img className = "Selected-Post-Dislike-Button" id = {index.id} src = {downVoteArrow} onClick = {downvoteButton}></img>
                  </div>
            
                  <div className = "Selected-Body-Card-Title-Div"  onClick = {selectPost} id = {index.id}>
                    <h2 className = "Selected-Body-Card-Title" id = {index.id}>{index.title}</h2>
                  </div>
              
              </div>
          
          <div className = "Selected-Post-Main">
                
                <div className = "Selected-Body-Card-Picture-Parent" id = {index.id}>
                    {index.picture.length > 0 &&
                    <img className = "Selected-Body-Card-Picture" id = {index.id}src = {index.picture}></img>
                    }
                </div>
                
                <div className = "Selected-Body-Card-Embed-Parent">
                    {index.embed && 
                    <ReactPlayer controls = {true} className = "Selected-React-Player" url = {index.embed}></ReactPlayer>
                    }
                </div>
              
                <div className = "Selected-Body-Card-Text-Div">
                    {index.text.length > 0 && 
                      <p className = "Selected-Body-Card-Text" id = {index.id}>{index.text}</p>
                    }
                    {index.url.length > 0 && 
                      <p className = "Selected-Body-Card-Url"><a href = {index.url}target = "_blank">{index.url}</a></p>
                    } 
                </div>
                
              <div className = "Selected-Body-Media-Footer">
                <img src = {chat} className = "Selected-Body-Chat-Icon"></img>
                <p>Comments</p>
              </div>
          
          </div>
          
          <div className = "Selected-Body-Comment-Parent">
              
              <div className = "Selected-Body-Post-Comment-Div">
                <textarea className = "Selected-Body-Post-Comment" placeholder = "What are your thoughts?"></textarea>
                
                <div className = "Selected-Body-Submit-Comment-Button-Div">
                  <button className = "Selected-Body-Submit-Comment-Button">Comment</button>
                </div>
              </div>
              
              <div className = "Selected-Body-Comment-Section-Parent">
                <div className = "Selected-Body-Comment-Section">
                  <p>This is an example paragraph</p>
                </div>
              </div>
          
          </div>
        
        </div>
        )))}
    </div>
  
    
    <div className = "Main-Body-Div">
        <div className = "Main-Body-Card-Div">
        {posts.map((index => (
          <div className = "Main-Body-Card-Outer">
          <div className = "Main-Body-Likes"id = {index.id}>
            <img className = "Main-Body-Like-Button" id = {index.id} src = {upVoteArrow} onClick = {upvoteButton}></img>
            <p className = "Main-Body-Likes-Div" id = {index.id}>{index.likes}</p>
            <img className = "Main-Body-Dislike-Button" id = {index.id} src = {downVoteArrow} onClick = {downvoteButton}></img>
          </div>
         <div className = "Main-Body-Card"  onClick = {selectPost} id = {index.id}>
            <h2 className = "Main-Body-Card-Title" id = {index.id}>{index.title}</h2>
            <div className = "Main-Body-Card-Body" id = {index.id}>
              {index.picture.length > 0 &&
                <img className = "Main-Body-Card-Picture" id = {index.id}src = {index.picture}></img>
              }
              {index.embed && 
                <ReactPlayer controls = {true} className = "React-Player" url = {index.embed}></ReactPlayer>
              }
              <p className = "Main-Body-Card-Text" id = {index.id}>{index.text}</p>
              <p className = "Main-Body-Card-Url"><a href = {index.url}target = "_blank">{index.url}</a></p>
              </div>
            </div>
          </div>
          )))}
       </div>
      </div>
    </>
  )
}