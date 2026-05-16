(function () {
  "use strict";

  let EEDEEWCANW_venueCount = 1;
  let EEDEEWCANW_faqCount = 3;

  function EEDEEWCANW_showError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }

  function EEDEEWCANW_clearError(id) {
    const el = document.getElementById(id);
    if (el) el.textContent = "";
  }

  function EEDEEWCANW_setInvalid(el, invalid) {
    if (!el) return;
    if (invalid) el.classList.add("EEDEEWCANW-invalid");
    else el.classList.remove("EEDEEWCANW-invalid");
  }

  function EEDEEWCANW_isValidURL(str) {
    try {
      const url = new URL(str);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }

  function EEDEEWCANW_isNumeric(str) {
    const cleaned = str.replace(/[₹,\s]/g, "");
    return /^\d+(\.\d{1,2})?$/.test(cleaned);
  }
  function EEDEEWCANW_attachAMPMLogic(inputId, labelId) {
    const input = document.getElementById(inputId);
    const label = document.getElementById(labelId);

    if (!input || !label) return;

    input.addEventListener("change", function () {
      const value = this.value;

      if (!value) return;

      const hour = parseInt(value.split(":")[0]);

      if (hour >= 12) {
        label.textContent = "PM";
      } else {
        label.textContent = "AM";
      }
    });
  }

  function EEDEEWCANW_attachManualTimeFormatter(inputId, labelId) {
    const input = document.getElementById(inputId);
    const label = document.getElementById(labelId);

    if (!input || !label) return;

    input.addEventListener("input", function () {
      let value = input.value.replace(/[^\d]/g, "");

      if (value.length >= 3) value = value.slice(0, 2) + ":" + value.slice(2);

      if (value.length >= 6)
        value = value.slice(0, 5) + ":" + value.slice(5, 7);

      input.value = value;

      const parts = value.split(":");

      if (parts.length >= 1) {
        const hour = parseInt(parts[0]);

        if (!isNaN(hour)) {
          label.textContent = hour >= 12 ? "PM" : "AM";
        }
      }
    });
  }

  function EEDEEWCANW_setupSingleImagePreview(
    inputId,
    previewId,
    placeholderId,
    removeBtnId,
  ) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener("change", function () {
      const file = this.files[0];
      const preview = document.getElementById(previewId);
      const placeholder = document.getElementById(placeholderId);
      const removeBtn = document.getElementById(removeBtnId);
      if (file && preview) {
        const reader = new FileReader();
        reader.onload = function (e) {
          preview.src = e.target.result;
          preview.classList.remove("EEDEEWCANW-hidden");
          if (placeholder) placeholder.style.display = "none";
          if (removeBtn) removeBtn.classList.remove("EEDEEWCANW-hidden");
        };
        reader.readAsDataURL(file);
      }
    });

    const removeBtn = document.getElementById(removeBtnId);
    if (removeBtn) {
      removeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const preview = document.getElementById(previewId);
        const placeholder = document.getElementById(placeholderId);
        if (preview) {
          preview.src = "";
          preview.classList.add("EEDEEWCANW-hidden");
        }
        if (placeholder) placeholder.style.display = "";
        input.value = "";
        this.classList.add("EEDEEWCANW-hidden");
      });
    }
  }

  const EEDEEWCANW_coverInput = document.getElementById(
    "EEDEEWCANW-cover-image-input",
  );

  const EEDEEWCANW_coverPreview = document.getElementById(
    "EEDEEWCANW-cover-preview",
  );

  const EEDEEWCANW_coverPlaceholder = document.getElementById(
    "EEDEEWCANW-cover-placeholder",
  );

  const EEDEEWCANW_removeCoverBtn = document.getElementById(
    "EEDEEWCANW-remove-cover-btn",
  );

  if (EEDEEWCANW_coverInput) {
    EEDEEWCANW_coverInput.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = function (e) {
        EEDEEWCANW_coverPreview.src = e.target.result;

        EEDEEWCANW_coverPreview.classList.remove("EEDEEWCANW-hidden");

        EEDEEWCANW_coverPlaceholder.style.display = "none";

        EEDEEWCANW_removeCoverBtn.classList.remove("EEDEEWCANW-hidden");
      };

      reader.readAsDataURL(file);
    });
  }

  EEDEEWCANW_removeCoverBtn.addEventListener("click", function (e) {
    e.preventDefault();

    EEDEEWCANW_coverPreview.src = "";

    EEDEEWCANW_coverPreview.classList.add("EEDEEWCANW-hidden");

    EEDEEWCANW_coverPlaceholder.style.display = "block";

    EEDEEWCANW_coverInput.value = "";

    this.classList.add("EEDEEWCANW-hidden");
  });

  const EEDEEWCANW_addImagesInput = document.getElementById(
    "EEDEEWCANW-add-images-input",
  );

  const EEDEEWCANW_addImagesGrid = document.getElementById(
    "EEDEEWCANW-add-images-grid",
  );

  const MAX_IMAGES = 5;

  let EEDEEWCANW_uploadedImages = [];

  if (EEDEEWCANW_addImagesInput && EEDEEWCANW_addImagesGrid) {
    EEDEEWCANW_addImagesInput.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (!file) return;

      if (EEDEEWCANW_uploadedImages.length >= MAX_IMAGES) {
        alert("Maximum 5 images allowed");
        return;
      }

      const reader = new FileReader();

      reader.onload = function (event) {
        const tile = document.createElement("div");

        tile.className = "EEDEEWCANW-add-image-tile";

        tile.innerHTML = `
  <span class="EEDEEWCANW-remove-image-btn">✕</span>
  <img src="${event.target.result}" />
`;

        const removeBtn = tile.querySelector(".EEDEEWCANW-remove-image-btn");

        removeBtn.addEventListener("click", function () {
          tile.remove();

          EEDEEWCANW_uploadedImages.pop();

          document.getElementById("EEDEEWCANW-add-images-tile").style.display =
            "flex";
        });

        EEDEEWCANW_addImagesGrid.insertBefore(
          tile,
          document.getElementById("EEDEEWCANW-add-images-tile"),
        );

        EEDEEWCANW_uploadedImages.push(file);

        if (EEDEEWCANW_uploadedImages.length >= MAX_IMAGES) {
          document.getElementById("EEDEEWCANW-add-images-tile").style.display =
            "none";
        }
      };

      reader.readAsDataURL(file);

      this.value = "";
    });
  }

  EEDEEWCANW_setupSingleImagePreview(
    "EEDEEWCANW-product-img-1",
    "EEDEEWCANW-product-preview-1",
    "EEDEEWCANW-prod-ph-1",
    "EEDEEWCANW-remove-prod-1",
  );
  EEDEEWCANW_setupSingleImagePreview(
    "EEDEEWCANW-product-img-2",
    "EEDEEWCANW-product-preview-2",
    "EEDEEWCANW-prod-ph-2",
    "EEDEEWCANW-remove-prod-2",
  );
  EEDEEWCANW_setupSingleImagePreview(
    "EEDEEWCANW-product-img-3",
    "EEDEEWCANW-product-preview-3",
    "EEDEEWCANW-prod-ph-3",
    "EEDEEWCANW-remove-prod-3",
  );

  (function EEDEEWCANW_initMultiSelect() {
    const display = document.getElementById("EEDEEWCANW-languages-display");
    const dropdown = document.getElementById("EEDEEWCANW-languages-dropdown");
    const placeholder = document.getElementById("EEDEEWCANW-lang-placeholder");

    if (!display || !dropdown) return;

    function EEDEEWCANW_updateDisplay() {
      const checked = Array.from(
        dropdown.querySelectorAll(".EEDEEWCANW-lang-cb:checked"),
      ).map((cb) => cb.value);
      if (checked.length === 0) {
        placeholder.textContent = "Select languages";
        placeholder.className = "EEDEEWCANW-multiselect-placeholder";
      } else {
        placeholder.textContent = checked.join(", ");
        placeholder.className = "";
      }
    }

    display.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdown.classList.toggle("EEDEEWCANW-hidden");
    });

    display.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        dropdown.classList.toggle("EEDEEWCANW-hidden");
      }
    });

    dropdown.querySelectorAll(".EEDEEWCANW-lang-cb").forEach((cb) => {
      cb.addEventListener("change", EEDEEWCANW_updateDisplay);
    });

    document.addEventListener("click", function (e) {
      if (!display.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add("EEDEEWCANW-hidden");
      }
    });

    display.addEventListener("blur", function () {
      EEDEEWCANW_validateLanguages();
    });
  })();

  function EEDEEWCANW_validateField(inputId, errorId, label) {
    const el = document.getElementById(inputId);
    if (!el) return true;
    const val = el.value.trim();
    if (!val) {
      EEDEEWCANW_showError(errorId, label + " is required");
      EEDEEWCANW_setInvalid(el, true);
      return false;
    }
    EEDEEWCANW_clearError(errorId);
    EEDEEWCANW_setInvalid(el, false);
    return true;
  }

  function EEDEEWCANW_validatePriceField(inputId, errorId, label) {
    const el = document.getElementById(inputId);
    if (!el) return true;
    const val = el.value.trim();
    if (!val) {
      EEDEEWCANW_showError(errorId, label + " is required");
      EEDEEWCANW_setInvalid(el, true);
      return false;
    }
    if (!EEDEEWCANW_isNumeric(val)) {
      EEDEEWCANW_showError(errorId, label + " must be a valid number");
      EEDEEWCANW_setInvalid(el, true);
      return false;
    }
    EEDEEWCANW_clearError(errorId);
    EEDEEWCANW_setInvalid(el, false);
    return true;
  }

  function EEDEEWCANW_validateLanguages() {
    const checked = document.querySelectorAll(".EEDEEWCANW-lang-cb:checked");
    const display = document.getElementById("EEDEEWCANW-languages-display");
    if (checked.length === 0) {
      EEDEEWCANW_showError(
        "EEDEEWCANW-err-languages",
        "Please select at least one language",
      );
      EEDEEWCANW_setInvalid(display, true);
      return false;
    }
    EEDEEWCANW_clearError("EEDEEWCANW-err-languages");
    EEDEEWCANW_setInvalid(display, false);
    return true;
  }

  function EEDEEWCANW_validateSelect(selectId, errorId, label) {
    const el = document.getElementById(selectId);
    if (!el) return true;
    if (!el.value) {
      EEDEEWCANW_showError(errorId, label + " is required");
      EEDEEWCANW_setInvalid(el, true);
      return false;
    }
    EEDEEWCANW_clearError(errorId);
    EEDEEWCANW_setInvalid(el, false);
    return true;
  }

  function EEDEEWCANW_attachBriefValidation() {
    const briefFields = [
      {
        id: "EEDEEWCANW-workshop-name",
        err: "EEDEEWCANW-err-workshop-name",
        label: "Workshop Name",
        type: "text",
      },
      {
        id: "EEDEEWCANW-expertise",
        err: "EEDEEWCANW-err-expertise",
        label: "Expertise",
        type: "text",
      },
      {
        id: "EEDEEWCANW-price-individual",
        err: "EEDEEWCANW-err-price-individual",
        label: "Price (Individual)",
        type: "price",
      },
      {
        id: "EEDEEWCANW-price-group",
        err: "EEDEEWCANW-err-price-group",
        label: "Price (Group)",
        type: "price",
      },
    ];

    briefFields.forEach((f) => {
      const el = document.getElementById(f.id);
      if (!el) return;
      el.addEventListener("blur", function () {
        if (f.type === "price") {
          EEDEEWCANW_validatePriceField(f.id, f.err, f.label);
        } else {
          EEDEEWCANW_validateField(f.id, f.err, f.label);
        }
      });
    });

    [
      {
        id: "EEDEEWCANW-age-group",
        err: "EEDEEWCANW-err-age-group",
        label: "Age Group",
      },
      { id: "EEDEEWCANW-type", err: "EEDEEWCANW-err-type", label: "Type" },
      {
        id: "EEDEEWCANW-broadcast",
        err: "EEDEEWCANW-err-broadcast",
        label: "Broadcast",
      },
    ].forEach((f) => {
      const el = document.getElementById(f.id);
      if (!el) return;
      el.addEventListener("blur", function () {
        EEDEEWCANW_validateSelect(f.id, f.err, f.label);
      });
      el.addEventListener("change", function () {
        EEDEEWCANW_validateSelect(f.id, f.err, f.label);
      });
    });

    [
      {
        id: "EEDEEWCANW-about-workshop",
        err: "EEDEEWCANW-err-about-workshop",
        label: "Workshop description",
      },
      {
        id: "EEDEEWCANW-topics",
        err: "EEDEEWCANW-err-topics",
        label: "Topics to be learnt",
      },
      {
        id: "EEDEEWCANW-who-can-join",
        err: "EEDEEWCANW-err-who-can-join",
        label: "Who can join",
      },
      {
        id: "EEDEEWCANW-highlights",
        err: "EEDEEWCANW-err-highlights",
        label: "Workshop highlights",
      },
      {
        id: "EEDEEWCANW-takeaway",
        err: "EEDEEWCANW-err-takeaway",
        label: "Takeaway",
      },
      {
        id: "EEDEEWCANW-organizer",
        err: "EEDEEWCANW-err-organizer",
        label: "Organizer/Artisan info",
      },
    ].forEach((f) => {
      const el = document.getElementById(f.id);
      if (!el) return;
      el.addEventListener("blur", function () {
        EEDEEWCANW_validateField(f.id, f.err, f.label);
      });
    });
  }

  const EEDEEWCANW_STATES_CITIES = {
    Maharshtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    Karnataka: ["Bengaluru", "Mysuru", "Hubli", "Mangaluru"],
    Delhi: ["New Delhi", "Dwarka", "Rohini", "Noida"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
    Telangana: ["Hyderabad", "Warangal", "Karimnagar"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Ajmer"],
    "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior"],
  };

  function EEDEEWCANW_buildStateOptions() {
    return (
      '<option value="">Select State</option>' +
      Object.keys(EEDEEWCANW_STATES_CITIES)
        .map((s) => `<option value="${s}">${s}</option>`)
        .join("")
    );
  }

  function EEDEEWCANW_buildCityOptions(state) {
    const cities = EEDEEWCANW_STATES_CITIES[state] || [];
    return (
      '<option value="">Select City</option>' +
      cities.map((c) => `<option value="${c}">${c}</option>`).join("")
    );
  }

  function EEDEEWCANW_createVenueBlock(num) {
    const isFirst = num === 1;

    const deleteBtn = isFirst
      ? ""
      : `<button type="button"
        class="EEDEEWCANW-delete-venue-btn"
        data-venue="${num}"
        title="Delete venue">🗑</button>`;

    return `
  <div class="EEDEEWCANW-venue-block"
       id="EEDEEWCANW-venue-block-${num}"
       data-venue-num="${num}">

<div class="EEDEEWCANW-venue-header">

  <span class="EEDEEWCANW-venue-title">
    Venue ${num}
  </span>

  <div class="EEDEEWCANW-venue-header-actions">

    ${
      num === 1
        ? `<button type="button"
           class="EEDEEWCANW-add-another-link"
           id="EEDEEWCANW-add-venue-btn">
           Add another
         </button>`
        : deleteBtn
    }

  </div>

</div>

    <div class="EEDEEWCANW-venue-two-col">

      <div class="EEDEEWCANW-venue-left">

        <div class="EEDEEWCANW-field-group">
          <label class="EEDEEWCANW-label">Select State</label>
          <select id="EEDEEWCANW-state-${num}" class="EEDEEWCANW-select EEDEEWCANW-venue-state">
            ${EEDEEWCANW_buildStateOptions()}
          </select>
          <div class="EEDEEWCANW-error-msg" id="EEDEEWCANW-err-state-${num}"></div>
        </div>

        <div class="EEDEEWCANW-field-group">
          <label class="EEDEEWCANW-label">Enter Venue Name</label>
          <input type="text"
                 id="EEDEEWCANW-venue-name-${num}"
                 class="EEDEEWCANW-input" />
          <div class="EEDEEWCANW-error-msg"
               id="EEDEEWCANW-err-venue-name-${num}"></div>
        </div>

    <div class ="EEDEEWCANW-roe">
        <div class="EEDEEWCANW-field-group">
          <label class="EEDEEWCANW-label">Select Start Date</label>
          <input type="date"
                 id="EEDEEWCANW-start-date-${num}"
                 class="EEDEEWCANW-input"/>
          <div class="EEDEEWCANW-error-msg"
               id="EEDEEWCANW-err-start-date-${num}"></div>
        </div>

        <div class="EEDEEWCANW-field-group">
          <label class="EEDEEWCANW-label">Select End Date</label>
          <input type="date"
                 id="EEDEEWCANW-end-date-${num}"
                 class="EEDEEWCANW-input"/>
          <div class="EEDEEWCANW-error-msg"
               id="EEDEEWCANW-err-end-date-${num}"></div>
        </div>

    </div>


    <div class ="EEDEEWCANW-roe">
        <div class="EEDEEWCANW-field-group">
          <label class="EEDEEWCANW-label">Select Start time</label>
          <input type="time"
                 id="EEDEEWCANW-start-time-${num}"
                 class="EEDEEWCANW-input"/>
          <div class="EEDEEWCANW-error-msg"
               id="EEDEEWCANW-err-start-time-${num}"></div>
        </div>

        <div class="EEDEEWCANW-field-group">
          <label class="EEDEEWCANW-label">Select End time</label>
          <input type="time"
                 id="EEDEEWCANW-end-time-${num}"
                 class="EEDEEWCANW-input"/>
          <div class="EEDEEWCANW-error-msg"
               id="EEDEEWCANW-err-end-time-${num}"></div>
        </div>

        </div>

      </div>


      <div class="EEDEEWCANW-venue-right">

        <div class="EEDEEWCANW-field-group">
          <label class="EEDEEWCANW-label">Select City</label>
          <select id="EEDEEWCANW-city-${num}"
                  class="EEDEEWCANW-select EEDEEWCANW-venue-city">
            <option value="">Select City</option>
          </select>
          <div class="EEDEEWCANW-error-msg"
               id="EEDEEWCANW-err-city-${num}"></div>
        </div>

        <div class="EEDEEWCANW-field-group">
          <label class="EEDEEWCANW-label">Enter Venue Address</label>
          <textarea id="EEDEEWCANW-venue-address-${num}"
                    class="EEDEEWCANW-textarea"
                    style="min-height:120px"></textarea>
          <div class="EEDEEWCANW-error-msg"
               id="EEDEEWCANW-err-venue-address-${num}"></div>
        </div>

        <div class="EEDEEWCANW-field-group">
          <label class="EEDEEWCANW-label">Enter Venue gmap link</label>
          <input type="text"
                 id="EEDEEWCANW-gmap-${num}"
                 class="EEDEEWCANW-input"/>
          <div class="EEDEEWCANW-error-msg"
               id="EEDEEWCANW-err-gmap-${num}"></div>
        </div>

      </div>

    </div>

  </div>`;
  }

  function EEDEEWCANW_attachVenueValidation(num) {
    const stateEl = document.getElementById(`EEDEEWCANW-state-${num}`);
    if (stateEl) {
      stateEl.addEventListener("change", function () {
        const cityEl = document.getElementById(`EEDEEWCANW-city-${num}`);
        cityEl.innerHTML = EEDEEWCANW_buildCityOptions(this.value);
        if (this.value) {
          EEDEEWCANW_clearError(`EEDEEWCANW-err-state-${num}`);
          EEDEEWCANW_setInvalid(stateEl, false);
        } else {
          EEDEEWCANW_showError(
            `EEDEEWCANW-err-state-${num}`,
            "State is required",
          );
          EEDEEWCANW_setInvalid(stateEl, true);
        }
      });
      stateEl.addEventListener("blur", function () {
        if (!this.value) {
          EEDEEWCANW_showError(
            `EEDEEWCANW-err-state-${num}`,
            "State is required",
          );
          EEDEEWCANW_setInvalid(stateEl, true);
        }
      });
    }

    const cityEl = document.getElementById(`EEDEEWCANW-city-${num}`);
    if (cityEl) {
      cityEl.addEventListener("blur", function () {
        if (!this.value) {
          EEDEEWCANW_showError(
            `EEDEEWCANW-err-city-${num}`,
            "City is required",
          );
          EEDEEWCANW_setInvalid(cityEl, true);
        } else {
          EEDEEWCANW_clearError(`EEDEEWCANW-err-city-${num}`);
          EEDEEWCANW_setInvalid(cityEl, false);
        }
      });
    }

    const venueNameEl = document.getElementById(`EEDEEWCANW-venue-name-${num}`);
    if (venueNameEl) {
      venueNameEl.addEventListener("blur", function () {
        if (!this.value.trim()) {
          EEDEEWCANW_showError(
            `EEDEEWCANW-err-venue-name-${num}`,
            "Venue name is required",
          );
          EEDEEWCANW_setInvalid(venueNameEl, true);
        } else {
          EEDEEWCANW_clearError(`EEDEEWCANW-err-venue-name-${num}`);
          EEDEEWCANW_setInvalid(venueNameEl, false);
        }
      });
    }

    const venueAddrEl = document.getElementById(
      `EEDEEWCANW-venue-address-${num}`,
    );
    if (venueAddrEl) {
      venueAddrEl.addEventListener("blur", function () {
        if (!this.value.trim()) {
          EEDEEWCANW_showError(
            `EEDEEWCANW-err-venue-address-${num}`,
            "Venue address is required",
          );
          EEDEEWCANW_setInvalid(venueAddrEl, true);
        } else {
          EEDEEWCANW_clearError(`EEDEEWCANW-err-venue-address-${num}`);
          EEDEEWCANW_setInvalid(venueAddrEl, false);
        }
      });
    }

    const startDateEl = document.getElementById(`EEDEEWCANW-start-date-${num}`);
    const endDateEl = document.getElementById(`EEDEEWCANW-end-date-${num}`);

    function EEDEEWCANW_validateDates() {
      const startVal = startDateEl ? startDateEl.value : "";
      const endVal = endDateEl ? endDateEl.value : "";
      let valid = true;

      if (!startVal) {
        EEDEEWCANW_showError(
          `EEDEEWCANW-err-start-date-${num}`,
          "Start date is required",
        );
        EEDEEWCANW_setInvalid(startDateEl, true);
        valid = false;
      } else {
        EEDEEWCANW_clearError(`EEDEEWCANW-err-start-date-${num}`);
        EEDEEWCANW_setInvalid(startDateEl, false);
      }

      if (!endVal) {
        EEDEEWCANW_showError(
          `EEDEEWCANW-err-end-date-${num}`,
          "End date is required",
        );
        EEDEEWCANW_setInvalid(endDateEl, true);
        valid = false;
      } else if (startVal && endVal < startVal) {
        EEDEEWCANW_showError(
          `EEDEEWCANW-err-end-date-${num}`,
          "End date must not be earlier than start date",
        );
        EEDEEWCANW_setInvalid(endDateEl, true);
        valid = false;
      } else {
        EEDEEWCANW_clearError(`EEDEEWCANW-err-end-date-${num}`);
        EEDEEWCANW_setInvalid(endDateEl, false);
      }
      return valid;
    }

    if (startDateEl)
      startDateEl.addEventListener("blur", EEDEEWCANW_validateDates);
    if (endDateEl) endDateEl.addEventListener("blur", EEDEEWCANW_validateDates);

    const startTimeEl = document.getElementById(`EEDEEWCANW-start-time-${num}`);
    const endTimeEl = document.getElementById(`EEDEEWCANW-end-time-${num}`);

    function EEDEEWCANW_validateTimes() {
      const startT = startTimeEl ? startTimeEl.value : "";
      const endT = endTimeEl ? endTimeEl.value : "";
      let valid = true;

      if (!startT) {
        EEDEEWCANW_showError(
          `EEDEEWCANW-err-start-time-${num}`,
          "Start time is required",
        );
        EEDEEWCANW_setInvalid(startTimeEl, true);
        valid = false;
      } else {
        EEDEEWCANW_clearError(`EEDEEWCANW-err-start-time-${num}`);
        EEDEEWCANW_setInvalid(startTimeEl, false);
      }

      if (!endT) {
        EEDEEWCANW_showError(
          `EEDEEWCANW-err-end-time-${num}`,
          "End time is required",
        );
        EEDEEWCANW_setInvalid(endTimeEl, true);
        valid = false;
      } else if (startT && endT <= startT) {
        EEDEEWCANW_showError(
          `EEDEEWCANW-err-end-time-${num}`,
          "End time must be after start time",
        );
        EEDEEWCANW_setInvalid(endTimeEl, true);
        valid = false;
      } else {
        EEDEEWCANW_clearError(`EEDEEWCANW-err-end-time-${num}`);
        EEDEEWCANW_setInvalid(endTimeEl, false);
      }
      return valid;
    }

    if (startTimeEl)
      startTimeEl.addEventListener("blur", EEDEEWCANW_validateTimes);
    if (endTimeEl) endTimeEl.addEventListener("blur", EEDEEWCANW_validateTimes);

    const gmapEl = document.getElementById(`EEDEEWCANW-gmap-${num}`);
    if (gmapEl) {
      gmapEl.addEventListener("blur", function () {
        const val = this.value.trim();
        if (!val) {
          EEDEEWCANW_showError(
            `EEDEEWCANW-err-gmap-${num}`,
            "Google map link is required",
          );
          EEDEEWCANW_setInvalid(gmapEl, true);
        } else if (!EEDEEWCANW_isValidURL(val)) {
          EEDEEWCANW_showError(
            `EEDEEWCANW-err-gmap-${num}`,
            "Please enter a valid URL (starting with http:// or https://)",
          );
          EEDEEWCANW_setInvalid(gmapEl, true);
        } else {
          EEDEEWCANW_clearError(`EEDEEWCANW-err-gmap-${num}`);
          EEDEEWCANW_setInvalid(gmapEl, false);
        }
      });
    }
  }

  function EEDEEWCANW_addVenue() {
    EEDEEWCANW_venueCount++;
    const container = document.getElementById("EEDEEWCANW-venues-container");
    const div = document.createElement("div");
    div.innerHTML = EEDEEWCANW_createVenueBlock(EEDEEWCANW_venueCount);
    container.appendChild(div.firstElementChild);
    EEDEEWCANW_attachVenueValidation(EEDEEWCANW_venueCount);

    const delBtn = container.querySelector(
      `[data-venue="${EEDEEWCANW_venueCount}"]`,
    );
    if (delBtn) {
      delBtn.addEventListener("click", function () {
        const block = document.getElementById(
          `EEDEEWCANW-venue-block-${this.dataset.venue}`,
        );
        if (block) block.remove();
        EEDEEWCANW_renumberVenues();
      });
    }
    EEDEEWCANW_attachManualTimeFormatter(
      `EEDEEWCANW-start-time-${EEDEEWCANW_venueCount}`,
      `EEDEEWCANW-start-time-format-${EEDEEWCANW_venueCount}`,
    );

    EEDEEWCANW_attachManualTimeFormatter(
      `EEDEEWCANW-end-time-${EEDEEWCANW_venueCount}`,
      `EEDEEWCANW-end-time-format-${EEDEEWCANW_venueCount}`,
    );
    EEDEEWCANW_attachAMPMLogic(
      `EEDEEWCANW-start-time-${EEDEEWCANW_venueCount}`,
      `EEDEEWCANW-start-time-format-${EEDEEWCANW_venueCount}`,
    );

    EEDEEWCANW_attachAMPMLogic(
      `EEDEEWCANW-end-time-${EEDEEWCANW_venueCount}`,
      `EEDEEWCANW-end-time-format-${EEDEEWCANW_venueCount}`,
    );
  }

  function EEDEEWCANW_renumberVenues() {
    const blocks = document.querySelectorAll(".EEDEEWCANW-venue-block");
    blocks.forEach((block, idx) => {
      const title = block.querySelector(".EEDEEWCANW-venue-title");
      if (title) title.textContent = "Venue " + (idx + 1);
    });
  }

  EEDEEWCANW_attachVenueValidation(1);

  EEDEEWCANW_attachManualTimeFormatter(
    "EEDEEWCANW-start-time-1",
    "EEDEEWCANW-start-time-format-1",
  );

  EEDEEWCANW_attachManualTimeFormatter(
    "EEDEEWCANW-end-time-1",
    "EEDEEWCANW-end-time-format-1",
  );

  EEDEEWCANW_attachAMPMLogic(
    "EEDEEWCANW-start-time-1",
    "EEDEEWCANW-start-time-format-1",
  );

  EEDEEWCANW_attachAMPMLogic(
    "EEDEEWCANW-end-time-1",
    "EEDEEWCANW-end-time-format-1",
  );
  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "EEDEEWCANW-add-venue-btn") {
      EEDEEWCANW_addVenue();
    }
  });

  function EEDEEWCANW_createFAQBlock(num) {
    return `
    <div class="EEDEEWCANW-faq-block" id="EEDEEWCANW-faq-block-${num}">
      <label class="EEDEEWCANW-faq-q-label" for="EEDEEWCANW-faq-q-${num}">Write a question -${num}</label>
      <input type="text" id="EEDEEWCANW-faq-q-${num}" name="EEDEEWCANW-faq-q-${num}" class="EEDEEWCANW-input" placeholder="Write the content here" />
      <div class="EEDEEWCANW-error-msg" id="EEDEEWCANW-err-faq-q-${num}"></div>

      <label class="EEDEEWCANW-faq-a-label" for="EEDEEWCANW-faq-a-${num}">Write answer -${num}</label>
      <textarea id="EEDEEWCANW-faq-a-${num}" name="EEDEEWCANW-faq-a-${num}" class="EEDEEWCANW-textarea" placeholder="Write the content here"></textarea>
      <div class="EEDEEWCANW-error-msg" id="EEDEEWCANW-err-faq-a-${num}"></div>
    </div>`;
  }

  function EEDEEWCANW_attachFAQValidation(num) {
    const qEl = document.getElementById(`EEDEEWCANW-faq-q-${num}`);
    if (qEl) {
      qEl.addEventListener("blur", function () {
        if (!this.value.trim()) {
          EEDEEWCANW_showError(
            `EEDEEWCANW-err-faq-q-${num}`,
            "Question is required",
          );
          EEDEEWCANW_setInvalid(qEl, true);
        } else {
          EEDEEWCANW_clearError(`EEDEEWCANW-err-faq-q-${num}`);
          EEDEEWCANW_setInvalid(qEl, false);
        }
      });
    }

    const aEl = document.getElementById(`EEDEEWCANW-faq-a-${num}`);
    if (aEl) {
      aEl.addEventListener("blur", function () {
        if (!this.value.trim()) {
          EEDEEWCANW_showError(
            `EEDEEWCANW-err-faq-a-${num}`,
            "Answer is required",
          );
          EEDEEWCANW_setInvalid(aEl, true);
        } else {
          EEDEEWCANW_clearError(`EEDEEWCANW-err-faq-a-${num}`);
          EEDEEWCANW_setInvalid(aEl, false);
        }
      });
    }
  }

  function EEDEEWCANW_addFAQ() {
    EEDEEWCANW_faqCount++;
    const container = document.getElementById("EEDEEWCANW-faq-container");
    const div = document.createElement("div");
    div.innerHTML = EEDEEWCANW_createFAQBlock(EEDEEWCANW_faqCount);
    container.appendChild(div.firstElementChild);
    EEDEEWCANW_attachFAQValidation(EEDEEWCANW_faqCount);
  }

  EEDEEWCANW_attachFAQValidation(1);
  EEDEEWCANW_attachFAQValidation(2);
  EEDEEWCANW_attachFAQValidation(3);

  document
    .getElementById("EEDEEWCANW-add-faq-btn")
    .addEventListener("click", function () {
      EEDEEWCANW_addFAQ();
    });

  EEDEEWCANW_attachBriefValidation();

  function EEDEEWCANW_validateBriefSection() {
    let valid = true;
    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-workshop-name",
        "EEDEEWCANW-err-workshop-name",
        "Workshop Name",
      ) && valid;
    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-expertise",
        "EEDEEWCANW-err-expertise",
        "Expertise",
      ) && valid;
    valid = EEDEEWCANW_validateLanguages() && valid;
    valid =
      EEDEEWCANW_validateSelect(
        "EEDEEWCANW-age-group",
        "EEDEEWCANW-err-age-group",
        "Age Group",
      ) && valid;
    valid =
      EEDEEWCANW_validatePriceField(
        "EEDEEWCANW-price-individual",
        "EEDEEWCANW-err-price-individual",
        "Price (Individual)",
      ) && valid;
    valid =
      EEDEEWCANW_validatePriceField(
        "EEDEEWCANW-price-group",
        "EEDEEWCANW-err-price-group",
        "Price (Group)",
      ) && valid;
    valid =
      EEDEEWCANW_validateSelect(
        "EEDEEWCANW-type",
        "EEDEEWCANW-err-type",
        "Type",
      ) && valid;
    valid =
      EEDEEWCANW_validateSelect(
        "EEDEEWCANW-broadcast",
        "EEDEEWCANW-err-broadcast",
        "Broadcast",
      ) && valid;
    return valid;
  }

  function EEDEEWCANW_validateVenueSection() {
    let valid = true;
    const blocks = document.querySelectorAll(".EEDEEWCANW-venue-block");
    blocks.forEach((block) => {
      const num = block.dataset.venueNum;
      valid =
        EEDEEWCANW_validateSelect(
          `EEDEEWCANW-state-${num}`,
          `EEDEEWCANW-err-state-${num}`,
          "State",
        ) && valid;
      valid =
        EEDEEWCANW_validateSelect(
          `EEDEEWCANW-city-${num}`,
          `EEDEEWCANW-err-city-${num}`,
          "City",
        ) && valid;
      valid =
        EEDEEWCANW_validateField(
          `EEDEEWCANW-venue-name-${num}`,
          `EEDEEWCANW-err-venue-name-${num}`,
          "Venue Name",
        ) && valid;
      valid =
        EEDEEWCANW_validateField(
          `EEDEEWCANW-venue-address-${num}`,
          `EEDEEWCANW-err-venue-address-${num}`,
          "Venue Address",
        ) && valid;
      valid =
        EEDEEWCANW_validateField(
          `EEDEEWCANW-gmap-${num}`,
          `EEDEEWCANW-err-gmap-${num}`,
          "Google Map Link",
        ) && valid;
      valid =
        EEDEEWCANW_validateField(
          `EEDEEWCANW-start-date-${num}`,
          `EEDEEWCANW-err-start-date-${num}`,
          "Start Date",
        ) && valid;
      valid =
        EEDEEWCANW_validateField(
          `EEDEEWCANW-end-date-${num}`,
          `EEDEEWCANW-err-end-date-${num}`,
          "End Date",
        ) && valid;
      valid =
        EEDEEWCANW_validateField(
          `EEDEEWCANW-start-time-${num}`,
          `EEDEEWCANW-err-start-time-${num}`,
          "Start Time",
        ) && valid;
      valid =
        EEDEEWCANW_validateField(
          `EEDEEWCANW-end-time-${num}`,
          `EEDEEWCANW-err-end-time-${num}`,
          "End Time",
        ) && valid;
    });
    return valid;
  }

  function EEDEEWCANW_validateDetailsSection() {
    let valid = true;
    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-about-workshop",
        "EEDEEWCANW-err-about-workshop",
        "Workshop Description",
      ) && valid;
    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-topics",
        "EEDEEWCANW-err-topics",
        "Topics",
      ) && valid;
    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-who-can-join",
        "EEDEEWCANW-err-who-can-join",
        "Who can join",
      ) && valid;
    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-highlights",
        "EEDEEWCANW-err-highlights",
        "Highlights",
      ) && valid;
    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-takeaway",
        "EEDEEWCANW-err-takeaway",
        "Takeaway",
      ) && valid;
    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-organizer",
        "EEDEEWCANW-err-organizer",
        "Organizer info",
      ) && valid;
    return valid;
  }

  function EEDEEWCANW_validateFAQSection() {
    let valid = true;
    for (let i = 1; i <= EEDEEWCANW_faqCount; i++) {
      if (document.getElementById(`EEDEEWCANW-faq-q-${i}`)) {
        valid =
          EEDEEWCANW_validateField(
            `EEDEEWCANW-faq-q-${i}`,
            `EEDEEWCANW-err-faq-q-${i}`,
            `Question ${i}`,
          ) && valid;
        valid =
          EEDEEWCANW_validateField(
            `EEDEEWCANW-faq-a-${i}`,
            `EEDEEWCANW-err-faq-a-${i}`,
            `Answer ${i}`,
          ) && valid;
      }
    }
    return valid;
  }

  function EEDEEWCANW_validateCoordinatorName() {
    const el = document.getElementById("EEDEEWCANW-coordinator-name");
    if (!el) return true;
    const val = el.value.trim();
    if (!val) {
      EEDEEWCANW_showError(
        "EEDEEWCANW-err-coordinator-name",
        "Co-ordinator Name is required",
      );
      EEDEEWCANW_setInvalid(el, true);
      return false;
    }
    if (!/^[A-Za-z\s]+$/.test(val)) {
      EEDEEWCANW_showError(
        "EEDEEWCANW-err-coordinator-name",
        "Co-ordinator Name must contain only alphabets and spaces",
      );
      EEDEEWCANW_setInvalid(el, true);
      return false;
    }
    EEDEEWCANW_clearError("EEDEEWCANW-err-coordinator-name");
    EEDEEWCANW_setInvalid(el, false);
    return true;
  }

  function EEDEEWCANW_validateMobile(inputId, errorId, label) {
    const el = document.getElementById(inputId);
    if (!el) return true;
    const val = el.value.trim();
    if (!val) {
      EEDEEWCANW_showError(errorId, `${label} is required`);
      EEDEEWCANW_setInvalid(el, true);
      return false;
    }
    if (val.length !== 10) {
      EEDEEWCANW_showError(errorId, `${label} must be exactly 10 digits`);
      EEDEEWCANW_setInvalid(el, true);
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(val)) {
      EEDEEWCANW_showError(errorId, `${label} must start with 6, 7, 8, or 9`);
      EEDEEWCANW_setInvalid(el, true);
      return false;
    }
    EEDEEWCANW_clearError(errorId);
    EEDEEWCANW_setInvalid(el, false);
    return true;
  }

  function EEDEEWCANW_validateCoordinatorSection() {
    let valid = true;
    valid = EEDEEWCANW_validateCoordinatorName() && valid;
    valid =
      EEDEEWCANW_validateMobile(
        "EEDEEWCANW-coordinator-mobile",
        "EEDEEWCANW-err-coordinator-mobile",
        "Co-ordinator Mobile Number",
      ) && valid;
    valid =
      EEDEEWCANW_validateMobile(
        "EEDEEWCANW-alternate-mobile",
        "EEDEEWCANW-err-alternate-mobile",
        "Alternate Mobile Number",
      ) && valid;
    return valid;
  }

  const EEDEEWCANW_coordNameEl = document.getElementById(
    "EEDEEWCANW-coordinator-name",
  );
  if (EEDEEWCANW_coordNameEl) {
    EEDEEWCANW_coordNameEl.addEventListener("keypress", function (e) {
      const char = String.fromCharCode(e.which || e.keyCode);
      if (!/[A-Za-z\s]/.test(char)) {
        e.preventDefault();
      }
    });
    EEDEEWCANW_coordNameEl.addEventListener("input", function () {
      this.value = this.value.replace(/[^A-Za-z\s]/g, "");
    });
    EEDEEWCANW_coordNameEl.addEventListener("blur", function () {
      EEDEEWCANW_validateCoordinatorName();
    });
  }

  ["EEDEEWCANW-coordinator-mobile", "EEDEEWCANW-alternate-mobile"].forEach(
    function (id) {
      const input = document.getElementById(id);
      if (!input) return;
      input.addEventListener("keypress", function (e) {
        if (!/\d/.test(String.fromCharCode(e.which || e.keyCode))) {
          e.preventDefault();
        }
        if (this.value.length >= 10) {
          e.preventDefault();
        }
      });
      input.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 10);
      });
    },
  );

  const EEDEEWCANW_coordMobileEl = document.getElementById(
    "EEDEEWCANW-coordinator-mobile",
  );
  if (EEDEEWCANW_coordMobileEl) {
    EEDEEWCANW_coordMobileEl.addEventListener("blur", function () {
      EEDEEWCANW_validateMobile(
        "EEDEEWCANW-coordinator-mobile",
        "EEDEEWCANW-err-coordinator-mobile",
        "Co-ordinator Mobile Number",
      );
    });
  }

  const EEDEEWCANW_altMobileEl = document.getElementById(
    "EEDEEWCANW-alternate-mobile",
  );
  if (EEDEEWCANW_altMobileEl) {
    EEDEEWCANW_altMobileEl.addEventListener("blur", function () {
      EEDEEWCANW_validateMobile(
        "EEDEEWCANW-alternate-mobile",
        "EEDEEWCANW-err-alternate-mobile",
        "Alternate Mobile Number",
      );
    });
  }

  const EEDEEWCANW_saveCoordBtn = document.getElementById(
    "EEDEEWCANW-save-coordinator-btn",
  );
  if (EEDEEWCANW_saveCoordBtn) {
    EEDEEWCANW_saveCoordBtn.addEventListener("click", function () {
      if (EEDEEWCANW_validateCoordinatorSection()) {
        const btn = this;
        btn.textContent = "Saved!";
        btn.style.background = "#34a853";
        setTimeout(() => {
          btn.textContent = "Save";
          btn.style.background = "";
        }, 2000);
      }
    });
  }

  const EEDEEWCANW_changeCoordBtn = document.getElementById(
    "EEDEEWCANW-change-coordinator-btn",
  );
  if (EEDEEWCANW_changeCoordBtn) {
    EEDEEWCANW_changeCoordBtn.addEventListener("click", function () {
      const el = document.getElementById("EEDEEWCANW-coordinator-name");
      if (el) el.focus();
    });
  }

  document.querySelectorAll(".EEDEEWCANW-save-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const section = this.dataset.section;
      let sectionValid = true;

      if (section === "brief") sectionValid = EEDEEWCANW_validateBriefSection();
      else if (section === "venue")
        sectionValid = EEDEEWCANW_validateVenueSection();
      else if (section === "details")
        sectionValid = EEDEEWCANW_validateDetailsSection();
      else if (section === "faq")
        sectionValid = EEDEEWCANW_validateFAQSection();

      if (!sectionValid) return;

      const orig = this.textContent;
      this.textContent = "Saved!";
      this.style.background = "#34a853";
      setTimeout(() => {
        this.textContent = orig;
        this.style.background = "";
      }, 1500);
      console.log('EEDEEWCANW: Section "' + section + '" saved.');
    });
  });

  document
    .getElementById("EEDEEWCANW-preview-btn")
    .addEventListener("click", function () {
      if (EEDEEWCANW_validateFullForm()) {
        window.location.href = "E-EducationDeveloperAddNewWorkshopPreview.html";
      }
    });

  document
    .getElementById("EEDEEWCANW-publish-btn")
    .addEventListener("click", function () {
      if (EEDEEWCANW_validateFullForm()) {
        window.location.href = "E-EducationDeveloperAddNewWorkshopPreview.html";
      }
    });

  function EEDEEWCANW_validateFullForm() {
    let valid = true;

    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-workshop-name",
        "EEDEEWCANW-err-workshop-name",
        "Workshop Name",
      ) && valid;

    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-expertise",
        "EEDEEWCANW-err-expertise",
        "Expertise",
      ) && valid;

    valid = EEDEEWCANW_validateLanguages() && valid;

    valid =
      EEDEEWCANW_validateSelect(
        "EEDEEWCANW-age-group",
        "EEDEEWCANW-err-age-group",
        "Age Group",
      ) && valid;

    valid =
      EEDEEWCANW_validatePriceField(
        "EEDEEWCANW-price-individual",
        "EEDEEWCANW-err-price-individual",
        "Price (Individual)",
      ) && valid;

    valid =
      EEDEEWCANW_validatePriceField(
        "EEDEEWCANW-price-group",
        "EEDEEWCANW-err-price-group",
        "Price (Group)",
      ) && valid;

    valid =
      EEDEEWCANW_validateSelect(
        "EEDEEWCANW-type",
        "EEDEEWCANW-err-type",
        "Type",
      ) && valid;

    valid =
      EEDEEWCANW_validateSelect(
        "EEDEEWCANW-broadcast",
        "EEDEEWCANW-err-broadcast",
        "Broadcast",
      ) && valid;

    valid =
      EEDEEWCANW_validateSelect(
        "EEDEEWCANW-state-1",
        "EEDEEWCANW-err-state-1",
        "State",
      ) && valid;

    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-venue-name-1",
        "EEDEEWCANW-err-venue-name-1",
        "Venue Name",
      ) && valid;

    valid =
      EEDEEWCANW_validateSelect(
        "EEDEEWCANW-city-1",
        "EEDEEWCANW-err-city-1",
        "City",
      ) && valid;

    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-venue-address-1",
        "EEDEEWCANW-err-venue-address-1",
        "Venue Address",
      ) && valid;

    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-gmap-1",
        "EEDEEWCANW-err-gmap-1",
        "Google Map Link",
      ) && valid;

    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-start-date-1",
        "EEDEEWCANW-err-start-date-1",
        "Start Date",
      ) && valid;

    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-end-date-1",
        "EEDEEWCANW-err-end-date-1",
        "End Date",
      ) && valid;

    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-start-time-1",
        "EEDEEWCANW-err-start-time-1",
        "Start Time",
      ) && valid;

    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-end-time-1",
        "EEDEEWCANW-err-end-time-1",
        "End Time",
      ) && valid;

    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-about-workshop",
        "EEDEEWCANW-err-about-workshop",
        "Workshop Description",
      ) && valid;

    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-topics",
        "EEDEEWCANW-err-topics",
        "Topics",
      ) && valid;

    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-who-can-join",
        "EEDEEWCANW-err-who-can-join",
        "Who can join",
      ) && valid;

    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-highlights",
        "EEDEEWCANW-err-highlights",
        "Highlights",
      ) && valid;

    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-takeaway",
        "EEDEEWCANW-err-takeaway",
        "Takeaway",
      ) && valid;

    valid =
      EEDEEWCANW_validateField(
        "EEDEEWCANW-organizer",
        "EEDEEWCANW-err-organizer",
        "Organizer info",
      ) && valid;

    for (let i = 1; i <= EEDEEWCANW_faqCount; i++) {
      if (document.getElementById(`EEDEEWCANW-faq-q-${i}`)) {
        valid =
          EEDEEWCANW_validateField(
            `EEDEEWCANW-faq-q-${i}`,
            `EEDEEWCANW-err-faq-q-${i}`,
            `Question ${i}`,
          ) && valid;
        valid =
          EEDEEWCANW_validateField(
            `EEDEEWCANW-faq-a-${i}`,
            `EEDEEWCANW-err-faq-a-${i}`,
            `Answer ${i}`,
          ) && valid;
      }
    }

    valid = EEDEEWCANW_validateCoordinatorSection() && valid;

    return valid;
  }
})();
