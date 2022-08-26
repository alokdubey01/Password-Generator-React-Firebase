import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyAYIET-IkUYC7c5jnfsWo9yu5VOBWauSfc",
  authDomain: "password-generator-b6da4.firebaseapp.com",
  databaseURL: "https://password-generator-b6da4-default-rtdb.firebaseio.com",
  projectId: "password-generator-b6da4",
  storageBucket: "password-generator-b6da4.appspot.com",
  messagingSenderId: "537656967193",
  appId: "1:537656967193:web:fbeaf7345acd5d06f46a88",
  measurementId: "G-2VDWZ89355",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const database = firebase.database();
export default firebase;
