import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

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
