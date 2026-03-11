(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    initFAQAccordion();
    initVenuesModal();
  });

  function initFAQAccordion() {
    var faqButtons = document.querySelectorAll(".EDO-faq-question");

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
    var openLink = document.getElementById("EDO-viewVenuesLink");
    var overlay = document.getElementById("EDO-venuesOverlay");
    var modal = document.getElementById("EDO-venuesModal");
    var closeBtn = document.getElementById("EDO-venuesClose");
    var tabs = document.querySelectorAll(".EDO-venues-tab");
    var statePanels = document.querySelectorAll(".EDO-venues-state-content");

    if (!openLink || !overlay || !modal || !closeBtn) return;

    function openModal() {
      overlay.classList.add("EDO-venues-overlay-open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("EDO-no-scroll");
    }

    function closeModal() {
      overlay.classList.remove("EDO-venues-overlay-open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("EDO-no-scroll");
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
      if (e.key === "Escape" && overlay.classList.contains("EDO-venues-overlay-open")) {
        closeModal();
      }
    });

    // Tab switching
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var targetState = tab.getAttribute("data-state");

        tabs.forEach(function (t) {
          t.classList.remove("EDO-venues-tab-active");
        });
        tab.classList.add("EDO-venues-tab-active");

        statePanels.forEach(function (panel) {
          if (panel.getAttribute("data-state") === targetState) {
            panel.classList.add("EDO-venues-state-active");
          } else {
            panel.classList.remove("EDO-venues-state-active");
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

var heroImage = document.getElementById("EDO-heroImage");
var prevBtn = document.getElementById("EDO-prevBtn");
var nextBtn = document.getElementById("EDO-nextBtn");

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