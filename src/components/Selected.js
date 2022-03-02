import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import ReactPlayer from 'react-player/youtube';

export default function Selected() {

  const [selected, setSelected] = useState([]);
  const db = getFirestore(app);
  let array = [];

  async function unselectPost(e){
    let postID = selected[0].id;
    console.log(postID);
    const collectionRef = collection(db,"Posts");
    const q = query(collectionRef,where("id","==",postID))
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map(doc=> ({...doc.data(),id:postID}));
    results.forEach(async (result) => {
    const docRef = doc(db,"Posts",result.id);
    result.selected = 'false'; 
    
    const payload = result;
    await setDoc(docRef,payload);
    })  
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
          timestamp:post.timestamp,
          selected:post.selected
        }
        if (result.selected == "true"){
          array.push(result)
        }
      })
      setSelected(array);
    }
    getData('Posts');
  },[])

  return (
    <div className = "Selected-Post-Card">
      <Link to = "/" className = "Select-Post">
      <button className = "Log-In-Close-Modal" onClick = {unselectPost}>X</button>
      </Link>
      {selected.map((index => (
        <div>
          <h1 className = "Selected-Post-Card-Title">{index.title}</h1>
          <div className = "Main-Body-Card-Body" id = {index.id}>
              {index.picture.length > 0 &&
                <img className = "Main-Body-Card-Picture" id = {index.id}src = {index.picture}></img>
              }
              {index.embed && 
                <ReactPlayer controls = {true} className = "React-Player" url = {index.embed}></ReactPlayer>
              }
              <p className = "Main-Body-Card-Text">{index.text}</p>
              <p className = "Main-Body-Card-Url"><a href = {index.url}target = "_blank">{index.url}</a></p>
            </div>
        </div>
      )))}
    </div>
  )
}
