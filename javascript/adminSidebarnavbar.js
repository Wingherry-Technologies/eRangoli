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

// Sidebar Submenu
  document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".has-submenu");
    const submenus = document.querySelectorAll(".submenu");

    menuItems.forEach(menu => {
      menu.addEventListener("click", () => {
        const menuKey = menu.getAttribute("data-menu");
        const submenu = document.querySelector(
          `.submenu[data-submenu="${menuKey}"]`
        );

        const submenuIsOpen = submenu.classList.contains("active");

        // Close all submenus first
        submenus.forEach(sm => sm.classList.remove("active"));

        // Remove active class from other menus only
        menuItems.forEach(item => {
          if (item !== menu) {
            item.classList.remove("sidebar-active");
          }
        });

        // Always keep sidebar-active on clicked menu
        menu.classList.add("sidebar-active");

        // Toggle only its submenu
        if (!submenuIsOpen) {
          submenu.classList.add("active");
        }
      });
    });
  });

  const dropdowns = document.querySelectorAll('.mobile-dropdown');

  dropdowns.forEach(dropdown => {
    const header = dropdown.querySelector('.dropdown-header');

    header.addEventListener('click', () => {

      // remove active classes from all dropdowns
      dropdowns.forEach(item => {
        item.classList.remove('active-mobile-submenu');
        item.querySelector('.dropdown-header')
            .classList.remove('dropdown-header-active');
      });

      // add active classes to clicked dropdown
      dropdown.classList.add('active-mobile-submenu');
      header.classList.add('dropdown-header-active');
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
        window.location.href="../html/vendorpersonaldetails.html"
    })
});
