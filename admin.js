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


  function loadUserData() {
    var user=firebase.auth().currentUser;
    //console.log(user.uid);
    if(user) {
      console.log("loading user data .....");
      console.log(user);
      // user signed in
      var userId=user.uid;
      console.log(userId);
      var database = firebase.database().ref("schools/"+userId);
      database.on("value", function(snapshot) {
        console.log(snapshot.val());
      
        document.getElementById("sName").value=snapshot.val().schoolName;
        document.getElementById("sEmail").value=user.email;
        document.getElementById("sId").value=snapshot.val().sId;
        document.getElementById("sContact").value=snapshot.val().phone;
        document.getElementById("lat").value=snapshot.val().location.latitude;
        document.getElementById("long").value=snapshot.val().location.longitude;
        // if(snapshot.val().addressL1){
        document.getElementById("address").value=snapshot.val().addressL1;
        document.getElementById("address2").value=snapshot.val().addressL2;
        document.getElementById("state").value=snapshot.val().state;
        document.getElementById("dist").value=snapshot.val().district;
        document.getElementById("country").value=snapshot.val().country;
        document.getElementById("zip").value=snapshot.val().zip;

        document.getElementById("tteachers").value=snapshot.val().tno;
        document.getElementById("cr").value=snapshot.val().cno;
        document.getElementById("ns").value=snapshot.val().nos;
        document.getElementById("tenclassstu").value=snapshot.val().tenth_stu;
        ebs=document.getElementById("ebs").value=snapshot.val().ebs;
        // file url needed
        //document.getElementById("sphoto").value=snapshot.val().sPhotoURL;
        document.getElementById("sdesc").value=snapshot.val().sDesc;
          if(snapshot.val().hostel=="yes"){
            document.getElementsByName("hostel")[0].checked=true;
          }
          else {
            document.getElementsByName("hostel")[1].checked=true;
          }

          if(snapshot.val().mess=="yes"){
            document.getElementsByName("mess")[0].checked=true;
          }
          else {
            document.getElementsByName("mess")[1].checked=true;
          }

          if(snapshot.val().ground=="yes"){
            document.getElementsByName("ground")[0].checked=true;
          }
          else {
            document.getElementsByName("ground")[1].checked=true;
          }

          if(snapshot.val().pSchool=="yes"){
            document.getElementsByName("pschool")[0].checked=true;
          }
          else {
            document.getElementsByClassName("pschool")[1].checked=true;
          }

          if(snapshot.val().sskl=="yes"){
            document.getElementsByName("sschool")[0].checked=true;
          }
          else {
            document.getElementsByName("sschool")[1].checked=true;
          }
        // }

     }, function (error) {
        console.log("Error: " + error.code);
     });

    } else {
      // no user signed in
      console.log("user not signed in");
    }
   }

   firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      loadUserData();
      // ...
    } else {
      // User is signed out.
      // ...
      console.log("user signin not detected");
    }
  });
  

   

  // function to send school data to database
function writeUserData(userId, email, name, sid, contactNo, Lat, Long, addr1, addr2, state, dist, country, zip, image, desc, hostel, mess, ground, pskl, ss, tno, cno, nos, ten_stu, ebs) {
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
      district : dist,
      country : country,
      zip : zip,
      sPhotoURL : image,
      sDesc : desc,
      hostel : hostel,
      mess : mess,
      ground : ground,
      pSchool : pskl,
      sskl : ss,
      tno : tno,
      cno : cno,
      nos: nos,
      tenth_stu : ten_stu,
      ebs : ebs
    });
  };

  function signout(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        swal({
          title: "Loged out!",
          text: "You will be redirected to Educating Blind home page.",
          icon: "success",
          button: "Continue",
        }).then(function(){
          window.location.href="/Blind-Web/index.html";
        });
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
  // upload school photo
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
  //  upload school photo end    
    
   function update(){
    var user=firebase.auth().currentUser;   
    console.log(user+"2");
    if (user) {
        // User is signed in.
        var userId=user.uid;
        
        // file url needed
        var storage = firebase.storage().ref('school/');
         var nam=document.getElementById("sphoto").files[0].name;
         console.log(nam);
        // var url=storage.child(userId+'/'+nam).getDownloadURL();
       
        storage.child(userId+'/'+nam).getDownloadURL().then(function(url) {
        var userId=firebase.auth().currentUser.uid;
        var name=document.getElementById("sName").value;
        var email=user.email;
        var sid=document.getElementById("sId").value;
        var contactNo=document.getElementById("sContact").value;
        var Lat=document.getElementById("lat").value;
        var Long=document.getElementById("long").value;
        var addr1=document.getElementById("address").value;
        var addr2=document.getElementById("address2").value;
        var state=document.getElementById("state").value;
        var dist=document.getElementById("dist").value;
        var country=document.getElementById("country").value;
        var zip=document.getElementById("zip").value;
          // `url` is the download URL for 'images/stars.jpg'
        
          // This can be downloaded directly:
          var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function(event) {
            var blob = xhr.response;
          };
          xhr.open('GET', url);
          xhr.send();
        
          // Or inserted into an <img> element:
          var img = document.getElementById('im');
          img.src = url;
          console.log(img.src);
          var image=document.getElementById('im').src;
        console.log(image);
        
        var desc=document.getElementById("sdesc").value;
        var hostel=radiocheck("hostel");
        var mess=radiocheck("mess");
        var ground=radiocheck("ground");
        var pskl=radiocheck("pschool");
        var ss=radiocheck("sschool");
        var tno=document.getElementById("tteachers").value;
        var cno=document.getElementById("cr").value;
        var nos=document.getElementById("ns").value;
        var ten_stu=document.getElementById("tenclassstu").value;
        var ebs=document.getElementById("ebs").value;
        writeUserData(userId, email, name, sid, contactNo, Lat, Long, addr1, addr2, state, dist, country, zip, image, desc, hostel, mess, ground, pskl, ss, tno, cno, nos, ten_stu, ebs);
        $('#success').modal('show');
        }).catch(function(error) {
          // Handle any errors
          window.alert("failure");
        });

        // console.log(url);
        // var image=url.i;
        
        
      } else {
        // No user is signed in.
        window.alert("no user signed in. Please sign in");
        console.log("no user signed in yet");
      }
  

   }

  
    