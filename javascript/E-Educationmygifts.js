const form = document.getElementById("workshopForm");

form.addEventListener("submit", function(e){

e.preventDefault();

let isValid = true;

const name = document.getElementById("name").value.trim();
const mobile = document.getElementById("mobile").value.trim();
const email = document.getElementById("email").value.trim();
const message = document.getElementById("message").value.trim();

document.querySelectorAll(".error").forEach(el => el.innerText = "");

if(name === ""){
document.getElementById("nameError").innerText="Name is required";
isValid=false;
}
else if(!/^[A-Za-z ]+$/.test(name)){
document.getElementById("nameError").innerText="Only letters allowed";
isValid=false;
}

if(mobile === ""){
document.getElementById("mobileError").innerText="Mobile number required";
isValid=false;
}
else if(!/^[6-9]\d{9}$/.test(mobile)){
document.getElementById("mobileError").innerText="Enter valid 10 digit number";
isValid=false;
}

if(email === ""){
document.getElementById("emailError").innerText="Email required";
isValid=false;
}
else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
document.getElementById("emailError").innerText="Enter valid email";
isValid=false;
}


if(message === ""){
document.getElementById("messageError").innerText="Message required";
isValid=false;
}

if(isValid){
alert("Form Submitted Successfully");
form.reset();
}

});