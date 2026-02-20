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

// Thumbnail image switch
document.addEventListener("DOMContentLoaded", () => {
  const thumbnails = document.querySelectorAll(".DPOThumbnailItem");
  const mainImage = document.querySelector(".DPOMainProductImage img");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      thumbnails.forEach((t) => t.classList.remove("DPOActive"));
      thumb.classList.add("DPOActive");

      const thumbImg = thumb.querySelector("img");
      if (thumbImg && mainImage) {
        mainImage.src = thumbImg.src;
      }
    });
  });
});

// Product details & policy toggle
document.addEventListener("DOMContentLoaded", () => {
  DPOSetupFiveItemToggle("details", ".DPODetailsList");
  DPOSetupFiveItemToggle("policy", ".DPOPolicyList");
});

function DPOSetupFiveItemToggle(type, listSelector) {
  const header = document.querySelector(`.DPOToggleHeader[data-target="${type}"]`);
  const list = document.querySelector(listSelector);
  const icon = header?.querySelector(".DPOToggleIcon");

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

const DPORemoveButton = document.querySelector(".DPORemoveButton");
const DPODeleteButton = document.querySelector(".DPODeleteButton");

const DPOremoveModal = document.getElementById("DPOremoveModal");
const DPOcloseRemoveModal = document.getElementById("DPOcloseRemoveModal");
const DPOremoveNo = document.getElementById("DPOremoveNo");
const DPOremoveYes = document.getElementById("DPOremoveYes");
const DPOConfirmText = document.getElementById("DPOConfirmText");

let currentAction = ""; // "remove" or "delete"

// Remove button
DPORemoveButton?.addEventListener("click", () => {
  currentAction = "remove";
  DPOConfirmText.textContent = "Are you sure you want to remove this product?";
  DPOremoveModal.classList.add("active");
});

// Delete button
DPODeleteButton?.addEventListener("click", () => {
  currentAction = "delete";
  DPOConfirmText.textContent = "Are you sure you want to delete this product permanently?";
  DPOremoveModal.classList.add("active");
});

// Close modal
DPOcloseRemoveModal?.addEventListener("click", closeModal);
DPOremoveNo?.addEventListener("click", closeModal);

function closeModal() {
  DPOremoveModal.classList.remove("active");
  currentAction = "";
}

// Yes button
DPOremoveYes?.addEventListener("click", () => {
  DPOremoveModal.classList.remove("active");

  if (currentAction === "remove") {
    window.location.href = "../html/adminPMProductList.html";
  }

  if (currentAction === "delete") {
    window.location.href = "../html/adminPMProductList.html";
  }

  currentAction = "";
});

// Handle Edit and Delete icons in section headers
document.addEventListener("DOMContentLoaded", () => {
  const editIcons = document.querySelectorAll(".DPOEditIcon");
  const deleteIcons = document.querySelectorAll(".DPODeleteIcon");

  // editIcons.forEach((icon) => {
  //   icon.addEventListener("click", () => {
  //     alert("Edit functionality to be implemented");
  //     // Add your edit logic here
  //   });
  // });

  deleteIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      DPOConfirmText.textContent = "Are you sure you want to delete this section?";
      DPOremoveModal.classList.add("active");
      currentAction = "delete-section";
    });
  });
});




/* =====================================================
   DEVELOPER PAGE EDIT MODE CONTROLLER
===================================================== */
const DEV_PREFILL_DATA = {

 productName: "Womens Banarasi Silk Saree",

 productDescription:
 "Premium handwoven Banarasi silk saree with zari work.",

 categoryChain: [
   "Women",
   "Handlooms",
   "Pure Silk",
   "Banarasi Silk"
 ],

dynamicFields: {

 brand: "Handloom Heritage",
 material: "Pure Silk",
 sellingPrice: "12999",
 totalQuantity: "50",

 fabric: "Pure Silk",
 weave: "Banarasi",
 sareeType: "Traditional",
 occasion: "Wedding",

 bodyDesign: "Floral",
 borderDesign: "Zari Border",

 palluDesign: "Traditional Zari",
 zariType: "Pure Gold Zari",
 

 blouseIncluded: "Yes",
 blouseFabric: "Silk",
 blouseWork: "Zari",

 sareeLength: "5.5 meters",
 sareeWidth: "44 inches",
 weight: "Medium",

 coloursAvailable: "Red",
 careInformation: "Dry Clean Only",
 origin: "Varanasi",

 applicableToReturn: "Yes",
 deliveryTime: "3–5 Days",
 giTag: "Yes"

},


 mainImage:
 "../assets/adminProductOverview/Rectangle 34627060.svg",

 galleryImages: [
 "../assets/adminProductOverview/Rectangle 34627061 (1).svg",
 "../assets/adminProductOverview/Rectangle 34627062 (1).svg",
 "../assets/adminProductOverview/Rectangle 34627063 (1).svg",
 "../assets/adminProductOverview/Rectangle 34627063 (1).svg",
 "../assets/adminProductOverview/Rectangle 34627064 (1).svg"
 ]

};
function DEV_fullPrefill(){

 const data = DEV_PREFILL_DATA;

 /* PRODUCT TEXT */
 document.getElementById("productName").value = data.productName;
 document.getElementById("productDescription").value = data.productDescription;

 /* CATEGORY CHAIN */
 DEV_prefillCategoryChain(data.categoryChain);

 /* IMAGE PREFILL */
 DEV_prefillImages(data.mainImage, data.galleryImages);

 /* DYNAMIC FIELDS */
 DEV_prefillDynamicFields(data.dynamicFields);

}
function DEV_prefillCategoryChain(chain){

 setTimeout(()=>{
   categoryLevel1.value = chain[0];
   categoryLevel1.dispatchEvent(new Event("change"));
 },200);

 setTimeout(()=>{
   categoryLevel2.value = chain[1];
   categoryLevel2.dispatchEvent(new Event("change"));
 },500);

 setTimeout(()=>{
   categoryLevel3.value = chain[2];
   categoryLevel3.dispatchEvent(new Event("change"));
 },800);

 setTimeout(()=>{
   categoryLevel4.value = chain[3];
   categoryLevel4.dispatchEvent(new Event("change"));
 },1100);

}
function DEV_prefillImages(mainImage, subImages){

 /* ===== MAIN IMAGE ===== */

 if(mainImage){

   const mainPreview = document.getElementById("mainPreview");

   if(mainPreview){
     mainPreview.src = mainImage;
     mainPreview.style.display = "block";

     if(typeof mainUpload !== "undefined"){
       mainUpload.classList.add("has-image");
     }
   }

 }

 /* ===== SUB IMAGES ===== */

 const boxes = document.querySelectorAll(".upload-box");

 boxes.forEach(function(box, index){

   const imgEl = box.querySelector(".preview-image");

   if(!imgEl) return;

   if(subImages && subImages[index]){

     imgEl.src = subImages[index];
     imgEl.style.display = "block";

     box.classList.add("has-image");

   } else {

     imgEl.removeAttribute("src");
     imgEl.style.display = "none";

     box.classList.remove("has-image");

   }

 });

}


