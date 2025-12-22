document.getElementById("back-btn").addEventListener("click", () => {
  window.location.href = "../html/productcatalog.html";
});

document.getElementById("back-btn-mob").addEventListener("click", () => {
  window.location.href = "../html/productcatalog.html";
});

document.getElementById("menu-item-payments").addEventListener("click", () => {
  window.location.href = "../html/payments.html";
});

document.getElementById("about-you").addEventListener("click", () => {
  window.location.href = "../html/aboutYou.html";
});

document.getElementById("gift-voucher").addEventListener("click", () => {
  window.location.href = "../html/giftVoucher.html";
});

const profilePopup = document.getElementById("profilePopup");
const closeProfileBtn = document.getElementById("closePopup");
function openProfilePopup() {
  const w = window.innerWidth;
  if (w >= 595 && w <= 1024) profilePopup.classList.add("active");
}
closeProfileBtn.addEventListener("click", () =>
  profilePopup.classList.remove("active")
);

// Payments menu click (mobile)
const paymentsMenuItem = document.querySelector(".menu-item.active");

if (paymentsMenuItem) {
  paymentsMenuItem.addEventListener("click", () => {
    if (window.innerWidth <= 595) {
      document.body.classList.add("payments-active");
      createPaymentsHeader();
    }
  });
}

// Create Payments Header (mobile)
function createPaymentsHeader() {
  if (document.querySelector(".payment-header-banner")) return;

  const header = document.createElement("div");
  header.className = "payment-header-banner";

  header.innerHTML = `
    <div class="P-overlay">
      <div class="header-content">
        <div class="header">
          <div class="back-row-mob payment-back-btn">
            <img src="../assets/cart/back.svg" />
          </div>
          <h1>Settings</h1>
        </div>
      </div>
    </div>
  `;

  document.body.prepend(header);

  header.querySelector(".payment-back-btn").addEventListener("click", () => {
    document.body.classList.remove("payments-active");
    header.remove();
  });
}
