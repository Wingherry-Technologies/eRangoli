// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");
var mobileBack=document.querySelector(".mobile-back-button");


hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    window.scrollTo(0, 0);
    mobileBack.style.display="none"
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow="auto";
    document.querySelector(".bottom-nav").style.display="flex";
    mobileBack.style.display="flex"
  }
});
const totalStocks=document.querySelectorAll(".total-stock");

totalStocks.forEach(totalStock => {
  const countofStock = parseInt(totalStock.innerHTML, 10);

  if(countofStock>99){
    totalStock.style.backgroundColor="#C9E1C7"
    totalStock.style.color="#3F3F3F"
  }
  else if(countofStock>10){
    totalStock.style.backgroundColor="#FAC097"
    totalStock.style.color="#3F3F3F"
  }
  else if(countofStock<=10){
    totalStock.style.backgroundColor="#FF4B4B"
    totalStock.style.color="#FFF"
  }
});

// Three Dots
document.addEventListener("click", function (e) {
  const isThreeDot = e.target.classList.contains("three-dot");

  // Close all previews first
  document.querySelectorAll(".all-preview").forEach(popup => {
    popup.classList.remove("active-preview");
  });

  // If clicked on a 3-dot, open its popup
  if (isThreeDot) {
    e.stopPropagation(); // prevent immediate close
    const previewBox = e.target.closest(".previewing").querySelector(".all-preview");
    previewBox.classList.add("active-preview");
  }
});


// Filter option Logic

/***********************
  GLOBAL REFERENCES
************************/

const filterBtn = document.getElementById("filter-bar-main-box");
const sortBtn = document.getElementById("sort-by-main-box");

const filterMain = document.getElementById("filter-main");
const statusBox = document.getElementById("status-box");
const colourBox = document.getElementById("colour-box");
const sizeBox = document.getElementById("size-box");
const sortBox = document.getElementById("sort-box");

const rows = Array.from(document.querySelectorAll(".table-products tbody tr"));
const faqContainer = document.querySelector(".faq");
const faqItems = Array.from(document.querySelectorAll(".faq-item"));

/***********************
  CLICK OUTSIDE CLOSE
************************/

document.addEventListener("click", (e) => {
  if (
    !e.target.closest(".main-content-flows-main") &&
    !e.target.closest("#filter-bar-main-box") &&
    !e.target.closest("#sort-by-main-box")
  ) {
    closeAll();
  }
});

function closeAll() {
  document
    .querySelectorAll(".main-content-flows-main")
    .forEach((box) => box.classList.remove("active-main-content-flows"));
}

function closeSubFilters() {
  statusBox.classList.remove("active-main-content-flows");
  colourBox.classList.remove("active-main-content-flows");
  sizeBox.classList.remove("active-main-content-flows");
}

/***********************
  FILTER / SORT BUTTONS
************************/

filterBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeAll();
  filterMain.classList.add("active-main-content-flows");
});

sortBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeAll();
  sortBox.classList.add("active-main-content-flows");
});

/***********************
  FILTER MENU OPTIONS
************************/

document.querySelectorAll("#filter-main li").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();

    // remove active class from all
    document.querySelectorAll("#filter-main li")
      .forEach(li => li.classList.remove("active-filter"));

    // add active class to clicked one
    item.classList.add("active-filter");

    // close other sub filters
    closeSubFilters();

    const text = item.textContent.toLowerCase();
    if (text.includes("status")) statusBox.classList.add("active-main-content-flows");
    if (text.includes("colour")) colourBox.classList.add("active-main-content-flows");
    if (text.includes("size")) sizeBox.classList.add("active-main-content-flows");
  });
});


/***********************
  FILTER CHECKBOX LOGIC
************************/

document.querySelectorAll("#status-box input, #size-box input, #colour-box input")
  .forEach((cb) => cb.addEventListener("change", filterTable));

