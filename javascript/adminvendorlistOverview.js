// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon = document.querySelector("#hamburger-menu>img");
var mobileBack = document.querySelector(".mobile-back-button");


hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display = "none"
    document.querySelector("body").style.overflow = "hidden"
    window.scrollTo(0, 0);
    mobileBack.style.display = "none"
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".bottom-nav").style.display = "flex";
    mobileBack.style.display = "flex"
  }
});

const APPVOProductData = {
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

const APPVOVariantsData = [
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

const APPVOAddressData = {
  title: "Address 1",
  name: "David john",
  email: "davidjohn23@gmail.com",
  phone: "95367 89905",
  address:
    "C - 605 , Eden Park,Mudhuban colony, parsi road,\nNear Appolo Hospital, Pune, Maharashtra, 234 678",
};

document.addEventListener("DOMContentLoaded", () => {
  const thumbnails = document.querySelectorAll(".APPVOThumbnailItem");
  const mainImage = document.querySelector(".APPVOMainProductImage img");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      thumbnails.forEach((t) => t.classList.remove("APPVOActive"));
      thumb.classList.add("APPVOActive");

      const thumbImg = thumb.querySelector("img");
      if (thumbImg && mainImage) {
        mainImage.src = thumbImg.src;
      }
    });
  });
});

function APPVORenderProductData(data) {
  const titleElement = document.querySelector(".APPVOProductTitle");
  if (titleElement) titleElement.textContent = data.name;

  const priceElement = document.querySelector(".APPVOProductPrice");
  if (priceElement) priceElement.textContent = data.price;

  const brandElement = document.querySelector(".APPVOProductBrand");
  if (brandElement) brandElement.textContent = data.brand;

  const categoryElement = document.querySelector(".APPVOProductCategory span");
  if (categoryElement)
    categoryElement.textContent = `Category : ${data.category} | ${data.subCategory}`;

  const descElement = document.querySelector(".APPVOProductDescription");
  if (descElement) descElement.textContent = data.description;

  const detailsList = document.querySelector(".APPVODetailsList");
  if (detailsList && data.details) {
    detailsList.innerHTML = `
      <li><span class="APPVODetailLabel">Ornamentation</span> - ${data.details.ornamentation}</li>
      <li><span class="APPVODetailLabel">Material</span> - ${data.details.material}</li>
      <li><span class="APPVODetailLabel">Heel Height</span> - ${data.details.heelHeight}</li>
      <li><span class="APPVODetailLabel">Toe Shape</span> - ${data.details.toeShape}</li>
      <li><span class="APPVODetailLabel">Occasion</span> - ${data.details.occasion}</li>
      <li><span class="APPVODetailLabel">Care Info</span> - ${data.details.careInfo}</li>
    `;
  }
}

function APPVORenderVariants(variants) {
  const container = document.querySelector(".APPVOVariantsPreviewGrid");
  if (!container) return;

  container.innerHTML = "";

  variants.forEach((variant) => {
    const variantCard = document.createElement("div");
    variantCard.className = "APPVOVariantPreviewCard";

    const imagesHTML = variant.images
      .map(() => '<div class="APPVOVariantImgPlaceholder"></div>')
      .join("");

    variantCard.innerHTML = `
      <h4 class="APPVOVariantPreviewTitle">${variant.name}</h4>
      <div class="APPVOVariantImagesGrid">
        ${imagesHTML}
      </div>
      <div class="APPVOVariantInfoRow">
        <span class="APPVOVariantInfoLabel">Size - </span>
        <span class="APPVOVariantInfoValue">${variant.size}</span>
      </div>
      <div class="APPVOVariantInfoRow">
        <span class="APPVOVariantInfoLabel">Colour - </span>
        <span class="APPVOColorSwatchDisplay" style="background-color: ${variant.colorHex};"></span>
        <span class="APPVOVariantInfoValue">${variant.color}</span>
      </div>
      <div class="APPVOVariantInfoRow">
        <span class="APPVOVariantInfoLabel">Quantity - </span>
        <span class="APPVOVariantInfoValue">${variant.quantity}</span>
      </div>
    `;

    container.appendChild(variantCard);
  });
}

function APPVORenderAddress(address) {
  const addressCard = document.querySelector(".APPVOAddressPreviewCard");
  if (!addressCard) return;

  addressCard.innerHTML = `
    <h4 class="APPVOAddressPreviewTitle">${address.title}</h4>
    <p class="APPVOAddressPreviewName">${address.name}</p>
    <p class="APPVOAddressPreviewEmail">${address.email}</p>
    <p class="APPVOAddressPreviewPhone">${address.phone}</p>
    <p class="APPVOAddressPreviewDetails">${address.address.replace(
    /\n/g,
    "<br>",
  )}</p>
  `;
}

APPVORenderProductData(APPVOProductData);
APPVORenderVariants(APPVOVariantsData);
APPVORenderAddress(APPVOAddressData);

document.addEventListener("DOMContentLoaded", () => {
  APPVOSetupFiveItemToggle("details", ".APPVODetailsList");
  APPVOSetupFiveItemToggle("policy", ".APPVOPolicyList");
});

function APPVOSetupFiveItemToggle(type, listSelector) {
  const header = document.querySelector(
    `.APPVOToggleHeader[data-target="${type}"]`,
  );
  const list = document.querySelector(listSelector);
  const icon = header?.querySelector(".APPVOToggleIcon");

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

const deleteBtn = document.querySelector(".APPVOdeleteButton");
deleteBtn.addEventListener("click", () => {
  document.querySelector(".APOConfirmOverlay").style.display = "flex";
  document.getElementById("APPVOdeleteYes").addEventListener("click",()=>{
    window.location.href="../html/adminVMVendorList.html"
  })
  document.getElementById("APPVOdeleteNo").addEventListener("click",()=>{
    document.querySelector(".APOConfirmOverlay").style.display = "none";
  })
})

document.getElementById("APPVOclosedeleteModal").addEventListener("click", () => {
  document.querySelector(".APOConfirmOverlay").style.display = "none";
})


document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(3)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(2)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(2)>li:nth-child(1)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(3) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(3)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(3) li:nth-child(1)").classList.add("submenu-active-page");

