import React from 'react'
import { Link } from 'react-router-dom'
import { useRef,useState,useEffect }from'react'
import { app,signup,useAuth,login,logout } from '../firebase'
import {
  getFirestore,
  getDocs,
  doc,
  setDoc,
  collection
} from 'firebase/firestore'
import Icon from '../media/readit.png'
import magGlass from '../media/mag-glass.png'
import dropDown from '../media/drop-down.png'
import downArrow from '../media/down-arrow.png'
import moon from '../media/moon.png'
import logIn from '../media/log-in.png'
import post from '../media/post.png'
import { v4 as uuidv4} from 'uuid'
import { logIntoAccount,closeLogIn } from './Helpers'

export default function Nav() {

  const db = getFirestore(app);
  
  const emailRef = useRef();
  const passwordRef = useRef();
  const displayRef = useRef();
  const currentUser = useAuth();
  const [userName, setUserName] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  
  async function testUsername(){
    let userArr =[];
    let displayName = displayRef.current.value;
    let display = displayName.toLowerCase();
    let emailName = emailRef.current.value;
    let email = emailName.toLowerCase();
    console.log(display)
    const querySnapshot = await getDocs(collection(db,'Users'));
      querySnapshot.forEach((doc)=>{
        let user = (doc.id, "=>",doc.data())
        let userName = user.userName.toLowerCase();
        let userEmail = user.email.toLowerCase();
        userArr.push(userName);
        userArr.push(userEmail)
      })
      console.log(userArr)
     if (userArr.includes(display)){
        return alert('Username taken!');
      } else if(userArr.includes(email)) {
        return alert ('Email already in use.')
      } else {
        handleSignUp();
      }
}
  
async function handleSignUp(){
    if (passwordRef.current.value.length < 6){
      return alert ('Password must be at least 6 characters!')
    } else {
    try {
      await signup(emailRef.current.value,passwordRef.current.value)
      .then(handleUsername())
      .then(resetSignUpForm())
    } catch { 

    }
  }
}

async function handleUsername(){
    const user = displayRef.current.value;
    let uid = uuidv4();
    let email = emailRef.current.value
    const payload = {
      userName:user,
      email:email,
      id:uid
    }
    await setDoc(doc(db,"Users",uid),payload);
}

function resetSignUpForm(){
    emailRef.current.value = '';
    passwordRef.current.value = '';
    closeLogIn();
}

async function getUsername(input){
    let email;
    if (emailRef.current.value == ''){
      email = input.toLowerCase();
    } else {
      email = emailRef.current.value;
    }
    const querySnapshot = await getDocs(collection(db,'Users'));
      querySnapshot.forEach((doc)=>{
        let user = (doc.id, "=>",doc.data())
        let emailName = user.email.toLowerCase();
        let usersName = user.userName;
        if (emailName == email){
          setUserName([usersName])
    }
  })
}

async function handleLogout(){
  try {
    await logout()
  } catch {
    alert ("Error logging out!")
  }
}

async function handleLogin(){
    try {
      await login(emailRef.current.value,passwordRef.current.value)
      .then(getUsername())
      .then(resetSignUpForm())

    } catch { 
      alert('error')
    }
}

function showMenu(e){
  e.preventDefault();
  const navMenu = document.querySelector(".Nav-Drop-Down-Menu");
  if(navMenu.classList.contains("Hidden")===true){
    navMenu.classList.remove("Hidden");
    console.log(e.target);
  } else{
    navMenu.classList.add("Hidden")
  }
}

function closeMenu(e){
  e.preventDefault();
  const navMenu = document.querySelector(".Nav-Drop-Down-Menu");
  if (e.target.classList.contains("Nav-Icon-Drop-Down")==false){
    navMenu.classList.add("Hidden");
  }
}

function darkSwitch(e){
  e.preventDefault()
  if(e.target.previousSibling.checked){
    e.target.previousSibling.checked = false;
    } else {
    e.target.previousSibling.checked = true;
    }
}

React.useEffect(() => {
    window.addEventListener('click', closeMenu);
   return () => {
     window.removeEventListener('click', closeMenu);
   };
 }, []);


  useEffect(() => {
      if (currentUser==null){
        return;
      } else {
        let email = currentUser.email;
        getUsername(email)
      }
  },[currentUser])
  return (
    
      <>
      <div className = "Log-In-Modal Hidden">
        <div className = "Log-In-Sidebar"></div>
        <div className = "Log-In-Main">
          <button className = "Log-In-Close-Modal" onClick = {closeLogIn}>X</button>
          <h3 className = "Log-In-Title">Login</h3>
          <div className = "Log-In-Inputs">
            <input ref = {displayRef} className = "Log-In-Username Hidden" placeholder = "Username"></input>
            <input ref = {emailRef} className = "sign Log-In-Email" placeholder = "Email"></input>
            <input ref = {passwordRef} className = "sign Log-In-Password" type = "password" placeholder = "Password"></input>
            <div className = "Log-In-Change-Modal-Parent"><span className = "Log-In-Change-Modal-Text">Already a user?</span>
              <button className = "Log-In-Change-Modal"onClick = {logIntoAccount}>LOG IN</button>
            </div>
          </div>
          <button className = "Log-In-Login"onClick = {handleLogin}>Log In</button>
          <button className = "Log-In-Signup Hidden" onClick = {testUsername}>Sign Up</button>
        </div>
        </div>
    
    <div className = "Nav-Header  Nav-Bar-Test">
      <Link to = "/"> 
        <img className = "Nav-Icon"src = {Icon}></img>
      </Link>
      <Link to = "/" className = "Title-Link"><h1 className = "Nav-Title">readit</h1></Link>
      <form className = "Nav-Search-Form">
        <img src = {magGlass} className = "Nav-Search-Image"></img>
        <input className = "Nav-Search" placeholder = "Search Readit" />
      </form>
        {currentUser!==null &&
        <div className = "Nav-Menu-Logged-In">
          <span className = "Nav-Menu-Logged-In-Name">/u{userName}</span>
          <Link to = "/Post">
            <img className = "Nav-Menu-Logged-In-Image" src = {post}></img>
          </Link>
          </div>
        }
        {currentUser == null && 
          <button className  = "Nav-Button Button-One" onClick = {logIntoAccount}>Log In</button>
        }
        {currentUser == null && 
          <button className = "Nav-Button Button-Two" onClick = {logIntoAccount}>Sign Up</button>
        }  
      
      <form className = "Nav-Drop-Down-Form" onClick = {showMenu}>
        <img src = {dropDown} className = "Nav-Icon-Drop-Down"></img>
        <img src = {downArrow} className = "Nav-Icon-Drop-Down"></img>
      </form>
      <div className = "Nav-Drop-Down-Menu Hidden">
        <h3 className = "Nav-Drop-Down-Header">View Options</h3>
        
        <form className = "Nav-Menu-Form">
          <img className = "Nav-Drop-Down-Moon" src = {moon}></img>
          <button className = "Nav-Drop-Down-Button">Dark Mode</button>
          <label className = "Dark-Mode-Switch">
            <input type = "checkbox"  className = "Slider-Input" ></input>
              <span onClick = {darkSwitch} className = "Dark-Mode-Slider"></span>
            </label>
          </form>
        <form className = "Nav-Menu-Form-Empty"></form>
        {currentUser!==null &&
         <form className = "Nav-Menu-Form Logs-Out">
            <img className = "Nav-Drop-Down-Logout" src = {logIn}></img>
            <button onClick = {handleLogout} className = "Nav-Drop-Down-Button Log-In-Button">Log Out</button>
          </form>
        }
        {currentUser==null && 
          <form className = "Nav-Menu-Form Logs-In">
            <img className = "Nav-Drop-Down-Login" src = {logIn}></img>
            <button onClick = {logIntoAccount} className = "Nav-Drop-Down-Button Log-In-Button">Log In/ Sign Up</button>
          </form>
        }
        </div>
      </div>

      </>
    ) 
  }
