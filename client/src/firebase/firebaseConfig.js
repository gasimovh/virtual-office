import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDX8_LxG0HgravaGsz3-79xyjC4GIzzsHI",
  authDomain: "vioc-664eb.firebaseapp.com",
  databaseURL: "https://vioc-664eb.firebaseio.com",
  projectId: "vioc-664eb",
  storageBucket: "gs://vioc-664eb.appspot.com",
  messagingSenderId: "345419060284",
  appId: "1:345419060284:web:5ab433ae25c505c6121f39",
  measurementId: "G-CZX9CMN71H"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();
// const auth = firebase.auth();

firebase.analytics();

//fixes the err
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebase.firestore();
