
const toggle = document.getElementById("vendorCancellation-langToggle");
const dropdown = document.getElementById("vendorCancellation-langDropdown");

toggle.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", () => {
  dropdown.style.display = "none";
});
