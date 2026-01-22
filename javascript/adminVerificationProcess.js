/* ===== APPROVE CONFIRMATION POPUP ===== */
const FAapproveBtn = document.querySelector(".FAApproveButton");
const FAapproveModal = document.getElementById("FAapproveModal");
const FAcloseApproveModal = document.getElementById("FAcloseApproveModal");
const FAapproveYes = document.getElementById("FAapproveYes");
const FAapproveNo = document.getElementById("FAapproveNo");

FAapproveBtn.addEventListener("click", () => {
  FAapproveModal.classList.add("active");
});

FAcloseApproveModal.addEventListener("click", () => {
  FAapproveModal.classList.remove("active");
});

FAapproveNo.addEventListener("click", () => {
  FAapproveModal.classList.remove("active");
});

FAapproveYes.addEventListener("click", () => {
  FAapproveModal.classList.remove("active");

  document.querySelector(".BDContainer").style.display = "none";

  document.getElementById("FAapproveSuccessScreen").classList.add("active");
});
