document.addEventListener("DOMContentLoaded", function () {
  var publishBtn = document.getElementById("EEDWC-publishBtn");
  var addBtn = document.getElementById("EEDWC-addBtn");
  var floatingBtn = document.querySelector(".EEDWC-floating-plus-btn");
  var popup = document.getElementById("EEDWC-addProductPopup");
  var closePopupBtn = document.getElementById("EEDWC-closePopup");
  var tableBody = document.getElementById("EEDWC-tableBody");
  var faqContainer = document.getElementById("EEDWC-mobileFaqContainer");
  var searchInput = document.getElementById("EEDWC-searchInput");
  var noResults = document.getElementById("EEDWC-noResults");
  var addProductBtn = document.getElementById("EEDWC-addProductBtn");
  var validationMsg = document.getElementById("EEDWC-validationMsg");
  var toaster = document.getElementById("EEDWC-toaster");
  var toasterMsg = document.getElementById("EEDWC-toaster-msg");
  var mobCountEl = document.getElementById("EEDWC-mob-count");
  var minError = document.getElementById("EEDWC-minError");
  var minErrorMob = document.getElementById("EEDWC-minErrorMob");

  var toasterTimer = null;

  function showToaster(msg) {
    toasterMsg.textContent = msg;
    toaster.classList.add("show");
    clearTimeout(toasterTimer);
    toasterTimer = setTimeout(function () {
      toaster.classList.remove("show");
    }, 3500);
  }

  var errTimer = null;

  function showBottomError() {
    if (minError) minError.classList.add("show");
    if (minErrorMob) minErrorMob.classList.add("show");
    clearTimeout(errTimer);
    errTimer = setTimeout(function () {
      hideBottomError();
    }, 3000);
  }

  function hideBottomError() {
    if (minError) minError.classList.remove("show");
    if (minErrorMob) minErrorMob.classList.remove("show");
  }

  function updateCount() {
    var count = tableBody.querySelectorAll("tr").length;

    var desktopCount = document.querySelector(".EEDWC-count");
    if (desktopCount) desktopCount.textContent = count + " Products";

    if (mobCountEl) mobCountEl.textContent = count + " Products";
  }

  function syncMobileFaq() {
    if (!faqContainer) return;
    faqContainer.innerHTML = "";

    var rows = tableBody.querySelectorAll("tr");

    rows.forEach(function (row) {
      var imgEl = row.querySelector(".EEDWC-product-img");
      var nameEl = row.querySelector(".EEDWC-product-info span");
      var cells = row.querySelectorAll("td");

      var imgSrc = imgEl ? imgEl.src : "";
      var name = nameEl ? nameEl.textContent.trim() : "";
      var date = cells[1] ? cells[1].textContent.trim() : "";
      var duration = cells[2] ? cells[2].textContent.trim() : "";
      var price = cells[3] ? cells[3].textContent.trim() : "";

      var faqItem = document.createElement("div");
      faqItem.classList.add("EEDWC-faq-item");

      faqItem.innerHTML =
        '<button class="EEDWC-faq-question">' +
        '<div class="EEDWC-faq-title">' +
        '<img src="' +
        imgSrc +
        '" class="EEDWC-product-img" />' +
        '<div class="EEDWC-faq-user-text">' +
        '<span class="EEDWC-faq-username">' +
        name +
        "</span>" +
        "</div>" +
        "</div>" +
        '<img src="../assets/adminProductRecentlyAdded/CaretDown.svg" />' +
        "</button>" +
        '<div class="EEDWC-faq-answer">' +
        '<div class="EEDWC-faq-row">' +
        "<span>Date</span><span>" +
        date +
        "</span>" +
        "</div>" +
        '<div class="EEDWC-faq-row">' +
        "<span>Duration</span><span>" +
        duration +
        "</span>" +
        "</div>" +
        '<div class="EEDWC-faq-row">' +
        "<span>Price</span><span>" +
        price +
        "</span>" +
        "</div>" +
        '<div class="EEDWC-faq-row">' +
        "<span>Action</span>" +
        "<span>" +
        '<img src="../assets/develoeprHMExclusiveProducts/delete.svg" ' +
        'class="EEDWC-delete-icon EEDWC-mob-del-icon" />' +
        "</span>" +
        "</div>" +
        "</div>";

      var question = faqItem.querySelector(".EEDWC-faq-question");
      question.addEventListener("click", function () {
        var isActive = faqItem.classList.contains("active");
        faqContainer.querySelectorAll(".EEDWC-faq-item").forEach(function (el) {
          el.classList.remove("active");
        });
        if (!isActive) faqItem.classList.add("active");
      });

      var mobDelIcon = faqItem.querySelector(".EEDWC-mob-del-icon");
      mobDelIcon.addEventListener("click", function (e) {
        e.stopPropagation();
        var currentCount = tableBody.querySelectorAll("tr").length;
        if (currentCount <= 6) {
          showBottomError();
          return;
        }
        row.remove();
        faqItem.remove();
        hideBottomError();
        updateCount();
      });

      faqContainer.appendChild(faqItem);
    });
  }

  syncMobileFaq();
  updateCount();

  if (publishBtn) {
    publishBtn.addEventListener("click", function () {
      if (tableBody.querySelectorAll("tr").length < 6) {
        showToaster("minimum 6 rows are required");
      }
    });
  }

  tableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("EEDWC-delete-icon")) {
      var row = e.target.closest("tr");
      if (!row) return;

      var currentCount = tableBody.querySelectorAll("tr").length;
      if (currentCount <= 6) {
        showBottomError();
        return;
      }

      row.remove();
      hideBottomError();
      syncMobileFaq();
      updateCount();
    }
  });

  function openModal() {
    popup.style.display = "flex";
  }

  function closeModal() {
    popup.style.display = "none";
    resetModal();
  }

  if (addBtn) addBtn.addEventListener("click", openModal);
  if (floatingBtn) floatingBtn.addEventListener("click", openModal);
  if (closePopupBtn) closePopupBtn.addEventListener("click", closeModal);

  window.addEventListener("click", function (e) {
    if (e.target === popup) closeModal();
  });

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      var query = this.value.trim().toLowerCase();
      var items = document.querySelectorAll(
        "#EEDWC-productList .EEDWC-product-item",
      );
      var visibleCount = 0;

      items.forEach(function (item) {
        if (item.dataset.added === "true") return;
        var name = (item.dataset.name || "").toLowerCase();
        var sku = (item.dataset.sku || "").toLowerCase();
        var matches = name.includes(query) || sku.includes(query);
        item.style.display = matches ? "flex" : "none";
        if (matches) visibleCount++;
      });

      if (noResults) {
        noResults.style.display = visibleCount === 0 ? "block" : "none";
      }
    });
  }

  function createTableRow(imgSrc, name, date, duration, price) {
    var tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" +
      '<div class="EEDWC-product-info">' +
      '<img src="' +
      imgSrc +
      '" class="EEDWC-product-img" />' +
      "<span>" +
      name +
      "</span>" +
      "</div>" +
      "</td>" +
      "<td>" +
      date +
      "</td>" +
      "<td>" +
      duration +
      "</td>" +
      "<td>" +
      price +
      "</td>" +
      "<td>" +
      '<img src="../assets/develoeprHMExclusiveProducts/delete.svg" class="EEDWC-delete-icon" />' +
      "</td>";
    return tr;
  }

  if (addProductBtn) {
    addProductBtn.addEventListener("click", function () {
      var checkedItems = document.querySelectorAll(
        "#EEDWC-productList .EEDWC-product-item input[type='checkbox']:checked",
      );

      if (checkedItems.length === 0) {
        addProductBtn.classList.add("EEDWC-btn-error");
        if (validationMsg) validationMsg.classList.add("show");
        setTimeout(function () {
          addProductBtn.classList.remove("EEDWC-btn-error");
        }, 600);
        return;
      }

      checkedItems.forEach(function (checkbox) {
        var item = checkbox.closest(".EEDWC-product-item");
        var name = item.dataset.name || "Product Name";
        var date = item.dataset.date || "15/02/2026";
        var duration = item.dataset.duration || "2 hrs 30min";
        var price = item.dataset.price || "₹2,674";
        var imgEl = item.querySelector("img");
        var imgSrc = imgEl
          ? imgEl.src
          : "../assets/develoeprHMExclusiveProducts/img.png";

        tableBody.appendChild(
          createTableRow(imgSrc, name, date, duration, price),
        );

        checkbox.checked = false;
        item.dataset.added = "true";
        item.style.display = "none";
      });

      syncMobileFaq();
      updateCount();
      closeModal();
    });
  }

  document.addEventListener("change", function (e) {
    if (e.target.closest("#EEDWC-productList")) {
      if (validationMsg) validationMsg.classList.remove("show");
      if (addProductBtn) addProductBtn.classList.remove("EEDWC-btn-error");
    }
  });

  function resetModal() {
    if (searchInput) searchInput.value = "";

    document
      .querySelectorAll("#EEDWC-productList .EEDWC-product-item")
      .forEach(function (item) {
        if (item.dataset.added !== "true") {
          item.style.display = "flex";
        }
        item.querySelector("input[type='checkbox']").checked = false;
      });

    if (noResults) noResults.style.display = "none";
    if (validationMsg) validationMsg.classList.remove("show");
    if (addProductBtn) addProductBtn.classList.remove("EEDWC-btn-error");
  }
});