function DEV_prefillDynamicFields(data){

 if(!data) return;

 const tryFill = () => {

   let allFilled = true;

   Object.keys(data).forEach(key=>{

     let input = document.querySelector(`[name="${key}"]`);

     // ⭐ SPECIAL COLOR FIX
     if(!input && key === "coloursAvailable"){
       input = document.querySelector(".color-select");
     }

     if(input){
       input.value = data[key];

       // ⭐ update swatch color
       if(key === "coloursAvailable"){
         const swatch = input.closest(".color-selector")
                         ?.querySelector(".color-swatch");

         if(swatch){
           swatch.style.background = data[key];
         }
       }

     } else {
       allFilled = false;
     }

   });

   if(!allFilled){
     setTimeout(tryFill, 300);
   }

 };

 tryFill();

}



document.addEventListener("click", () => {
  document.querySelectorAll(".img-menu-dropdown")
    .forEach(menu => menu.style.display = "none");
});

document.querySelectorAll(".img-menu-dot").forEach(dot => {

  dot.addEventListener("click", (e) => {
    e.stopPropagation();

    const menu = dot.parentElement.querySelector(".img-menu-dropdown");

    document.querySelectorAll(".img-menu-dropdown")
      .forEach(m => { if(m !== menu) m.style.display = "none"; });

    menu.style.display =
      menu.style.display === "block" ? "none" : "block";
  });

});

document.querySelectorAll(".img-menu-upload").forEach(btn => {

  btn.addEventListener("click", (e) => {

    e.stopPropagation();

    const wrapper = btn.closest(".main-upload, .upload-box");

    if (!wrapper) return;

    const fileInput = wrapper.querySelector("input[type='file']");

    if (fileInput) {
      fileInput.click();
    }

  });

});
document.querySelectorAll(".img-menu-download").forEach(btn => {

  btn.addEventListener("click", (e) => {

    e.stopPropagation();

    const wrapper = btn.closest(".main-upload, .upload-box");

    if (!wrapper) return;

    const img = wrapper.querySelector("img");

    if (!img || !img.src) {
      alert("No image to download");
      return;
    }

    const link = document.createElement("a");
    link.href = img.src;
    link.download = "product-image";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  });

});
document.querySelectorAll("input[type='file']").forEach(input => {

  input.addEventListener("change", (e) => {

    const file = e.target.files[0];
    if (!file) return;

    const wrapper = input.closest(".main-upload, .upload-box");
    const img = wrapper.querySelector("img");

    if (img) {
      img.src = URL.createObjectURL(file);
    }

  });

});



const categoryTree = {
  Women: {
    Handlooms: {
      "Pure Silk": {
        "Banarasi Silk": {},
        "Tussar Silk": {},
        "Kanchipuram Silk": {},
        "Mysore Silk": {},
        "Mulberry Silk": {}
      },
      Cotton: {
        "Jamdani Cotton": {},
        "Khadi Cotton": {},
        "Chanderi Cotton": {},
        "Kota Doria Cotton": {}
      },
      Linen: {
        "Pure Linen Saree": {},
        "Linen Dress Material": {},
        "Linen Kurta": {}
      },
      Khadi: {
        "Khadi Saree": {},
        "Khadi Kurta": {},
        "Khadi Dress Material": {}
      }
    },

    Clothing: {
      Tops: {
        "Handblock Printed": {},
        "Hand Embroidery": {},
        "Designer Tops": {}
      },
      Dresses: {
        "Handblock Printed": {},
        "Evening Gown": {}
      }
    },

    Footwear: {
      Sandals: {
        "Leather Sandals": {},
        "Casual Sandals": {}
      },
      Flats: {
        "Ballerina Flats": {},
        "Party Flats": {}
      }
    }
  },

  Men: {
    Clothing: {
      Shirts: {
        "Casual Shirts": {},
        "Formal Shirts": {},
        "Linen Shirts": {}
      }
    },
    Footwear: {
      Mojaris: {
        "Traditional Mojari": {},
        "Designer Mojari": {}
      }
    }
  },

  Arts: {
    Paintings: {
      "Madhubani Art": {},
      "Warli Art": {},
      "Gond Art": {}
    }
  },

  Crafts: {
    Toys: {
      "Etikoppaka Toys": {},
      "Channapatna Toys": {}
    }
  }
};


const defaultCategoryFields = [
  {
    name: "brand",
    label: "Brand",
    type: "text",
    required: true,
    placeholder: "Brand name"
  },
  {
    name: "material",
    label: "Material",
    type: "text",
    required: true,
    placeholder: "Cotton, Silk, Wood..."
  },
  {
    name: "sellingPrice",
    label: "Selling Price (₹)",
    type: "text",
    required: true,
    placeholder: "₹ 2499"
  },
  {
    name: "totalQuantity",
    label: "Total Quantity",
    type: "text",
    required: true,
    placeholder: "100"
  }
];

