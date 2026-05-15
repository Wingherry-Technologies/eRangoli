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
// ── Header Edit / Publish logic (mirrors Our School Partners exactly) ──
(function initHeaderEditPublish() {
  const editBtn = document.getElementById("EDPGeditHeroBtn");
  const publishBtn = document.getElementById("EDPGpublishHeroBtn");
  const viewMode = document.getElementById("EDPGviewMode");
  const editMode = document.getElementById("EDPGeditMode");

  if (!editBtn || !publishBtn || !viewMode || !editMode) return;

  function showError(spanId, message) {
    const span = document.getElementById(spanId);
    if (span) {
      span.textContent = message;
      span.style.display = "block";
    }
  }

  function clearError(spanId) {
    const span = document.getElementById(spanId);
    if (span) {
      span.textContent = "";
      span.style.display = "none";
    }
  }

  // Switch to edit mode
  editBtn.addEventListener("click", function () {
    document.getElementById("EDPGheroHeading").value = document
      .getElementById("EDPGviewHeading")
      .textContent.trim();
    document.getElementById("EDPGheroSubText").value = document
      .getElementById("EDPGviewSubText")
      .innerText.trim();
    document.getElementById("EDPGheroTitle").value = document
      .getElementById("EDPGviewTitle")
      .textContent.trim();
    document.getElementById("EDPGheroSubText2").value = document
      .getElementById("EDPGviewSubText2")
      .innerText.trim();

    viewMode.style.display = "none";
    editMode.style.display = "block";
    editBtn.style.display = "none";
    publishBtn.style.display = "inline-block";

    [
      "EDPGheadingError",
      "EDPGsubTextError",
      "EDPGtitleError",
      "EDPGsubText2Error",
    ].forEach(clearError);
  });

  // Switch to view mode on Publish
  publishBtn.addEventListener("click", function () {
    const headingVal = document.getElementById("EDPGheroHeading").value.trim();
    const subTextVal = document.getElementById("EDPGheroSubText").value.trim();
    const titleVal = document.getElementById("EDPGheroTitle").value.trim();
    const subText2Val = document
      .getElementById("EDPGheroSubText2")
      .value.trim();

    let valid = true;

    if (!headingVal) {
      showError("EDPGheadingError", "Heading cannot be empty.");
      valid = false;
    } else clearError("EDPGheadingError");

    if (!subTextVal) {
      showError("EDPGsubTextError", "Sub-text cannot be empty.");
      valid = false;
    } else clearError("EDPGsubTextError");

    if (!titleVal) {
      showError("EDPGtitleError", "Title cannot be empty.");
      valid = false;
    } else clearError("EDPGtitleError");

    if (!subText2Val) {
      showError("EDPGsubText2Error", "Sub-text cannot be empty.");
      valid = false;
    } else clearError("EDPGsubText2Error");

    if (!valid) return;

    // Update view
    document.getElementById("EDPGviewHeading").textContent = headingVal;
    document.getElementById("EDPGviewSubText").textContent = subTextVal;
    document.getElementById("EDPGviewTitle").textContent = titleVal;
    document.getElementById("EDPGviewSubText2").textContent = subText2Val;

    editMode.style.display = "none";
    viewMode.style.display = "block";
    publishBtn.style.display = "none";
    editBtn.style.display = "inline-block";
  });

  // Blur-based validation
  document
    .getElementById("EDPGheroHeading")
    .addEventListener("blur", function () {
      if (!this.value.trim())
        showError("EDPGheadingError", "Heading cannot be empty.");
      else clearError("EDPGheadingError");
    });
  document
    .getElementById("EDPGheroSubText")
    .addEventListener("blur", function () {
      if (!this.value.trim())
        showError("EDPGsubTextError", "Sub-text cannot be empty.");
      else clearError("EDPGsubTextError");
    });
  document
    .getElementById("EDPGheroTitle")
    .addEventListener("blur", function () {
      if (!this.value.trim())
        showError("EDPGtitleError", "Title cannot be empty.");
      else clearError("EDPGtitleError");
    });
  document
    .getElementById("EDPGheroSubText2")
    .addEventListener("blur", function () {
      if (!this.value.trim())
        showError("EDPGsubText2Error", "Sub-text cannot be empty.");
      else clearError("EDPGsubText2Error");
    });
})();

// ── Tile dropdown toggle (global, used by inline onclick) ──
function EDPGtoggleDropdown(id) {
  const all = document.querySelectorAll(".EDPGtile-dropdown");
  all.forEach(function (dropdown) {
    if (dropdown.id !== id) {
      dropdown.classList.remove("open");
    }
  });
  const current = document.getElementById(id);
  if (current) {
    current.classList.toggle("open");
  }
}

