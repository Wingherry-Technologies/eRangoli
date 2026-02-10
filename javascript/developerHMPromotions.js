const addPromotionCard = document.querySelector(".DHMSS-add-card");
const addPromotionWrapper = document.getElementById("addPromotionWrapper");
const pageWrapper = document.querySelector(".DHMSS-page-wrapper");
const pageHeaderMob = document.querySelector(".DHMSS-page-header-mob");
const cancelAddPromotion = document.getElementById("cancelAddPromotion");

addPromotionCard.addEventListener("click", () => {
  pageWrapper.style.display = "none";
  if (pageHeaderMob) pageHeaderMob.style.display = "none";
  addPromotionWrapper.style.display = "block";
});

cancelAddPromotion.addEventListener("click", () => {
  addPromotionWrapper.style.display = "none";
  pageWrapper.style.display = "block";
  if (pageHeaderMob) pageHeaderMob.style.display = "flex";
});
