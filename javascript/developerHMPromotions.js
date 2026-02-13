const addPromotionCard = document.querySelector(".DHMSS-add-card");
const addPromotionWrapper = document.getElementById("addPromotionWrapper");
const pageWrapper = document.querySelector(".DHMSS-page-wrapper");
const pageHeaderMob = document.querySelector(".DHMSS-page-header-mob");
const cancelAddPromotion = document.getElementById("cancelAddPromotion");

const desktopHeader = document.querySelector(".DHMSS-add-promotion-header");
const tabHeader = document.querySelector(".DHMSS-add-promotion-header-tab");
const divider = document.querySelector(".divider");

function handleResponsiveHeader() {
  const width = window.innerWidth;

  if (width <= 1024 && width >= 595) {
    if (desktopHeader) desktopHeader.style.display = "none";
    if (divider) divider.style.display = "none";
    if (tabHeader) tabHeader.style.display = "flex";
  } else {
    if (desktopHeader) desktopHeader.style.display = "block";
    if (divider) divider.style.display = "block";
    if (tabHeader) tabHeader.style.display = "none";
  }
}

addPromotionCard.addEventListener("click", () => {
  pageWrapper.style.display = "none";
  if (pageHeaderMob) pageHeaderMob.style.display = "none";
  addPromotionWrapper.style.display = "block";
  handleResponsiveHeader();
});

cancelAddPromotion.addEventListener("click", () => {
  addPromotionWrapper.style.display = "none";
  pageWrapper.style.display = "block";
  if (pageHeaderMob) pageHeaderMob.style.display = "flex";
});

window.addEventListener("resize", handleResponsiveHeader);
