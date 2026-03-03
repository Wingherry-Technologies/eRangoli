// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon = document.querySelector("#hamburger-menu>img");
var mobileBack = document.querySelector(".mobile-back-button");
const plusIcon=document.querySelector(".ECOne-floating-add-btn");

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

const modalOverlayECOne = document.getElementById("modalOverlayECOne");
const modalCloseECOne = document.getElementById("modalCloseECOne");
const modalSaveBtnECOne = document.getElementById("modalSaveBtnECOne");
const imageUploadECOne = document.getElementById("imageUploadECOne");
const uploadBoxECOne = document.getElementById("uploadBoxECOne");
const labelInputECOne = document.getElementById("labelInputECOne");
const ctaInputECOne = document.getElementById("ctaInputECOne");
const imageErrorECOne = document.getElementById("imageErrorECOne");
const labelErrorECOne = document.getElementById("labelErrorECOne");
const ctaErrorECOne = document.getElementById("ctaErrorECOne");
const floatingAddBtnECOne = document.querySelector(".ECOne-floating-add-btn");
/* OPEN MODAL */
btnAddNewECOne.addEventListener("click", () => {
    modalOverlayECOne.style.display = "flex";
    document.body.classList.add("bodyModalOpenECOne");
});

floatingAddBtnECOne.addEventListener("click", () => {
    modalOverlayECOne.style.display = "flex";
    document.body.classList.add("bodyModalOpenECOne");
});
/* CLOSE MODAL */
modalCloseECOne.addEventListener("click", closeModalECOne);


/* CLICK OUTSIDE CLOSE */
modalOverlayECOne.addEventListener("click", (e) => {
    if(e.target === modalOverlayECOne){
       closeModalECOne();
    }
});

// upload click handler
uploadBoxECOne.addEventListener("click",()=>{
    imageUploadECOne.click();
});

// 
let uploadedFileECOne = null;
imageUploadECOne.addEventListener("change",(e)=>{
    const file = e.target.files[0];
    if(!file) return;
    /* SIZE VALIDATION */
    if(file.size > 2 * 1024 * 1024){
        showError(imageErrorECOne,"Image must be less than 2MB");
        return;
    }
    uploadedFileECOne = file;
    hideError(imageErrorECOne);

    /* REMOVE OLD PREVIEW IF EXISTS */
    const oldImg = uploadBoxECOne.querySelector("img");
    if(oldImg) oldImg.remove();

    /* CREATE PREVIEW */
    const img = document.createElement("img");
    img.className = "uploadPreviewImgECOne";

    img.src = URL.createObjectURL(file);

    uploadBoxECOne.appendChild(img);

    /* HIDE TEXT */
    uploadTextECOne.style.display = "none";

});

labelInputECOne.addEventListener("blur",()=>{
    if(labelInputECOne.value.trim() === ""){
        showError(labelErrorECOne,"Label is required");
        labelInputECOne.classList.add("inputErrorECOne");
    }else{
        hideError(labelErrorECOne);
        labelInputECOne.classList.remove("inputErrorECOne");
    }
});

ctaInputECOne.addEventListener("blur",()=>{
    if(ctaInputECOne.value.trim() === ""){
        showError(ctaErrorECOne,"CTA link is required");
        ctaInputECOne.classList.add("inputErrorECOne");
    }else{
        hideError(ctaErrorECOne);
        ctaInputECOne.classList.remove("inputErrorECOne");
    }
});

// save button for pop up 
modalSaveBtnECOne.addEventListener("click",()=>{

    let valid = true;

    if(!uploadedFileECOne){
        showError(imageErrorECOne,"Image is required");
        valid = false;
    }

    if(labelInputECOne.value.trim() === ""){
        showError(labelErrorECOne,"Label is required");
        labelInputECOne.classList.add("inputErrorECOne");
        valid = false;
    }

    if(ctaInputECOne.value.trim() === ""){
        showError(ctaErrorECOne,"CTA link is required");
        ctaInputECOne.classList.add("inputErrorECOne");
        valid = false;
    }

    if(!valid) return;

    /* SUCCESS → CLOSE + RESET */
    closeModalECOne();

});

function closeModalECOne(){
    modalOverlayECOne.style.display = "none";
    document.body.classList.remove("bodyModalOpenECOne");
    resetModalFormECOne();
}
function resetModalFormECOne(){

    /* INPUT RESET */
    labelInputECOne.value = "";
    ctaInputECOne.value = "";

    /* FILE RESET */
    uploadedFileECOne = null;
    imageUploadECOne.value = "";

    /* REMOVE IMAGE PREVIEW */
    const oldImg = uploadBoxECOne.querySelector("img");
    if(oldImg) oldImg.remove();

    /* SHOW UPLOAD TEXT AGAIN */
    uploadTextECOne.style.display = "block";

    /* CLEAR ERRORS */
    hideError(imageErrorECOne);
    hideError(labelErrorECOne);
    hideError(ctaErrorECOne);

    /* REMOVE ERROR BORDERS */
    labelInputECOne.classList.remove("inputErrorECOne");
    ctaInputECOne.classList.remove("inputErrorECOne");
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

