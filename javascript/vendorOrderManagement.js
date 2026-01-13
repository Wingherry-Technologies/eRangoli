// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");
var mobileBack=document.querySelector(".mobile-back-button");


hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    window.scrollTo(0, 0);
    mobileBack.style.display="none"
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow="auto";
    document.querySelector(".bottom-nav").style.display="flex";
    mobileBack.style.display="flex"
  }
});

let rowToRemove = null;

// Three Dots
document.addEventListener("click", function (e) {
  const isThreeDot = e.target.classList.contains("three-dot");
  const isRemove =
    e.target.closest(".all-preview div") &&
    e.target.closest(".all-preview div").textContent.includes("Remove");

  // Close all previews first
  document.querySelectorAll(".all-preview").forEach(popup => {
    popup.classList.remove("active-preview");
  });

  // Open popup when clicking three dots
  if (isThreeDot) {
    e.stopPropagation();
    const previewBox = e.target
      .closest(".previewing")
      .querySelector(".all-preview");
    previewBox.classList.add("active-preview");
    return;
  }

  // Show confirmation modal when clicking "Remove"
  if (isRemove) {
    rowToRemove = e.target.closest("tr");
    document.getElementById("confirmModal").classList.add("active");
  }
});

// Confirm buttons
document.getElementById("confirmYes").addEventListener("click", function () {
  if (rowToRemove) {
    rowToRemove.remove();
    rowToRemove = null;
  }
  closeModal();
});

document.getElementById("confirmNo").addEventListener("click", closeModal);

function closeModal() {
  document.getElementById("confirmModal").classList.remove("active");
}

// Order Status Popups
const openPopups = document.querySelectorAll(".show-popup-btn");
const popups = document.querySelectorAll(".modal-popup-main");

function closeAllPopups() {
  popups.forEach(popup => popup.classList.remove("active"));
}

openPopups.forEach(arrow => {
  arrow.addEventListener("click", () => {
    closeAllPopups();

    // get the parent row
    const row = arrow.closest("tr");

    // find the status inside that row
    const status = row.querySelector(".order-status");

    if (!status) return;

    if (status.classList.contains("received-orders")) {
      document.getElementById("received-popup").classList.add("active");
    } 
    else if (status.classList.contains("packed-order")) {
      document.getElementById("packed-popup").classList.add("active");
    } 
    else if (status.classList.contains("delivered-order")) {
      document.getElementById("delivered-popup").classList.add("active");
    }
  });
});

// Close button
document.querySelectorAll(".close-btn").forEach(btn => {
  btn.addEventListener("click", closeAllPopups);
});



document.querySelector("#sidebar-main-vendor ul>li:nth-child(3)").classList.add("sidebar-active");

document.querySelector("#account-menu li:nth-child(3) .dropdown-header").classList.add("dropdown-header-active");