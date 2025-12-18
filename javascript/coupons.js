const menuItems = document.querySelectorAll(".coupon-menu li");
const coupons = document.querySelectorAll(".coupon-item");
const noCoupons = document.querySelector(".no-coupons");
const referralPopup = document.getElementById("referralPopup");
const sidebar = document.querySelector(".coupon-sidebar");
const toggleBtn = document.querySelector(".aside-toggle");

menuItems.forEach(item => {
  item.addEventListener("click", () => {

    menuItems.forEach(li => li.classList.remove("active"));
    item.classList.add("active");

    if (window.innerWidth <= 640) return;

    const type = item.innerText.toLowerCase();

    if (type.includes("referral")) {
      referralPopup.style.display = "flex";
      return;
    }

    let visible = 0;

    coupons.forEach(coupon => {
      if (type.includes("all")) {
        coupon.style.display = "flex";
        visible++;
      } else if (coupon.dataset.type === "discount" && type.includes("discount")) {
        coupon.style.display = "flex";
        visible++;
      } else if (coupon.dataset.type === "bank" && type.includes("bank")) {
        coupon.style.display = "flex";
        visible++;
      } else {
        coupon.style.display = "none";
      }
    });

    noCoupons.style.display = visible ? "none" : "block";
    sidebar.classList.remove("open");
  });
});

document.querySelector(".close-popup").onclick = () =>
  referralPopup.style.display = "none";

document.querySelector(".copy-btn").onclick = () => {
  navigator.clipboard.writeText("DAVID200");
  alert("Referral code copied!");
};

toggleBtn.onclick = () => sidebar.classList.toggle("open");