document.addEventListener("click", function (e) {
  if (!e.target.closest(".EDPGimg-tile")) {
    document.querySelectorAll(".EDPGtile-dropdown").forEach(function (d) {
      d.classList.remove("open");
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Bind delete/set-on-home for initial tiles
  bindTileActions();

  // IMAGE GRID - ADD TILE
  const addTile = document.getElementById("EDPGaddTile");
  const imageInput = document.getElementById("EDPGimageInput");
  const imageGrid = document.querySelector(".EDPGimage-grid");

  // MINIMUM 3 MEDIA VALIDATION
  const heroPublishBtn = document.getElementById("EDPG-publish-btn");
  const minPopup = document.getElementById("EDPG-minCategoryPopup");
  const closeMinPopup = document.getElementById("EDPG-closeMinPopup");

  if (heroPublishBtn) {
    heroPublishBtn.addEventListener("click", function () {
      const mediaTiles = document.querySelectorAll(
        ".EDPGimg-tile-wrapper .EDPGimg-tile",
      );
      if (mediaTiles.length < 3) {
        minPopup.style.display = "flex";
        return;
      }
    });
  }

  if (closeMinPopup) {
    closeMinPopup.addEventListener("click", function () {
      minPopup.style.display = "none";
    });
  }

  // ADD TILE: clicking "+" directly opens file upload
  if (addTile && imageInput && imageGrid) {
    addTile.addEventListener("click", function () {
      imageInput.click();
    });

    imageInput.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
        imageInput.value = "";
        return;
      }

      const reader = new FileReader();

      reader.onload = function (event) {
        const wrapper = document.createElement("div");
        wrapper.className = "EDPGimg-tile-wrapper";

        const uniqueId = Date.now();
        const tileId = "EDPGtile" + uniqueId;
        const dropdownId = "EDPGdd" + uniqueId;

        let mediaElement = "";

        if (file.type.startsWith("image/")) {
          mediaElement =
            '<img src="' + event.target.result + '" alt="Gallery Media" />';
        } else if (file.type.startsWith("video/")) {
          mediaElement =
            "<video controls>" +
            '<source src="' +
            event.target.result +
            '" type="' +
            file.type +
            '">' +
            "Your browser does not support the video tag." +
            "</video>";
        }

        wrapper.innerHTML =
          '<div class="EDPGimg-tile" id="' +
          tileId +
          '">' +
          mediaElement +
          '<span class="EDPGtile-menu-btn" onclick="EDPGtoggleDropdown(\'' +
          dropdownId +
          "')\">" +
          "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 256 256'%3E%3Ccircle cx='128' cy='60' r='16' fill='%23fff'/%3E%3Ccircle cx='128' cy='128' r='16' fill='%23fff'/%3E%3Ccircle cx='128' cy='196' r='16' fill='%23fff'/%3E%3C/svg%3E\" alt=\"menu\" />" +
          "</span>" +
          '<div class="EDPGtile-dropdown" id="' +
          dropdownId +
          '">' +
          '<button class="EDPGset-home">Set on Home</button>' +
          '<button class="EDPGdelete">Delete</button>' +
          "</div>" +
          "</div>";

        wrapper
          .querySelector(".EDPGdelete")
          .addEventListener("click", function (e) {
            e.stopPropagation();
            wrapper.remove();
          });

        wrapper
          .querySelector(".EDPGset-home")
          .addEventListener("click", function (e) {
            e.stopPropagation();
            EDPGtoggleDropdown(dropdownId);
          });

        imageGrid.insertBefore(wrapper, addTile.parentElement);
        imageInput.value = "";
      };

      reader.readAsDataURL(file);
    });
  }

  // Bind actions for initial static tiles
  function bindTileActions() {
    document
      .querySelectorAll(".EDPGtile-dropdown .EDPGdelete")
      .forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const tileWrapper = btn.closest(".EDPGimg-tile-wrapper");
          if (tileWrapper) tileWrapper.remove();
        });
      });

    document
      .querySelectorAll(".EDPGtile-dropdown .EDPGset-home")
      .forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const dropdown = btn.closest(".EDPGtile-dropdown");
          if (dropdown) dropdown.classList.remove("open");
        });
      });
  }
});
document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(5)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)>li:nth-child(2)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(5) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(5)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(5) li:nth-child(2)").classList.add("submenu-active-page");

