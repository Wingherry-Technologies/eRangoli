
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

