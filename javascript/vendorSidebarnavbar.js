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

const subscribeMain=document.querySelector(".subscribe-main-container");
const subscribeCross=document.querySelector(".subscribe-cross");
const erSubscribe=document.querySelector(".er-subscribe>button");
const subscribeEmail=document.getElementById("subscribe-email")

erSubscribe.onclick=()=>{
    subscribeMain.style.display="flex";
}
subscribeCross.onclick=()=>{
    subscribeMain.style.display="none";
    document.querySelector(".subscribe-error-message").style.display="none";
    subscribeEmail.value="";
}

const subscribeButton=document.querySelector(".subscribe-btn");
subscribeButton.onclick=()=>{
    if (subscribeEmail.value === "" || !subscribeEmail.checkValidity()){
        document.querySelector(".subscribe-error-message").style.display="block";
        return;
    }
    else{
        alert("Thank you for subscribing!");
        document.querySelector(".subscribe-error-message").style.display="none";
        subscribeEmail.value="";
        subscribeMain.style.display="none";
    }
}
document.querySelector(".logout-button").addEventListener("click",()=>{
    window.location.href='../html/vendorlogin.html'
})