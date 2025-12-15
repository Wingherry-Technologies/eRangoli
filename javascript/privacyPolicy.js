document.getElementById("back-btn").addEventListener("click", () => {
  window.location.href = "../html/productcatalog.html";
});

document.getElementById("back-btn-media").addEventListener("click", () => {
  window.location.href = "../html/productcatalog.html";
});

document.getElementById("back-btn-mob").addEventListener("click", () => {
  window.location.href = "../html/productcatalog.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const lastUpdatedEl = document.querySelector(".last-updated");

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  lastUpdatedEl.textContent = `Last Updated: ${day}/${month}/${year}`;
});
