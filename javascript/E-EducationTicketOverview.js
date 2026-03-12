(function () {
  const UNIT_PRICE = 2499;
  const GST_RATE = 0.09;
  const VALID_COUPON = "FIRST500";
  const COUPON_DISCOUNT = 500;
  const MIN_SUBTOTAL_FOR_COUPON = 1000;

  let quantity = 2;
  let discountApplied = false;
  let toastTimer = null;

  const qtyValue = document.getElementById("EETO-qty-value");
  const ticketCount = document.getElementById("EETO-ticket-count");
  const subtotalEl = document.getElementById("EETO-subtotal");
  const discountEl = document.getElementById("EETO-discount");
  const gstEl = document.getElementById("EETO-gst");
  const payableEl = document.getElementById("EETO-payable");
  const applyBtn = document.getElementById("EETO-apply-btn");
  const couponInput = document.getElementById("EETO-coupon-input");
  const deleteBtn = document.getElementById("EETO-delete-btn");
  const toast = document.getElementById("EETO-toast");
  const toastMsg = document.getElementById("EETO-toast-msg");
  const toastClose = document.getElementById("EETO-toast-close");

  const ticketWrapper = document.querySelector(".EETO-ticket-wrapper");
  const emptyCart = document.getElementById("EETO-empty-cart");

  function fmt(n) {
    return "₹" + n.toLocaleString("en-IN");
  }

  function calcAndRender() {
    const subtotal = UNIT_PRICE * quantity;
    const discount = discountApplied ? COUPON_DISCOUNT : 0;
    const gst = Math.round(subtotal * GST_RATE);
    const payable = subtotal + gst - discount;

    subtotalEl.textContent = fmt(subtotal);
    discountEl.textContent = fmt(discount);
    gstEl.textContent = fmt(gst);
    payableEl.textContent = fmt(payable);
    ticketCount.textContent =
      quantity + (quantity === 1 ? " Ticket" : " Tickets");
    qtyValue.textContent = quantity;

    if (!discountApplied) {
      applyBtn.disabled = subtotal < MIN_SUBTOTAL_FOR_COUPON;
    }
  }

  document.getElementById("EETO-qty-plus").addEventListener("click", () => {
    quantity++;
    calcAndRender();
  });

  document.getElementById("EETO-qty-minus").addEventListener("click", () => {
    if (quantity <= 1) return;
    quantity--;
    if (discountApplied && UNIT_PRICE * quantity < MIN_SUBTOTAL_FOR_COUPON) {
      discountApplied = false;
      applyBtn.textContent = "Apply";
    }
    calcAndRender();
  });

  deleteBtn.addEventListener("click", () => {
    ticketWrapper.style.display = "none";

    emptyCart.style.display = "flex";

    quantity = 1;
    discountApplied = false;
    applyBtn.textContent = "Apply";
    calcAndRender();

    hideToast();
  });

  couponInput.addEventListener("input", () => {
    if (discountApplied) {
      discountApplied = false;
      applyBtn.textContent = "Apply";
      calcAndRender();
    }
    hideToast();
  });

  applyBtn.addEventListener("click", () => {
    if (discountApplied) {
      discountApplied = false;
      applyBtn.textContent = "Apply";
      calcAndRender();
      return;
    }

    const code = couponInput.value.trim().toUpperCase();

    if (code === VALID_COUPON) {
      discountApplied = true;
      applyBtn.textContent = "Remove";
      applyBtn.disabled = false;
      calcAndRender();
    } else {
      showToast("Invalid Coupon Code");
    }
  });

  function showToast(message) {
    toastMsg.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 3000);
  }

  function hideToast() {
    toast.classList.remove("show");
    clearTimeout(toastTimer);
  }

  toastClose.addEventListener("click", hideToast);

  calcAndRender();
})();
