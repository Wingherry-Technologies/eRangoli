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

// Select all list items
const dashboardItems = document.querySelectorAll(".list li");

// Add click event on each item
dashboardItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    switch (index) {
      case 0:
        window.location.href = "E-EducationDeveloperHeroSection.html";
        break;

      case 1:
        window.location.href = "E-EducationDeveloperPhotoGallery.html";
        break;

      case 2:
        window.location.href = "E-EducationDeveloperShortWorkshop.html";
        break;

      case 3:
        window.location.href = "E-EducationDeveloperOurSchoolPartners.html";
        break;

      case 4:
        window.location.href = "E-EducationDeveloperWorkshopCourses.html";
        break;

      case 5:
        window.location.href = "E-EducationDeveloperOurSponsors.html";
        break;

      case 6:
        window.location.href = "E-EducationDeveloperEEUpcomingWorkshop.html";
        break;

      default:
        break;
    }
  });
});

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(5)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)>li:nth-child(2)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(5) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(5)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(5) li:nth-child(2)").classList.add("submenu-active-page");

