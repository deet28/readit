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


//export const firestoreFieldValue = firebase.firestore.FieldValue;
//export const timestamp = firebase.firestore.FieldValue.serverTimestamp();
//export const auth = firebase.auth();
//export const firestore = firebase.firestore();
//export const storageRef = firebase.storage().ref();
//export const storage = firebase.storage();
//
//export function getFirebaseConfig() {
//  if (!config || !config.apiKey) {
//    throw new Error('No Firebase configuration object provided.' + '\n' +
//    'Add your web app\'s configuration object to firebase-config.js');
//  } else {
//    return config;
//  }
//}