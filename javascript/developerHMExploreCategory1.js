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
const imageListContainerECOne = document.querySelector(".sectionImageListECOne");
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

    /* TYPE VALIDATION */
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if(!allowedTypes.includes(file.type)){
        showError(imageErrorECOne,"Only JPG, PNG or WEBP images are allowed");
        imageUploadECOne.value = "";
        return;
    }

    /* SIZE VALIDATION */
    if(file.size > 2 * 1024 * 1024){
        showError(imageErrorECOne,"Image must be less than 2MB");
        return;
    }

    uploadedFileECOne = file;
    hideError(imageErrorECOne);

    /* REMOVE OLD PREVIEW */
    const oldImg = uploadBoxECOne.querySelector("img");
    if(oldImg) oldImg.remove();

    const oldRemoveBtn = uploadBoxECOne.querySelector(".removeImageBtnECOne");
    if(oldRemoveBtn) oldRemoveBtn.remove();

    /* CREATE PREVIEW */
    const img = document.createElement("img");
    img.className = "uploadPreviewImgECOne";
    img.src = URL.createObjectURL(file);

    /* CREATE REMOVE BUTTON */
    const removeBtn = document.createElement("div");
    removeBtn.className = "removeImageBtnECOne";
    removeBtn.innerHTML = "✕";

    removeBtn.addEventListener("click",(e)=>{
        e.stopPropagation();
        uploadedFileECOne = null;
        imageUploadECOne.value = "";
        img.remove();
        removeBtn.remove();
        uploadTextECOne.style.display = "block";
    });

    uploadBoxECOne.appendChild(img);
    uploadBoxECOne.appendChild(removeBtn);

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
    const value = ctaInputECOne.value.trim();

    if(value === ""){
        showError(ctaErrorECOne,"CTA link is required");
        ctaInputECOne.classList.add("inputErrorECOne");
    }
    else if(!isValidURL(value)){
        showError(ctaErrorECOne,"Enter valid URL (https://example.com)");
        ctaInputECOne.classList.add("inputErrorECOne");
    }
    else{
        hideError(ctaErrorECOne);
        ctaInputECOne.classList.remove("inputErrorECOne");
    }
});

function isValidURL(url) {
    const pattern = new RegExp(
        '^(https?:\\/\\/)' +                 // require http or https
        '((([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}))' + // domain
        '(\\/[^\\s]*)?$'                      // optional path
    );
    return pattern.test(url);
}

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

const ctaValue = ctaInputECOne.value.trim();

if(ctaValue === ""){
    showError(ctaErrorECOne,"CTA link is required");
    ctaInputECOne.classList.add("inputErrorECOne");
    valid = false;
}
else if(!isValidURL(ctaValue)){
    showError(ctaErrorECOne,"Enter valid URL (https://example.com)");
    ctaInputECOne.classList.add("inputErrorECOne");
    valid = false;
}

    if(!valid) return;

    /* SUCCESS → CLOSE + RESET */
    addNewImageCardECOne();
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
    const oldRemoveBtn = uploadBoxECOne.querySelector(".removeImageBtnECOne");
if(oldRemoveBtn) oldRemoveBtn.remove();

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
function addNewImageCardECOne(){

    // Count existing cards
    const existingCards = document.querySelectorAll(".cardImageItemECOne");
    const newIndex = existingCards.length + 1;

    // Create main card div
    const card = document.createElement("div");
    card.className = "cardImageItemECOne";
    card.id = "cardImageItem" + newIndex + "ECOne";

    // Create image URL
    const imageURL = URL.createObjectURL(uploadedFileECOne);

    card.innerHTML = `
        <div class="headerCardItemECOne">
            <span class="iconEditECOne">
                <img src="../assets/developerHMExplorecategory1/Notches.svg" />
            </span>
            <span class="textImageNumECOne">Image ${newIndex}</span>
            <button class="btnMenuECOne">
                <img src="../assets/developerHMExplorecategory1/DotsThreeOutlineVertical.svg" />
            </button>
        </div>

        <div class="bodyCardItemECOne">
            <img src="${imageURL}" class="thumbImageECOne" />
            
            <div class="infoCardItemECOne">
                <span class="labelItemECOne">Label</span>
                <span class="valueItemECOne">${labelInputECOne.value}</span>
                <span class="statusTextECOne">Active status</span>
            </div>

            <label class="toggleSwitchECOne">
                <input type="checkbox" class="toggleInputECOne"  />
                <span class="sliderECOne"></span>
            </label>
        </div>
    `;

    // Append to container
    imageListContainerECOne.appendChild(card);
}