const categoryFields = {

 "Banarasi Silk": [

  /* ===== BASIC DETAILS ===== */
  {
    name: "fabric",
    label: "Fabric",
    type: "select",
    required: true,
    options: ["Pure Silk"]
  },

  {
    name: "weave",
    label: "Weave Type",
    type: "select",
    required: true,
    options: ["Banarasi"]
  },

  {
    name: "sareeType",
    label: "Saree Type",
    type: "select",
    required: true,
    options: ["Traditional", "Designer", "Contemporary"]
  },

  {
    name: "occasion",
    label: "Occasion",
    type: "select",
    required: true,
    options: ["Wedding", "Festive", "Party"]
  },

  /* ===== DESIGN DETAILS ===== */
  {
    name: "bodyDesign",
    label: "Body Design",
    type: "select",
    required: true,
    options: ["Floral", "Paisley", "Butta", "Plain"]
  },

  {
    name: "borderDesign",
    label: "Border Design",
    type: "select",
    required: true,
    options: ["Temple Border", "Contrast Border", "Zari Border"]
  },

  {
    name: "palluDesign",
    label: "Pallu Design",
    type: "select",
    required: true,
    options: ["Traditional Zari", "Floral Zari", "Heavy Zari"]
  },

  {
    name: "zariType",
    label: "Zari Type",
    type: "select",
    required: true,
    options: ["Pure Gold Zari", "Silver Zari", "Tested Zari"]
  },

  /* ===== BLOUSE DETAILS ===== */
  {
    name: "blouseIncluded",
    label: "Blouse Piece Included",
    type: "select",
    required: true,
    options: ["Yes", "No"]
  },

  {
    name: "blouseFabric",
    label: "Blouse Fabric",
    type: "select",
    required: true,
    options: ["Silk", "Cotton Silk"]
  },

  {
    name: "blouseWork",
    label: "Blouse Work",
    type: "select",
    required: true,
    options: ["Zari", "Embroidery", "Plain"]
  },

  /* ===== SIZE & WEIGHT ===== */
  {
    name: "sareeLength",
    label: "Saree Length",
    type: "select",
    required: true,
    options: ["5.5 meters", "6.3 meters"]
  },

  {
    name: "sareeWidth",
    label: "Saree Width",
    type: "select",
    required: true,
    options: ["44 inches", "46 inches"]
  },

  {
    name: "weight",
    label: "Approximate Weight",
    type: "select",
    required: true,
    options: ["Lightweight", "Medium", "Heavy"]
  },

  /* ===== COLOR & VARIANT ===== */
  {
    name: "coloursAvailable",
    label: "Colours Available",
    type: "select",
    required: true,
    options: ["Red", "Maroon", "Green", "Royal Blue", "Gold", "Pink"]
  },

  /* ===== CARE & ORIGIN ===== */
  {
    name: "careInformation",
    label: "Care Instructions",
    type: "select",
    required: true,
    options: ["Dry Clean Only"]
  },

  {
    name: "origin",
    label: "Place of Origin",
    type: "select",
    required: true,
    options: ["Varanasi"]
  },

  /* ===== RETURN & DELIVERY ===== */
  {
    name: "applicableToReturn",
    label: "Applicable to Return",
    type: "select",
    required: true,
    options: ["Yes", "No"]
  },

  {
    name: "deliveryTime",
    label: "Delivery Time",
    type: "select",
    required: true,
    options: ["3–5 Days", "5–7 Days", "7–10 Days"]
  },

  /* ===== CERTIFICATION ===== */
  {
    name: "giTag",
    label: "GI Tagged Product",
    type: "select",
    required: true,
    options: ["Yes", "No"]
  }
]
,

  "Kanchipuram Silk": [

  /* BASIC DETAILS */
  {
    name: "fabric",
    label: "Fabric",
    type: "select",
    required: true,
    options: ["Pure Silk"]
  },

  {
    name: "weave",
    label: "Weave Type",
    type: "select",
    required: true,
    options: ["Kanchipuram"]
  },

  {
    name: "occasion",
    label: "Occasion",
    type: "select",
    required: true,
    options: ["Wedding", "Festive"]
  },

  /* DESIGN DETAILS */
  {
    name: "bodyDesign",
    label: "Body Design",
    type: "select",
    required: true,
    options: ["Plain", "Checks", "Butta"]
  },

  {
    name: "borderType",
    label: "Border Type",
    type: "select",
    required: true,
    options: ["Contrast Border", "Temple Border"]
  },

  {
    name: "palluDesign",
    label: "Pallu Design",
    type: "select",
    required: true,
    options: ["Traditional", "Zari"]
  },

  /* BLOUSE DETAILS */
  {
    name: "blouseIncluded",
    label: "Blouse Piece Included",
    type: "select",
    required: true,
    options: ["Yes", "No"]
  },

  {
    name: "blouseFabric",
    label: "Blouse Fabric",
    type: "select",
    required: true,
    options: ["Silk", "Cotton Silk"]
  },

  /* SIZE & COLOR */
  {
    name: "sareeLength",
    label: "Saree Length",
    type: "select",
    required: true,
    options: ["5.5 meters", "6.3 meters"]
  },

  {
    name: "coloursAvailable",
    label: "Colours Available",
    type: "select",
    required: true,
    options: ["Maroon", "Red", "Green", "Gold", "Royal Blue"]
  },

  /* CARE & RETURN */
  {
    name: "careInformation",
    label: "Care Instructions",
    type: "select",
    required: true,
    options: ["Dry Clean Only"]
  },

  {
    name: "applicableToReturn",
    label: "Applicable to Return",
    type: "select",
    required: true,
    options: ["Yes", "No"]
  }
]
,

  "Jamdani Cotton": [

  /* BASIC DETAILS */
  {
    name: "fabric",
    label: "Fabric",
    type: "select",
    required: true,
    options: ["Cotton"]
  },

  {
    name: "weave",
    label: "Weave Type",
    type: "select",
    required: true,
    options: ["Jamdani"]
  },

  {
    name: "occasion",
    label: "Occasion",
    type: "select",
    required: true,
    options: ["Casual", "Office Wear", "Festive"]
  },

  /* DESIGN DETAILS */
  {
    name: "pattern",
    label: "Pattern",
    type: "select",
    required: true,
    options: ["Floral", "Geometric", "Butta"]
  },

  {
    name: "borderType",
    label: "Border Type",
    type: "select",
    required: true,
    options: ["Self Border", "Contrast Border"]
  },

  /* BLOUSE DETAILS */
  {
    name: "blouseIncluded",
    label: "Blouse Piece Included",
    type: "select",
    required: true,
    options: ["Yes", "No"]
  },

  {
    name: "blouseFabric",
    label: "Blouse Fabric",
    type: "select",
    required: true,
    options: ["Cotton", "Cotton Silk"]
  },

  /* SIZE & COLOR */
  {
    name: "sareeLength",
    label: "Saree Length",
    type: "select",
    required: true,
    options: ["5.5 meters", "6.3 meters"]
  },

  {
    name: "coloursAvailable",
    label: "Colours Available",
    type: "select",
    required: true,
    options: ["White", "Off White", "Sky Blue", "Green", "Pink"]
  },

  /* CARE & RETURN */
  {
    name: "careInformation",
    label: "Care Instructions",
    type: "select",
    required: true,
    options: ["Hand Wash", "Dry Clean Only"]
  },

  {
    name: "applicableToReturn",
    label: "Applicable to Return",
    type: "select",
    required: true,
    options: ["Yes", "No"]
  }
]
,
  "Designer Tops": [

  /* BASIC DETAILS */
  {
    name: "fabric",
    label: "Fabric",
    type: "select",
    required: true,
    options: ["Cotton", "Rayon", "Silk"]
  },

  {
    name: "topType",
    label: "Top Type",
    type: "select",
    required: true,
    options: ["Casual Top", "Party Top", "Formal Top"]
  },

  {
    name: "occasion",
    label: "Occasion",
    type: "select",
    required: true,
    options: ["Casual", "Party", "Office Wear"]
  },

  /* FIT & STYLE */
  {
    name: "fit",
    label: "Fit",
    type: "select",
    required: true,
    options: ["Slim", "Regular", "Relaxed"]
  },

  {
    name: "neckType",
    label: "Neck Type",
    type: "select",
    required: true,
    options: ["Round Neck", "V Neck", "Square Neck"]
  },

  {
    name: "sleeveLength",
    label: "Sleeve Length",
    type: "select",
    required: true,
    options: ["Sleeveless", "Half Sleeve", "Full Sleeve"]
  },

  /* SIZE & COLOR */
  {
    name: "sizes",
    label: "Sizes",
    type: "select",
    required: true,
    options: ["S", "M", "L", "XL"]
  },

  {
    name: "coloursAvailable",
    label: "Colours Available",
    type: "select",
    required: true,
    options: ["Black", "White", "Red", "Blue", "Pink"]
  },

  /* CARE & RETURN */
  {
    name: "careInformation",
    label: "Care Instructions",
    type: "select",
    required: true,
    options: ["Hand Wash", "Machine Wash", "Dry Clean Only"]
  },

  {
    name: "applicableToReturn",
    label: "Applicable to Return",
    type: "select",
    required: true,
    options: ["Yes", "No"]
  }
]
,

  "Evening Gown": [

  /* BASIC DETAILS */
  {
    name: "fabric",
    label: "Fabric",
    type: "select",
    required: true,
    options: ["Georgette", "Satin"]
  },

  {
    name: "gownType",
    label: "Gown Type",
    type: "select",
    required: true,
    options: ["A-Line", "Flared", "Bodycon"]
  },

  {
    name: "occasion",
    label: "Occasion",
    type: "select",
    required: true,
    options: ["Party", "Reception", "Evening Wear"]
  },

  /* FIT & STYLE */
  {
    name: "length",
    label: "Length",
    type: "select",
    required: true,
    options: ["Floor Length", "Ankle Length"]
  },

  {
    name: "neckType",
    label: "Neck Type",
    type: "select",
    required: true,
    options: ["Round Neck", "V Neck", "Off Shoulder"]
  },

  {
    name: "sleeveType",
    label: "Sleeve Type",
    type: "select",
    required: true,
    options: ["Sleeveless", "Cap Sleeve", "Full Sleeve"]
  },

  /* SIZE & COLOR */
  {
    name: "sizes",
    label: "Sizes",
    type: "select",
    required: true,
    options: ["S", "M", "L", "XL"]
  },

  {
    name: "coloursAvailable",
    label: "Colours Available",
    type: "select",
    required: true,
    options: ["Black", "Red", "Wine", "Navy Blue"]
  },

  /* CARE & RETURN */
  {
    name: "careInformation",
    label: "Care Instructions",
    type: "select",
    required: true,
    options: ["Dry Clean Only", "Hand Wash"]
  },

  {
    name: "applicableToReturn",
    label: "Applicable to Return",
    type: "select",
    required: true,
    options: ["Yes", "No"]
  }
]
,
  "Leather Sandals": [

  /* BASIC DETAILS */
  {
    name: "material",
    label: "Material",
    type: "select",
    required: true,
    options: ["Genuine Leather", "PU Leather"]
  },

  {
    name: "footwearType",
    label: "Footwear Type",
    type: "select",
    required: true,
    options: ["Flat Sandals", "Heel Sandals", "Slip-On Sandals"]
  },

  {
    name: "occasion",
    label: "Occasion",
    type: "select",
    required: true,
    options: ["Casual", "Daily Wear", "Party"]
  },

  /* DESIGN DETAILS */
  {
    name: "strapStyle",
    label: "Strap Style",
    type: "select",
    required: true,
    options: ["Single Strap", "Multi Strap", "Ankle Strap"]
  },

  {
    name: "closureType",
    label: "Closure Type",
    type: "select",
    required: true,
    options: ["Buckle", "Velcro", "Slip-On"]
  },

  /* SIZE & COLOR */
  {
    name: "sizes",
    label: "Sizes",
    type: "select",
    required: true,
    options: ["6", "7", "8", "9", "10"]
  },

  {
    name: "coloursAvailable",
    label: "Colours Available",
    type: "select",
    required: true,
    options: ["Tan", "Brown", "Black"]
  },

  /* CARE & RETURN */
  {
    name: "careInformation",
    label: "Care Instructions",
    type: "select",
    required: true,
    options: ["Wipe with dry cloth"]
  },

  {
    name: "applicableToReturn",
    label: "Applicable to Return",
    type: "select",
    required: true,
    options: ["Yes", "No"]
  }
]
,

 "Party Flats": [

  /* BASIC DETAILS */
  {
    name: "material",
    label: "Material",
    type: "select",
    required: true,
    options: ["Synthetic", "Leather"]
  },

  {
    name: "footwearType",
    label: "Footwear Type",
    type: "select",
    required: true,
    options: ["Ballerina", "Pointed Flats", "Open Toe Flats"]
  },

  {
    name: "occasion",
    label: "Occasion",
    type: "select",
    required: true,
    options: ["Party", "Festive", "Evening Wear"]
  },

  /* DESIGN DETAILS */
  {
    name: "heelHeight",
    label: "Heel Height",
    type: "select",
    required: true,
    options: ["Flat", "1 inch"]
  },

  {
    name: "embellishment",
    label: "Embellishment",
    type: "select",
    required: true,
    options: ["Stone Work", "Metal Detail", "Bow", "Plain"]
  },

  /* SIZE & COLOR */
  {
    name: "sizes",
    label: "Sizes",
    type: "select",
    required: true,
    options: ["6", "7", "8", "9", "10"]
  },

  {
    name: "coloursAvailable",
    label: "Colours Available",
    type: "select",
    required: true,
    options: ["Black", "Gold", "Silver", "Nude"]
  },

  /* CARE & RETURN */
  {
    name: "careInformation",
    label: "Care Instructions",
    type: "select",
    required: true,
    options: ["Wipe with dry cloth"]
  },

  {
    name: "applicableToReturn",
    label: "Applicable to Return",
    type: "select",
    required: true,
    options: ["Yes", "No"]
  }
]
,
  "Casual Shirts": [

  /* BASIC DETAILS */
  {
    name: "fabric",
    label: "Fabric",
    type: "select",
    required: true,
    options: ["Cotton", "Linen"]
  },

  {
    name: "shirtType",
    label: "Shirt Type",
    type: "select",
    required: true,
    options: ["Casual Shirt", "Printed Shirt", "Solid Shirt"]
  },

  {
    name: "occasion",
    label: "Occasion",
    type: "select",
    required: true,
    options: ["Casual", "Daily Wear", "Weekend Wear"]
  },

  /* FIT & STYLE */
  {
    name: "fit",
    label: "Fit",
    type: "select",
    required: true,
    options: ["Slim", "Regular"]
  },

  {
    name: "sleeveLength",
    label: "Sleeve Length",
    type: "select",
    required: true,
    options: ["Half Sleeve", "Full Sleeve"]
  },

  {
    name: "collarType",
    label: "Collar Type",
    type: "select",
    required: true,
    options: ["Spread Collar", "Mandarin Collar", "Button-Down"]
  },

  /* SIZE & COLOR */
  {
    name: "sizes",
    label: "Sizes",
    type: "select",
    required: true,
    options: ["S", "M", "L", "XL", "XXL"]
  },

  {
    name: "coloursAvailable",
    label: "Colours Available",
    type: "select",
    required: true,
    options: ["White", "Blue", "Green", "Grey", "Black"]
  },

  /* CARE & RETURN */
  {
    name: "careInformation",
    label: "Care Instructions",
    type: "select",
    required: true,
    options: ["Machine Wash", "Hand Wash"]
  },

  {
    name: "applicableToReturn",
    label: "Applicable to Return",
    type: "select",
    required: true,
    options: ["Yes", "No"]
  }
]
,

  "Traditional Mojari": [

  /* BASIC DETAILS */
  {
    name: "material",
    label: "Material",
    type: "select",
    required: true,
    options: ["Leather"]
  },

  {
    name: "mojariType",
    label: "Mojari Type",
    type: "select",
    required: true,
    options: ["Traditional", "Designer"]
  },

  {
    name: "occasion",
    label: "Occasion",
    type: "select",
    required: true,
    options: ["Festive", "Wedding", "Ethnic Wear"]
  },

  /* DESIGN DETAILS */
  {
    name: "work",
    label: "Work",
    type: "select",
    required: true,
    options: ["Embroidery", "Plain"]
  },

  {
    name: "toeStyle",
    label: "Toe Style",
    type: "select",
    required: true,
    options: ["Round Toe", "Curved Toe"]
  },

  /* SIZE & COLOR */
  {
    name: "sizes",
    label: "Sizes",
    type: "select",
    required: true,
    options: ["6", "7", "8", "9", "10", "11"]
  },

  {
    name: "coloursAvailable",
    label: "Colours Available",
    type: "select",
    required: true,
    options: ["Tan", "Brown", "Black"]
  },

  /* CARE & RETURN */
  {
    name: "careInformation",
    label: "Care Instructions",
    type: "select",
    required: true,
    options: ["Wipe with dry cloth"]
  },

  {
    name: "applicableToReturn",
    label: "Applicable to Return",
    type: "select",
    required: true,
    options: ["Yes", "No"]
  }
]
,
  "Madhubani Art": [

  /* BASIC DETAILS */
  {
    name: "medium",
    label: "Medium",
    type: "select",
    required: true,
    options: ["Natural Colors", "Acrylic"]
  },

  {
    name: "theme",
    label: "Theme",
    type: "select",
    required: true,
    options: ["Mythology", "Nature", "Folk Life"]
  },

  {
    name: "frame",
    label: "Frame",
    type: "select",
    required: true,
    options: ["With Frame", "Without Frame"]
  },

  /* SIZE & DISPLAY */
  {
    name: "orientation",
    label: "Orientation",
    type: "select",
    required: true,
    options: ["Vertical", "Horizontal"]
  },

  {
    name: "sizes",
    label: "Artwork Size",
    type: "select",
    required: true,
    options: ["Small", "Medium", "Large"]
  },

  /* CARE & RETURN */
  {
    name: "careInformation",
    label: "Care Instructions",
    type: "select",
    required: true,
    options: ["Keep away from moisture"]
  },

  {
    name: "applicableToReturn",
    label: "Applicable to Return",
    type: "select",
    required: true,
    options: ["Yes", "No"]
  }
]
,

  "Warli Art": [

  /* BASIC DETAILS */
  {
    name: "surface",
    label: "Surface",
    type: "select",
    required: true,
    options: ["Canvas", "Paper"]
  },

  {
    name: "theme",
    label: "Theme",
    type: "select",
    required: true,
    options: ["Village Life", "Nature", "Tribal Dance"]
  },

  {
    name: "frame",
    label: "Frame",
    type: "select",
    required: true,
    options: ["With Frame", "Without Frame"]
  },

  /* SIZE & DISPLAY */
  {
    name: "orientation",
    label: "Orientation",
    type: "select",
    required: true,
    options: ["Vertical", "Horizontal"]
  },

  {
    name: "sizes",
    label: "Artwork Size",
    type: "select",
    required: true,
    options: ["Small", "Medium", "Large"]
  },

  /* CARE & RETURN */
  {
    name: "careInformation",
    label: "Care Instructions",
    type: "select",
    required: true,
    options: ["Keep away from sunlight"]
  },

  {
    name: "applicableToReturn",
    label: "Applicable to Return",
    type: "select",
    required: true,
    options: ["Yes", "No"]
  }
]


};

