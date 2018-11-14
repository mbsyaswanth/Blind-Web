var maintext=document.getElementById("txt");
var submit=document.getElementById("234");


function sub(){
    window.alert("hey");
    var firebaseRef= firebase.database().ref();
    firebaseRef.child("test").set("value");
}