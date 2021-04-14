import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);


function App() {
  const [user, setUser] = useState({});
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  
  const handleGoogleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
  .then((result) => {
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    setUser(user);
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorCode, errorMessage)
  });
  }

  const handleFacebookSignIn = () => {
    firebase.auth().signInWithPopup(facebookProvider)
    .then((result) => {
      var credential = result.credential;
      var user = result.user;
      var accessToken = credential.accessToken;
      console.log(user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorMessage);
    });
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign in using google</button>
      <br/>
      <button onClick={handleFacebookSignIn}>Sign in using facebook</button>
      <h2>{user.displayName}</h2>
      <h3>Email : {user.email}</h3>
      <img src={user.photoURL} alt=""/>
    </div>
  );
}

export default App;
