const trackBtn = document.getElementById("trackOrderBtn");
const trackingModal = document.getElementById("trackingModal");
const closeTracking = document.querySelector(".close-tracking");

trackBtn.addEventListener("click", () => {
  trackingModal.style.display = "flex";
});

closeTracking.addEventListener("click", () => {
  trackingModal.style.display = "none";
});

trackingModal.addEventListener("click", (e) => {
  if (e.target === trackingModal) {
    trackingModal.style.display = "none";
  }
});
