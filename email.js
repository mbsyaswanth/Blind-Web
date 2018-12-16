function mail(){
    var name=document.getElementById('name').value;
    var semail=document.getElementById('InputEmail1').value;
    var sphone=document.getElementById('phone').value;
    var dob=document.getElementById('dob').value;
    var pcs=document.getElementById('pcs').value;
    var gname=document.getElementById('gname').value;
    var gemail=document.getElementById('gemail').value;
    var gphone=document.getElementById('gphone').value;
    var schoolname=document.getElementById("stateSelect").value;
    console.log(schoolname);
    var mail=school[schoolname];
    var msg='A new student wants to join your school. The following are his details';
    msg+="<br/><hr><table><tr><td>Name of Student</td><td>: "+name+"</td></tr><tr><td>Email Address</td>";
    msg+="<td>: "+semail+"</td></tr><tr><td>Phone No. of Student</td><td>: "+sphone+"</td></tr>";
    msg+="<tr><td>D.O.B of Student</td><td>: "+dob+"</td></tr><tr><td>Preferred Class Of Study</td><td>: "+pcs+"</td></tr>";
    msg+="<tr><td>Name of Gaurdian</td><td>: "+gname+"</td></tr><tr><td>Email Address of Gaurdian</td><td>: "+gemail+"</td></tr>";
    msg+="<tr><td>Phone No. of Gaurdian</td><td>: "+gphone+"</td></tr></table>";
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "mbs.yaswanth@gmail.com",
        Password : "0fca9467-93db-4c53-b4bc-1007fe6a53e9",
        To : mail,
        From : "mbs.yaswanth@gmail.com",
        Subject : "This is the subject testing",
        Body : msg
    }).then(
      message => alert(message)
    );
}