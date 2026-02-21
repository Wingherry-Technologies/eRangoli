document.addEventListener("DOMContentLoaded", function () {
  const addCard = document.querySelector(".DHMP-add-card");

  if (addCard) {
    addCard.addEventListener("click", function () {
      window.location.href = "../html/developerHMPromotionsAddNew.html";
    });
  }

  const allCards = document.querySelectorAll(".DHMP-category-card");
  const totalCards = allCards.length;

  const desktopCount = document.getElementById("DHMP-stateCount");
  const mobileCount = document.querySelector(".DHMP-stateCount-mob");

  if (desktopCount) {
    desktopCount.textContent = totalCards + " Campaign";
  }

  if (mobileCount) {
    mobileCount.textContent = totalCards + " Campaign";
  }
});
