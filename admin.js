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

  // function to send school data to database
function writeUserData(userId, email, name, sid, contactNo, Lat, Long, addr1, addr2, state, country, zip, URL, desc, hostel, mess, ground, pskl, ss, tno, cno, nos) {
    firebase.database().ref('schools/' + userId).set({
      emailId: email,
      schoolName: name,
      sId : sid,
      phone : contactNo,
      location : {
          latitude : Lat,
          longitude : Long
      },
      addressL1 : addr1,
      addressL2 : addr2,
      state : state,
      //district : dist,
      country : country,
      zip : zip,
      sPhotoURL : URL,
      sDesc : desc,
      hostel : hostel,
      mess : mess,
      ground : ground,
      pSchool : pskl,
      sskl : ss,
      tno : tno,
      cno : cno,
      nos: nos
    });
  };

  function signout(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("successfully signed out");
      }).catch(function(error) {
        // An error happened.
        console.log("error signing out "+error.errorMessage);
      });
  }

  function radiocheck(name) {
    var node=document.getElementsByName(name);
        if (node[0].checked) {
           return node[0].value;
          }
          else{
            return node[1].value;
          }   
  }

        var button=document.getElementById("sphoto");
        var prog=document.getElementById("uploader");
        button.addEventListener('change', function(e){
            //get file
            console.log("listening, change detected");
            var file=e.target.files[0];
            //create a storage ref
            var userId=firebase.auth().currentUser.uid;
            var storageRef=firebase.storage().ref('school/'+userId+"/"+file.name);
            // upload file
            var task = storageRef.put(file);
            // update progress bar
            task.on('state_changed',function progress(snapshot){
                var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                prog.value=percentage;
            }, function error(err){
                console.log("error uploading "+err.errorMessage+" "+err.errorCode);
            }, function complete(){});
  
        });
    
   function update(){
    var user=firebase.auth().currentUser;   
    if (user) {
        // User is signed in.
        var userId=user.uid;
        var name=document.getElementById("sName").value;
        var email=user.email;
        var sid=document.getElementById("sId").value;
        var contactNo=document.getElementById("sContact").value;
        var Lat=document.getElementById("lat").value;
        var Long=document.getElementById("long").value;
        var addr1=document.getElementById("address").value;
        var addr2=document.getElementById("address2").value;
        var state=document.getElementById("state").value;
        //var dist=document.getElementById("dist").value;
        var country=document.getElementById("country").value;
        var zip=document.getElementById("zip").value;
        // file url needed
        var URL=document.getElementById("sphoto").value;
        var desc=document.getElementById("sdesc").value;
        var hostel=radiocheck("hostel");
        var mess=radiocheck("mess");
        var ground=radiocheck("ground");
        var pskl=radiocheck("pschool");
        var ss=radiocheck("sschool");
        var tno=document.getElementById("tteachers").value;
        var cno=document.getElementById("cr").value;
        var nos=document.getElementById("ns").value;
        writeUserData(userId, email, name, sid, contactNo, Lat, Long, addr1, addr2, state, country, zip, URL, desc, hostel, mess, ground, pskl, ss, tno, cno, nos);
        
      } else {
        // No user is signed in.
        console.log("no user signed in yar");
      }
  

   }

    