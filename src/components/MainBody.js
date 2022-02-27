import React from 'react';
import { useState, useEffect } from 'react';
import { app } from '../firebase';
import {
  getFirestore,
  getDocs,
  collection
} from "firebase/firestore";
import upArrow from '../media/up-arrow.png';
import downArrow from '../media/down-arrow2.png';

export default function MainBody() {

  const db = getFirestore(app);

  const [posts,setPosts] = useState([]);
  
  let array = [];
  
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db,'Posts'));
      querySnapshot.forEach((doc)=>{
        let post = (doc.id, "=>",doc.data())
        let result = {
          title:post.title,
          text:post.text,
          picture:post.picture,
          url:post.url
        }
        array.push(result)
      })
      setPosts(array);
    }
    getData('Posts');
  },[])

  return (
    <>
    <div className = "Main-Body-Div">
      <div className = "Main-Body-Card-Div">
        {posts.map((index => (
          <div className = "Main-Body-Card-Outer">
          <div className = "Main-Body-Likes">
            <img className = "Main-Body-Like-Button" src = {upArrow}></img>
            <img className = "Main-Body-Dislike-Button" src = {downArrow}></img>
          </div>
          <div className = "Main-Body-Card">
            
            <h2 className = "Main-Body-Card-Title">{index.title}</h2>
            <div className = "Main-Body-Card-Body">
              {index.picture.length > 0 &&
                <img className = "Main-Body-Card-Picture"src = {index.picture}></img>
              }
              
              <p className = "Main-Body-Card-Text">{index.text}</p>
              <p className = "Main-Body-Card-Url">{index.url}</p>
            </div>
          </div>
          </div>
        )))}
      </div>
    </div>

    </>
  )
}
