/* ============================================
   EANW - Add New Workshop Script
   ============================================ */

(function () {
  'use strict';

  // ---- State ----
  // Venue 1 and FAQ 1-3 are already in the HTML, so start counters accordingly.
  let EANW_venueCount = 1;
  let EANW_faqCount = 3;

  // ---- Helpers ----
  function EANW_showError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }

  function EANW_clearError(id) {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  }

  function EANW_setInvalid(el, invalid) {
    if (!el) return;
    if (invalid) el.classList.add('EANW-invalid');
    else el.classList.remove('EANW-invalid');
  }

  function EANW_isValidURL(str) {
    try {
      const url = new URL(str);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch { return false; }
  }

  function EANW_isNumeric(str) {
    const cleaned = str.replace(/[₹,\s]/g, '');
    return /^\d+(\.\d{1,2})?$/.test(cleaned);
  }
  function EANW_attachAMPMLogic(inputId, labelId) {

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

function EANW_attachManualTimeFormatter(inputId, labelId) {

  const input = document.getElementById(inputId);
  const label = document.getElementById(labelId);

  if (!input || !label) return;

  input.addEventListener("input", function () {

    let value = input.value.replace(/[^\d]/g, "");

    if (value.length >= 3)
      value = value.slice(0, 2) + ":" + value.slice(2);

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

  // ---- Image Preview Helper ----
function EANW_setupSingleImagePreview(inputId, previewId, placeholderId, removeBtnId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('change', function () {
    const file = this.files[0];
    const preview = document.getElementById(previewId);
    const placeholder = document.getElementById(placeholderId);
    const removeBtn = document.getElementById(removeBtnId);
    if (file && preview) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.classList.remove('EANW-hidden');
        if (placeholder) placeholder.style.display = 'none';
        if (removeBtn) removeBtn.classList.remove('EANW-hidden');
      };
      reader.readAsDataURL(file);
    }
  });

  // Remove button logic
  const removeBtn = document.getElementById(removeBtnId);
  if (removeBtn) {
    removeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const preview = document.getElementById(previewId);
      const placeholder = document.getElementById(placeholderId);
      if (preview) {
        preview.src = '';
        preview.classList.add('EANW-hidden');
      }
      if (placeholder) placeholder.style.display = '';
      input.value = '';
      this.classList.add('EANW-hidden');
    });
  }
}

  // ---- Cover Image Preview ----
const EANW_coverInput =
document.getElementById("EANW-cover-image-input");

const EANW_coverPreview =
document.getElementById("EANW-cover-preview");

const EANW_coverPlaceholder =
document.getElementById("EANW-cover-placeholder");

const EANW_removeCoverBtn =
document.getElementById("EANW-remove-cover-btn");


if (EANW_coverInput) {

  EANW_coverInput.addEventListener("change", function () {

    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

      EANW_coverPreview.src = e.target.result;

      EANW_coverPreview.classList.remove("EANW-hidden");

      EANW_coverPlaceholder.style.display = "none";

      EANW_removeCoverBtn.classList.remove("EANW-hidden");

    };

    reader.readAsDataURL(file);
  });
}


/* REMOVE COVER IMAGE */

EANW_removeCoverBtn.addEventListener("click", function (e) {

  e.preventDefault();

  EANW_coverPreview.src = "";

  EANW_coverPreview.classList.add("EANW-hidden");

  EANW_coverPlaceholder.style.display = "block";

  EANW_coverInput.value = "";

  this.classList.add("EANW-hidden");

});

  // ---- Extra Images Preview ----
const EANW_addImagesInput =
  document.getElementById("EANW-add-images-input");

const EANW_addImagesGrid =
  document.getElementById("EANW-add-images-grid");

const MAX_IMAGES = 5;

let EANW_uploadedImages = [];

if (EANW_addImagesInput && EANW_addImagesGrid) {

  EANW_addImagesInput.addEventListener("change", function (e) {

    const file = e.target.files[0];
    if (!file) return;

    if (EANW_uploadedImages.length >= MAX_IMAGES) {
      alert("Maximum 5 images allowed");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {

const tile = document.createElement("div");

tile.className = "EANW-add-image-tile";

tile.innerHTML = `
  <span class="EANW-remove-image-btn">✕</span>
  <img src="${event.target.result}" />
`;


const removeBtn =
tile.querySelector(".EANW-remove-image-btn");

removeBtn.addEventListener("click", function () {

  tile.remove();

  EANW_uploadedImages.pop();

  document
    .getElementById("EANW-add-images-tile")
    .style.display = "flex";

});

      EANW_addImagesGrid.insertBefore(
        tile,
        document.getElementById("EANW-add-images-tile")
      );

      EANW_uploadedImages.push(file);

      if (EANW_uploadedImages.length >= MAX_IMAGES) {
        document
          .getElementById("EANW-add-images-tile")
          .style.display = "none";
      }
    };

    reader.readAsDataURL(file);

    this.value = "";
  });

}

  // ---- Product Images ----
EANW_setupSingleImagePreview('EANW-product-img-1', 'EANW-product-preview-1', 'EANW-prod-ph-1', 'EANW-remove-prod-1');
EANW_setupSingleImagePreview('EANW-product-img-2', 'EANW-product-preview-2', 'EANW-prod-ph-2', 'EANW-remove-prod-2');
EANW_setupSingleImagePreview('EANW-product-img-3', 'EANW-product-preview-3', 'EANW-prod-ph-3', 'EANW-remove-prod-3');

  // ---- Multi-select Language Dropdown ----
  (function EANW_initMultiSelect() {
    const display = document.getElementById('EANW-languages-display');
    const dropdown = document.getElementById('EANW-languages-dropdown');
    const placeholder = document.getElementById('EANW-lang-placeholder');

    if (!display || !dropdown) return;

    function EANW_updateDisplay() {
      const checked = Array.from(dropdown.querySelectorAll('.EANW-lang-cb:checked')).map(cb => cb.value);
      if (checked.length === 0) {
        placeholder.textContent = 'Select languages';
        placeholder.className = 'EANW-multiselect-placeholder';
      } else {
        placeholder.textContent = checked.join(', ');
        placeholder.className = '';
      }
    }

    display.addEventListener('click', function (e) {
      e.stopPropagation();
      dropdown.classList.toggle('EANW-hidden');
    });

    display.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dropdown.classList.toggle('EANW-hidden');
      }
    });

    dropdown.querySelectorAll('.EANW-lang-cb').forEach(cb => {
      cb.addEventListener('change', EANW_updateDisplay);
    });

document.addEventListener('click', function (e) {
  if (!display.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('EANW-hidden');
  }
});

display.addEventListener('blur', function () {
  EANW_validateLanguages();
});
  })();

  // ---- Validation Functions (Brief) ----
  function EANW_validateField(inputId, errorId, label) {
    const el = document.getElementById(inputId);
    if (!el) return true;
    const val = el.value.trim();
    if (!val) {
      EANW_showError(errorId, label + ' is required');
      EANW_setInvalid(el, true);
      return false;
    }
    EANW_clearError(errorId);
    EANW_setInvalid(el, false);
    return true;
  }

  function EANW_validatePriceField(inputId, errorId, label) {
    const el = document.getElementById(inputId);
    if (!el) return true;
    const val = el.value.trim();
    if (!val) {
      EANW_showError(errorId, label + ' is required');
      EANW_setInvalid(el, true);
      return false;
    }
    if (!EANW_isNumeric(val)) {
      EANW_showError(errorId, label + ' must be a valid number');
      EANW_setInvalid(el, true);
      return false;
    }
    EANW_clearError(errorId);
    EANW_setInvalid(el, false);
    return true;
  }

  function EANW_validateLanguages() {
    const checked = document.querySelectorAll('.EANW-lang-cb:checked');
    const display = document.getElementById('EANW-languages-display');
    if (checked.length === 0) {
      EANW_showError('EANW-err-languages', 'Please select at least one language');
      EANW_setInvalid(display, true);
      return false;
    }
    EANW_clearError('EANW-err-languages');
    EANW_setInvalid(display, false);
    return true;
  }

  function EANW_validateSelect(selectId, errorId, label) {
    const el = document.getElementById(selectId);
    if (!el) return true;
    if (!el.value) {
      EANW_showError(errorId, label + ' is required');
      EANW_setInvalid(el, true);
      return false;
    }
    EANW_clearError(errorId);
    EANW_setInvalid(el, false);
    return true;
  }

  // ---- Attach blur events for Brief ----
  function EANW_attachBriefValidation() {
    const briefFields = [
      { id: 'EANW-workshop-name', err: 'EANW-err-workshop-name', label: 'Workshop Name', type: 'text' },
      { id: 'EANW-expertise', err: 'EANW-err-expertise', label: 'Expertise', type: 'text' },
      { id: 'EANW-price-individual', err: 'EANW-err-price-individual', label: 'Price (Individual)', type: 'price' },
      { id: 'EANW-price-group', err: 'EANW-err-price-group', label: 'Price (Group)', type: 'price' },
    ];

    briefFields.forEach(f => {
      const el = document.getElementById(f.id);
      if (!el) return;
      el.addEventListener('blur', function () {
        if (f.type === 'price') {
          EANW_validatePriceField(f.id, f.err, f.label);
        } else {
          EANW_validateField(f.id, f.err, f.label);
        }
      });
    });

    // Select fields
    [
      { id: 'EANW-age-group', err: 'EANW-err-age-group', label: 'Age Group' },
      { id: 'EANW-type', err: 'EANW-err-type', label: 'Type' },
      { id: 'EANW-broadcast', err: 'EANW-err-broadcast', label: 'Broadcast' },
    ].forEach(f => {
      const el = document.getElementById(f.id);
      if (!el) return;
      el.addEventListener('blur', function () {
        EANW_validateSelect(f.id, f.err, f.label);
      });
      el.addEventListener('change', function () {
        EANW_validateSelect(f.id, f.err, f.label);
      });
    });

    // Workshop detail textareas
    [
      { id: 'EANW-about-workshop', err: 'EANW-err-about-workshop', label: 'Workshop description' },
      { id: 'EANW-topics', err: 'EANW-err-topics', label: 'Topics to be learnt' },
      { id: 'EANW-who-can-join', err: 'EANW-err-who-can-join', label: 'Who can join' },
      { id: 'EANW-highlights', err: 'EANW-err-highlights', label: 'Workshop highlights' },
      { id: 'EANW-takeaway', err: 'EANW-err-takeaway', label: 'Takeaway' },
      { id: 'EANW-organizer', err: 'EANW-err-organizer', label: 'Organizer/Artisan info' },
    ].forEach(f => {
      const el = document.getElementById(f.id);
      if (!el) return;
      el.addEventListener('blur', function () {
        EANW_validateField(f.id, f.err, f.label);
      });
    });
  }

  // ---- Venue Builder ----
  const STATES_CITIES = {
    'Maharshtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
    'Karnataka': ['Bengaluru', 'Mysuru', 'Hubli', 'Mangaluru'],
    'Delhi': ['New Delhi', 'Dwarka', 'Rohini', 'Noida'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
    'Telangana': ['Hyderabad', 'Warangal', 'Karimnagar'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Ajmer'],
    'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior'],
  };

  function EANW_buildStateOptions() {
    return '<option value="">Select State</option>' +
      Object.keys(STATES_CITIES).map(s => `<option value="${s}">${s}</option>`).join('');
  }

  function EANW_buildCityOptions(state) {
    const cities = STATES_CITIES[state] || [];
    return '<option value="">Select City</option>' +
      cities.map(c => `<option value="${c}">${c}</option>`).join('');
  }

function EANW_createVenueBlock(num) {

  const isFirst = num === 1;

  const deleteBtn = isFirst
    ? ''
    : `<button type="button"
        class="EANW-delete-venue-btn"
        data-venue="${num}"
        title="Delete venue">🗑</button>`;

  return `
  <div class="EANW-venue-block"
       id="EANW-venue-block-${num}"
       data-venue-num="${num}">

<div class="EANW-venue-header">

  <span class="EANW-venue-title">
    Venue ${num}
  </span>

  <div class="EANW-venue-header-actions">

    ${num === 1
      ? `<button type="button"
           class="EANW-add-another-link"
           id="EANW-add-venue-btn">
           Add another
         </button>`
      : deleteBtn
    }

  </div>

</div>

    <div class="EANW-venue-two-col">

      <!-- LEFT COLUMN -->
      <div class="EANW-venue-left">

        <div class="EANW-field-group">
          <label class="EANW-label">Select State</label>
          <select id="EANW-state-${num}" class="EANW-select EANW-venue-state">
            ${EANW_buildStateOptions()}
          </select>
          <div class="EANW-error-msg" id="EANW-err-state-${num}"></div>
        </div>

        <div class="EANW-field-group">
          <label class="EANW-label">Enter Venue Name</label>
          <input type="text"
                 id="EANW-venue-name-${num}"
                 class="EANW-input" />
          <div class="EANW-error-msg"
               id="EANW-err-venue-name-${num}"></div>
        </div>

    <div class ="EANW-roe">
        <div class="EANW-field-group">
          <label class="EANW-label">Select Start Date</label>
          <input type="date"
                 id="EANW-start-date-${num}"
                 class="EANW-input"/>
          <div class="EANW-error-msg"
               id="EANW-err-start-date-${num}"></div>
        </div>

        <div class="EANW-field-group">
          <label class="EANW-label">Select End Date</label>
          <input type="date"
                 id="EANW-end-date-${num}"
                 class="EANW-input"/>
          <div class="EANW-error-msg"
               id="EANW-err-end-date-${num}"></div>
        </div>

    </div>


    <div class ="EANW-roe">
        <div class="EANW-field-group">
          <label class="EANW-label">Select Start time</label>
          <input type="time"
                 id="EANW-start-time-${num}"
                 class="EANW-input"/>
          <div class="EANW-error-msg"
               id="EANW-err-start-time-${num}"></div>
        </div>

        <div class="EANW-field-group">
          <label class="EANW-label">Select End time</label>
          <input type="time"
                 id="EANW-end-time-${num}"
                 class="EANW-input"/>
          <div class="EANW-error-msg"
               id="EANW-err-end-time-${num}"></div>
        </div>

        </div>

      </div>


      <!-- RIGHT COLUMN -->
      <div class="EANW-venue-right">

        <div class="EANW-field-group">
          <label class="EANW-label">Select City</label>
          <select id="EANW-city-${num}"
                  class="EANW-select EANW-venue-city">
            <option value="">Select City</option>
          </select>
          <div class="EANW-error-msg"
               id="EANW-err-city-${num}"></div>
        </div>

        <div class="EANW-field-group">
          <label class="EANW-label">Enter Venue Address</label>
          <textarea id="EANW-venue-address-${num}"
                    class="EANW-textarea"
                    style="min-height:120px"></textarea>
          <div class="EANW-error-msg"
               id="EANW-err-venue-address-${num}"></div>
        </div>

        <div class="EANW-field-group">
          <label class="EANW-label">Enter Venue gmap link</label>
          <input type="text"
                 id="EANW-gmap-${num}"
                 class="EANW-input"/>
          <div class="EANW-error-msg"
               id="EANW-err-gmap-${num}"></div>
        </div>

      </div>

    </div>

  </div>`;
}

  function EANW_attachVenueValidation(num) {
    // State
    const stateEl = document.getElementById(`EANW-state-${num}`);
    if (stateEl) {
      stateEl.addEventListener('change', function () {
        const cityEl = document.getElementById(`EANW-city-${num}`);
        cityEl.innerHTML = EANW_buildCityOptions(this.value);
        if (this.value) {
          EANW_clearError(`EANW-err-state-${num}`);
          EANW_setInvalid(stateEl, false);
        } else {
          EANW_showError(`EANW-err-state-${num}`, 'State is required');
          EANW_setInvalid(stateEl, true);
        }
      });
      stateEl.addEventListener('blur', function () {
        if (!this.value) {
          EANW_showError(`EANW-err-state-${num}`, 'State is required');
          EANW_setInvalid(stateEl, true);
        }
      });
    }

    // City
    const cityEl = document.getElementById(`EANW-city-${num}`);
    if (cityEl) {
      cityEl.addEventListener('blur', function () {
        if (!this.value) {
          EANW_showError(`EANW-err-city-${num}`, 'City is required');
          EANW_setInvalid(cityEl, true);
        } else {
          EANW_clearError(`EANW-err-city-${num}`);
          EANW_setInvalid(cityEl, false);
        }
      });
    }

    // Venue Name
    const venueNameEl = document.getElementById(`EANW-venue-name-${num}`);
    if (venueNameEl) {
      venueNameEl.addEventListener('blur', function () {
        if (!this.value.trim()) {
          EANW_showError(`EANW-err-venue-name-${num}`, 'Venue name is required');
          EANW_setInvalid(venueNameEl, true);
        } else {
          EANW_clearError(`EANW-err-venue-name-${num}`);
          EANW_setInvalid(venueNameEl, false);
        }
      });
    }

    // Venue Address
    const venueAddrEl = document.getElementById(`EANW-venue-address-${num}`);
    if (venueAddrEl) {
      venueAddrEl.addEventListener('blur', function () {
        if (!this.value.trim()) {
          EANW_showError(`EANW-err-venue-address-${num}`, 'Venue address is required');
          EANW_setInvalid(venueAddrEl, true);
        } else {
          EANW_clearError(`EANW-err-venue-address-${num}`);
          EANW_setInvalid(venueAddrEl, false);
        }
      });
    }

    // Start Date
    const startDateEl = document.getElementById(`EANW-start-date-${num}`);
    const endDateEl = document.getElementById(`EANW-end-date-${num}`);

    function EANW_validateDates() {
      const startVal = startDateEl ? startDateEl.value : '';
      const endVal = endDateEl ? endDateEl.value : '';
      let valid = true;

      if (!startVal) {
        EANW_showError(`EANW-err-start-date-${num}`, 'Start date is required');
        EANW_setInvalid(startDateEl, true);
        valid = false;
      } else {
        EANW_clearError(`EANW-err-start-date-${num}`);
        EANW_setInvalid(startDateEl, false);
      }

      if (!endVal) {
        EANW_showError(`EANW-err-end-date-${num}`, 'End date is required');
        EANW_setInvalid(endDateEl, true);
        valid = false;
      } else if (startVal && endVal < startVal) {
        EANW_showError(`EANW-err-end-date-${num}`, 'End date must not be earlier than start date');
        EANW_setInvalid(endDateEl, true);
        valid = false;
      } else {
        EANW_clearError(`EANW-err-end-date-${num}`);
        EANW_setInvalid(endDateEl, false);
      }
      return valid;
    }

    if (startDateEl) startDateEl.addEventListener('blur', EANW_validateDates);
    if (endDateEl) endDateEl.addEventListener('blur', EANW_validateDates);

    // Start/End Time
    const startTimeEl = document.getElementById(`EANW-start-time-${num}`);
    const endTimeEl = document.getElementById(`EANW-end-time-${num}`);

    function EANW_validateTimes() {
      const startT = startTimeEl ? startTimeEl.value : '';
      const endT = endTimeEl ? endTimeEl.value : '';
      let valid = true;

      if (!startT) {
        EANW_showError(`EANW-err-start-time-${num}`, 'Start time is required');
        EANW_setInvalid(startTimeEl, true);
        valid = false;
      } else {
        EANW_clearError(`EANW-err-start-time-${num}`);
        EANW_setInvalid(startTimeEl, false);
      }

      if (!endT) {
        EANW_showError(`EANW-err-end-time-${num}`, 'End time is required');
        EANW_setInvalid(endTimeEl, true);
        valid = false;
      } else if (startT && endT <= startT) {
        EANW_showError(`EANW-err-end-time-${num}`, 'End time must be after start time');
        EANW_setInvalid(endTimeEl, true);
        valid = false;
      } else {
        EANW_clearError(`EANW-err-end-time-${num}`);
        EANW_setInvalid(endTimeEl, false);
      }
      return valid;
    }

    if (startTimeEl) startTimeEl.addEventListener('blur', EANW_validateTimes);
    if (endTimeEl) endTimeEl.addEventListener('blur', EANW_validateTimes);

    // Google Map Link
    const gmapEl = document.getElementById(`EANW-gmap-${num}`);
    if (gmapEl) {
      gmapEl.addEventListener('blur', function () {
        const val = this.value.trim();
        if (!val) {
          EANW_showError(`EANW-err-gmap-${num}`, 'Google map link is required');
          EANW_setInvalid(gmapEl, true);
        } else if (!EANW_isValidURL(val)) {
          EANW_showError(`EANW-err-gmap-${num}`, 'Please enter a valid URL (starting with http:// or https://)');
          EANW_setInvalid(gmapEl, true);
        } else {
          EANW_clearError(`EANW-err-gmap-${num}`);
          EANW_setInvalid(gmapEl, false);
        }
      });
    }
  }

  function EANW_addVenue() {
    EANW_venueCount++;
    const container = document.getElementById('EANW-venues-container');
    const div = document.createElement('div');
    div.innerHTML = EANW_createVenueBlock(EANW_venueCount);
    container.appendChild(div.firstElementChild);
    EANW_attachVenueValidation(EANW_venueCount);

    // Delete button
    const delBtn = container.querySelector(`[data-venue="${EANW_venueCount}"]`);
    if (delBtn) {
      delBtn.addEventListener('click', function () {
        const block = document.getElementById(`EANW-venue-block-${this.dataset.venue}`);
        if (block) block.remove();
        EANW_renumberVenues();
      });
    }
    EANW_attachManualTimeFormatter(
  `EANW-start-time-${EANW_venueCount}`,
  `EANW-start-time-format-${EANW_venueCount}`
);

EANW_attachManualTimeFormatter(
  `EANW-end-time-${EANW_venueCount}`,
  `EANW-end-time-format-${EANW_venueCount}`
);
    EANW_attachAMPMLogic(
  `EANW-start-time-${EANW_venueCount}`,
  `EANW-start-time-format-${EANW_venueCount}`
);

EANW_attachAMPMLogic(
  `EANW-end-time-${EANW_venueCount}`,
  `EANW-end-time-format-${EANW_venueCount}`
);
  }

  function EANW_renumberVenues() {
    const blocks = document.querySelectorAll('.EANW-venue-block');
    blocks.forEach((block, idx) => {
      const title = block.querySelector('.EANW-venue-title');
      if (title) title.textContent = 'Venue ' + (idx + 1);
    });
  }

  // Venue 1 is in static HTML — attach its validation only.
  EANW_attachVenueValidation(1);

  EANW_attachManualTimeFormatter(
  "EANW-start-time-1",
  "EANW-start-time-format-1"
);

EANW_attachManualTimeFormatter(
  "EANW-end-time-1",
  "EANW-end-time-format-1"
);

  EANW_attachAMPMLogic(
  "EANW-start-time-1",
  "EANW-start-time-format-1"
);

EANW_attachAMPMLogic(
  "EANW-end-time-1",
  "EANW-end-time-format-1"
);
document.addEventListener('click', function(e){

  if(e.target && e.target.id === 'EANW-add-venue-btn'){
    EANW_addVenue();
  }

});

  // ---- FAQ Builder ----
  function EANW_createFAQBlock(num) {
    return `
    <div class="EANW-faq-block" id="EANW-faq-block-${num}">
      <label class="EANW-faq-q-label" for="EANW-faq-q-${num}">Write a question -${num}</label>
      <input type="text" id="EANW-faq-q-${num}" name="EANW-faq-q-${num}" class="EANW-input" placeholder="Write the content here" />
      <div class="EANW-error-msg" id="EANW-err-faq-q-${num}"></div>

      <label class="EANW-faq-a-label" for="EANW-faq-a-${num}">Write answer -${num}</label>
      <textarea id="EANW-faq-a-${num}" name="EANW-faq-a-${num}" class="EANW-textarea" placeholder="Write the content here"></textarea>
      <div class="EANW-error-msg" id="EANW-err-faq-a-${num}"></div>
    </div>`;
  }

  function EANW_attachFAQValidation(num) {
    const qEl = document.getElementById(`EANW-faq-q-${num}`);
    if (qEl) {
      qEl.addEventListener('blur', function () {
        if (!this.value.trim()) {
          EANW_showError(`EANW-err-faq-q-${num}`, 'Question is required');
          EANW_setInvalid(qEl, true);
        } else {
          EANW_clearError(`EANW-err-faq-q-${num}`);
          EANW_setInvalid(qEl, false);
        }
      });
    }

    const aEl = document.getElementById(`EANW-faq-a-${num}`);
    if (aEl) {
      aEl.addEventListener('blur', function () {
        if (!this.value.trim()) {
          EANW_showError(`EANW-err-faq-a-${num}`, 'Answer is required');
          EANW_setInvalid(aEl, true);
        } else {
          EANW_clearError(`EANW-err-faq-a-${num}`);
          EANW_setInvalid(aEl, false);
        }
      });
    }
  }

  function EANW_addFAQ() {
    EANW_faqCount++;
    const container = document.getElementById('EANW-faq-container');
    const div = document.createElement('div');
    div.innerHTML = EANW_createFAQBlock(EANW_faqCount);
    container.appendChild(div.firstElementChild);
    EANW_attachFAQValidation(EANW_faqCount);
  }

  // FAQ blocks 1-3 are in static HTML — attach their validation only.
  EANW_attachFAQValidation(1);
  EANW_attachFAQValidation(2);
  EANW_attachFAQValidation(3);

  document.getElementById('EANW-add-faq-btn').addEventListener('click', function () {
    EANW_addFAQ();
  });

  // ---- Attach Brief Validations ----
  EANW_attachBriefValidation();

  // ---- Save Buttons ----
  document.querySelectorAll('.EANW-save-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const section = this.dataset.section;
      // Visual feedback
      const orig = this.textContent;
      this.textContent = 'Saved!';
      this.style.background = '#34a853';
      setTimeout(() => {
        this.textContent = orig;
        this.style.background = '';
      }, 1500);
      console.log('EANW: Section "' + section + '" saved.');
    });
  });

  // ---- Preview Button ----
