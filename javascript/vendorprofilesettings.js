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

document.querySelector("#sidebar-main-vendor ul>li:nth-child(3)").classList.add("sidebar-active");

document.querySelector("#account-menu li:nth-child(9) .dropdown-header").classList.add("dropdown-header-active");

const psOverlay = document.getElementById("ps-overlay");
const psToast = document.getElementById("ps-toast");

const psModals = {
  devices: document.getElementById("ps-devicesModal"),
  logoutAll: document.getElementById("ps-logoutAllModal"),
  delete: document.getElementById("ps-deleteModal")
};

function psOpenModal(modal) {
  psOverlay.style.display = "block";
  modal.style.display = "block";
}

function psCloseAll() {
  psOverlay.style.display = "none";
  Object.values(psModals).forEach(m => m.style.display = "none");
}

function psShowToast(msg) {
  psToast.textContent = msg;
  psToast.classList.add("show");
  setTimeout(() => psToast.classList.remove("show"), 2500);
}

/* SETTINGS */
document.querySelectorAll(".ps-settings-item")[0].onclick =
  () => psOpenModal(psModals.devices);
document.querySelectorAll(".ps-settings-item")[1].onclick =
  () => psOpenModal(psModals.logoutAll);
document.querySelectorAll(".ps-settings-item")[2].onclick =
  () => psOpenModal(psModals.delete);

/* CLOSE */
psOverlay.onclick = psCloseAll;
document.querySelectorAll(".ps-close").forEach(btn => btn.onclick = psCloseAll);

/* DEVICE LOGOUT */
document.querySelectorAll(".ps-logout-device").forEach(btn => {
  btn.onclick = () => {
    psCloseAll();
    setTimeout(() => {
      btn.closest("[data-ps-device]").remove();
      psShowToast("Device logged out");
    }, 200);
  };
});

/* LOGOUT ALL */
document.getElementById("ps-confirmLogoutAll").onclick = () => {
  psCloseAll();
  setTimeout(() => {
    psShowToast("Logged out from all devices");
    setTimeout(() => location.href = "../html/index.html", 1500);
  }, 200);
};

/* PASSWORD TOGGLE */
document.getElementById("ps-toggleEye").onclick = () => {
  const psInput = document.getElementById("ps-deletePassword");
  const psIcon = document.querySelector("#ps-toggleEye i");

  if (psInput.type === "password") {
    psInput.type = "text";
    psIcon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    psInput.type = "password";
    psIcon.classList.replace("fa-eye-slash", "fa-eye");
  }
};

/* DELETE ACCOUNT */
document.getElementById("ps-confirmDelete").onclick = () => {
  const psPwd = document.getElementById("ps-deletePassword").value;
  const psError = document.getElementById("ps-deleteError");

  const psStoredPassword = "Admin@123"; // demo

  if (!psPwd) {
    psError.textContent = "Please enter password";
    return;
  }

  if (psPwd !== psStoredPassword) {
    psError.textContent = "Password is incorrect";
    return;
  }

  psError.textContent = "";
  psCloseAll();

  setTimeout(() => {
    psShowToast("Account deleted successfully");
    setTimeout(() => location.href = "../html/index.html", 1500);
  }, 200);
};
