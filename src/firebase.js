import firebase from "firebase";
// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDzablvtqNpTA28yzMDUGBPdF4HVnXZLkc",
  authDomain: "messenger-14c6d.firebaseapp.com",
  projectId: "messenger-14c6d",
  storageBucket: "messenger-14c6d.appspot.com",
  messagingSenderId: "714644730024",
  appId: "1:714644730024:web:58539d4a90b76818ad129d",
  measurementId: "G-2Z38NHCYCJ"
};

// const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);
// const auth=getAuth(firebaseApp);
// const provider = new GoogleAuthProvider();

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth= firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;