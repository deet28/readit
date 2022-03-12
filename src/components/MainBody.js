import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { app,useAuth } from '../firebase'
import { 
  likePost,
  dislikePost,
  likeComment,
  dislikeComment,
  clearComment
} from'./Helpers'
import {
  getFirestore,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  collection,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import upVoteArrow from '../media/upvote-arrow.png';
import downVoteArrow from '../media/downvote-arrow.png';
import chat from '../media/chat.png';
import trash from '../media/trash.png';
import ReactPlayer from 'react-player/youtube';
import { v4 as uuidv4 } from 'uuid';
import { logIntoAccount } from './Helpers'

export default function MainBody() {
  
  const [posts,setPosts] = useState([]);
  const [selected,setSelected] = useState([]);
  const [likes,setLikes] = useState([]);
  const [dislikes,setDislikes] = useState([]);

  const [cLikes,setcLikes] = useState([]);
  const [cDislikes,setcDislikes] = useState([]);

  const [comments,setComments] = useState([]);
  const [cCounter,setcCounter] = useState(0);
  const currentUser = useAuth();
  let array = [];
  let commentsArray=[];
  let likesArray = [];
  let dislikesArray = [];

  let cLikesArray = [];
  let cDislikesArray = [];

  //firestore
  const db = getFirestore(app)
  
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

  async function addComment(e){
    e.preventDefault();
    let id = uuidv4();
    const comment = document.querySelector('.Selected-Body-Post-Comment');
    const userNameField = document.querySelector('.Nav-Menu-Logged-In-Name');
    const userName = userNameField.textContent.split('').slice(2,).join('');
    const email = currentUser.email;
    const commentVal = comment.value
    const postID = selected[0].id;
    const payload = {
      comment:commentVal,
      likes:0,
      user:userName,
      id:id,
      email:email
    }
    const postRef = doc(db,"Comments",postID);
    const colRef = collection(postRef,"Comment-Nest");
    await setDoc(doc(colRef,id),payload).then(displayComments(postID)).then(createcLikes(id)).then(clearComment());
  }

  async function createcLikes(id){
    const likes = [];
    const dislikes = [];
    const payload = {
      likes:likes,
      dislikes:dislikes,
      id:id,
      cLikes:0
    }
    await setDoc(doc(db,"CFeelings",id),payload)
  }

//Likes and Dislikes on Posts.
  function checkDislikes(e){
    let postID = e.target.id;
    if (dislikes.includes(postID)==true){
      return removeDislikes(postID);
    } else { 
      likePFeelings(postID);
    }
  }

  async function removeDislikes(postID){
    let user = currentUser.email;
    const docRef = doc(db,"PFeelings",postID);
    const payload = user;
    await updateDoc(docRef,{
        dislikes:arrayRemove(payload)
    }).then(upvoteButton(postID)).then(setDislikes(dislikes.filter(index => index !== postID)));
  }
  
  async function likePFeelings(id){
    const user = currentUser.email;
    const postID = id
    const docRef = doc(db,"PFeelings",postID);
    const payload = user;
    await updateDoc(docRef,{
        likes:arrayUnion(payload)
    }).then(upvoteButton(postID)).then(setLikes([...likes,postID]));
  }

  function checkLikes(e){
    let postID = e.target.id;
    if (likes.includes(postID)==true){
      return removeLikes(postID);
    } else { 
      dislikePFeelings(postID);
    }
  }

  async function removeLikes(postID){
    let user = currentUser.email;
    const docRef = doc(db,"PFeelings",postID);
    const payload = user;
    await updateDoc(docRef,{
        likes:arrayRemove(payload)
    }).then(downvoteButton(postID)).then(setLikes(likes.filter(index => index !== postID)));
  }

  async function dislikePFeelings(id){
      const user = currentUser.email;
      const postID = id;
      const docRef = doc(db,"PFeelings",postID);
      const payload = user;
      await updateDoc(docRef,{
          dislikes:arrayUnion(payload)
      }).then(downvoteButton(postID)).then(setDislikes([...dislikes,postID]));
  }

  async function upvoteButton(postID){
    let id = postID;
    const collectionRef = collection(db,"Posts");
    const q = query(collectionRef,where("id","==",postID))
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map(doc=> ({...doc.data(),id:postID}));
    results.forEach(async (result) => {
      const docRef = doc(db,"Posts",result.id);
      result.likes ++; 
      const payload = result;
      await setDoc(docRef,payload).then(likePost(id));
    })
    
  }

  async function downvoteButton(postID){
    let id = postID;
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

//Likes and Dislikes on Comments.

function checkCDislikes(e){
  let cID = e.target.id;
  if (cDislikes.includes(cID)==true){
    return removeCDislikes(cID);
  } else { 
    likeCFeelings(cID);
  }
}

function checkCLikes(e){
  let cID = e.target.id;
  if (cLikes.includes(cID)==true){
    return removeCLikes(cID);
  } else {
    dislikeCFeelings(cID);
  }
}

async function removeCDislikes(cID){
  let user = currentUser.email;
  const docRef = doc(db,"CFeelings",cID);
  const payload = user;
  await updateDoc(docRef,{
      dislikes:arrayRemove(payload)
  }).then(upvoteCButton(cID)).then(setcDislikes(cDislikes.filter(index => index !== cID)));
}

async function removeCLikes(cID){
  let user = currentUser.email;
  const docRef = doc(db,"CFeelings",cID);
  const payload = user;
  await updateDoc(docRef,{
    likes:arrayRemove(payload)
  }).then(downvoteCButton(cID)).then(setcLikes(cLikes.filter(index => index !== cID)));
}

async function likeCFeelings(id){
  const user = currentUser.email;
  const cID = id
  const docRef = doc(db,"CFeelings",cID);
  const payload = user;
  await updateDoc(docRef,{
      likes:arrayUnion(payload)
  }).then(upvoteCButton(cID)).then(setcLikes([...cLikes,cID]));
}

async function dislikeCFeelings(id){
  const user = currentUser.email;
  const cID = id;
  const docRef = doc(db,"CFeelings",cID);
  const payload = user;
  await updateDoc(docRef,{
    dislikes:arrayUnion(payload)
  }).then(downvoteCButton(cID)).then(setcDislikes([...cDislikes,cID]));
}

async function upvoteCButton(id){
  const cID = id;
  const postID = selected[0].id;
  const  q = collection(db,"Comments",postID,"Comment-Nest");
  const snapshot = await getDocs(q,"Comment-Nest");
  const results = snapshot.docs.map(doc=> ({...doc.data()}));
    results.forEach(async (result) => {
      if (result.id == cID){
        console.log(result.id)
        const docRef = doc(db,"Comments",postID,"Comment-Nest",cID)
        result.likes++;
        const payload = result; 
        await setDoc(docRef,payload).then(likeComment(cID))
       };
    });
  }

async function downvoteCButton(id){
  const cID = id;
  const postID = selected[0].id;
  const  q = collection(db,"Comments",postID,"Comment-Nest");
  const snapshot = await getDocs(q,"Comment-Nest");
  const results = snapshot.docs.map(doc=> ({...doc.data()}));
    results.forEach(async (result) => {
      if (result.id == cID){
        console.log(result.id)
        const docRef = doc(db,"Comments",postID,"Comment-Nest",cID)
        result.likes--;
        const payload = result; 
        await setDoc(docRef,payload).then(dislikeComment(cID));
      };
    });
  }

//Selecting and displaying post and comment information.
  
  function selectPost(e){
    if (e.target.classList.value=='Main-Body-Card-Url'){
      window.open(e.target.textContent,'_blank')
    } else {
      console.log(false)
      handleSelect(e);
    }
  }
  async function handleSelect(e){
    let id = e.target.id;
    await displayPost(id);
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
  }
  
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
  
  async function displayPost(input){
    const collectionRef = collection(db,"Posts");
    const q = query(collectionRef,where("id","==",input))
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map(doc=> ({...doc.data(),id:input}));
    results.forEach(async (result) => {
    const payload = result;
    window.scroll(0,0);
    setSelected([payload])
    })
    displayComments(input);
  }

  async function displayComments(input){
  let counter = 0;
  let postID = input
    const  q = collection(db,"Comments",postID,"Comment-Nest");
    const snapshot = await getDocs(q,"Comment-Nest");
    const results = snapshot.docs.map(doc=> ({...doc.data()}));
    results.forEach(async (result) => {
      let newComment = result.comment
      let newCommentLikes = result.likes
      let newCommentID = result.id
      let user = result.user
      let email = result.email
      counter++;
      commentsArray.push({newComment,newCommentID,newCommentLikes,user,email});
    });
    setcCounter(counter);
    console.log(cCounter)
    setComments(commentsArray)
  }

  function urlSelected(e){
    if (e.target.classList.value == 'Selected-Body-Card-Url'){
      window.open(e.target.textContent,'_blank')
    }
  }

//Deleting Comments

async function deleteComment(e){
  const cID = e.target.id;
  const postID = selected[0].id;
  const  q = collection(db,"Comments",postID,"Comment-Nest");
  const snapshot = await getDocs(q,"Comment-Nest");
  const results = snapshot.docs.map(doc=> ({...doc.data()}));
    results.forEach(async (result) => {
      if (result.id===cID){
        const docRef = doc(db,"Comments",postID,"Comment-Nest",cID)
        await deleteDoc(docRef).then(deleteCFeelings(cID).then(displayComments(postID)));
      }
    });
}
async function deleteCFeelings(id){
  const cID = id;
  const docRef = doc(db,"CFeelings",cID)
  await deleteDoc(docRef);
}
//Updating state when necessary

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
          user:post.user,
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

 useEffect(() => {
  if (currentUser == null){
    return 
  } else {
    let email = currentUser.email;
      const getList = async () => {
      const querySnapshot = await getDocs(collection(db,'PFeelings'));
      querySnapshot.forEach((doc)=>{
        let user = (doc.id, "=>",doc.data())
        let test = user.id; 
        let likes = user.likes;
        let dislikes = user.dislikes;
        for(let i = 0; i < likes.length; i++){
          if (likes[i]==email)
          likesArray.push(test)
        }
        for(let i = 0; i < dislikes.length;i++){
          if(dislikes[i]==email){
            dislikesArray.push(test);
          }
        }
      })
      setLikes(likesArray);
      setDislikes(dislikesArray);
    }
    getList('PFeelings')
    }
  },[currentUser]);

  useEffect(() => {
    if (currentUser == null){
      return 
    } else {
      let email = currentUser.email;
        const getList = async () => {
        const querySnapshot = await getDocs(collection(db,'CFeelings'));
        querySnapshot.forEach((doc)=>{
          let user = (doc.id, "=>",doc.data())
          let test = user.id; 
          let likes = user.likes;
          let dislikes = user.dislikes;
          for(let i = 0; i < likes.length; i++){
            if (likes[i]==email)
            cLikesArray.push(test)
          }
          for(let i = 0; i < dislikes.length;i++){
            if(dislikes[i]==email){
              cDislikesArray.push(test);
            }
          }
        })
        setcLikes(cLikesArray);
        setcDislikes(cDislikesArray);
      }
      getList('CFeelings')
      }
  },[currentUser]);

  useEffect(()=>{
    console.log(likes);
  },[likes]);
  
  useEffect(()=>{
    console.log(dislikes);
  },[dislikes]);

  useEffect(()=>{
    console.log(cLikes);
  },[cLikes]);

  useEffect(()=>{
    console.log(cDislikes);
  },[cDislikes]);
  

  return (
    <>
    <div className = "Selected-Post-Card Hidden">
    {selected.map((index => (
        <div className = "Selected-Post-Card-Outer">
          <button className = "Selected-Card-Close-Button" onClick = {unselectPost}>X</button>
          <span className = "Selected-Card-User-Name">Posted by u/{index.user}</span>
          
              <div className = "Selected-Post-Header">
                  
                  <div className = "Selected-Post-Likes"id = {index.id}>
                    {currentUser!==null && likes.includes(index.id)==true &&
                      <img className = "Selected-Post-Like-Button Selected-Like-Submitted" id = {index.id} src = {upVoteArrow} onClick = {upvoteButton}></img>
                    }
                    {currentUser!==null && likes.includes(index.id)==false &&
                      <img className = "Selected-Post-Like-Button" id = {index.id} src = {upVoteArrow} onClick = {checkDislikes}></img>
                    }


                    {currentUser==null && 
                      <img className = "Selected-Post-Like-Button" id = {index.id} src = {upVoteArrow} onClick = {logIntoAccount}></img>
                    }
                      <p className = "Selected-Post-Likes-Div" id = {index.id}>{index.likes}</p>
                    
                    
                    {currentUser!==null && dislikes.includes(index.id)==true&&
                      <img className = "Selected-Post-Dislike-Button Selected-Dislike-Submitted" id = {index.id} src = {downVoteArrow}></img>
                    }

                    {currentUser!==null && dislikes.includes(index.id)==false&&
                      <img className = "Selected-Post-Dislike-Button" id = {index.id} src = {downVoteArrow} onClick = {checkLikes}></img>
                    }

                    {currentUser==null && 
                      <img className = "Selected-Post-Dislike-Button" id = {index.id} src = {downVoteArrow} onClick = {logIntoAccount}></img>
                    }
                  </div>
            
                  <div className = "Selected-Body-Card-Title-Div"  onClick = {displayPost} id = {index.id}>
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
                      <a className = "Selected-Body-Card-Url" onClick = {urlSelected}href = {index.url}>{index.url}</a>
                    } 
                </div>
                
              <div className = "Selected-Body-Media-Footer">
                <img src = {chat} className = "Selected-Body-Chat-Icon"></img>
                <p>{cCounter} Comments</p>
              </div>
          
          </div>
          
          <div className = "Selected-Body-Comment-Parent">
              {currentUser!==null && 
              <div className = "Selected-Body-Post-Comment-Div">
                <textarea className = "Selected-Body-Post-Comment" placeholder = "What are your thoughts?"></textarea>
                <div className = "Selected-Body-Submit-Comment-Button-Div">
                  <button className = "Selected-Body-Submit-Comment-Button" onClick = {addComment}>Comment</button>
                </div>
              </div>
                }
            </div>
              
              <div className = "Selected-Body-Comment-Section-Parent">
                <div className = "Selected-Body-Comment-Section">
                   {comments.map((index => (
                    <div className = "Selected-Body-Comment-Post-Parent">
                      <span className = "Selected-Body-Comment-Post-Username">{index.user}</span>
                      <p className = "Selected-Body-Comment-Post">{index.newComment}</p>
                      <div className = "Selected-Body-Comment-Posts-Like-Parent" id = {index.newCommentID}>
                        
                        {/* Comment Likes Button*/}
                        {currentUser!==null && cLikes.includes(index.newCommentID)==true&&
                        <img src = {upVoteArrow} id = {index.newCommentID} className = "Selected-Body-Comment-Posts-Like Selected-Body-Comment-Posts-Like-Selected"></img>
                        }
                        {currentUser!==null && cLikes.includes(index.newCommentID)==false&&
                        <img src = {upVoteArrow} id = {index.newCommentID}onClick = {checkCDislikes} className = "Selected-Body-Comment-Posts-Like"></img>
                        }
                        {currentUser==null&&
                        <img src = {upVoteArrow} onClick = {logIntoAccount}className = "Selected-Body-Comment-Posts-Like"></img>
                        }

                          <span>{index.newCommentLikes}</span>

                        {/* Comment Dislikes Button*/}
                        {currentUser!==null && cDislikes.includes(index.newCommentID)==true&&
                        <img src = {downVoteArrow} id = {index.newCommentID} className = "Selected-Body-Comment-Posts-Dislike Selected-Body-Comment-Posts-Dislike-Selected"></img>
                        }
                        {currentUser!==null && cDislikes.includes(index.newCommentID)==false&&
                        <img src = {downVoteArrow} id = {index.newCommentID} onClick = {checkCLikes}className = "Selected-Body-Comment-Posts-Dislike"></img>
                        }
                        {currentUser==null&&
                        <img src = {downVoteArrow} onClick = {logIntoAccount}className = "Selected-Body-Comment-Posts-Dislike"></img>
                        }

                        
                        {currentUser!==null&&index.email==currentUser.email&&
                        <img onClick = {deleteComment}id = {index.newCommentID} src = {trash} className = "Selected-Body-Comment-Posts-Trash"></img>
                        }
                        
                        
                      </div>
                    </div>
                  )))}
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
            {currentUser==null && 
              <img className = "Main-Body-Like-Button" id = {index.id} src = {upVoteArrow} onClick = {logIntoAccount}></img>
            }
            {currentUser==null &&
              <p className = "Main-Body-Likes-Div" id = {index.id}>{index.likes}</p>
            }
            {currentUser==null && 
              <img className = "Main-Body-Dislike-Button" id = {index.id} src = {downVoteArrow} onClick = {logIntoAccount}></img>
            }


            {currentUser!==null &&  likes.includes(index.id)==true &&
              <img className = "Main-Body-Like-Button Like-Submitted" id = {index.id} src = {upVoteArrow}></img>
            }
            {currentUser!==null &&  likes.includes(index.id)==false &&
              <img className = "Main-Body-Like-Button" id = {index.id} src = {upVoteArrow} onClick = {checkDislikes}></img>
            }

            {currentUser!== null &&
              <p className = "Main-Body-Likes-Div" id = {index.id}>{index.likes}</p>
            }

            {currentUser!==null && dislikes.includes(index.id)==true&&
              <img className = "Main-Body-Dislike-Button Dislike-Submitted" id = {index.id} src = {downVoteArrow}></img>
            }
            {currentUser!==null && dislikes.includes(index.id)==false&&
              <img className = "Main-Body-Dislike-Button" id = {index.id} src = {downVoteArrow} onClick = {checkLikes}></img>
            }
          </div>
        <div>
          <div className = "Main-Body-Card"  onClick = {selectPost} id = {index.id}>
           <div id = {index.id} className = "Main-Body-Card-User-Name-Div">
              <span id = {index.id} className = "Main-Body-Card-User-Name">Posted by u/{index.user}
              </span>
            </div>
            <h2 className = "Main-Body-Card-Title" id = {index.id}>{index.title}</h2>
            <div className = "Main-Body-Card-Body" id = {index.id}>
              {index.picture.length > 0 &&
                <img className = "Main-Body-Card-Picture" id = {index.id}src = {index.picture}></img>
              }
              {index.embed && 
                <ReactPlayer controls = {true} className = "React-Player" url = {index.embed}></ReactPlayer>
              }
              <p className = "Main-Body-Card-Text" id = {index.id}>{index.text}</p>
              <a id = {index.id}className = "Main-Body-Card-Url"href = {index.url}>{index.url}</a>
              </div>
              </div>
            </div>
          </div>
          )))}
       </div>
      </div>
    </>
  )
}