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

document.querySelectorAll(".faq-question").forEach((button) => {
  // har button pe click listener lagao
  button.addEventListener("click", () => {
    const faqItem = button.closest(".faq-item"); // parent item lo
    faqItem.classList.toggle("active"); // open / close toggle
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const listItems = document.querySelectorAll(".list li");

  listItems.forEach((item) => {
    const title = item.querySelector(".name")?.innerText.trim();

    item.addEventListener("click", () => {
      if (title === "Hero Section") {
        const countText = item.querySelector(".count")?.innerText.trim();
        const countNumber = parseInt(countText);

        if (countNumber === 0) {
          window.location.href = "../html/developerHMHeroSectionES.html";
        } else if (countNumber > 0) {
          window.location.href = "../html/developerHMHeroSection.html";
        }
      }

      if (title === "Festive offers") {
        const countText = item.querySelector(".count")?.innerText.trim();
        const countNumber = parseInt(countText);

        if (countNumber === 0) {
          window.location.href = "../html/developerHMFestiveOffersES.html";
        } else if (countNumber > 0) {
          window.location.href = "../html/developerHMFestiveOffers.html";
        }
      }

      if (title === "Featured Brands") {
        window.location.href = "../html/developerHMFeatureBrands.html";
      }

      if (title === "Top Categories") {
        window.location.href = "../html/developerHMTopCattegories.html";
      }

      if (title === "Shop by State") {
        window.location.href = "../html/developerHMShopbyState.html";
      }

      if (title === "Artisans Story") {
        window.location.href = "../html/developerHMArtisanStory.html";
      }

      if (title === "Promotion") {
        window.location.href = "../html/developerHMPromotions.html";
      }

      if (title === "Exclusive Product") {
        window.location.href = "../html/developerHMExclusiveProducts.html";
      }

      if (title === "Customer Reviews") {
        window.location.href = "../html/developerHMCustomerReview.html";
      }
      if (title === "Explore Category 1") {
        window.location.href = "../html/developerHMExploreCategory1.html";
      }
      if (title === "Explore Category 2") {
        window.location.href = "../html/developerHMExploreCategory2.html";
      }
      if (title === "Featured Sellers") {
        window.location.href = "../html/developerHMFeaturedSellerList.html";
      }
    });
  });
});

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(4)").classList.add("sidebar-active");


document.querySelector("#account-menu .mobile-dropdown:nth-child(4) .dropdown-header").classList.add("dropdown-header-active");
