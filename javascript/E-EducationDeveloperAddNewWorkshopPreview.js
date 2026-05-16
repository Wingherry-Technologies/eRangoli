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

(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    initFAQAccordion();
    initVenuesModal();

    document.getElementById("EDANWP-Edit-Btn").addEventListener("click", function () {
      window.location.href = "E-EducationDeveloperAddNewWorkshop.html";
    });
  });

  function initFAQAccordion() {
    var faqButtons = document.querySelectorAll(".EDANWP-faq-question");

    if (!faqButtons.length) return;

    faqButtons.forEach(function (button) {
      button.addEventListener("click", function () {

        var answerId = button.getAttribute("aria-controls");
        var answerPanel = document.getElementById(answerId);

        if (!answerPanel) return;

        // Check current expanded state
        var isExpanded = button.getAttribute("aria-expanded") === "true";
        faqButtons.forEach(function (otherButton) {
          var otherId = otherButton.getAttribute("aria-controls");
          var otherPanel = document.getElementById(otherId);

          // Close this button and hide its panel
          otherButton.setAttribute("aria-expanded", "false");
          if (otherPanel) {
            otherPanel.hidden = true;
          }
        });
        if (!isExpanded) {
          button.setAttribute("aria-expanded", "true");
          answerPanel.hidden = false;
        }
      });
    });
  }

  function initVenuesModal() {
    var openLink = document.getElementById("EDANWP-viewVenuesLink");
    var overlay = document.getElementById("EDANWP-venuesOverlay");
    var modal = document.getElementById("EDANWP-venuesModal");
    var closeBtn = document.getElementById("EDANWP-venuesClose");
    var tabs = document.querySelectorAll(".EDANWP-venues-tab");
    var statePanels = document.querySelectorAll(".EDANWP-venues-state-content");

    if (!openLink || !overlay || !modal || !closeBtn) return;

    function openModal() {
      overlay.classList.add("EDANWP-venues-overlay-open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("EDANWP-no-scroll");
    }

    function closeModal() {
      overlay.classList.remove("EDANWP-venues-overlay-open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("EDANWP-no-scroll");
    }

    openLink.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });

    closeBtn.addEventListener("click", function () {
      closeModal();
    });

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        closeModal();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("EDANWP-venues-overlay-open")) {
        closeModal();
      }
    });

    // Tab switching
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var targetState = tab.getAttribute("data-state");

        tabs.forEach(function (t) {
          t.classList.remove("EDANWP-venues-tab-active");
        });
        tab.classList.add("EDANWP-venues-tab-active");

        statePanels.forEach(function (panel) {
          if (panel.getAttribute("data-state") === targetState) {
            panel.classList.add("EDANWP-venues-state-active");
          } else {
            panel.classList.remove("EDANWP-venues-state-active");
          }
        });
      });
    });
  }

})();

var images = [
  "../assets/e-EducationWorkOverview/Rectangle 34628468.svg",
  "../assets/e-EducationWorkOverview/Rectangle 34628470.svg",
  "../assets/e-EducationWorkOverview/Rectangle 34628471.svg",
  "../assets/e-EducationWorkOverview/Rectangle 34628473.svg"
];

var currentIndex = 0;

var heroImage = document.getElementById("EDANWP-heroImage");
var prevBtn = document.getElementById("EDANWP-prevBtn");
var nextBtn = document.getElementById("EDANWP-nextBtn");

function updateImage() {

  heroImage.src = images[currentIndex];

  if(currentIndex === 0){
    prevBtn.classList.add("disabled");
  }else{
    prevBtn.classList.remove("disabled");
  }

  if(currentIndex === images.length - 1){
    nextBtn.classList.add("disabled");
  }else{
    nextBtn.classList.remove("disabled");
  }

}

prevBtn.addEventListener("click", function(){
  if(currentIndex > 0){
    currentIndex--;
    updateImage();
  }
});

nextBtn.addEventListener("click", function(){
  if(currentIndex < images.length - 1){
    currentIndex++;
    updateImage();
  }
});

updateImage();

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(5)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)>li:nth-child(5)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(5) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(5)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(5) li:nth-child(5)").classList.add("submenu-active-page");

