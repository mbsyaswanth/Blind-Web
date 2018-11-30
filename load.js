function loadDoc(id,file) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById(id).innerHTML = this.responseText;
    }
  };
  console.log("load function called");
  xhttp.open("GET", file, true);
  xhttp.send();
}