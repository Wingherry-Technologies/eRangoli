const toggleBtn = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar-main-vendor");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    sidebar.classList.toggle("collapsed");
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
    if(window.innerWidth<595){
        document.querySelector(".bottom-nav").style.display="flex"
    }
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
    if(window.innerWidth<595){
        document.querySelector(".bottom-nav").style.display="flex"
    }})




// Profile Navigation

const profileClicks=document.querySelectorAll("#user-profile-icon");

profileClicks.forEach(profileClick => {
    profileClick.addEventListener("click",()=>{
        window.location.href="../html/vendorProfile.html"
    })
});
