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

// Product data structure (hardcoded for now)
const productData = {
  name: "Handmade Embroidery Mojadi",
  price: "₹1,299",
  brand: "by Sanskriti Collection",
  category: "Footwear",
  subCategory: "Mojadi",
  tag: "Rajasthan",
  description:
    "Mojadi features intricate hand embroidery inspired by traditional Indian designs. Made with premium materials and a comfortable fit, it's perfect for weddings, festive occasions, and ethnic wear—adding timeless elegance to every step.",
  details: {
    ornamentation: "Embroidered",
    material: "Canvas",
    heelHeight: "2inch (regular)",
    toeShape: "Round Toe",
    occasion: "Party",
    careInfo: "Wipe with dry cloth",
  },
  returnPolicy:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales risus a dui luctus fringilla.",
  mainImage: "path/to/main/image.jpg",
  thumbnails: [
    "path/to/thumb1.jpg",
    "path/to/thumb2.jpg",
    "path/to/thumb3.jpg",
    "path/to/thumb4.jpg",
    "path/to/thumb5.jpg",
  ],
};

// Variant data structure
const variantsData = [
  {
    id: 1,
    name: "Variant 1",
    size: "3",
    color: "Maroon",
    colorHex: "#800000",
    quantity: "120",
    images: Array(6).fill("placeholder"),
  },
  {
    id: 2,
    name: "Variant 2",
    size: "3",
    color: "Maroon",
    colorHex: "#800000",
    quantity: "120",
    images: Array(6).fill("placeholder"),
  },
  {
    id: 3,
    name: "Variant 3",
    size: "3",
    color: "Maroon",
    colorHex: "#800000",
    quantity: "120",
    images: Array(6).fill("placeholder"),
  },
  {
    id: 4,
    name: "Variant 4",
    size: "3",
    color: "Maroon",
    colorHex: "#800000",
    quantity: "120",
    images: Array(6).fill("placeholder"),
  },
  {
    id: 5,
    name: "Variant 5",
    size: "3",
    color: "Maroon",
    colorHex: "#800000",
    quantity: "120",
    images: Array(6).fill("placeholder"),
  },
  {
    id: 6,
    name: "Variant 6",
    size: "3",
    color: "Maroon",
    colorHex: "#800000",
    quantity: "120",
    images: Array(6).fill("placeholder"),
  },
];

// Address data structure
const addressData = {
  title: "Address 1",
  name: "David john",
  email: "davidjohn23@gmail.com",
  phone: "95367 89905",
  address:
    "C - 605 , Eden Park,Mudhuban colony, parsi road,\nNear Appolo Hospital, Pune, Maharashtra, 234 678",
};

// Thumbnail click handler - changes main image
document.addEventListener("DOMContentLoaded", () => {
  const thumbnails = document.querySelectorAll(".thumbnail-item");
  const mainImage = document.querySelector(".main-product-image img");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      // Remove active class from all thumbnails
      thumbnails.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked thumbnail
      thumb.classList.add("active");

      // Change main image (in real app, this would update the src)
      const thumbImg = thumb.querySelector("img");
      if (thumbImg && mainImage) {
        mainImage.src = thumbImg.src;
      }
    });
  });
});

// Edit button handler
const editBtn = document.querySelector(".edit-btn");
if (editBtn) {
  editBtn.addEventListener("click", () => {
    // Navigate back to add product page
    window.history.back();
  });
}

// Send for Approval button handler
const approvalBtn = document.querySelector(".approval-btn");
if (approvalBtn) {
  approvalBtn.addEventListener("click", () => {
    // In real app, this would make an API call
    alert("Product sent for approval successfully!");
    window.location.href = "../html/vendorDashboard.html";
  });
}

