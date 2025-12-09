/* SAVE DELIVERY FORM */
document
  .getElementById("saveAddressBtn")
  .addEventListener("click", function () {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let hno = document.getElementById("hno").value;
    let lane = document.getElementById("lane").value;
    let landmark = document.getElementById("landmark").value;
    let city = document.getElementById("city").value;
    let zip = document.getElementById("zip").value;
    let state = document.getElementById("state").value;

    let fullAddress = `${hno}, ${lane}, ${landmark}, ${city}, ${state}, ${zip}`;

    // CLONE TEMPLATE
    let template = document.getElementById("address-template");
    let newCard = template.cloneNode(true);
    newCard.classList.remove("hidden");

    // FILL VALUES
    newCard.querySelector(".add-name").textContent = name;
    newCard.querySelector(".add-email").textContent = email;
    newCard.querySelector(".add-phone").textContent = phone;
    newCard.querySelector(".add-full").textContent = fullAddress;

    // ADD CARD
    document.getElementById("address-list").appendChild(newCard);

    // AUTO CHECK FIRST ADDRESS
    const firstCheckbox = newCard.querySelector(".use-detail input");
    firstCheckbox.checked = true;

    // Uncheck any others
    document
      .querySelectorAll("#address-list .use-detail input")
      .forEach((chk) => {
        if (chk !== firstCheckbox) chk.checked = false;
      });

    // Update pay button state
    updatePayButton();

    // SHOW SECTION
    document.getElementById("saved-address-section").classList.remove("hidden");

    // HIDE FORM
    document
      .querySelectorAll(".form-group, .inline-row, .sub-heading")
      .forEach((el) => el.classList.add("hide"));

    document.getElementById("saveAddressBtn").classList.add("hide");
  });

/* OPEN INLINE POPUP */
document.getElementById("openPopupBtn").addEventListener("click", function () {
  document.getElementById("inlinePopup").classList.remove("hidden");
});

/* CLOSE INLINE POPUP */
document
  .getElementById("closeInlinePopup")
  .addEventListener("click", function () {
    document.getElementById("inlinePopup").classList.add("hidden");
  });

/* POPUP SAVE BUTTON (NEW ADDRESS) */
document.getElementById("popupSaveBtn").addEventListener("click", function () {
  let name = document.getElementById("p-name").value;
  let email = document.getElementById("p-email").value;
  let phone = document.getElementById("p-phone").value;
  let hno = document.getElementById("p-hno").value;
  let lane = document.getElementById("p-lane").value;
  let landmark = document.getElementById("p-landmark").value;
  let city = document.getElementById("p-city").value;
  let zip = document.getElementById("p-zip").value;
  let state = document.getElementById("p-state").value;

  let fullAddress = `${hno}, ${lane}, ${landmark}, ${city}, ${state}, ${zip}`;

  // CLONE TEMPLATE
  let template = document.getElementById("address-template");
  let newCard = template.cloneNode(true);
  newCard.classList.remove("hidden");

  // FILL VALUES
  newCard.querySelector(".add-name").textContent = name;
  newCard.querySelector(".add-email").textContent = email;
  newCard.querySelector(".add-phone").textContent = phone;
  newCard.querySelector(".add-full").textContent = fullAddress;

  // ADD CARD
  document.getElementById("address-list").appendChild(newCard);

  // CLOSE POPUP
  document.getElementById("inlinePopup").classList.add("hidden");
});

/* DELETE ADDRESS */
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("address-delete-btn")) {
    let wrapper = e.target.closest(".address-wrapper");
    if (wrapper) wrapper.remove();
  }
});

/*  ADDRESS CHECKBOX LOGIC */

function updatePayButton() {
  const allChecks = document.querySelectorAll(
    "#address-list .use-detail input"
  );
  const payBtn = document.querySelector(".pay-btn");

  const anyChecked = [...allChecks].some((chk) => chk.checked);

  if (anyChecked) {
    payBtn.style.background = "#A10404";
    payBtn.style.cursor = "pointer";
  } else {
    payBtn.style.background = "#716B6B";
    payBtn.style.cursor = "not-allowed";
  }
}

document.addEventListener("change", function (e) {
  if (e.target.matches("#address-list .use-detail input")) {
    const allChecks = document.querySelectorAll(
      "#address-list .use-detail input"
    );

    allChecks.forEach((chk) => {
      if (chk !== e.target) chk.checked = false;
    });

    updatePayButton();
  }
});

// When deleted → update the button
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("address-delete-btn")) {
    setTimeout(updatePayButton, 50);
  }
});

/* COUPON APPLY LOGIC */

document.querySelector(".apply-btn").addEventListener("click", function () {
  const input = document.querySelector(".coupon-box input").value.trim();

  let discount = 0;

  if (input === "FIRST 500") {
    discount = 500;
  }

  // Set discount with currency
  document.getElementById("discountAmount").textContent = "₹" + discount;

  updateBillingTotals();
});

/* OUT OF STOCK FUNCTION */

function markOutOfStock(productRow) {
  const warning = document.getElementById("stockWarning");
  warning.classList.remove("hidden");

  const deleteBtn = productRow.querySelector(".delete-btn");
  deleteBtn.style.filter =
    "brightness(0) saturate(100%) invert(23%) sepia(97%) saturate(7481%) hue-rotate(357deg) brightness(103%) contrast(118%)";

  const qtyBox = productRow.querySelector(".qty-box");
  qtyBox.querySelectorAll("img").forEach((icon) => {
    icon.style.filter = "grayscale(1) opacity(0.4)";
  });

  qtyBox.style.pointerEvents = "none";
}

