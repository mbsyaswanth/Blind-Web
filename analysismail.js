function maillink(){
    var mail=document.getElementById("sendAnalyEmail").value;
    console.log("to email:"+mail);
    var msg='Here is the blind schools analysis link  http://arcg.is/1XOLCr';
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "educatingblind@gmail.com",
        Password : "25d349c3-ab0c-4921-a27c-f27c1ec3095e",
        To : mail,
        From : "educatingblind@gmail.com",
        Subject : "You requested for analysis link from Educating Blind",
        Body : msg
    }).then(
      message => console.log(message)
    );
}
// smtp.elasticemail.com
// 0fca9467-93db-4c53-b4bc-1007fe6a53e9