const lvl1 = document.getElementById("categoryLevel1");
const lvl2 = document.getElementById("categoryLevel2");
const lvl3 = document.getElementById("categoryLevel3");
const lvl4 = document.getElementById("categoryLevel4");

const lvl1Wrap = document.getElementById("lvl1Wrap");
const lvl2Wrap = document.getElementById("lvl2Wrap");
const lvl3Wrap = document.getElementById("lvl3Wrap");
const lvl4Wrap = document.getElementById("lvl4Wrap");

const dynamicFields = document.getElementById("dynamicFields");

/* ---------- HELPERS ---------- */

function hideLevel(wrapper, select) {
  wrapper.classList.add("hidden");
  select.innerHTML = `<option value="">Select</option>`;
  select.disabled = true;
}

function showLevel(wrapper, select, data, placeholder) {
  select.innerHTML = `<option value="">${placeholder}</option>`;
  Object.keys(data).forEach(key => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = key;
    select.appendChild(opt);
  });
  select.disabled = false;
  wrapper.classList.remove("hidden");
}

function clearDynamic() {
  dynamicFields.innerHTML = "";
}

/* ---------- INIT ---------- */

showLevel(lvl1Wrap, lvl1, categoryTree, "Select Main Category");
hideLevel(lvl2Wrap, lvl2);
hideLevel(lvl3Wrap, lvl3);
hideLevel(lvl4Wrap, lvl4);
clearDynamic();