const cardActionMenuECOne = document.getElementById("cardActionMenuECOne");
let selectedCardECOne = null;

/* OPEN MENU */
document.addEventListener("click", function(e){

    // if clicked on three dot button
    const menuBtn = e.target.closest(".btnMenuECOne");

    if(menuBtn){
        e.stopPropagation();

        selectedCardECOne = menuBtn.closest(".cardImageItemECOne");

        const rect = menuBtn.getBoundingClientRect();

        cardActionMenuECOne.style.top = rect.bottom + window.scrollY + "px";
        cardActionMenuECOne.style.left = rect.left + window.scrollX - 150 + "px";

        cardActionMenuECOne.style.display = "block";
    }
    else{
        cardActionMenuECOne.style.display = "none";
    }
});

document.querySelector(".deleteActionECOne")
.addEventListener("click", function(){

    if(selectedCardECOne){
        selectedCardECOne.remove();
        cardActionMenuECOne.style.display = "none";
        updateImageNumbersECOne();
    }
});
document.querySelector(".editActionECOne")
.addEventListener("click", function(){

    if(!selectedCardECOne) return;

    const labelValue = selectedCardECOne
        .querySelector(".valueItemECOne")
        .innerText;

    labelInputECOne.value = labelValue;

    modalOverlayECOne.style.display = "flex";
    document.body.classList.add("bodyModalOpenECOne");

    cardActionMenuECOne.style.display = "none";
});
function updateImageNumbersECOne(){
    const cards = document.querySelectorAll(".cardImageItemECOne");

    cards.forEach((card,index)=>{
        const numberText = card.querySelector(".textImageNumECOne");
        numberText.innerText = "Image " + (index + 1);
    });
}

const publishBtnECOne = document.getElementById("btnPublishECOne");
const successModalECOne = document.getElementById("publishSuccessModalECOne");
const errorToastECOne = document.getElementById("publishErrorToastECOne");
const errorTextECOne = document.getElementById("publishErrorTextECOne");
const closeToastECOne = document.getElementById("closeToastECOne");

publishBtnECOne.addEventListener("click", function(){

    const cards = document.querySelectorAll(".cardImageItemECOne");

    // If no cards
    if(cards.length === 0){
        showPublishError("At least 4 images must be added.");
        return;
    }

    // If not exactly 4 cards
    if(cards.length !== 4){
        showPublishError("Exactly 4 images must be present to publish.");
        return;
    }

    // Count checked toggles
    let checkedCount = 0;
    cards.forEach(card=>{
        const toggle = card.querySelector(".toggleInputECOne");
        if(toggle.checked){
            checkedCount++;
        }
    });

    // If not all 4 checked
    if(checkedCount !== 4){
        showPublishError("All 4 images must be active to publish.");
        return;
    }

    // SUCCESS
    successModalECOne.style.display = "flex";

    setTimeout(()=>{
        successModalECOne.style.display = "none";
        window.location.href = "../html/developerHMDashboard.html";
    },3000);
});

function showPublishError(message){
    errorTextECOne.innerText = message;
    errorToastECOne.style.display = "flex";

    setTimeout(()=>{
        errorToastECOne.style.display = "none";
    },3000);
}

closeToastECOne.addEventListener("click", function(){
    errorToastECOne.style.display = "none";
});

document
  .querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(4)")
  ?.classList.add("sidebar-active");

document
  .querySelector("#account-menu .mobile-dropdown:nth-child(4) .dropdown-header")
  ?.classList.add("dropdown-header-active");

