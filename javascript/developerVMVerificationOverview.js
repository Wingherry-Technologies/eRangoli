// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");
var mobileBack=document.querySelector(".mobile-back-button");


hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    window.scrollTo(0, 0);
    mobileBack.style.display="none"
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow="auto";
    document.querySelector(".bottom-nav").style.display="flex";
    mobileBack.style.display="flex"
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const rejectBtn = document.querySelector(".ADVOFaRejectButton");
  const rejectModal = document.getElementById("ADVOFaRejectModal");
  const rejectClose = document.getElementById("ADVOFaCloseRejectModal");
  const rejectNo = document.getElementById("ADVOFaRejectNo");
  const rejectYes = document.getElementById("ADVOFaRejectYes");
  const rejectSuccess = document.getElementById("ADVOFaRejectSuccessScreen");

  const rejectReasonBox = document.querySelector(".ADVOFaAdminTextareaWrapper");
  const rejectReasonText = document.getElementById("ADVOReviewTextarea");
  const rejectError = document.getElementById("rejectError");

  let rejectStep = 0;

  rejectBtn?.addEventListener("click", () => {
    if (rejectStep === 0) {
      rejectReasonBox.style.display = "block";
      rejectReasonText.focus();
      rejectStep = 1;
      return;
    }

    if (rejectReasonText.innerText.trim() === "") {
      rejectError.style.display = "block";
      rejectReasonText.classList.add("error");
      return;
    }

    rejectError.style.display = "none";
    rejectReasonText.classList.remove("error");
    rejectModal.classList.add("active");
  });

  const closeRejectModal = () => {
    rejectModal.classList.remove("active");
  };

  rejectClose?.addEventListener("click", closeRejectModal);
  rejectNo?.addEventListener("click", closeRejectModal);

  rejectYes?.addEventListener("click", () => {
    closeRejectModal();
    rejectSuccess.classList.add("active");
  });

  const sendBtn = document.getElementById("ADVOSentToAdminbtn");
  const sendModal = document.getElementById("FAsentModal");
  const sendClose = document.getElementById("FAcloseSentModal");
  const sendNo = document.getElementById("FAsentNo");
  const sendYes = document.getElementById("FAsentYes");
  const sendSuccess = document.getElementById("FAsentSuccessScreen");

  sendBtn?.addEventListener("click", () => {
    rejectReasonBox.style.display = "none";
    rejectReasonText.innerText = "";
    rejectError.style.display = "none";
    rejectReasonText.classList.remove("error");
    rejectStep = 0;
    sendModal.classList.add("active");
  });

  const closeSendModal = () => {
    sendModal.classList.remove("active");
  };

  sendClose?.addEventListener("click", closeSendModal);
  sendNo?.addEventListener("click", closeSendModal);

  sendYes?.addEventListener("click", () => {
    closeSendModal();
    sendSuccess.classList.add("active");
  });
});

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(3)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(2)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(2)>li:nth-child(1)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(3) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(3)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(3) li:nth-child(1)").classList.add("submenu-active-page");

