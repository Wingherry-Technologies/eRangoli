// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");


hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    window.scrollTo(0, 0);
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow="auto";
    document.querySelector(".bottom-nav").style.display="flex";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // ── Header Edit / Publish logic (Photo Gallery style) ──
  (function initHeaderEditPublish() {
    var editBtn = document.getElementById("EEDSW-editHeroBtn");
    var publishBtn = document.getElementById("EEDSW-publishBtn");
    var viewMode = document.getElementById("EEDSW-headerViewMode");
    var editMode = document.getElementById("EEDSW-headerEditMode");

    if (!editBtn || !publishBtn || !viewMode || !editMode) return;

    function showHeaderError(spanId, message) {
      var span = document.getElementById(spanId);
      if (span) {
        span.textContent = message;
        span.style.display = "block";
      }
    }

    function clearHeaderError(spanId) {
      var span = document.getElementById(spanId);
      if (span) {
        span.textContent = "";
        span.style.display = "none";
      }
    }

    // Switch to edit mode
    editBtn.addEventListener("click", function () {
      document.getElementById("EEDSW-heroSubTitle").value = document
        .getElementById("EEDSW-viewSubTitle")
        .textContent.trim();
      viewMode.style.display = "none";
      editMode.style.display = "block";
      editBtn.style.display = "none";
      publishBtn.style.display = "inline-block";
      clearHeaderError("EEDSW-subTitleError");
    });

    // Switch to view mode on Publish (also runs existing min-row check)
    publishBtn.addEventListener("click", function () {
      // Minimum rows check (existing logic) — use getElementById to avoid forward-ref issue
      var tb = document.getElementById("EEDSW-tableBody");
      var toasterEl = document.getElementById("EEDSW-toaster");
      var toasterMsgEl = document.getElementById("EEDSW-toaster-msg");
      if (tb && tb.querySelectorAll("tr").length < 6) {
        if (toasterMsgEl)
          toasterMsgEl.textContent = "minimum 6 rows are required";
        if (toasterEl) {
          toasterEl.classList.add("show");
          setTimeout(function () {
            toasterEl.classList.remove("show");
          }, 3500);
        }
        return;
      }

      // Header field validation
      var subTitleVal = document
        .getElementById("EEDSW-heroSubTitle")
        .value.trim();
      if (!subTitleVal) {
        showHeaderError("EEDSW-subTitleError", "Sub-title cannot be empty.");
        document
          .getElementById("EEDSW-heroSubTitle")
          .classList.add("EEDSW-input-error");
        return;
      }
      clearHeaderError("EEDSW-subTitleError");
      document
        .getElementById("EEDSW-heroSubTitle")
        .classList.remove("EEDSW-input-error");

      // Update view
      document.getElementById("EEDSW-viewSubTitle").textContent = subTitleVal;
      editMode.style.display = "none";
      viewMode.style.display = "block";
      publishBtn.style.display = "none";
      editBtn.style.display = "inline-block";
    });

    // Blur validation
    document
      .getElementById("EEDSW-heroSubTitle")
      .addEventListener("blur", function () {
        if (!this.value.trim()) {
          showHeaderError("EEDSW-subTitleError", "Sub-title cannot be empty.");
          this.classList.add("EEDSW-input-error");
        } else {
          clearHeaderError("EEDSW-subTitleError");
          this.classList.remove("EEDSW-input-error");
        }
      });
  })();

  var addBtn = document.getElementById("EEDSW-addBtn");
  var floatingBtn = document.querySelector(".EEDSW-floating-plus-btn");
  var popup = document.getElementById("EEDSW-addProductPopup");
  var closePopupBtn = document.getElementById("EEDSW-closePopup");
  var tableBody = document.getElementById("EEDSW-tableBody");
  var faqContainer = document.getElementById("EEDSW-mobileFaqContainer");
  var searchInput = document.getElementById("EEDSW-searchInput");
  var noResults = document.getElementById("EEDSW-noResults");
  var addProductBtn = document.getElementById("EEDSW-addProductBtn");
  var validationMsg = document.getElementById("EEDSW-validationMsg");
  var toaster = document.getElementById("EEDSW-toaster");
  var toasterMsg = document.getElementById("EEDSW-toaster-msg");
  var mobCountEl = document.getElementById("EEDSW-mob-count");
  var minError = document.getElementById("EEDSW-minError");
  var minErrorMob = document.getElementById("EEDSW-minErrorMob");

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

    var desktopCount = document.querySelector(".EEDSW-count");
    if (desktopCount) desktopCount.textContent = count + " Products";

    if (mobCountEl) mobCountEl.textContent = count + " Products";
  }

  function syncMobileFaq() {
    if (!faqContainer) return;
    faqContainer.innerHTML = "";

    var rows = tableBody.querySelectorAll("tr");

    rows.forEach(function (row) {
      var imgEl = row.querySelector(".EEDSW-product-img");
      var nameEl = row.querySelector(".EEDSW-product-info span");
      var cells = row.querySelectorAll("td");

      var imgSrc = imgEl ? imgEl.src : "";
      var name = nameEl ? nameEl.textContent.trim() : "";
      var date = cells[1] ? cells[1].textContent.trim() : "";
      var duration = cells[2] ? cells[2].textContent.trim() : "";
      var price = cells[3] ? cells[3].textContent.trim() : "";

      var faqItem = document.createElement("div");
      faqItem.classList.add("EEDSW-faq-item");

      faqItem.innerHTML =
        '<button class="EEDSW-faq-question">' +
        '<div class="EEDSW-faq-title">' +
        '<img src="' +
        imgSrc +
        '" class="EEDSW-product-img" />' +
        '<div class="EEDSW-faq-user-text">' +
        '<span class="EEDSW-faq-username">' +
        name +
        "</span>" +
        "</div>" +
        "</div>" +
        '<img src="../assets/adminProductRecentlyAdded/CaretDown.svg" />' +
        "</button>" +
        '<div class="EEDSW-faq-answer">' +
        '<div class="EEDSW-faq-row">' +
        "<span>Date</span><span>" +
        date +
        "</span>" +
        "</div>" +
        '<div class="EEDSW-faq-row">' +
        "<span>Duration</span><span>" +
        duration +
        "</span>" +
        "</div>" +
        '<div class="EEDSW-faq-row">' +
        "<span>Price</span><span>" +
        price +
        "</span>" +
        "</div>" +
        '<div class="EEDSW-faq-row">' +
        "<span>Action</span>" +
        "<span>" +
        '<img src="../assets/develoeprHMExclusiveProducts/delete.svg" ' +
        'class="EEDSW-delete-icon EEDSW-mob-del-icon" />' +
        "</span>" +
        "</div>" +
        "</div>";

      var question = faqItem.querySelector(".EEDSW-faq-question");
      question.addEventListener("click", function () {
        var isActive = faqItem.classList.contains("active");
        faqContainer.querySelectorAll(".EEDSW-faq-item").forEach(function (el) {
          el.classList.remove("active");
        });
        if (!isActive) faqItem.classList.add("active");
      });

      var mobDelIcon = faqItem.querySelector(".EEDSW-mob-del-icon");
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

  tableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("EEDSW-delete-icon")) {
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
        "#EEDSW-productList .EEDSW-product-item",
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
      '<div class="EEDSW-product-info">' +
      '<img src="' +
      imgSrc +
      '" class="EEDSW-product-img" />' +
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
      '<img src="../assets/develoeprHMExclusiveProducts/delete.svg" class="EEDSW-delete-icon" />' +
      "</td>";
    return tr;
  }

  if (addProductBtn) {
    addProductBtn.addEventListener("click", function () {
      var checkedItems = document.querySelectorAll(
        "#EEDSW-productList .EEDSW-product-item input[type='checkbox']:checked",
      );

      if (checkedItems.length === 0) {
        addProductBtn.classList.add("EEDSW-btn-error");
        if (validationMsg) validationMsg.classList.add("show");
        setTimeout(function () {
          addProductBtn.classList.remove("EEDSW-btn-error");
        }, 600);
        return;
      }

      checkedItems.forEach(function (checkbox) {
        var item = checkbox.closest(".EEDSW-product-item");
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
    if (e.target.closest("#EEDSW-productList")) {
      if (validationMsg) validationMsg.classList.remove("show");
      if (addProductBtn) addProductBtn.classList.remove("EEDSW-btn-error");
    }
  });

  function resetModal() {
    if (searchInput) searchInput.value = "";

    document
      .querySelectorAll("#EEDSW-productList .EEDSW-product-item")
      .forEach(function (item) {
        if (item.dataset.added !== "true") {
          item.style.display = "flex";
        }
        item.querySelector("input[type='checkbox']").checked = false;
      });

    if (noResults) noResults.style.display = "none";
    if (validationMsg) validationMsg.classList.remove("show");
    if (addProductBtn) addProductBtn.classList.remove("EEDSW-btn-error");
  }
});

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(5)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)>li:nth-child(2)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(5) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(5)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(5) li:nth-child(2)").classList.add("submenu-active-page");

