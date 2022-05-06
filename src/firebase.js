import firebase from "firebase";
import { initializeApp } from "firebase/app";
import "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDZT__cOhrli0njj7yQCkew0Q0hsuam4uk",
  authDomain: "snapchat-clone-ddb48.firebaseapp.com",
  projectId: "snapchat-clone-ddb48",
  storageBucket: "snapchat-clone-ddb48.appspot.com",
  messagingSenderId: "615730404657",
  appId: "1:615730404657:web:71dc8941f1e464b5a02410",
  measurementId: "G-B38LL4NLJ6",
};

const firebaseApp = initializeApp(firebaseConfig);
// const db = firebase.firestore(firebaseApp);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
