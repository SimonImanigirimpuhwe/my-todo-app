import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBcfEkTiQdYLO1Falfkq-7PGl7Ufgv27uA",
    authDomain: "my-web-app-dbb3b.firebaseapp.com",
    databaseURL: "https://my-web-app-dbb3b.firebaseio.com",
    projectId: "my-web-app-dbb3b",
    storageBucket: "my-web-app-dbb3b.appspot.com",
    messagingSenderId: "989400992622",
    appId: "1:989400992622:web:b3e4c9aa54af9192484f7f",
    measurementId: "G-4CBRL6TCK6"
  };

firebase.initializeApp(firebaseConfig);
firebase.firestore();



  

export default firebase;