function filterTable() {
  const selectedStatus = [...document.querySelectorAll("#status-box input:checked")]
    .map((cb) => cb.dataset.status);

  const selectedSizes = [...document.querySelectorAll("#size-box input:checked")]
    .map((cb) => cb.dataset.size);

  const selectedColours = [...document.querySelectorAll("#colour-box input:checked")]
    .map((cb) => cb.dataset.colour);

  rows.forEach((row) => {
    const match =
      (!selectedStatus.length || selectedStatus.includes(row.dataset.status)) &&
      (!selectedSizes.length || selectedSizes.includes(row.dataset.size)) &&
      (!selectedColours.length || selectedColours.includes(row.dataset.colour));

    row.style.display = match ? "" : "none";
  });

  syncFaqWithTable();
}

/***********************
  SORT LOGIC
************************/

document.querySelectorAll("#sort-box input").forEach((rb) => {
  rb.addEventListener("change", () => sortTable(rb.id));
});

function sortTable(type) {
  const tbody = document.querySelector(".table-products tbody");

  rows.sort((a, b) => {
    switch (type) {
      case "price-low-high":
        return getPrice(a) - getPrice(b);
      case "price-high-low":
        return getPrice(b) - getPrice(a);
      case "stock-low-high":
        return getStock(a) - getStock(b);
      case "stock-high-low":
        return getStock(b) - getStock(a);
      default:
        return 0;
    }
  });

  tbody.innerHTML = "";
  rows.forEach((row) => tbody.appendChild(row));

  syncFaqSort();
}

function getPrice(row) {
  const priceCell = row.querySelector(".price"); // Add class="price" to the td
  return parseFloat(priceCell.textContent.replace(/[₹,]/g, ""));
}

function getStock(row) {
  const stockCell = row.querySelector(".stock"); // Add class="stock" to the td
  return parseInt(stockCell.textContent);
}


/***********************
  FAQ SYNC LOGIC
************************/

function syncFaqWithTable() {
  const visibleSKUs = rows
    .filter((row) => row.style.display !== "none")
    .map((row) => row.dataset.sku);

  faqItems.forEach((item) => {
    item.style.display = visibleSKUs.includes(item.dataset.sku) ? "" : "none";
  });
}

function syncFaqSort() {
  faqContainer.innerHTML = "";

  rows.forEach((row) => {
    const faq = faqItems.find((item) => item.dataset.sku === row.dataset.sku);
    if (faq && row.style.display !== "none") {
      faqContainer.appendChild(faq);
    }
  });
}




document.getElementById("best-selling-products-btn").addEventListener("click",()=>{
  document.querySelector(".bestseller-main-modal").style.display='flex';
})

document.getElementById("close-bestseller-modal").addEventListener("click",()=>{
  document.querySelector(".bestseller-main-modal").style.display='none'
})

const faqItems1 = document.querySelectorAll(".faq-item");

faqItems1.forEach(item => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    // Close all other items
    faqItems1.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });

    // Toggle current item
    item.classList.toggle("active");
  });
});

  // Select all three-dots buttons
const threeDotsButtons = document.querySelectorAll('.mobile-three-dots');

threeDotsButtons.forEach(threeDotbutton => {
  threeDotbutton.addEventListener('click', () => {
    // Correctly get the sibling div
    const showBox = threeDotbutton.nextElementSibling;
    if (!showBox) return; // safety check

    // Find the parent .faq-item
    const faqItem = threeDotbutton.closest('.faq-item');

    // Get status element safely
    const statusElement = faqItem.querySelector(
      '.faq-answer .all-answers .payment-credited, ' +
      '.faq-answer .all-answers .payment-pending, ' +
      '.faq-answer .all-answers .payment-rejected'
    );
    const statusText = statusElement ? statusElement.textContent.trim() : '';

    // Toggle the show-threedots-box
    showBox.classList.toggle('active-threedots');

    // Find the "Request to Remove" div safely
    const requestToRemoveDiv = Array.from(showBox.children).find(div => div.textContent.includes('Request to Remove'));
    if (requestToRemoveDiv) {
      requestToRemoveDiv.style.display = (statusText === 'Approved') ? 'flex' : 'none';
    }
  });
});





