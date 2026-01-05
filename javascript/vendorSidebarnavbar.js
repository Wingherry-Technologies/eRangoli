const toggleBtn = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar-main-vendor");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    sidebar.classList.toggle("collapsed");
  });
// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");
const bar1 = document.querySelector(".mobile-search-bar-main");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    bar1.style.display="none"
    window.scrollTo(0, 0);
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow="auto";
    document.querySelector(".bottom-nav").style.display="flex";
     bar1.style.display="block"
  }
});

document.querySelectorAll(".nav-item>span, .dropdown>li>span, .submenu-dropdown-main>li , mobile-dropdown-sub>ul>li, .mobile-dropdown-sub>.extra-nav").forEach(item => {
    item.addEventListener("click", () => {
        window.location.href = "../html/productcatalog.html";
    });
});
// MOBILE DROPDOWN ACCORDION
// ===============================
// Level 1 Dropdown (Main Category)
// ===============================
const level1Dropdowns = document.querySelectorAll(".mobile-dropdown");

level1Dropdowns.forEach(item => {
    const header = item.querySelector(".dropdown-header");

    header.addEventListener("click", (e) => {
        e.stopPropagation();

        // Close other level 1 dropdowns
        level1Dropdowns.forEach(other => {
            if (other !== item) {
                other.classList.remove("open");
            }
        });

        item.classList.toggle("open");
    });
});


// ===============================
// Level 2 Dropdown (Inside Category)
// ===============================
const level2Dropdowns = document.querySelectorAll(".mobile-dropdown-sub");

level2Dropdowns.forEach(subItem => {
    const subHeader = subItem.querySelector("span");

    subHeader.addEventListener("click", (e) => {
        e.stopPropagation();

        // Close other level 2 menus inside the same main category only
        const parentSubmenu = subItem.closest(".mobile-submenu");
        const siblings = parentSubmenu.querySelectorAll(".mobile-dropdown-sub");

        siblings.forEach(other => {
            if (other !== subItem) {
                other.classList.remove("open-sub");
            }
        });

        subItem.classList.toggle("open-sub");
    });
});



function handleScrollForMobile() {
    const bar = document.querySelector(".mobile-search-bar-main");
    const contentbar = document.querySelector(".mobile-search-bar");
    const desktopERan = document.getElementById("desktop-erangoli-logo");
    const mobileERan = document.getElementById("mobile-erangoli-logo");
    const maginfyingMobile = document.getElementById("maginfying-mobile");
    // const bannerContent=document.querySelector(".banner-main-content");

    // Only apply logic when screen width <= 595px
    if (window.innerWidth <= 595) {

        if (window.scrollY > 10) {
            bar.style.position = "fixed";
            bar.style.backgroundColor = 'transparent';
            bar.style.top = "-2px";
            bar.style.left = "40px";

            contentbar.style.border = "1px solid #D9D9D9";
            contentbar.style.backgroundColor = "transparent";
            contentbar.style.borderLeft = "0px";
            contentbar.style.borderRadius = "0px 30px 30px 0px";
            contentbar.style.zIndex = 999;
            contentbar.style.padding = "8px 10px";
            contentbar.style.marginLeft='10px'

            desktopERan.style.display = 'none';
            mobileERan.style.display = "inline-block";
            maginfyingMobile.style.display = "none";

            // mobileSuggestion.style.top='80px';
            // bannerContent.style.top='130px';
            

        } else {
            bar.style.position = "relative";
            bar.style.backgroundColor = '#f5f5f5';
            bar.style.top = "75px";
            bar.style.left = "0px";

            contentbar.style.border = "none";
            contentbar.style.borderRadius = "30px";
            contentbar.style.backgroundColor = "white";
            contentbar.style.marginLeft='0px'

            desktopERan.style.display = 'flex';
            mobileERan.style.display = "none";
            maginfyingMobile.style.display = "block";

            // mobileSuggestion.style.top='100px';
            // bannerContent.style.top='230px';

        }

    } else {
        // Reset styles when screen is larger than 595px
        bar.style = "";
        contentbar.style = "";
        desktopERan.style.display = 'flex';
        mobileERan.style.display = 'none';
        maginfyingMobile.style.display = 'block';
    }
}

// Run on scroll
window.addEventListener("scroll", handleScrollForMobile);

// Run when screen resizes (mobile ↔ desktop)
window.addEventListener("resize", handleScrollForMobile);

// Run once on initial load
handleScrollForMobile();


// Notification Click

const notificationClicks=document.querySelectorAll("#round-button-notification, #bottom-nav-notification")

notificationClicks.forEach(notificationClick => {
    notificationClick.addEventListener("click",()=>{
        document.getElementById("notification-main-box").style.display="block"
        document.querySelector(".bottom-nav").style.display="none"
    })
});
document.getElementById("notification-cross").addEventListener("click",()=>{
    document.getElementById("notification-main-box").style.display='none'
    document.querySelector(".bottom-nav").style.display="flex"
})

// Order Click

const orderClicks=document.querySelectorAll("#round-button-order, #bottom-nav-orders")

orderClicks.forEach(orderClick => {
    orderClick.addEventListener("click",()=>{
        document.getElementById("order-main-box").style.display="block"
        document.querySelector(".bottom-nav").style.display="none"
    })
});
document.getElementById("order-cross").addEventListener("click",()=>{
    document.getElementById("order-main-box").style.display='none'
    document.querySelector(".bottom-nav").style.display="flex"
})




// Profile Navigation

const profileClicks=document.querySelectorAll("#user-profile-icon");

profileClicks.forEach(profileClick => {
    profileClick.addEventListener("click",()=>{
        window.location.href="../html/vendorProfile.html"
    })
});
