  // Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon = document.querySelector("#hamburger-menu>img");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display = "none";
    document.querySelector("body").style.overflow = "hidden";
    window.scrollTo(0, 0);
  } else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".bottom-nav").style.display = "flex";
  }
});

/* ======================================================
   SECTION SWITCHING + SCROLL SYNC
====================================================== */

const cards = document.querySelectorAll(".template-card");
const sections = document.querySelectorAll(".template-content");
const sectionName = document.getElementById("sectionName");
const rightPanel = document.querySelector(".right-panel");


/* ==========================================
   CLICK LEFT IMAGE -> SCROLL RIGHT SECTION
========================================== */

cards.forEach(card => {

  card.addEventListener("click", () => {

    const target =
      card.getAttribute("data-template");

    const activeSection =
      document.getElementById(target);

    /* REMOVE ACTIVE */

    cards.forEach(item => {
      item.classList.remove("active");
    });

    /* ADD ACTIVE */

    card.classList.add("active");

    /* UPDATE HEADER */

    sectionName.innerText =
      "(" + card.getAttribute("data-name") + ")";

    /* SMOOTH SCROLL RIGHT PANEL */

    rightPanel.scrollTo({
      top: activeSection.offsetTop - 20,
      behavior: "smooth"
    });

  });

});


/* ==========================================
   RIGHT PANEL SCROLL -> ACTIVATE LEFT IMAGE
========================================== */

rightPanel.addEventListener("scroll", () => {

  let currentSection = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      rightPanel.scrollTop >= sectionTop - 150 &&
      rightPanel.scrollTop <
      sectionTop + sectionHeight - 150
    ) {

      currentSection =
        section.getAttribute("id");

    }

  });

  if (currentSection !== "") {

    /* REMOVE OLD ACTIVE */

    cards.forEach(card => {
      card.classList.remove("active");
    });

    /* FIND MATCHING CARD */

    const activeCard = document.querySelector(
      `.template-card[data-template="${currentSection}"]`
    );

    if (activeCard) {

      /* ADD ACTIVE */

      activeCard.classList.add("active");

      /* UPDATE HEADING */

      sectionName.innerText =
        "(" + activeCard.getAttribute("data-name") + ")";

      /* AUTO SCROLL LEFT PANEL */

      activeCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });

    }

  }

});


/* ======================================================
   IMAGE PREVIEW
====================================================== */

function previewImage(event, boxId) {

  const file = event.target.files[0];

  if (!file) return;

  /* IMAGE VALIDATION */

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp"
  ];

  if (!allowedTypes.includes(file.type)) {

    alert("Only JPG, PNG and WEBP images are allowed");

    event.target.value = "";

    return;
  }

  /* MAX SIZE 5MB */

  if (file.size > 5 * 1024 * 1024) {

    alert("Image size should be below 5MB");

    event.target.value = "";

    return;
  }

  const box =
    document.getElementById(boxId);

  const reader = new FileReader();

  reader.onload = function (e) {

    box.classList.add("has-image");

    box.innerHTML = `

      <img src="${e.target.result}"
           class="preview-image">

      <button class="delete-image"
              onclick="deleteImage('${boxId}')">
          ×
      </button>

      <input type="file"
             accept="image/*"
             style="display:none"
             onchange="previewImage(event,'${boxId}')">

    `;
  };

  reader.readAsDataURL(file);

}


/* ======================================================
   DELETE IMAGE
====================================================== */

function deleteImage(boxId) {

  const box =
    document.getElementById(boxId);

  box.classList.remove("has-image");

  box.innerHTML = `

    <label class="upload-label">

      Upload Image

      <input type="file"
             accept="image/*"
             onchange="previewImage(event,'${boxId}')">

    </label>

    <button class="delete-image"
            onclick="deleteImage('${boxId}')">
        ×
    </button>

  `;
}


/* ======================================================
   INPUT VALIDATION
====================================================== */

