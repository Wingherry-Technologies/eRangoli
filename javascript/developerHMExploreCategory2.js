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
/* OPEN MODAL */
btnAddNewECTwo.addEventListener("click", () => {
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