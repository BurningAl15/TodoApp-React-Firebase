import firebase from "firebase";

//We initialize the app to firebase by giving our credentials
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCdMZSBCS-guWppFxnskAok25dmaHroJh8",
  authDomain: "todo-app-cp-67cb0.firebaseapp.com",
  databaseURL: "https://todo-app-cp-67cb0.firebaseio.com",
  projectId: "todo-app-cp-67cb0",
  storageBucket: "todo-app-cp-67cb0.appspot.com",
  messagingSenderId: "713301287718",
  appId: "1:713301287718:web:e4bd672bedc5c9005c17e7",
  measurementId: "G-C2TXT4LYG0",
});

//Store this in the variable db
const db=firebaseApp.firestore();

export default db;