/* ---------- LEVEL 1 ---------- */

lvl1.addEventListener("change", () => {
  hideLevel(lvl2Wrap, lvl2);
  hideLevel(lvl3Wrap, lvl3);
  hideLevel(lvl4Wrap, lvl4);
  clearDynamic();

  const data = categoryTree[lvl1.value];
  if (data && Object.keys(data).length) {
    showLevel(lvl2Wrap, lvl2, data, "Select Category");
  } else {
    loadDynamicFields(lvl1.value);
  }
});

/* ---------- LEVEL 2 ---------- */

lvl2.addEventListener("change", () => {
  hideLevel(lvl3Wrap, lvl3);
  hideLevel(lvl4Wrap, lvl4);
  clearDynamic();

  const data = categoryTree[lvl1.value]?.[lvl2.value];
  if (data && Object.keys(data).length) {
    showLevel(lvl3Wrap, lvl3, data, "Select Sub Category");
  } else {
    loadDynamicFields(lvl2.value);
  }
});

/* ---------- LEVEL 3 ---------- */

lvl3.addEventListener("change", () => {
  hideLevel(lvl4Wrap, lvl4);
  clearDynamic();

  const data = categoryTree[lvl1.value]?.[lvl2.value]?.[lvl3.value];
  if (data && Object.keys(data).length) {
    showLevel(lvl4Wrap, lvl4, data, "Select Sub Sub Category");
  } else {
    loadDynamicFields(lvl3.value || lvl2.value);
  }
});