function validateInputs() {

  let isValid = true;

  const requiredFields =
    document.querySelectorAll(".required-field");

  requiredFields.forEach(field => {

    field.classList.remove("input-error");

    const value = field.value.trim();

    /* EMPTY VALIDATION */

    if (value === "") {

      field.classList.add("input-error");

      isValid = false;

    }

    /* TITLE VALIDATION */

    if (
      field.classList.contains("title-input") &&
      value.length < 3
    ) {

      field.classList.add("input-error");

      isValid = false;

    }

    /* TEXTAREA VALIDATION */

    if (
      field.tagName === "TEXTAREA" &&
      value.length < 20
    ) {

      field.classList.add("input-error");

      isValid = false;

    }

  });

  return isValid;

}


/* ======================================================
   IMAGE VALIDATION
====================================================== */

function validateImages() {

  let imageBoxes =
    document.querySelectorAll(".upload-box");

  let uploadedCount = 0;

  imageBoxes.forEach(box => {

    if (box.classList.contains("has-image")) {

      uploadedCount++;

    }

  });

  if (uploadedCount === 0) {

    alert("Please upload at least one image");

    return false;

  }

  return true;

}


/* ======================================================
   PUBLISH VALIDATION
====================================================== */

function publishMagazine() {

  const inputsValid = validateInputs();

  if (!inputsValid) {

    alert("Please fill all required fields properly");

    return;

  }

  const imagesValid = validateImages();

  if (!imagesValid) {

    return;

  }

  /* SUCCESS */

  alert("Magazine Published Successfully");

}


/* ======================================================
   REALTIME VALIDATION
====================================================== */

document
  .querySelectorAll(".required-field")
  .forEach(field => {

    field.addEventListener("input", () => {

      if (field.value.trim() !== "") {

        field.classList.remove("input-error");

      }

    });

  });


/* ==========================================
   OPEN SELECTED SECTION FROM FIRST PAGE
========================================== */

window.addEventListener("DOMContentLoaded", () => {

  const urlParams =
    new URLSearchParams(window.location.search);

  const selectedSection =
    urlParams.get("section");

  if (!selectedSection) return;

  /* REMOVE ACTIVE */

  cards.forEach(card => {
    card.classList.remove("active");
  });

  /* FIND ACTIVE */

  const activeCard = document.querySelector(
    `.template-card[data-template="${selectedSection}"]`
  );

  const activeSection =
    document.getElementById(selectedSection);

  if (activeCard && activeSection) {

    /* ACTIVATE CARD */

    activeCard.classList.add("active");

    /* UPDATE HEADER */

    sectionName.innerText =
      "(" + activeCard.getAttribute("data-name") + ")";

    /* SCROLL RIGHT PANEL */

    rightPanel.scrollTo({
      top: activeSection.offsetTop - 20,
      behavior: "smooth"
    });

    /* AUTO SCROLL LEFT */

    activeCard.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

  }

});


/* ======================================================
   EDIT ENABLE / DISABLE
====================================================== */

function toggleSectionEdit(button) {

  /* FIND CONTENT BLOCK */

  const contentBlock =
    button.closest(".content-block") ||
    button.closest(".artisan-content");

  if (!contentBlock) return;

  /* GET INPUTS */

  const fields =
    contentBlock.querySelectorAll(
      "input, textarea"
    );

  fields.forEach(field => {

    /* ENABLE EDIT */

    field.removeAttribute("readonly");

    field.classList.add("editing");

    field.focus();

  });

}

/* ======================================================
   PREVENT DIRECT EDIT ONLY FOR TEXT FIELDS
====================================================== */

document.addEventListener("click", (e) => {

  const field =
    e.target.closest("input, textarea");

  if (!field) return;

  /* ALLOW FILE INPUT DIRECTLY */

  if (field.type === "file") {
    return;
  }

  /* IF NOT EDITING */

  if (
    !field.classList.contains("editing")
  ) {

    field.blur();

    alert(
      "Please click the edit icon to edit this content"
    );

  }

});


/* ======================================================
   BLOCK TYPING ONLY FOR TEXT INPUTS
====================================================== */