/*  CLOSE OUT OF STOCK POPUP */
document.getElementById("closeWarning").addEventListener("click", function () {
  document.getElementById("stockWarning").classList.add("hidden");
});

markOutOfStock(document.querySelectorAll(".product-row")[1]);

/* ------------------------ DELIVERY VALIDATION -------------------------- */

document.getElementById("name").addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-z ]/g, "");
});

document.getElementById("email").addEventListener("input", function () {
  this.value = this.value.replace(/[^a-zA-Z0-9@._-]/g, "");
});

document.getElementById("phone").addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");

  if (this.value.length > 10) {
    this.value = this.value.slice(0, 10);
  }
});

document.getElementById("hno").addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-z0-9 -]/g, "");
});

document.getElementById("lane").addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-z ]/g, "");
});

document.getElementById("city").addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-z ]/g, "");
});

document.getElementById("state").addEventListener("input", function () {
  this.value = this.value.replace(/[^A-Za-z ]/g, "");
});

document.getElementById("zip").addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");

  if (this.value.length > 6) {
    this.value = this.value.slice(0, 6);
  }
});
/* ---------------------- SAVE MAIN FORM ---------------------- */

document
  .getElementById("saveAddressBtn")
  .addEventListener("click", function () {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let hno = document.getElementById("hno").value;
    let lane = document.getElementById("lane").value;
    let landmark = document.getElementById("landmark").value;
    let city = document.getElementById("city").value;
    let zip = document.getElementById("zip").value;
    let state = document.getElementById("state").value;

    if (
      !validateDeliveryForm(name, email, phone, hno, lane, city, zip, state)
    ) {
      return;
    }

    let fullAddress = `${hno}, ${lane}, ${landmark}, ${city}, ${state}, ${zip}`;

    let template = document.getElementById("address-template");
    let newCard = template.cloneNode(true);
    newCard.classList.remove("hidden");

    newCard.querySelector(".add-name").textContent = name;
    newCard.querySelector(".add-email").textContent = email;
    newCard.querySelector(".add-phone").textContent = phone;
    newCard.querySelector(".add-full").textContent = fullAddress;

    document.getElementById("address-list").appendChild(newCard);

    document.getElementById("saved-address-section").classList.remove("hidden");
  });

/* ---------------------- BILLING QUANTITY LOGIC ---------------------- */

document.querySelectorAll(".product-row").forEach((row) => {
  let qtySpan = row.querySelector(".qty-box span");
  let priceBox = row.querySelector(".price .rupee");

  let basePrice = parseInt(
    priceBox.textContent.replace("₹", "").replace(/,/g, "")
  );

  let minusBtn = row.querySelector(".qty-box button:nth-child(1)");
  let plusBtn = row.querySelector(".qty-box button:nth-child(3)");

  plusBtn.addEventListener("click", () => {
    let qty = parseInt(qtySpan.textContent);
    qty++;
    qtySpan.textContent = qty;

    priceBox.textContent = "₹" + (basePrice * qty).toLocaleString();

    updateBillingTotals();
  });

  minusBtn.addEventListener("click", () => {
    let qty = parseInt(qtySpan.textContent);
    if (qty > 1) {
      qty--;
      qtySpan.textContent = qty;

      priceBox.textContent = "₹" + (basePrice * qty).toLocaleString();

      updateBillingTotals();
    }
  });
});

/* -------------------- UPDATE BILLING TOTALS -------------------- */

function updateBillingTotals() {
  let subtotal = 0;

  document.querySelectorAll(".product-row").forEach((row) => {
    if (!row.isConnected) return;

    // Skip out-of-stock rows
    if (row.classList.contains("out-of-stock")) return;

    let priceText = row.querySelector(".rupee").textContent;
    let price = parseInt(priceText.replace("₹", "").replace(/,/g, ""));
    subtotal += price;
  });

  document.getElementById("subtotalAmount").textContent =
    subtotal.toLocaleString();

  let gst = Math.round(subtotal * 0.1);
  document.getElementById("gstAmount").textContent = gst.toLocaleString();

  let discountText = document.getElementById("discountAmount").textContent;
  let discount = parseInt(discountText.replace("₹", "").trim()) || 0;

  let payable = subtotal + gst - discount;
  document.getElementById("payableAmount").textContent =
    payable.toLocaleString();
}

/* ---------------- OUT OF STOCK PRODUCT ---------------- */

function markOutOfStock(productRow) {
  const warning = document.getElementById("stockWarning");
  warning.classList.remove("hidden");

  productRow.classList.add("out-of-stock"); // NEW ✔

  const deleteBtn = productRow.querySelector(".delete-btn");
  deleteBtn.style.filter =
    "brightness(0) saturate(100%) invert(23%) sepia(97%) saturate(7481%) hue-rotate(357deg) brightness(103%) contrast(118%)";

  const qtyBox = productRow.querySelector(".qty-box");
  qtyBox.querySelectorAll("img").forEach((icon) => {
    icon.style.filter = "grayscale(1) opacity(0.4)";
  });

  qtyBox.style.pointerEvents = "none";
}

/* Close out-of-stock popup */
document.getElementById("closeWarning").addEventListener("click", function () {
  document.getElementById("stockWarning").classList.add("hidden");
});

/* Remove popup when out-of-stock item is deleted */
document.querySelectorAll(".delete-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    let row = btn.closest(".product-row");

    // Remove the <hr> that comes right after the product
    let hr = row.nextElementSibling;
    if (hr && hr.tagName.toLowerCase() === "hr") {
      hr.remove();
    }

    // Remove the product row
    row.remove();

    // Hide stock popup
    document.getElementById("stockWarning").classList.add("hidden");

    updateBillingTotals();
  });
});
