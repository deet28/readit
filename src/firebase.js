import { useState,useEffect } from 'react'
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';

const firebaseConfig = { 
  apiKey: "AIzaSyCrn1AYQfGg-Cavjc8JctS8DPbpyGLIJaY",
  authDomain: "readit-10a97.firebaseapp.com",
  projectId: "readit-10a97",
  storageBucket: "readit-10a97.appspot.com",
  messagingSenderId: "840175739296",
  appId: "1:840175739296:web:d9f62b586f183649fd04c5"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const auth = getAuth();

export function signup(email,password){
  return createUserWithEmailAndPassword(auth,email,password);
}
export function login(email,password){
  return signInWithEmailAndPassword(auth,email,password);
}

export function logout(){
  return signOut(auth);
}

export function useAuth(){
  const [ currentUser,setCurrentUser ] = useState();

  useEffect(() =>{
    const unsub = onAuthStateChanged(auth,user=>{ setCurrentUser(user)})
    return unsub;
  },[])
  return currentUser;
}