/* ---------- LEVEL 4 ---------- */

lvl4.addEventListener("change", () => {
  clearDynamic();
  loadDynamicFields(lvl4.value);
});


/************************************
 * 6. DYNAMIC FIELD LOADER
 ************************************/
function loadDynamicFields(categoryKey) {
  dynamicFields.innerHTML = "";

  const gender = lvl1.value; // Women / Men / Kids

  let resolvedFields = [];

  /* ===============================
     1️⃣ EXACT CATEGORY MATCH
     =============================== */
  if (categoryFields[categoryKey]) {
    resolvedFields = categoryFields[categoryKey];
  }

  /* ===============================
     2️⃣ FOOTWEAR (ONLY WHEN NEEDED)
     =============================== */
  else if (
    ["Flats","Heels","Kolhapuri","Juttis"].includes(categoryKey) &&
    categoryFields[`${gender}_Footwear`]
  ) {
    resolvedFields = categoryFields[`${gender}_Footwear`];
  }

  else if (
    ["Mojaris","Sandals","FormalShoes"].includes(categoryKey) &&
    categoryFields["Men_Footwear"]
  ) {
    resolvedFields = categoryFields["Men_Footwear"];
  }

  /* ===============================
     3️⃣ FINAL FIELD LIST
     =============================== */
  const fields = [
    ...defaultCategoryFields,
    ...resolvedFields
  ];

  const grid = document.createElement("div");
  grid.className = "form-grid";
  grid.style.marginTop = "16px";

  fields.forEach(field => {
    
    const group = document.createElement("div");
    group.className = "form-group";

    const label = document.createElement("label");
    label.className = "form-label";
    label.innerHTML =
      field.label + (field.required ? ' <span class="required">*</span>' : "");

    let input;

    if (field.type === "select") {

      /* 🎨 COLOR SELECT */
      if (field.name === "coloursAvailable") {
        const wrapper = document.createElement("div");
        wrapper.className = "color-selector";

        const swatch = document.createElement("div");
        swatch.className = "color-swatch";

        input = document.createElement("select");
        input.className = "form-select color-select";
        input.name = field.name;
        input.innerHTML = `<option value="">Select ${field.label}</option>`;

        field.options.forEach(color => {
          const opt = document.createElement("option");
          opt.value = color;
          opt.textContent = color;
          input.appendChild(opt);
        });

        wrapper.appendChild(swatch);
        wrapper.appendChild(input);
        group.append(label, wrapper);
        grid.appendChild(group);
        return;
      }

      input = document.createElement("select");
      input.className = "form-select";
      input.name = field.name;

      input.innerHTML = `<option value="">Select ${field.label}</option>`;
      field.options.forEach(opt => {
        input.innerHTML += `<option value="${opt}">${opt}</option>`;
      });

    } else {
      input = document.createElement("input");
      input.type = "text";
      input.className = "form-input";
      input.name = field.name;
      input.placeholder = field.placeholder || "";
    }

    group.append(label, input);
    grid.appendChild(group);
  });

  dynamicFields.appendChild(grid);
  attachDynamicFieldBlurValidation();
}

function handleFileSelect(e, container, preview) {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    handleFileUpload(file, container, preview);
  }
}

