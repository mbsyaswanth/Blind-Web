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
        swal({
          title: "Error creating account",
          text: errorCode,
          icon: "error",
        });
        //window.alert("error creating account :"+errorMessage);
  });
  // var user=firebase.auth().currentUser; 
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      writeTodb();
    } else {
      // User is signed out.
      // ...
    }
  });
  // if(user){
  // //user signed in
  // writeTodb();
  // } else{
  // // no user signed in
  // }
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
    }).then(function(){
      //signout of this account
      
     swal({
      title: "Good job! You are successfully registered with us.",
      text: " You are one step behind for getting featured on Educating Blind. Go ahead and tell us more about your school in the next page.",
      icon: "success",
      button:"continue",
    }).then(function(){
      window.location.href="adminhome.html";
    });
    //  firebase.auth().signOut().then(function() {
    //   // Sign-out successful.
    //   alert("sign out successful");
    // }).catch(function(error) {
    //   // An error happened.
    // });
    }).catch(function(error){
      alert("failed to write data");
    });
  }
// function that observes for change in authentication state 
function writeTodb() {
    var user=firebase.auth().currentUser;
    if (user) {
      // User is signed in.
      var userId=user.uid;
      var name=document.getElementById("Sname").value;
      var email=user.email;
      var sid=document.getElementById("Sid").value;
      var contactNo=document.getElementById("Scontact").value;
      var Lat=document.getElementById("Slat").value;
      var Long=document.getElementById("Slong").value;
      writeUserData(userId, email, name, sid, contactNo, Lat, Long);
    } else {
      // No user is signed in.
      console.log("no user signed in yar");
      return false;
    }
  }