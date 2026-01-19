const toggle = document.getElementById("langToggle");
const dropdown = document.getElementById("langDropdown");

toggle.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
});

// click outside close
document.addEventListener("click", () => {
  dropdown.style.display = "none";
});
