// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");


hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    window.scrollTo(0, 0);
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow="auto";
    document.querySelector(".bottom-nav").style.display="flex";
  }
});

const submitReset=document.getElementById("createNewPassword");
const currentpassword=document.getElementById("currentpassword");
const newpassword=document.getElementById("newpassword");
const reenternew=document.getElementById("reenternew");

submitReset.addEventListener("click",()=>{
    let isValid = true;

    // hide all errors first
    document.getElementById("currentpassword-error").style.display = "none";
    document.getElementById("newpassword-error").style.display = "none";
    document.getElementById("reenternew-error").style.display = "none";

    const currentPassword="Rohan@12";
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if(currentpassword.value.trim()==="" || currentpassword.value.trim()!== currentPassword){
        document.getElementById("currentpassword-error").style.display="block";
        isValid=false;
    }
    if (newpassword.value.trim() === "") {
        document.getElementById("newpassword-error").innerHTML = "Enter new password";
        document.getElementById("newpassword-error").style.display = "block";
        isValid = false;
    } 
    else if (!strongPasswordRegex.test(newpassword.value.trim())) {
        document.getElementById("newpassword-error").innerHTML =
            "Password must contain at least one capital letter, one number, and one special character";
        document.getElementById("newpassword-error").style.display = "block";
        isValid = false;
    }
    else if(newpassword.value.trim()===currentPassword){
        document.getElementById("newpassword-error").innerHTML =
            "Password should not be same as the current password";
        document.getElementById("newpassword-error").style.display = "block";
        isValid = false;
    }
    if(reenternew.value.trim()===""){
        document.getElementById("reenternew-error").innerHTML="Enter the valid password";
        document.getElementById("reenternew-error").style.display="block";
        isValid = false;
    }
    else if(newpassword.value.trim()!==reenternew.value.trim()){
        document.getElementById("reenternew-error").innerHTML="Passwords are not matching"
        document.getElementById("reenternew-error").style.display="block";
        isValid = false;
    }

    
    if(isValid){
         alert("Password changed successfully!");
         window.location.href="../html/adminMyProfile.html"
    }
    
})
// SHOW / HIDE PASSWORD

const togglePasswordBtns = document.querySelectorAll(".toggle-password");

togglePasswordBtns.forEach((icon) => {

    icon.addEventListener("click", () => {

        const targetInput = document.getElementById(icon.dataset.target);

        if (targetInput.type === "password") {

            targetInput.type = "text";

            icon.src = "../assets/adminLogin/EyeSlash.svg";

        } 
        else {

            targetInput.type = "password";

            icon.src = "../assets/adminLogin/Eye.svg";

        }

    });

});
document.querySelector("#account-menu .mobile-dropdown:nth-child(7) .dropdown-header").classList.add("dropdown-header-active");
