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

const provider = new firebase.auth.GoogleAuthProvider();

export const googleSigninFunc = () => {
  firebase.auth().signInWithPopup(provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = result.credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    
    console.log({
      'Token': token,
      'User': user
    })
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    console.log({
      'Error code ': errorCode,
      'Error Message': errorMessage,
      'Error email': email,
      'Error credential': credential
    })
    // ...
  });
}  

  

export default firebase;