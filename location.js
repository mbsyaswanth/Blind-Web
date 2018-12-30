

function getLocation(){
    console.log("you called get location");
  var startPos;
  var geoOptions = {
     timeout: 10 * 1000,
     maximumAge: 1 * 60 * 1000
     
  }
  var geoSuccess = function(position) {
    // Do magic with location
    startPos = position;
    document.getElementById('lat').value = startPos.coords.latitude;
    document.getElementById('long').value = startPos.coords.longitude;
   // document.getElementById("location").value="location captured";
  };
  var geoError = function(error) {
    switch(error.code) {
      case error.TIMEOUT:
        // The user didn't accept the callout
        console.log("there is some problem to capture location");
        break;
    }
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions)
}

function SgetLocation(){
  console.log("you called get slocation");
var startPos;
var geoOptions = {
   timeout: 10 * 1000,
   maximumAge: 1 * 60 * 1000
   
}
var geoSuccess = function(position) {
  // Do magic with location
  startPos = position;
  document.getElementById('Slat').value = startPos.coords.latitude;
  document.getElementById('Slong').value = startPos.coords.longitude;
};
var geoError = function(error) {
  switch(error.code) {
    case error.TIMEOUT:
      // The user didn't accept the callout
      console.log("there is some problem to capture location");
      break;
  }
};

navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions)
}

