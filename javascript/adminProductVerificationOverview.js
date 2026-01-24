const APVOProductData = {
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

const APVOVariantsData = [
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

const APVOAddressData = {
  title: "Address 1",
  name: "David john",
  email: "davidjohn23@gmail.com",
  phone: "95367 89905",
  address:
    "C - 605 , Eden Park,Mudhuban colony, parsi road,\nNear Appolo Hospital, Pune, Maharashtra, 234 678",
};

document.addEventListener("DOMContentLoaded", () => {
  const thumbnails = document.querySelectorAll(".APVOThumbnailItem");
  const mainImage = document.querySelector(".APVOMainProductImage img");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      thumbnails.forEach((t) => t.classList.remove("APVOActive"));
      thumb.classList.add("APVOActive");

      const thumbImg = thumb.querySelector("img");
      if (thumbImg && mainImage) {
        mainImage.src = thumbImg.src;
      }
    });
  });
});

function APVORenderProductData(data) {
  const titleElement = document.querySelector(".APVOProductTitle");
  if (titleElement) titleElement.textContent = data.name;

  const priceElement = document.querySelector(".APVOProductPrice");
  if (priceElement) priceElement.textContent = data.price;

  const brandElement = document.querySelector(".APVOProductBrand");
  if (brandElement) brandElement.textContent = data.brand;

  const categoryElement = document.querySelector(".APVOProductCategory span");
  if (categoryElement)
    categoryElement.textContent = `Category : ${data.category} | ${data.subCategory}`;

  const descElement = document.querySelector(".APVOProductDescription");
  if (descElement) descElement.textContent = data.description;

  const detailsList = document.querySelector(".APVODetailsList");
  if (detailsList && data.details) {
    detailsList.innerHTML = `
      <li><span class="APVODetailLabel">Ornamentation</span> - ${data.details.ornamentation}</li>
      <li><span class="APVODetailLabel">Material</span> - ${data.details.material}</li>
      <li><span class="APVODetailLabel">Heel Height</span> - ${data.details.heelHeight}</li>
      <li><span class="APVODetailLabel">Toe Shape</span> - ${data.details.toeShape}</li>
      <li><span class="APVODetailLabel">Occasion</span> - ${data.details.occasion}</li>
      <li><span class="APVODetailLabel">Care Info</span> - ${data.details.careInfo}</li>
    `;
  }
}

function APVORenderVariants(variants) {
  const container = document.querySelector(".APVOVariantsPreviewGrid");
  if (!container) return;

  container.innerHTML = "";

  variants.forEach((variant) => {
    const variantCard = document.createElement("div");
    variantCard.className = "APVOVariantPreviewCard";

    const imagesHTML = variant.images
      .map(() => '<div class="APVOVariantImgPlaceholder"></div>')
      .join("");

    variantCard.innerHTML = `
      <h4 class="APVOVariantPreviewTitle">${variant.name}</h4>
      <div class="APVOVariantImagesGrid">
        ${imagesHTML}
      </div>
      <div class="APVOVariantInfoRow">
        <span class="APVOVariantInfoLabel">Size - </span>
        <span class="APVOVariantInfoValue">${variant.size}</span>
      </div>
      <div class="APVOVariantInfoRow">
        <span class="APVOVariantInfoLabel">Colour - </span>
        <span class="APVOColorSwatchDisplay" style="background-color: ${variant.colorHex};"></span>
        <span class="APVOVariantInfoValue">${variant.color}</span>
      </div>
      <div class="APVOVariantInfoRow">
        <span class="APVOVariantInfoLabel">Quantity - </span>
        <span class="APVOVariantInfoValue">${variant.quantity}</span>
      </div>
    `;

    container.appendChild(variantCard);
  });
}

function APVORenderAddress(address) {
  const addressCard = document.querySelector(".APVOAddressPreviewCard");
  if (!addressCard) return;

  addressCard.innerHTML = `
    <h4 class="APVOAddressPreviewTitle">${address.title}</h4>
    <p class="APVOAddressPreviewName">${address.name}</p>
    <p class="APVOAddressPreviewEmail">${address.email}</p>
    <p class="APVOAddressPreviewPhone">${address.phone}</p>
    <p class="APVOAddressPreviewDetails">${address.address.replace(
      /\n/g,
      "<br>",
    )}</p>
  `;
}

APVORenderProductData(APVOProductData);
APVORenderVariants(APVOVariantsData);
APVORenderAddress(APVOAddressData);

document.addEventListener("DOMContentLoaded", () => {
  APVOSetupFiveItemToggle("details", ".APVODetailsList");
  APVOSetupFiveItemToggle("policy", ".APVOPolicyList");
});

function APVOSetupFiveItemToggle(type, listSelector) {
  const header = document.querySelector(
    `.APVOToggleHeader[data-target="${type}"]`,
  );
  const list = document.querySelector(listSelector);
  const icon = header?.querySelector(".APVOToggleIcon");

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
/* ===== APPROVE CONFIRMATION POPUP ===== */
/* ===== APPROVE CONFIRMATION POPUP ===== */
const APVOapproveBtn = document.querySelector(".APVOSentButton");
const APVOapproveModal = document.getElementById("APVOapproveModal");
const APVOcloseApproveModal = document.getElementById("APVOcloseApproveModal");
const APVOapproveYes = document.getElementById("APVOapproveYes");
const APVOapproveNo = document.getElementById("APVOapproveNo");

if (APVOapproveBtn) {
  APVOapproveBtn.addEventListener("click", () => {
    APVOapproveModal.classList.add("active");
  });
}

APVOcloseApproveModal.addEventListener("click", () => {
  APVOapproveModal.classList.remove("active");
});

APVOapproveNo.addEventListener("click", () => {
  APVOapproveModal.classList.remove("active");
});

APVOapproveYes.addEventListener("click", () => {
  // popup close
  APVOapproveModal.classList.remove("active");

  // 🔥 poora page hide
  document.querySelector(".APVOMainContentBeyond").style.display = "none";

  // ✅ success screen show
  document.getElementById("APVOapproveSuccessScreen").classList.add("active");
});

/* ===== REJECT CONFIRMATION POPUP ===== */
const APVOrejectBtn = document.querySelector(".APVORejectButton");
const APVOrejectModal = document.getElementById("APVOrejectModal");
const APVOcloseRejectModal = document.getElementById("APVOcloseRejectModal");
const APVOrejectYes = document.getElementById("APVOrejectYes");
const APVOrejectNo = document.getElementById("APVOrejectNo");

if (APVOrejectBtn) {
  APVOrejectBtn.addEventListener("click", () => {
    APVOrejectModal.classList.add("active");
  });
}

APVOcloseRejectModal.addEventListener("click", () => {
  APVOrejectModal.classList.remove("active");
});

APVOrejectNo.addEventListener("click", () => {
  APVOrejectModal.classList.remove("active");
});

APVOrejectYes.addEventListener("click", () => {
  // popup close
  APVOrejectModal.classList.remove("active");

  // main page hide
  document.querySelector(".APVOMainContentBeyond").style.display = "none";

  // reject success screen show
  document.getElementById("APVOrejectSuccessScreen").classList.add("active");
});