// Function to render product data )
function renderProductData(data) {
  // Update product title
  const titleElement = document.querySelector(".product-title");
  if (titleElement) titleElement.textContent = data.name;

  // Update price
  const priceElement = document.querySelector(".product-price");
  if (priceElement) priceElement.textContent = data.price;

  // Update brand
  const brandElement = document.querySelector(".product-brand");
  if (brandElement) brandElement.textContent = data.brand;

  // Update category
  const categoryElement = document.querySelector(".product-category span");
  if (categoryElement)
    categoryElement.textContent = `Category : ${data.category} | ${data.subCategory}`;

  // Update description
  const descElement = document.querySelector(".product-description");
  if (descElement) descElement.textContent = data.description;

  // Update product details list
  const detailsList = document.querySelector(".details-list");
  if (detailsList && data.details) {
    detailsList.innerHTML = `
      <li><span class="detail-label">Ornamentation</span> - ${data.details.ornamentation}</li>
      <li><span class="detail-label">Material</span> - ${data.details.material}</li>
      <li><span class="detail-label">Heel Height</span> - ${data.details.heelHeight}</li>
      <li><span class="detail-label">Toe Shape</span> - ${data.details.toeShape}</li>
      <li><span class="detail-label">Occasion</span> - ${data.details.occasion}</li>
      <li><span class="detail-label">Care Info</span> - ${data.details.careInfo}</li>
    `;
  }
}

// Function to render variants +
function renderVariants(variants) {
  const container = document.querySelector(".variants-preview-grid");
  if (!container) return;

  container.innerHTML = "";

  variants.forEach((variant) => {
    const variantCard = document.createElement("div");
    variantCard.className = "variant-preview-card";

    const imagesHTML = variant.images
      .map(() => '<div class="variant-img-placeholder"></div>')
      .join("");

    variantCard.innerHTML = `
      <h4 class="variant-preview-title">${variant.name}</h4>
      <div class="variant-images-grid">
        ${imagesHTML}
      </div>
      <div class="variant-info-row">
        <span class="variant-info-label">Size - </span>
        <span class="variant-info-value">${variant.size}</span>
      </div>
      <div class="variant-info-row">
        <span class="variant-info-label">Colour - </span>
        <span class="color-swatch-display" style="background-color: ${variant.colorHex};"></span>
        <span class="variant-info-value">${variant.color}</span>
      </div>
      <div class="variant-info-row">
        <span class="variant-info-label">Quantity - </span>
        <span class="variant-info-value">${variant.quantity}</span>
      </div>
    `;

    container.appendChild(variantCard);
  });
}

// Function to render address (can be called when backend data is available)
function renderAddress(address) {
  const addressCard = document.querySelector(".address-preview-card");
  if (!addressCard) return;

  addressCard.innerHTML = `
    <h4 class="address-preview-title">${address.title}</h4>

    <p class="address-preview-details">${address.address.replace(
      /\n/g,
      "<br>"
    )}</p>
  `;
}

// Uncomment these lines when backend integration is ready:
renderProductData(productData);
renderVariants(variantsData);
renderAddress(addressData);


// plus minus toggle
document.addEventListener("DOMContentLoaded", () => {
  setupFiveItemToggle("details", ".details-list");
  setupFiveItemToggle("policy", ".policy-list");
});

function setupFiveItemToggle(type, listSelector) {
  const header = document.querySelector(`.toggle-header[data-target="${type}"]`);
  const list = document.querySelector(listSelector);
  const icon = header?.querySelector(".toggle-icon");

  if (!header || !list || !icon) return;

  const items = list.querySelectorAll("li");
  const LIMIT = 5;

  if (items.length <= LIMIT) {
    icon.style.display = "none";
    return;
  }

  items.forEach((li, index) => {
    if (index >= LIMIT) li.style.display = "none";
  });

  let expanded = false;
  icon.src = "../assets/vendorProductPreview/Plus.svg";

  header.addEventListener("click", () => {
    expanded = !expanded;

    items.forEach((li, index) => {
      if (index >= LIMIT) {
        li.style.display = expanded ? "list-item" : "none";
      }
    });

    icon.src = expanded
      ? "../assets/vendorProductPreview/Minus.svg"
      : "../assets/vendorProductPreview/Plus.svg";
  });
}

document.querySelector("#sidebar-main-vendor ul>li:nth-child(2)").classList.add("sidebar-active");

document.querySelector("#account-menu li:nth-child(2) .dropdown-header").classList.add("dropdown-header-active");

