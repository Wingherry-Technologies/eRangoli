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
    // Active pay button
    payBtn.style.background = "#A10404";
    payBtn.style.cursor = "pointer";
  } else {
    // Disabled / Grey button
    payBtn.style.background = "#716B6B";
    payBtn.style.cursor = "not-allowed";
  }
}

document.addEventListener("change", function (e) {
  if (e.target.matches("#address-list .use-detail input")) {
    // Only allow ONE address selection at a time
    const allChecks = document.querySelectorAll(
      "#address-list .use-detail input"
    );

    allChecks.forEach((chk) => {
      if (chk !== e.target) chk.checked = false;
    });

    updatePayButton();
  }
});

// When an address is added → update the button state
document.addEventListener("addressAdded", updatePayButton);

// When deleted → update the button
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("address-delete-btn")) {
    setTimeout(updatePayButton, 50);
  }
});

/* COUPON APPLY LOGIC */

document.querySelector(".apply-btn").addEventListener("click", function () {
  const input = document.querySelector(".coupon-box input").value.trim();

  // Read values from HTML
  const subtotal = parseInt(
    document.getElementById("subtotalAmount").textContent
  );
  const gst = parseInt(document.getElementById("gstAmount").textContent);
  const discountBox = document.getElementById("discountAmount");
  const payableBox = document.getElementById("payableAmount");

  let discount = 0;

  if (input === "FIRST500") {
    discount = 500;
  } else {
    alert("Invalid coupon code!");
    discount = 0;
  }

  // Update discount
  discountBox.textContent = discount;

  // Calculate final payable
  const payable = subtotal + gst - discount;

  payableBox.textContent = payable;
});

/* OUT OF STOCK FUNCTION */

function markOutOfStock(productRow) {
  // Show Warning Popup
  const warning = document.getElementById("stockWarning");
  warning.classList.remove("hidden");

  // Turn DELETE icon red
  const deleteBtn = productRow.querySelector(".delete-btn");
  // turn icon RED using CSS filter
  deleteBtn.style.filter =
    "brightness(0) saturate(100%) invert(23%) sepia(97%) saturate(7481%) hue-rotate(357deg) brightness(103%) contrast(118%)";

  // 3️⃣ Disable + and – buttons
  const qtyBox = productRow.querySelector(".qty-box");
  const qtyIcons = qtyBox.querySelectorAll("img");

  qtyIcons.forEach((icon) => {
    icon.style.filter = "grayscale(1) opacity(0.4)";
  });

  // Disable clicking
  qtyBox.style.pointerEvents = "none";
}

/*  CLOSE OUT OF STOCK POPUP */
document.getElementById("closeWarning").addEventListener("click", function () {
  document.getElementById("stockWarning").classList.add("hidden");
});

markOutOfStock(document.querySelectorAll(".product-row")[1]);