function handleFileUpload(file, container, preview) {
  const reader = new FileReader();

  reader.onload = (e) => {
    preview.src = e.target.result;
    container.classList.add("has-image");
    container.classList.remove("error");

    addDeleteButton(container, preview);
    validateImages(); // re-check count
  };

  reader.readAsDataURL(file);
}
// function show error for address form
function showError(input, message) {
  clearError(input);

  const error = document.createElement("div");
  error.className = "error-text";
  error.innerText = message;

  input.classList.add("input-error");

  // ALWAYS attach error to form-group (not to color-selector)
  const formGroup = input.closest(".form-group");
  if (formGroup) {
    formGroup.appendChild(error);
  }
}


function clearError(input) {
  input.classList.remove("input-error");

  const formGroup = input.closest(".form-group");
  if (!formGroup) return;

  const error = formGroup.querySelector(".error-text");
  if (error) error.remove();
}






// Main upload
const mainUpload = document.getElementById("mainUpload");
const mainFileInput = document.getElementById("mainFileInput");
const mainPreview = document.getElementById("mainPreview");

mainUpload.addEventListener("click", () => mainFileInput.click());
mainFileInput.addEventListener("change", (e) =>
  handleFileSelect(e, mainUpload, mainPreview)
);

mainUpload.addEventListener("dragover", (e) => {
  e.preventDefault();
  mainUpload.style.borderColor = "#16a085";
});

mainUpload.addEventListener("dragleave", () => {
  mainUpload.style.borderColor = "#ddd";
});

mainUpload.addEventListener("drop", (e) => {
  e.preventDefault();
  mainUpload.style.borderColor = "#ddd";
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    handleFileUpload(file, mainUpload, mainPreview);
  }
});

// Sub images upload
document.querySelectorAll(".upload-box").forEach((box) => {
  const input = box.querySelector('input[type="file"]');
  const preview = box.querySelector(".preview-image");

  box.addEventListener("click", () => input.click());
  input.addEventListener("change", (e) => handleFileSelect(e, box, preview));
});

function validateDynamicFields() {
  let valid = true;

  const requiredMarks = dynamicFields.querySelectorAll(".form-label .required");

  requiredMarks.forEach(mark => {
    const formGroup = mark.closest(".form-group");
    const input = formGroup.querySelector("input, select, textarea");

    if (!input || !input.value.trim()) {
      showError(input, "This field is required");
      valid = false;
    }
  });

  return valid;
}
function validateImages() {
  const imageCount = getUploadedImagesCount();
  const errorDiv = document.getElementById("imageError");

  if (imageCount < 4) {
    errorDiv.innerText = "Please upload at least 4 product images";
    errorDiv.style.display = "block";
    return false;
  } else {
    errorDiv.style.display = "none";
    return true;
  }
}
function validateMainImage() {
  const errorDiv = document.getElementById("imageError");

  if (!mainUpload.classList.contains("has-image")) {
    errorDiv.innerText = "Product cover photo is required";
    errorDiv.style.display = "block";

    // 🔴 red border add
    mainUpload.classList.add("error");

    mainUpload.scrollIntoView({ behavior: "smooth", block: "center" });
    return false;
  }

  // ✅ image present → remove red border
  mainUpload.classList.remove("error");
  errorDiv.style.display = "none";
  return true;
}
function attachDynamicFieldBlurValidation() {
  const requiredMarks = dynamicFields.querySelectorAll(".form-label .required");

  requiredMarks.forEach(mark => {
    const formGroup = mark.closest(".form-group");
    const input = formGroup.querySelector("input, select, textarea");

    if (!input) return;

    input.addEventListener("blur", () => {
      if (!input.value.trim()) {
        showError(input, "This field is required");
      } else {
        clearError(input);
      }
    });
  });
}
function DEV_showFieldError(input, message){

 DEV_clearFieldError(input);

 const err = document.createElement("div");
 err.className = "field-error";
 err.innerText = message;

 input.parentElement.appendChild(err);

 input.style.borderColor = "#e53935";

}

function DEV_clearFieldError(input){

 const old = input.parentElement.querySelector(".field-error");
 if(old) old.remove();

 input.style.borderColor = "";

}

function DEV_clearAllErrors(){

 document.querySelectorAll(".field-error")
  .forEach(e => e.remove());

 document.querySelectorAll(".form-input, .form-select, textarea")
  .forEach(inp => inp.style.borderColor="");

}
// function DEV_validateFullForm(){

//  let valid = true;

//  DEV_clearAllErrors();

//  /* PRODUCT NAME */

//  const name = document.getElementById("productName");

//  if(!name.value.trim()){
//   DEV_showFieldError(name,"Product name is required");
//   valid = false;
//  }

//  /* DESCRIPTION */

//  const desc = document.getElementById("productDescription");

//  if(!desc.value.trim()){
//   DEV_showFieldError(desc,"Description is required");
//   valid = false;
//  }

//  /* CATEGORY LEVELS */

//  const levels = [
//   "categoryLevel1",
//   "categoryLevel2",
//   "categoryLevel3",
//   "categoryLevel4"
//  ];

//  levels.forEach(id=>{
//   const el = document.getElementById(id);

//   if(el && !el.value){
//    DEV_showFieldError(el,"Required");
//    valid = false;
//   }
//  });

//  /* MAIN IMAGE */

//  const mainImg = document.getElementById("mainPreview");

//  if(!mainImg || !mainImg.src){
//   alert("Main image required");
//   valid = false;
//  }

//  /* SUB IMAGES */

//  let imgCount = 0;

//  document.querySelectorAll(".upload-box img").forEach(img=>{
//   if(img.src) imgCount++;
//  });

//  if(imgCount < 2){
//   alert("At least 2 gallery images required");
//   valid = false;
//  }

//  /* DYNAMIC FIELDS */

//  document.querySelectorAll("#dynamicFields input, #dynamicFields select")
//   .forEach(inp=>{

//    if(inp.hasAttribute("required") && !inp.value){
//     DEV_showFieldError(inp,"Required");
//     valid = false;
//    }

//  });

//  return valid;

// }
// document.getElementById("DEV_SAVE_BTN")
// .addEventListener("click",()=>{

//  const isValid = DEV_validateFullForm();

//  if(!isValid) return;

//  /* SUCCESS → BACK TO PREVIEW */