document.addEventListener("keydown", (e) => {

  const field =
    document.activeElement;

  if (
    field &&
    (
      field.tagName === "INPUT" ||
      field.tagName === "TEXTAREA"
    )
  ) {

    /* ALLOW FILE INPUT */

    if (field.type === "file") {
      return;
    }

    /* ALLOW TAB */

    if (e.key === "Tab") return;

    /* CHECK EDIT MODE */

    if (
      !field.classList.contains("editing")
    ) {

      e.preventDefault();

      alert(
        "Please click the edit icon to edit this content"
      );

    }

  }

});

/* ======================================================
   SECTION 3 ADD / DELETE ARTISAN
====================================================== */

const addArtisanBtn =
  document.querySelector("#section3 .add-btn");

const artisanTemplate =
  document.getElementById("artisanTemplate");

let artisanCount =
  document.querySelectorAll(
    "#section3 .artisan-block"
  ).length;

let imageBoxCounter = 200;


/* ==========================================
   ADD NEW ARTISAN
========================================== */

addArtisanBtn.addEventListener("click", () => {

  artisanCount++;

  const clone =
    artisanTemplate.content.cloneNode(true);

  const artisanBlock =
    clone.querySelector(".artisan-block");

  /* TITLE */

  clone.querySelector(".artisan-title")
    .innerText = `Artisan ${artisanCount}`;

  /* IMAGE IDS */

  const uploadBoxes =
    clone.querySelectorAll(".upload-box");

  uploadBoxes.forEach(box => {

    const uniqueId =
      "box" + imageBoxCounter++;

    box.id = uniqueId;

    /* FILE INPUT */

    const fileInput =
      box.querySelector('input[type="file"]');

    fileInput.setAttribute(
      "onchange",
      `previewImage(event,'${uniqueId}')`
    );

    /* DELETE BUTTON */

    const deleteBtn =
      box.querySelector(".delete-image");

    deleteBtn.setAttribute(
      "onclick",
      `deleteImage('${uniqueId}')`
    );

  });

  /* INSERT */

  artisanTemplate.before(clone);

});


/* ==========================================
   SECTION 3 EDIT + DELETE
========================================== */

document.addEventListener("click", (e) => {

  /* =========================
   DELETE ARTISAN
========================= */

if (
  e.target.classList.contains(
    "delete-artisan"
  )
) {

  const artisanBlock =
    e.target.closest(".artisan-block");

  if (!artisanBlock) return;

  const totalBlocks =
    document.querySelectorAll(
      "#section3 .artisan-block"
    ).length;

  if (totalBlocks === 1) {

    alert(
      "At least one artisan section is required"
    );

    return;

  }

  /* DELETE CONFIRMATION */

  const confirmDelete =
    confirm(
      "Are you sure you want to delete this artisan section?"
    );

  if (!confirmDelete) return;

  /* DELETE */

  artisanBlock.remove();

  /* UPDATE NUMBER */

  updateArtisanNumbers();

  /* SUCCESS ALERT */

  alert(
    "Artisan section deleted successfully"
  );

}


  /* =========================
     EDIT ARTISAN
  ========================= */

  if (
    e.target.classList.contains(
      "edit-artisan"
    )
  ) {

    const artisanBlock =
      e.target.closest(".artisan-block");

    if (!artisanBlock) return;

    const fields =
      artisanBlock.querySelectorAll(
        "input, textarea"
      );

    fields.forEach(field => {

      /* SKIP FILE INPUT */

      if (field.type !== "file") {

        field.removeAttribute(
          "readonly"
        );

        field.classList.add(
          "editing"
        );

      }

    });

  }

});


/* ==========================================
   UPDATE NUMBERING
========================================== */

function updateArtisanNumbers() {

  const artisanBlocks =
    document.querySelectorAll(
      "#section3 .artisan-block"
    );

  artisanBlocks.forEach((block, index) => {

    const title =
      block.querySelector(".artisan-title");

    title.innerText =
      `Artisan ${index + 1}`;

  });

  artisanCount =
    artisanBlocks.length;

}


document.querySelector(".sidebar-main-vendor > article > ul > li:nth-of-type(6)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul > ul:nth-of-type(4)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul > ul:nth-of-type(4) > li:nth-child(1)",).classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(6) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(6)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(6) li:nth-child(1)").classList.add("submenu-active-page");