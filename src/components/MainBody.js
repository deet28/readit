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
  collection
} from "firebase/firestore";
import upArrow from '../media/up-arrow.png';
import downArrow from '../media/down-arrow2.png';

export default function MainBody() {


  const [posts,setPosts] = useState([]);

  console.log(posts)
  let array = [];
  let sortedArray;


  //firestore
  const db = getFirestore(app);
  //redux
  const state = useSelector((state)=>state);

  const sortingFeed = useSelector (state => {
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
    const postCards = document.querySelectorAll('.Main-Body-Card-Outer');
    for(let i = 0; i < postCards.length; i++){
      if (postCards[i].id == postID){
        return postCards[i].firstChild.firstChild.nextSibling.textContent--;
        }
      }
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
    <div className = "Main-Body-Div">
      <div className = "Main-Body-Card-Div">
        {posts.map((index => (
          <div className = "Main-Body-Card-Outer" id = {index.id}>
          <div className = "Main-Body-Likes"id = {index.id}>
            <img className = "Main-Body-Like-Button" id = {index.id} src = {upArrow} onClick = {upvoteButton}></img>
            <p className = "Main-Body-Likes-Div" id = {index.id}>{index.likes}</p>
            <img className = "Main-Body-Dislike-Button" id = {index.id} src = {downArrow} onClick = {downvoteButton}></img>
          </div>
          <div className = "Main-Body-Card">
            <h2 className = "Main-Body-Card-Title">{index.title}</h2>
            <div className = "Main-Body-Card-Body">
              {index.picture.length > 0 &&
                <img className = "Main-Body-Card-Picture"src = {index.picture}></img>
              }
              <p className = "Main-Body-Card-Text">{index.text}</p>
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