document.getElementById('EANW-preview-btn').addEventListener('click', function () {

  if (EANW_validateFullForm()) {
    window.location.href = "E-EducationDeveloperAddNewWorkshopPreview.html";
  }

});

  // ---- Publish Button ----
document.getElementById('EANW-publish-btn').addEventListener('click', function () {

  if (EANW_validateFullForm()) {
    window.location.href = "E-EducationDeveloperAddNewWorkshopPreview.html";
  }

});

function EANW_validateFullForm() {

  let valid = true;

  // Brief section
  valid = EANW_validateField('EANW-workshop-name','EANW-err-workshop-name','Workshop Name') && valid;

  valid = EANW_validateField('EANW-expertise','EANW-err-expertise','Expertise') && valid;

  valid = EANW_validateLanguages() && valid;

  valid = EANW_validateSelect('EANW-age-group','EANW-err-age-group','Age Group') && valid;

  valid = EANW_validatePriceField('EANW-price-individual','EANW-err-price-individual','Price (Individual)') && valid;

  valid = EANW_validatePriceField('EANW-price-group','EANW-err-price-group','Price (Group)') && valid;

  valid = EANW_validateSelect('EANW-type','EANW-err-type','Type') && valid;

  valid = EANW_validateSelect('EANW-broadcast','EANW-err-broadcast','Broadcast') && valid;


  // Venue section (Venue 1 required)
  valid = EANW_validateSelect('EANW-state-1','EANW-err-state-1','State') && valid;

  valid = EANW_validateField('EANW-venue-name-1','EANW-err-venue-name-1','Venue Name') && valid;

  valid = EANW_validateSelect('EANW-city-1','EANW-err-city-1','City') && valid;

  valid = EANW_validateField('EANW-venue-address-1','EANW-err-venue-address-1','Venue Address') && valid;

  valid = EANW_validateField('EANW-gmap-1','EANW-err-gmap-1','Google Map Link') && valid;

  valid = EANW_validateField('EANW-start-date-1','EANW-err-start-date-1','Start Date') && valid;

  valid = EANW_validateField('EANW-end-date-1','EANW-err-end-date-1','End Date') && valid;

  valid = EANW_validateField('EANW-start-time-1','EANW-err-start-time-1','Start Time') && valid;

  valid = EANW_validateField('EANW-end-time-1','EANW-err-end-time-1','End Time') && valid;


  // Workshop Details section

  valid = EANW_validateField('EANW-about-workshop','EANW-err-about-workshop','Workshop Description') && valid;

  valid = EANW_validateField('EANW-topics','EANW-err-topics','Topics') && valid;

  valid = EANW_validateField('EANW-who-can-join','EANW-err-who-can-join','Who can join') && valid;

  valid = EANW_validateField('EANW-highlights','EANW-err-highlights','Highlights') && valid;

  valid = EANW_validateField('EANW-takeaway','EANW-err-takeaway','Takeaway') && valid;

  valid = EANW_validateField('EANW-organizer','EANW-err-organizer','Organizer info') && valid;


  // FAQ section (first 3 required)

  valid = EANW_validateField('EANW-faq-q-1','EANW-err-faq-q-1','Question 1') && valid;

  valid = EANW_validateField('EANW-faq-a-1','EANW-err-faq-a-1','Answer 1') && valid;

  valid = EANW_validateField('EANW-faq-q-2','EANW-err-faq-q-2','Question 2') && valid;

  valid = EANW_validateField('EANW-faq-a-2','EANW-err-faq-a-2','Answer 2') && valid;

  valid = EANW_validateField('EANW-faq-q-3','EANW-err-faq-q-3','Question 3') && valid;

  valid = EANW_validateField('EANW-faq-a-3','EANW-err-faq-a-3','Answer 3') && valid;


  return valid;

}

})();