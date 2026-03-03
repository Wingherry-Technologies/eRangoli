// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon = document.querySelector("#hamburger-menu>img");
var mobileBack = document.querySelector(".mobile-back-button");
const plusIcon=document.querySelector(".ECTwo-floating-add-btn");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display = "none";
    document.querySelector("body").style.overflow = "hidden";
    window.scrollTo(0, 0);
    mobileBack.style.display = "none";
    plusIcon.style.display="none";

  } else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".bottom-nav").style.display = "flex";
    mobileBack.style.display = "flex";
    plusIcon.style.display="flex";
  }
});

const modalOverlayECTwo = document.getElementById("modalOverlayECTwo");
const modalCloseECTwo = document.getElementById("modalCloseECTwo");
const modalSaveBtnECTwo = document.getElementById("modalSaveBtnECTwo");
const imageUploadECTwo = document.getElementById("imageUploadECTwo");
const uploadBoxECTwo = document.getElementById("uploadBoxECTwo");
const labelInputECTwo = document.getElementById("labelInputECTwo");
const ctaInputECTwo = document.getElementById("ctaInputECTwo");
const imageErrorECTwo = document.getElementById("imageErrorECTwo");
const labelErrorECTwo = document.getElementById("labelErrorECTwo");
const ctaErrorECTwo = document.getElementById("ctaErrorECTwo");
const floatingAddBtnECTwo = document.querySelector(".ECTwo-floating-add-btn");
/* OPEN MODAL */
btnAddNewECTwo.addEventListener("click", () => {
    modalOverlayECTwo.style.display = "flex";
    document.body.classList.add("bodyModalOpenECTwo");
});

floatingAddBtnECTwo.addEventListener("click", () => {
    modalOverlayECTwo.style.display = "flex";
    document.body.classList.add("bodyModalOpenECTwo");
});
/* CLOSE MODAL */
modalCloseECTwo.addEventListener("click", closeModalECTwo);


/* CLICK OUTSIDE CLOSE */
modalOverlayECTwo.addEventListener("click", (e) => {
    if(e.target === modalOverlayECTwo){
       closeModalECTwo();
    }
});

// upload click handler
uploadBoxECTwo.addEventListener("click",()=>{
    imageUploadECTwo.click();
});

// 
let uploadedFileECTwo = null;
imageUploadECTwo.addEventListener("change",(e)=>{
    const file = e.target.files[0];
    if(!file) return;
    /* SIZE VALIDATION */
    if(file.size > 2 * 1024 * 1024){
        showError(imageErrorECTwo,"Image must be less than 2MB");
        return;
    }
    uploadedFileECTwo = file;
    hideError(imageErrorECTwo);

    /* REMOVE OLD PREVIEW IF EXISTS */
    const oldImg = uploadBoxECTwo.querySelector("img");
    if(oldImg) oldImg.remove();

    /* CREATE PREVIEW */
    const img = document.createElement("img");
    img.className = "uploadPreviewImgECTwo";

    img.src = URL.createObjectURL(file);

    uploadBoxECTwo.appendChild(img);

    /* HIDE TEXT */
    uploadTextECTwo.style.display = "none";

});

labelInputECTwo.addEventListener("blur",()=>{
    if(labelInputECTwo.value.trim() === ""){
        showError(labelErrorECTwo,"Label is required");
        labelInputECTwo.classList.add("inputErrorECTwo");
    }else{
        hideError(labelErrorECTwo);
        labelInputECTwo.classList.remove("inputErrorECTwo");
    }
});

ctaInputECTwo.addEventListener("blur",()=>{
    if(ctaInputECTwo.value.trim() === ""){
        showError(ctaErrorECTwo,"CTA link is required");
        ctaInputECTwo.classList.add("inputErrorECTwo");
    }else{
        hideError(ctaErrorECTwo);
        ctaInputECTwo.classList.remove("inputErrorECTwo");
    }
});

// save button for pop up 
modalSaveBtnECTwo.addEventListener("click",()=>{

    let valid = true;

    if(!uploadedFileECTwo){
        showError(imageErrorECTwo,"Image is required");
        valid = false;
    }

    if(labelInputECTwo.value.trim() === ""){
        showError(labelErrorECTwo,"Label is required");
        labelInputECTwo.classList.add("inputErrorECTwo");
        valid = false;
    }

    if(ctaInputECTwo.value.trim() === ""){
        showError(ctaErrorECTwo,"CTA link is required");
        ctaInputECTwo.classList.add("inputErrorECTwo");
        valid = false;
    }

    if(!valid) return;

    /* SUCCESS → CLOSE + RESET */
    closeModalECTwo();

});

function closeModalECTwo(){
    modalOverlayECTwo.style.display = "none";
    document.body.classList.remove("bodyModalOpenECTwo");
    resetModalFormECTwo();
}
function resetModalFormECTwo(){

    /* INPUT RESET */
    labelInputECTwo.value = "";
    ctaInputECTwo.value = "";

    /* FILE RESET */
    uploadedFileECTwo = null;
    imageUploadECTwo.value = "";

    /* REMOVE IMAGE PREVIEW */
    const oldImg = uploadBoxECTwo.querySelector("img");
    if(oldImg) oldImg.remove();

    /* SHOW UPLOAD TEXT AGAIN */
    uploadTextECTwo.style.display = "block";

    /* CLEAR ERRORS */
    hideError(imageErrorECTwo);
    hideError(labelErrorECTwo);
    hideError(ctaErrorECTwo);

    /* REMOVE ERROR BORDERS */
    labelInputECTwo.classList.remove("inputErrorECTwo");
    ctaInputECTwo.classList.remove("inputErrorECTwo");
}

function showError(el,msg){
    el.style.display = "block";
    el.innerText = msg;
}

function hideError(el){
    el.style.display = "none";
}

document
  .querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(4)")
  ?.classList.add("sidebar-active");

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(4) .dropdown-header")
  ?.classList.add("dropdown-header-active");