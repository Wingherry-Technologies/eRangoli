document.addEventListener("DOMContentLoaded", function () {
  const buyNowFreeBtn = document.getElementById("buyNowFreeBtn");
  buyNowFreeBtn.addEventListener("click", function () {
    setTimeout(function () {
     window.location.href = "../html/vendorDashboard.html";
    }, 700);
  });

  /* Staggered entrance: each card fades + slides up one by one */
  var cards = document.querySelectorAll(".VS-card");
  cards.forEach(function (card, index) {
    setTimeout(
      function () {
        card.classList.add("VS-visible");
      },
      120 + index * 110,
    );
  });

  /* Button ripple effect + console log on click */
  document.querySelectorAll(".VS-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var plan = this.getAttribute("data-plan");
      console.log("[VS] CTA clicked: " + plan + " plan");

      /* Create ripple span */
      var rect = this.getBoundingClientRect();
      var ripple = document.createElement("span");
      ripple.classList.add("VS-ripple-circle");
      ripple.style.left = e.clientX - rect.left - 5 + "px";
      ripple.style.top = e.clientY - rect.top - 5 + "px";
      this.appendChild(ripple);

      ripple.addEventListener("animationend", function () {
        ripple.remove();
      });
    });
  });
});
