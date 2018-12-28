// Initialize Firebase
var config = {
    apiKey: "AIzaSyB5AkS01wbDGgvFQ5k2XxMHARL4PC8yAA8",
    authDomain: "webdemo-542bb.firebaseapp.com",
    databaseURL: "https://webdemo-542bb.firebaseio.com",
    projectId: "webdemo-542bb",
    storageBucket: "webdemo-542bb.appspot.com",
    messagingSenderId: "346052208882"
  };
  firebase.initializeApp(config);
  function checkcredentials(){
    var email=document.getElementById("inputEmail").value;
    var password=document.getElementById("inputPassword").value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("error signing in "+errorCode+" "+errorMessage);
      // ...
     window.alert("error signing in : "+errorMessage);
    });
    //identify if user is signed in and redirect
    firebase.auth().onAuthStateChanged(function(user) {
      // send user the verification email
      if (user) {
        // User is signed in.
        window.location="adminhome.html";
      } else {
        // No user is signed in.
        console.log("no user signed in yet");
      }
    });
  }
  