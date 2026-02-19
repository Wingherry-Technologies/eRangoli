

/* EDIT TOGGLE — per level */
function CE_toggleLevelEdit(levelId) {

  const level = document.getElementById(levelId);
  if (!level) return;

  const inputs = level.querySelectorAll(".CE-input");
  const section = level.closest(".CE-section");


  section.querySelectorAll(".CE-level").forEach(function(lvl) {
    if (lvl.id !== levelId) {
      lvl.classList.remove("CE-editing");
      lvl.querySelectorAll(".CE-input").forEach(function(inp) {
        inp.setAttribute("readonly", true);
      });
    }
  });

  // Toggle current level
  if (level.classList.contains("CE-editing")) {
    level.classList.remove("CE-editing");
    inputs.forEach(function(inp) { inp.setAttribute("readonly", true); });
  } else {
    level.classList.add("CE-editing");
    inputs.forEach(function(inp) { inp.removeAttribute("readonly"); });
    // Focus first input
    const firstInput = level.querySelector(".CE-input");
    if (firstInput) firstInput.focus();
  }
}

/* DELETE — per level */
function CE_deleteLevel(levelId) {
  const level = document.getElementById(levelId);
  if (!level) return;
  level.remove();
}


/* VALIDATION */
function CE_validateSection(section) {
  let ok = true;
  section.querySelectorAll('.CE-input[data-required="true"]').forEach(function(inp) {
    const errEl = document.getElementById(inp.id.replace("CE-input", "CE-err"));
    if (!inp.value.trim()) {
      ok = false;
      if (errEl) errEl.classList.add("CE-show");
    } else {
      if (errEl) errEl.classList.remove("CE-show");
    }
  });
  return ok;
}

// Inline validation on blur
document.addEventListener("blur", function(e) {
  const inp = e.target;
  if (!inp.classList.contains("CE-input") || inp.dataset.required !== "true") return;
  const errEl = document.getElementById(inp.id.replace("CE-input", "CE-err"));
  if (!inp.value.trim()) {
    if (errEl) errEl.classList.add("CE-show");
  } else {
    if (errEl) errEl.classList.remove("CE-show");
  }
}, true);


/* IMAGE UPLOAD */
function CE_clickUpload(fileInputId, levelId) {
  const level = document.getElementById(levelId);
  if (!level || !level.classList.contains("CE-editing")) return;
  document.getElementById(fileInputId).click();
}

function CE_previewImg(input, previewId, boxId) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.getElementById(previewId);
    const box = document.getElementById(boxId);
    img.src = e.target.result;
    img.style.display = "block";
    const ph = box.querySelector(".CE-upload-placeholder");
    if (ph) ph.style.display = "none";
  };
  reader.readAsDataURL(file);
}

// checks closest .CE-level for CE-editing 
function CE_removeImg(event, previewId, boxId) {
  event.stopPropagation();
  const level = event.target.closest(".CE-level");
  if (!level || !level.classList.contains("CE-editing")) return;
  const img = document.getElementById(previewId);
  const box = document.getElementById(boxId);
  if (img) {
    img.src = "";
    img.style.display = "none";
  }
  const ph = box ? box.querySelector(".CE-upload-placeholder") : null;
  if (ph) ph.style.display = "flex";
  const fi = box ? box.parentElement.querySelector(".CE-file-input") : null;
  if (fi) fi.value = "";
}



/* SAVE ALL */
function CE_saveAll() {
  let allValid = true;
  document.querySelectorAll(".CE-section").forEach(function(section) {
    // Close all editing levels on save
    section.querySelectorAll(".CE-level").forEach(function(level) {
      level.classList.remove("CE-editing");
      level.querySelectorAll(".CE-input").forEach(function(inp) {
        inp.setAttribute("readonly", true);
      });
    });
    if (!CE_validateSection(section)) allValid = false;
  });

  if (!allValid) {
    return;
  }

  // Build payload from all sections and levels
  const payload = [];
  document.querySelectorAll(".CE-section").forEach(function(section) {
    const entry = { section_id: section.dataset.sectionId, levels: [] };
    section.querySelectorAll(".CE-level").forEach(function(level) {
      const inp = level.querySelector(".CE-input");
      const img = level.querySelector(".CE-img-preview");
      entry.levels.push({
        depth: level.dataset.level,
        field_name: level.dataset.fieldName,
        required: level.dataset.required === "true",
        value: inp ? inp.value : "",
        image_src: img ? img.src : "",
      });
    });
    payload.push(entry);
  });

}


/*  image/placeholder visibility on load */
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".CE-upload-box").forEach(function(box) {
    const img = box.querySelector(".CE-img-preview");
    const ph = box.querySelector(".CE-upload-placeholder");
    const hasSrc = img && img.getAttribute("src") && img.getAttribute("src").length > 0;
    if (hasSrc) {
      img.style.display = "block";
      if (ph) ph.style.display = "none";
    } else {
      if (img) img.style.display = "none";
      if (ph) ph.style.display = "flex";
    }
  });
});


document.querySelectorAll(".CE-edit-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    const levelId = this.dataset.id;
    CE_toggleLevelEdit(levelId);
  });
});

document.querySelectorAll(".CE-delete-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    const levelId = this.dataset.id;
    CE_deleteLevel(levelId);
  });
});

document.querySelectorAll(".CE-upload-box").forEach(box => {
  box.addEventListener("click", function () {
    const fileId = this.dataset.file;
    const levelId = this.dataset.level;

    CE_clickUpload(fileId, levelId);
  });
});


document.querySelectorAll(".CE-remove-img").forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.stopPropagation();

    const level = this.closest(".CE-level");
    if (!level.classList.contains("CE-editing")) return;

    const box = this.closest(".CE-upload-box");
    const img = box.querySelector(".CE-img-preview");
    const ph = box.querySelector(".CE-upload-placeholder");
    const fileInput = box.parentElement.querySelector(".CE-file-input");

    // reset image
    img.src = "";
    img.style.display = "none";

    // show placeholder
    if (ph) ph.style.display = "flex";

    // reset file input
    if (fileInput) fileInput.value = "";
  });
});



document.querySelectorAll(".CE-file-input").forEach(input => {
  input.addEventListener("change", function () {

    const file = this.files[0];
    if (!file) return;

    const level = this.closest(".CE-level");
    if (!level.classList.contains("CE-editing")) return;

    const box = this.parentElement.querySelector(".CE-upload-box");
    const img = box.querySelector(".CE-img-preview");
    const ph = box.querySelector(".CE-upload-placeholder");

    const reader = new FileReader();

    reader.onload = function (e) {
      img.src = e.target.result;
      img.style.display = "block";

      if (ph) ph.style.display = "none";
    };

    reader.readAsDataURL(file);
  });
});


const backBtn = document.querySelector(".CE-back-btn");
if (backBtn) {
  backBtn.addEventListener("click", function () {
    history.back();
  });
}


const saveBtn = document.querySelector(".CE-save-btn");
if (saveBtn) {
  saveBtn.addEventListener("click", function () {
    CE_saveAll();
  });
}

