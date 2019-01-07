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
  var database = firebase.database().ref('schools/');
  
  database.on("child_added", function(data, prevChildKey) {
    console.log("child added");
     console.log(data.val());
     console.log(data.ref.key);     
     var newSchool = data.val();
     if(newSchool.sPhotoURL){
     var card="<div class='cardi'><img class='card-img-top' src='"+newSchool.sPhotoURL+"' alt='Card image cap'><div class='card-body'><h5 class='card-title' style='margin-bottom:0px;'>";
     card=card+newSchool.schoolName;
     card+="</h5><small><i class='material-icons' style='font-size:15px;'>location_on </i>"+newSchool.district+", "+newSchool.state;
     card+= '</small><p class="card-text">'+newSchool.sDesc+'</p><a href="#" class="btn btn-primary pos" data-toggle="modal" data-target="#d'+newSchool.sId+'">More Details</a></div>'; 
     card+= ' <div class="modal fade" id="d'+newSchool.sId+'" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header">';
     card+='<div class="modal-title"><h5 class="modal-title" id="exampleModalCenterTitle">'+newSchool.schoolName+'</h5><small> <i class="material-icons" style="font-size:15px;">location_on</i>'+newSchool.district+', '+newSchool.state+'</small></div>';
     card+='<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
     card+='<div class="modal-body"><div class="card"><img class="img-fluid" src="'+newSchool.sPhotoURL+'" alt="Card image cap"><div class="card-body"><div class="container">';
     card+='<h6>Facilities</h6><hr><div class="row"><div class="col-sm-4 p">Hostel</div><div class="col-sm-2">'+newSchool.hostel+'</div> <div class="col-sm-4 p">Food</div><div class="col-sm-2">'+newSchool.mess+'</div></div>';  
     card+='<div class="row"><div class="col-sm-4 p">Playground</div><div class="col-sm-2">'+newSchool.ground+'</div><div class="col-sm-4 p">Primary School</div> <div class="col-sm-2">'+newSchool.pSchool+'</div></div>';   
     card+='<div class="row"><div class="col-sm-6 p">Secondary School</div><div class="col-sm-6">'+newSchool.sskl+'</div> </div><div class="row"> <div class="col-sm-6 p">No. of Class Rooms.</div><div class="col-sm-6">'+newSchool.cno+'</div></div><div class="row"><div class="col-sm-6 p">No. of Teachers </div><div class="col-sm-6">'+newSchool.tno+'</div></div>';
     card+='<hr><h6>About School</h6> <hr> <div><p id="sdesc">'+newSchool.sDesc+'</p></div><hr>';
     card+='</div></div></div></div><div class="modal-footer"><button type="button"';
     card+='onclick="document.getElementById(&apos;schoolEmail&apos;).value=&apos;'+newSchool.emailId+'&apos;" id="stateabbr" class="btn btn-primary" data-toggle="modal" data-target="#continue">Apply</button><button type="button" class="btn btn-secondary" data-dismiss="modal">';
     card+='Close</button></div></div></div></div></div>';
     document.getElementById('hold').innerHTML+=card;  }
  });
 