//  document.getElementById("DeveloperEditMode").style.display="none";

//  document.querySelector(".DPOProductPreviewLayout")
//   .style.display="grid";

// });



/* ================= CONFIG ================= */

const DEV_CONFIG = {

previewSelector: ".DPOProductPreviewLayout",

editWrapperId: "DeveloperEditMode",

editIconSelector: ".DPOHeaderIcons img",

saveButtonId: "DEV_SAVE_BTN",

};


/* ================= SAFE DOM READY ================= */

document.addEventListener("DOMContentLoaded", () => {
  DEV_initEditSystem();
});


/* ================= MAIN INIT ================= */

function DEV_initEditSystem(){

  const editIcon = document.querySelector(DEV_CONFIG.editIconSelector);

  if(!editIcon){
    console.warn("Edit icon not found");
    return;
  }

  editIcon.addEventListener("click", DEV_enterEditMode);

  DEV_bindSaveButton();

}


/* =====================================================
   EDIT MODE TOGGLE
===================================================== */

function DEV_enterEditMode(){

  DEV_hidePreview();

  DEV_showEdit();

  DEV_prefillStart(); // vendor prefill call trigger wrapper
  DEV_fullPrefill();


}


function DEV_exitEditMode(){

  DEV_hideEdit();

  DEV_showPreview();

}


/* ================= PREVIEW CONTROL ================= */

function DEV_hidePreview(){
  const preview = document.querySelector(DEV_CONFIG.previewSelector);
  if(preview) preview.style.display = "none";
}

function DEV_showPreview(){
  const preview = document.querySelector(DEV_CONFIG.previewSelector);
  if(preview) preview.style.display = "grid";
}


/* ================= EDIT CONTROL ================= */

function DEV_showEdit(){
  const edit = document.getElementById(DEV_CONFIG.editWrapperId);
  if(edit) edit.style.display = "block";
}

function DEV_hideEdit(){
  const edit = document.getElementById(DEV_CONFIG.editWrapperId);
  if(edit) edit.style.display = "none";
}


/* =====================================================
   SAVE BUTTON HANDLER
===================================================== */
function DEV_bindSaveButton(){

  const saveBtn = document.getElementById(DEV_CONFIG.saveButtonId);

  if(!saveBtn) return;

  saveBtn.addEventListener("click", DEV_onSaveClick);

}

function validateFullForm(){

 let valid = true;

 if(!validateMainImage()) valid = false;
 if(!validateImages()) valid = false;
 if(!validateDynamicFields()) valid = false;

 return valid;

}
function getUploadedImagesCount() {
  let count = 0;

  // main image
  if (mainUpload.classList.contains("has-image")) {
    count++;
  }

  // sub images
  document.querySelectorAll(".upload-box").forEach(box => {
    if (box.classList.contains("has-image")) {
      count++;
    }
  });

  return count;
}

function DEV_onSaveClick(){

 if(typeof validateFullForm === "function"){

   const valid = validateFullForm();   // ✅ VENDOR VALIDATION

   if(!valid) return;

 }

 DEV_exitEditMode();

}



/* =====================================================
   PREFILL WRAPPER (CALL VENDOR PREFILL FROM HERE)
===================================================== */

function DEV_prefillStart(){

  if(typeof prefillVendorForm === "function"){
    prefillVendorForm();
  }

}


/* =====================================================
   IMAGE MENU HELPER (FOR 3 DOT MENU)
===================================================== */

function DEV_bindImageMenus(){

  document.querySelectorAll(".dev-image-dot").forEach(dot=>{

    dot.addEventListener("click",(e)=>{

      e.stopPropagation();

      const menu = dot.parentElement.querySelector(".dev-image-menu");

      if(!menu) return;

      menu.style.display =
        menu.style.display === "block" ? "none" : "block";

    });

  });

}


/* =====================================================
   SAFE CATEGORY PREFILL SEQUENCE HELPER
===================================================== */

function DEV_runCategoryPrefill(chain){

  if(!chain || !chain.length) return;

  const lvl1 = document.getElementById("categoryLevel1");
  const lvl2 = document.getElementById("categoryLevel2");
  const lvl3 = document.getElementById("categoryLevel3");
  const lvl4 = document.getElementById("categoryLevel4");

  setTimeout(()=>{
    lvl1.value = chain[0];
    lvl1.dispatchEvent(new Event("change"));
  },200);

  setTimeout(()=>{
    lvl2.value = chain[1];
    lvl2.dispatchEvent(new Event("change"));
  },400);

  setTimeout(()=>{
    lvl3.value = chain[2];
    lvl3.dispatchEvent(new Event("change"));
  },600);

  setTimeout(()=>{
    lvl4.value = chain[3];
    lvl4.dispatchEvent(new Event("change"));
  },800);

}


/* =====================================================
   DYNAMIC FIELD PREFILL HELPER
===================================================== */

// function DEV_prefillDynamicFields(data){

//   if(!data) return;

//   setTimeout(()=>{

//     Object.keys(data).forEach(key=>{

//       const input = document.querySelector(`[name="${key}"]`);

//       if(input) input.value = data[key];

//     });

//   },1200);

// }


/* =====================================================
   IMAGE PREFILL HELPER
===================================================== */

// function DEV_prefillImages(mainImage, subImages){

//   if(mainImage){
//     const mainPreview = document.getElementById("mainPreview");
// if(img){
//  img.src = subImages[i];
//  img.style.display = "block";

//  box.classList.add("has-image");   // ⭐ ADD THIS
// }
//   }

//   if(subImages && subImages.length){
//     document.querySelectorAll(".upload-box").forEach((box,i)=>{

//       if(!subImages[i]) return;

//       const img = box.querySelector(".preview-image");
//       if(img){
//         img.src = subImages[i];
//         img.style.display = "block";
//       }

//     });
//   }

// }


/* =====================================================
   VARIANT PREFILL HELPER
===================================================== */

function DEV_prefillVariants(variants){

  if(!variants || !variants.length) return;

  variants.forEach(v=>{

    if(typeof createVariant === "function"){
      createVariant();
    }

  });

}


/* =====================================================
   GLOBAL SAFE EXPORT
===================================================== */

window.DEV_enterEditMode = DEV_enterEditMode;
window.DEV_exitEditMode = DEV_exitEditMode;

