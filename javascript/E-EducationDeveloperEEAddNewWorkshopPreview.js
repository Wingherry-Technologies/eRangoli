(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    initFAQAccordion();
    initVenuesModal();

    document
      .getElementById("EEDEEANWP-Edit-Btn")
      .addEventListener("click", function () {
        window.location.href = "E-EducationDeveloperAddNewWorkshop.html";
      });
  });

  function initFAQAccordion() {
    var faqButtons = document.querySelectorAll(".EEDEEANWP-faq-question");

    if (!faqButtons.length) return;

    faqButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var answerId = button.getAttribute("aria-controls");
        var answerPanel = document.getElementById(answerId);

        if (!answerPanel) return;

        var isExpanded = button.getAttribute("aria-expanded") === "true";
        faqButtons.forEach(function (otherButton) {
          var otherId = otherButton.getAttribute("aria-controls");
          var otherPanel = document.getElementById(otherId);

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
    var openLink = document.getElementById("EEDEEANWP-viewVenuesLink");
    var overlay = document.getElementById("EEDEEANWP-venuesOverlay");
    var modal = document.getElementById("EEDEEANWP-venuesModal");
    var closeBtn = document.getElementById("EEDEEANWP-venuesClose");
    var tabs = document.querySelectorAll(".EEDEEANWP-venues-tab");
    var statePanels = document.querySelectorAll(
      ".EEDEEANWP-venues-state-content",
    );

    if (!openLink || !overlay || !modal || !closeBtn) return;

    function openModal() {
      overlay.classList.add("EEDEEANWP-venues-overlay-open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("EEDEEANWP-no-scroll");
    }

    function closeModal() {
      overlay.classList.remove("EEDEEANWP-venues-overlay-open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("EEDEEANWP-no-scroll");
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
      if (
        e.key === "Escape" &&
        overlay.classList.contains("EEDEEANWP-venues-overlay-open")
      ) {
        closeModal();
      }
    });

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var targetState = tab.getAttribute("data-state");

        tabs.forEach(function (t) {
          t.classList.remove("EEDEEANWP-venues-tab-active");
        });
        tab.classList.add("EEDEEANWP-venues-tab-active");

        statePanels.forEach(function (panel) {
          if (panel.getAttribute("data-state") === targetState) {
            panel.classList.add("EEDEEANWP-venues-state-active");
          } else {
            panel.classList.remove("EEDEEANWP-venues-state-active");
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
  "../assets/e-EducationWorkOverview/Rectangle 34628473.svg",
];

var currentIndex = 0;

var heroImage = document.getElementById("EEDEEANWP-heroImage");
var prevBtn = document.getElementById("EEDEEANWP-prevBtn");
var nextBtn = document.getElementById("EEDEEANWP-nextBtn");

function updateImage() {
  heroImage.src = images[currentIndex];

  if (currentIndex === 0) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }

  if (currentIndex === images.length - 1) {
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.classList.remove("disabled");
  }
}

prevBtn.addEventListener("click", function () {
  if (currentIndex > 0) {
    currentIndex--;
    updateImage();
  }
});

nextBtn.addEventListener("click", function () {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateImage();
  }
});

updateImage();
