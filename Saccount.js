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
// function to create a account in the authentication database
  function createAccount() {
  var email=document.getElementById("Semail").value;
  var password=document.getElementById("Spassword").value;
// actual firebase method that creates a account
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
        console.log("error creating account"+errorCode);
  });
}
// function to send school data to database
function writeUserData(userId, email, name, sid, contactNo, Lat, Long) {
    firebase.database().ref('schools/' + userId).set({
      emailId: email,
      schoolName: name,
      sId : sid,
      phone : contactNo,
      location : {
          latitude : Lat,
          longitude : Long
      }
    });
  }
// function that observes for change in authentication state 
firebase.auth().onAuthStateChanged(function(user) {
    // send user the verification email
    if (user) {
      // User is signed in.
      user.sendEmailVerification().then(function() {
        // Email sent.
        window.alert("An email has been sent to your account. Please verify your Account and login using link provided.");
      }).catch(function(error) {
        // An error happened.
        console.log("there is some error " + error.errorMessage);
      });
      var userId=user.uid;
      var name=document.getElementById("Sname").value;
      var email=user.email;
      var sid=document.getElementById("Sid").value;
      var contactNo=document.getElementById("Scontact").value;
      var Lat=document.getElementById("Slat").value;
      var Long=document.getElementById("Slong").value;
      writeUserData(userId, email, name, sid, contactNo, Lat, Long);
      //signout of this account
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
    } else {
      // No user is signed in.
      console.log("no user signed in yar");
    }
  });