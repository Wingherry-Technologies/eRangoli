
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    initFAQAccordion();

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
