const APOProductData = {
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

const APOVariantsData = [
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

const APOAddressData = {
  title: "Address 1",
  name: "David john",
  email: "davidjohn23@gmail.com",
  phone: "95367 89905",
  address:
    "C - 605 , Eden Park,Mudhuban colony, parsi road,\nNear Appolo Hospital, Pune, Maharashtra, 234 678",
};

document.addEventListener("DOMContentLoaded", () => {
  const thumbnails = document.querySelectorAll(".APOThumbnailItem");
  const mainImage = document.querySelector(".APOMainProductImage img");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      thumbnails.forEach((t) => t.classList.remove("APOActive"));
      thumb.classList.add("APOActive");

      const thumbImg = thumb.querySelector("img");
      if (thumbImg && mainImage) {
        mainImage.src = thumbImg.src;
      }
    });
  });
});

function APORenderProductData(data) {
  const titleElement = document.querySelector(".APOProductTitle");
  if (titleElement) titleElement.textContent = data.name;

  const priceElement = document.querySelector(".APOProductPrice");
  if (priceElement) priceElement.textContent = data.price;

  const brandElement = document.querySelector(".APOProductBrand");
  if (brandElement) brandElement.textContent = data.brand;

  const categoryElement = document.querySelector(".APOProductCategory span");
  if (categoryElement)
    categoryElement.textContent = `Category : ${data.category} | ${data.subCategory}`;

  const descElement = document.querySelector(".APOProductDescription");
  if (descElement) descElement.textContent = data.description;

  const detailsList = document.querySelector(".APODetailsList");
  if (detailsList && data.details) {
    detailsList.innerHTML = `
      <li><span class="APODetailLabel">Ornamentation</span> - ${data.details.ornamentation}</li>
      <li><span class="APODetailLabel">Material</span> - ${data.details.material}</li>
      <li><span class="APODetailLabel">Heel Height</span> - ${data.details.heelHeight}</li>
      <li><span class="APODetailLabel">Toe Shape</span> - ${data.details.toeShape}</li>
      <li><span class="APODetailLabel">Occasion</span> - ${data.details.occasion}</li>
      <li><span class="APODetailLabel">Care Info</span> - ${data.details.careInfo}</li>
    `;
  }
}

function APORenderVariants(variants) {
  const container = document.querySelector(".APOVariantsPreviewGrid");
  if (!container) return;

  container.innerHTML = "";

  variants.forEach((variant) => {
    const variantCard = document.createElement("div");
    variantCard.className = "APOVariantPreviewCard";

    const imagesHTML = variant.images
      .map(() => '<div class="APOVariantImgPlaceholder"></div>')
      .join("");

    variantCard.innerHTML = `
      <h4 class="APOVariantPreviewTitle">${variant.name}</h4>
      <div class="APOVariantImagesGrid">
        ${imagesHTML}
      </div>
      <div class="APOVariantInfoRow">
        <span class="APOVariantInfoLabel">Size - </span>
        <span class="APOVariantInfoValue">${variant.size}</span>
      </div>
      <div class="APOVariantInfoRow">
        <span class="APOVariantInfoLabel">Colour - </span>
        <span class="APOColorSwatchDisplay" style="background-color: ${variant.colorHex};"></span>
        <span class="APOVariantInfoValue">${variant.color}</span>
      </div>
      <div class="APOVariantInfoRow">
        <span class="APOVariantInfoLabel">Quantity - </span>
        <span class="APOVariantInfoValue">${variant.quantity}</span>
      </div>
    `;

    container.appendChild(variantCard);
  });
}

function APORenderAddress(address) {
  const addressCard = document.querySelector(".APOAddressPreviewCard");
  if (!addressCard) return;

  addressCard.innerHTML = `
    <h4 class="APOAddressPreviewTitle">${address.title}</h4>
    <p class="APOAddressPreviewName">${address.name}</p>
    <p class="APOAddressPreviewEmail">${address.email}</p>
    <p class="APOAddressPreviewPhone">${address.phone}</p>
    <p class="APOAddressPreviewDetails">${address.address.replace(
      /\n/g,
      "<br>"
    )}</p>
  `;
}

APORenderProductData(APOProductData);
APORenderVariants(APOVariantsData);
APORenderAddress(APOAddressData);

document.addEventListener("DOMContentLoaded", () => {
  APOSetupFiveItemToggle("details", ".APODetailsList");
  APOSetupFiveItemToggle("policy", ".APOPolicyList");
});

function APOSetupFiveItemToggle(type, listSelector) {
  const header = document.querySelector(`.APOToggleHeader[data-target="${type}"]`);
  const list = document.querySelector(listSelector);
  const icon = header?.querySelector(".APOToggleIcon");

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

const APODeleteButton = document.querySelector(".APODeleteButton");
if (APODeleteButton) {
  APODeleteButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this product?")) {
      alert("Product deleted successfully!");
      window.history.back();
    }
  });
}

const APORemoveButton = document.querySelector(".APORemoveButton");
if (APORemoveButton) {
  APORemoveButton.addEventListener("click", () => {
      APOremoveModal.classList.add("active");
  });
}


APOcloseRemoveModal.addEventListener("click", () => {
  APOremoveModal.classList.remove("active");
});

APOremoveNo.addEventListener("click", () => {
  APOremoveModal.classList.remove("active");
});

APOremoveYes.addEventListener("click", () => {
  APOremoveModal.classList.remove("active");
  window.location.href = "adminProductManagementProductCategories.html";
});