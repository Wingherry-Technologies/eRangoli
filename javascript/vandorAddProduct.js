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
const categoryFields = {
  Footwear: [
    {
      name: "sellingPrice",
      label: "Selling Price",
      type: "text",
      placeholder: "₹ 1299",
      col: 1,
      required: true,
    },
    {
      name: "heelHeight",
      label: "Heel Height",
      type: "select",
      options: ["2inch (Regular)", "3inch", "4inch"],
      col: 2,
      required: true,
    },
    {
      name: "ornamentation",
      label: "Ornamentation",
      type: "select",
      options: ["Embroidered", "Plain", "Printed"],
      col: 1,
    },
    {
      name: "material",
      label: "Material",
      type: "select",
      options: ["Canvas", "Leather", "Synthetic"],
      col: 2,
    },
    {
      name: "toeShape",
      label: "Toe Shape",
      type: "select",
      options: ["Round Toe", "Pointed Toe", "Square Toe"],
      col: 1,
    },
    {
      name: "occasion",
      label: "Occasion",
      type: "select",
      options: ["Party", "Casual", "Formal", "Wedding"],
      col: 2,
    },
    {
  name: "colorsAvailable",
  label: "Colours Available",
  type: "select",
  options: [
  "Red",
  "Blue", 
  "Green", 
  "Black",
  "White", 
  "Maroon"  
],

  col: 1,
  required: true,
},
{
  name: "size",
  label: "Size",
  type: "select",
  options: ["S", "M", "L", "XL", "XXL"],
  col: 2,
  required: true,
},
{
  name: "totalQuantity",
  label: "Total Quantity",
  type: "text",
  placeholder: "120",
  col: 1,
  required: true,
},
{
  name: "brand",
  label: "Brand",
  type: "text",
  placeholder: "Handloom India",
  col: 2,
  required: true,
},

    {
      name: "applicableReturn",
      label: "Applicable to Return",
      type: "select",
      options: ["Yes", "No"],
      col: 1,
      required: true,
    },
    {
      name: "refundProcess",
      label: "Refund process in days",
      type: "select",
      options: ["within 7days", "within 14days", "within 30days"],
      col: 2,
      required: true,
    },
    {
      name: "availablePickup",
      label: "Available to pick up",
      type: "select",
      options: ["Immediately", "Within 1 day", "Within 2 days"],
      col: 1,
      required: true,
    },
    {
      name: "regionalTag",
      label: "Regional Tag",
      type: "select",
      options: ["Rajasthan", "Maharashtra", "Gujarat"],
      col: 2,
    },
    {
      name: "personalizedOrders",
      label: "Do you take personalized orders",
      type: "select",
      options: ["Yes", "No"],
      col: 1,
      required: true,
    },
    {
      name: "careInformation",
      label: "Care Information",
      type: "select",
      options: ["Wipe with dry cloth", "Hand wash", "Dry clean only"],
      col: 2,
      required: true,
    },
  ],
  Jewellery: [
    {
      name: "sellingPrice",
      label: "Selling Price",
      type: "text",
      placeholder: "₹7,299",
      col: 1,
      required: true,
    },
    {
      name: "design",
      label: "Design",
      type: "select",
      options: ["Antique", "Modern", "Traditional"],
      col: 2,
    },
    {
      name: "metal",
      label: "Metal",
      type: "select",
      options: ["Bronze", "Gold", "Silver"],
      col: 1,
    },
    {
      name: "polish",
      label: "Polish",
      type: "select",
      options: ["Gold", "Silver", "Rose Gold"],
      col: 2,
    },
    {
      name: "stone",
      label: "Stone",
      type: "select",
      options: ["Zircon AD", "Ruby", "Emerald"],
      col: 1,
    },
    {
      name: "occasion",
      label: "Occasion",
      type: "select",
      options: ["Wedding", "Party", "Casual"],
      col: 2,
    },

    {
  name: "colorsAvailable",
  label: "Colours Available",
  type: "select",
    options: [
  "Red",
  "Blue", 
  "Green", 
  "Black",
  "White", 
  "Maroon"  
],
  col: 1,
  required: true,
},
{
  name: "size",
  label: "Size",
  type: "select",
  options: ["S", "M", "L", "XL", "XXL"],
  col: 2,
  required: true,
},
{
  name: "totalQuantity",
  label: "Total Quantity",
  type: "text",
  placeholder: "120",
  col: 1,
  required: true,
},
{
  name: "brand",
  label: "Brand",
  type: "text",
  placeholder: "Handloom India",
  col: 2,
  required: true,
},
    {
      name: "applicableReturn",
      label: "Applicable to Return",
      type: "select",
      options: ["Yes", "No"],
      col: 1,
      required: true,
    },
    {
      name: "refundProcess",
      label: "Refund process in days",
      type: "select",
      options: ["within 7days", "within 14days"],
      col: 2,
      required: true,
    },
    {
      name: "availablePickup",
      label: "Available to pick up",
      type: "select",
      options: ["Immediately", "Within 1 day"],
      col: 1,
      required: true,
    },
    {
      name: "regionalTag",
      label: "Regional Tag",
      type: "select",
      options: ["Rajasthan", "Maharashtra", "Gujarat"],
      col: 2,
    },
    {
      name: "personalizedOrders",
      label: "Do you take personalized orders",
      type: "select",
      options: ["No", "Yes"],
      col: 1,
      required: true,
    },
  ],
  Saree: [
    {
      name: "sellingPrice",
      label: "Selling Price",
      type: "text",
      placeholder: "₹4,699",
      col: 1,
      required: true,
    },
    {
      name: "occasion",
      label: "Occasion",
      type: "select",
      options: ["Festive", "Wedding", "Party", "Casual"],
      col: 2,
    },
    {
      name: "sareeFabric",
      label: "Saree Fabric",
      type: "select",
      options: ["Pure silk", "Cotton", "Georgette"],
      col: 1,
    },
    {
      name: "blouseFabric",
      label: "Blouse Fabric",
      type: "select",
      options: ["Pure silk", "Cotton", "Georgette"],
      col: 2,
    },
    {
      name: "sareePrint",
      label: "Saree Print",
      type: "select",
      options: ["Peacock", "Floral", "Geometric"],
      col: 1,
    },
    {
      name: "sareeWork",
      label: "Saree Work",
      type: "select",
      options: ["Zari work", "Embroidery", "Plain"],
      col: 2,
    },

      {
  name: "colorsAvailable",
  label: "Colours Available",
  type: "select",
    options: [
  "Red",
  "Blue", 
  "Green", 
  "Black",
  "White", 
  "Maroon"  
],
  col: 1,
  required: true,
},
{
  name: "size",
  label: "Size",
  type: "select",
  options: ["S", "M", "L", "XL", "XXL"],
  col: 2,
  required: true,
},
{
  name: "totalQuantity",
  label: "Total Quantity",
  type: "text",
  placeholder: "120",
  col: 1,
  required: true,
},
{
  name: "brand",
  label: "Brand",
  type: "text",
  placeholder: "Handloom India",
  col: 2,
  required: true,
},

    {
      name: "applicableReturn",
      label: "Applicable to Return",
      type: "select",
      options: ["Yes", "No"],
      col: 1,
      required: true,
    },
    {
      name: "refundProcess",
      label: "Refund process in days",
      type: "select",
      options: ["within 7days", "within 14days"],
      col: 2,
      required: true,
    },
    {
      name: "availablePickup",
      label: "Available to pick up",
      type: "select",
      options: ["Immediately", "Within 1 day"],
      col: 1,
      required: true,
    },
    {
      name: "regionalTag",
      label: "Regional Tag",
      type: "select",
      options: ["Maharashtra", "Rajasthan", "Gujarat"],
      col: 2,
    },
    {
      name: "personalizedOrders",
      label: "Do you take personalized orders",
      type: "select",
      options: ["No", "Yes"],
      col: 1,
      required: true,
    },
    {
      name: "careInformation",
      label: "Care Information",
      type: "select",
      options: ["Dry clean only", "Hand wash", "Machine wash"],
      col: 2,
      required: true,
    },
  ],
  Art: [
    {
      name: "subSubCategory",
      label: "Sub Sub Category",
      type: "select",
      options: ["Kalamkari Painting", "Madhubani", "Warli"],
      col: 2,
      required: true,
    },
    {
      name: "sellingPrice",
      label: "Selling Price",
      type: "text",
      placeholder: "₹ 1299",
      col: 1,
      required: true,
    },
    {
      name: "frame",
      label: "Frame",
      type: "select",
      options: ["With frame", "Without frame"],
      col: 1,
      required: true,
    },
    {
      name: "frameColor",
      label: "Frame colour",
      type: "select",
      options: ["Black", "White", "Brown"],
      col: 2,
      required: true,
    },
    {
      name: "weight",
      label: "Weight",
      type: "select",
      options: ["2.2kg", "1.5kg", "3kg"],
      col: 1,
      required: true,
    },
    {
      name: "material",
      label: "Material",
      type: "select",
      options: ["Canvas", "Paper", "Wood"],
      col: 1,
      required: true,
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: ["Oil Painting", "Watercolor", "Acrylic"],
      col: 2,
      required: true,
    },
    {
  name: "colorsAvailable",
  label: "Colours Available",
  type: "select",
    options: [
  "Red",
  "Blue", 
  "Green", 
  "Black",
  "White", 
  "Maroon"  
],
  col: 1,
  required: true,
},
{
  name: "size",
  label: "Size",
  type: "select",
  options: ["S", "M", "L", "XL", "XXL"],
  col: 2,
  required: true,
},
{
  name: "totalQuantity",
  label: "Total Quantity",
  type: "text",
  placeholder: "120",
  col: 1,
  required: true,
},
{
  name: "brand",
  label: "Brand",
  type: "text",
  placeholder: "Handloom India",
  col: 2,
  required: true,
},

    {
      name: "applicableReturn",
      label: "Applicable to Return",
      type: "select",
      options: ["No", "Yes"],
      col: 1,
      required: true,
    },
    {
      name: "refundProcess",
      label: "Refund process in days",
      type: "select",
      options: ["NA", "within 7days"],
      col: 2,
      required: true,
    },
    {
      name: "availablePickup",
      label: "Available to pick up",
      type: "select",
      options: ["Immediately", "Within 1 day"],
      col: 1,
      required: true,
    },
    {
      name: "regionalTag",
      label: "Regional Tag",
      type: "select",
      options: ["Rajasthan", "Maharashtra", "Gujarat"],
      col: 2,
      required: true,
    },
    {
      name: "personalizedOrders",
      label: "Do you take personalized orders",
      type: "select",
      options: ["Yes", "No"],
      col: 1,
      required: true,
    },
    {
      name: "careInformation",
      label: "Care Information",
      type: "select",
      options: ["Dust with dry cloth", "Avoid direct sunlight"],
      col: 2,
      required: true,
    },
  ],
  DressMaterial: [
    {
      name: "sellingPrice",
      label: "Selling Price",
      type: "text",
      placeholder: "₹3,459",
      col: 1,
      required: true,
    },
    {
      name: "occasion",
      label: "Occasion",
      type: "select",
      options: ["Casual", "Festive", "Party"],
      col: 2,
    },
    {
      name: "topFabric",
      label: "Top /Bottom Fabric",
      type: "select",
      options: ["Pure silk", "Cotton", "Georgette"],
      col: 1,
    },
    {
      name: "dupattaFabric",
      label: "Dupatta Fabric",
      type: "select",
      options: ["Crepe", "Chiffon", "Georgette"],
      col: 2,
    },
    {
      name: "materialPrint",
      label: "Material  Print",
      type: "select",
      options: ["Floral", "Geometric", "Abstract"],
      col: 1,
    },
    {
      name: "materialWork",
      label: "Material Work",
      type: "select",
      options: ["Gottapatti", "Embroidery", "Plain"],
      col: 2,
    },
    {
  name: "colorsAvailable",
  label: "Colours Available",
  type: "select",
   options: [
  "Red",
  "Blue", 
  "Green", 
  "Black",
  "White", 
  "Maroon"  
],
  col: 1,
  required: true,
},
{
  name: "size",
  label: "Size",
  type: "select",
  options: ["S", "M", "L", "XL", "XXL"],
  col: 2,
  required: true,
},
{
  name: "totalQuantity",
  label: "Total Quantity",
  type: "text",
  placeholder: "120",
  col: 1,
  required: true,
},
{
  name: "brand",
  label: "Brand",
  type: "text",
  placeholder: "Handloom India",
  col: 2,
  required: true,
},

    {
      name: "applicableReturn",
      label: "Applicable to Return",
      type: "select",
      options: ["Yes", "No"],
      col: 1,
      required: true,
    },
    {
      name: "refundProcess",
      label: "Refund process in days",
      type: "select",
      options: ["within 7days", "within 14days"],
      col: 2,
      required: true,
    },
    {
      name: "availablePickup",
      label: "Available to pick up",
      type: "select",
      options: ["Immediately", "Within 1 day"],
      col: 1,
      required: true,
    },
    {
      name: "regionalTag",
      label: "Regional Tag",
      type: "select",
      options: ["Maharashtra", "Rajasthan", "Gujarat"],
      col: 2,
    },
    {
      name: "personalizedOrders",
      label: "Do you take personalized orders",
      type: "select",
      options: ["No", "Yes"],
      col: 1,
      required: true,
    },
    {
      name: "careInformation",
      label: "Care Information",
      type: "select",
      options: ["Hand wash", "Dry clean only", "Machine wash"],
      col: 2,
      required: true,
    },
  ],
  Dresses: [
    {
      name: "sellingPrice",
      label: "Selling Price",
      type: "text",
      placeholder: "₹3,459",
      col: 1,
      required: true,
    },
    {
      name: "occasion",
      label: "Occasion",
      type: "select",
      options: ["Casual", "Party", "Formal"],
      col: 2,
    },
    {
      name: "topFabric",
      label: "Top /Bottom Fabric",
      type: "select",
      options: ["Semi Crepe", "Cotton", "Silk"],
      col: 1,
    },
    {
      name: "dupattaFabric",
      label: "Dupatta Fabric",
      type: "select",
      options: ["Semi Crepe", "Chiffon", "Georgette"],
      col: 2,
    },
    {
      name: "materialPrint",
      label: "Material  Print",
      type: "select",
      options: ["Floral", "Geometric", "Abstract"],
      col: 1,
    },
    {
      name: "materialWork",
      label: "Material Work",
      type: "select",
      options: ["Threadwork", "Embroidery", "Plain"],
      col: 2,
    },
    {
      name: "sleevesLength",
      label: "Sleeves Length",
      type: "select",
      options: ["Three fourth Sleeves", "Full Sleeves", "Half Sleeves"],
      col: 1,
    },
    {
      name: "partsLength",
      label: "Pants Length",
      type: "select",
      options: ["Knee length", "Full length", "Ankle length"],
      col: 2,
    },
    {
      name: "neckPattern",
      label: "Neck Pattern",
      type: "select",
      options: ["Round", "V-neck", "Square"],
      col: 1,
    },
    {
      name: "bottomStyle",
      label: "Bottom Style",
      type: "select",
      options: ["Straight pants", "Palazzo", "Churidar"],
      col: 2,
    },
    {
  name: "colorsAvailable",
  label: "Colours Available",
  type: "select",
    options: [
  "Red",
  "Blue", 
  "Green", 
  "Black",
  "White", 
  "Maroon"  
],
  col: 1,
  required: true,
},
{
  name: "size",
  label: "Size",
  type: "select",
  options: ["S", "M", "L", "XL", "XXL"],
  col: 2,
  required: true,
},
{
  name: "totalQuantity",
  label: "Total Quantity",
  type: "text",
  placeholder: "120",
  col: 1,
  required: true,
},
{
  name: "brand",
  label: "Brand",
  type: "text",
  placeholder: "Handloom India",
  col: 2,
  required: true,
},

    {
      name: "applicableReturn",
      label: "Applicable to Return",
      type: "select",
      options: ["Yes", "No"],
      col: 1,
      required: true,
    },
    {
      name: "refundProcess",
      label: "Refund process in days",
      type: "select",
      options: ["within 7days", "within 14days"],
      col: 2,
      required: true,
    },
    {
      name: "availablePickup",
      label: "Available to pick up",
      type: "select",
      options: ["Immediately", "Within 1 day"],
      col: 1,
      required: true,
    },
    {
      name: "regionalTag",
      label: "Regional Tag",
      type: "select",
      options: ["Maharashtra", "Rajasthan", "Gujarat"],
      col: 2,
    },
    {
      name: "personalizedOrders",
      label: "Do you take personalized orders",
      type: "select",
      options: ["No", "Yes"],
      col: 1,
      required: true,
    },
    {
      name: "careInformation",
      label: "Care Information",
      type: "select",
      options: ["Hand wash", "Dry clean only", "Machine wash"],
      col: 2,
      required: true,
    },
  ],
};
const level4FieldMap = {
  /* WOMEN → SAREES */
  "Handwoven Pattu Silk Sarees": [
    fieldSellingPrice(),
    fieldFabric(["Pure Silk"]),
    fieldOccasion(),
    fieldColor(),
    fieldLength(["5.5m", "6.3m"]),
    fieldBlousePiece(),
    fieldQuantity(),
    fieldBrand(),
    fieldReturn(),
    fieldCare(["Dry clean only"])
  ],

  "Handloom Banarasi Sarees": [
    fieldSellingPrice(),
    fieldFabric(["Silk Blend", "Pure Silk"]),
    fieldWeave(["Banarasi"]),
    fieldColor(),
    fieldQuantity(),
    fieldReturn(),
    fieldCare(["Dry clean only"])
  ],

  /* MEN → KURTA SETS */
  "Cotton Kurta Sets": [
    fieldSellingPrice(),
    fieldFabric(["Cotton"]),
    fieldSleeve(),
    fieldFit(),
    fieldColor(),
    fieldSize(),
    fieldQuantity(),
    fieldReturn()
  ],

  "Wedding Kurta Sets": [
    fieldSellingPrice(),
    fieldFabric(["Silk", "Brocade"]),
    fieldOccasion(["Wedding"]),
    fieldColor(),
    fieldSize(),
    fieldQuantity(),
    fieldReturn()
  ],

  /* KIDS → ROMPERS */
  "Cotton Rompers": [
    fieldSellingPrice(),
    fieldFabric(["Cotton"]),
    fieldAgeGroup(),
    fieldColor(),
    fieldQuantity(),
    fieldCare(["Hand wash"])
  ],

  /* FURNITURE → BEDS */
  "King Size Beds": [
    fieldSellingPrice(),
    fieldMaterial(["Wood", "Engineered Wood"]),
    fieldDimensions(),
    fieldFinish(),
    fieldWeightCapacity(),
    fieldReturn()
  ],

  /* ARTS */
  "Abstract Art": [
    fieldSellingPrice(),
    fieldMedium(["Acrylic"]),
    fieldDimensions(),
    fieldFrame(),
    fieldCare(["Avoid direct sunlight"])
  ]
};

const categoryHierarchy = {
  Women: {
    Clothing: {
      Sarees: [
        "Handwoven Pattu Silk Sarees",
        "Handloom Kanchipuram Sarees",
        "Handloom Banarasi Sarees",
        "Handwoven Cotton Sarees",
        "Linen Handloom Sarees",
        "Chanderi Handloom Sarees",
        "Tussar Handloom Sarees",
        "Hand Block Printed Sarees"
      ],
      Dresses: [],
      "Dress Materials": [],
      "Kurtis & Kurtas": [],
      "Ethnic Sets": []
    },
    Handlooms: {},
    Footwear: {},
    Jewellery: {},
    Accessories: {}
  },

  Men: {
    Clothing: {},
    "Ethnic Wear": {
      "Kurta Sets": [
        "Cotton Kurta Sets",
        "Silk Kurta Sets",
        "Festive Kurta Sets",
        "Wedding Kurta Sets"
      ],
      Sherwanis: [],
      "Dhoti & Veshti": [],
      "Nehru Jackets": []
    },
    Footwear: {},
    Accessories: {},
    Grooming: {}
  },

  Kids: {
    "Boys Clothing": {},
    "Girls Clothing": {},
    "Baby Wear": {
      Rompers: [
        "Cotton Rompers",
        "Organic Rompers",
        "Printed Rompers"
      ],
      Bodysuits: [],
      Sleepwear: [],
      "Winter Wear": []
    },
    Footwear: {},
    "Toys & Games": {},
    "School Essentials": {}
  },

  Furniture: {
    "Living Room Furniture": {},
    "Bedroom Furniture": {
      Beds: [
        "Wooden Beds",
        "Upholstered Beds",
        "Storage Beds",
        "King Size Beds",
        "Queen Size Beds"
      ],
      Wardrobes: [],
      "Side Tables": [],
      "Dressing Tables": []
    },
    "Dining Furniture": {},
    "Office Furniture": {},
    "Outdoor Furniture": {},
    "Storage Furniture": {}
  },

  Arts: {
    Paintings: {
      "Acrylic Paintings": [
        "Abstract Art",
        "Contemporary Art",
        "Traditional Art",
        "Nature & Landscape"
      ],
      "Oil Paintings": [],
      "Watercolor Paintings": [],
      "Mixed Media": []
    },
    Sculptures: {},
    "Wall Art": {},
    Collectibles: {},
    "Digital Art": {}
  },

  Crafts: {
    Decor: {},
    Jewellery: {},
    "Pottery & Clay": {},
    "Wood Crafts": {},
    "Metal Crafts": {},
    "Textile Crafts": {
      "Handwoven Items": [
        "Table Runners",
        "Cushion Covers",
        "Wall Hangings"
      ],
      "Embroidered Items": [],
      "Patchwork Items": []
    }
  },

  "Home & Living": {
    "Home Decor": {
      "Wall Decor": [
        "Wooden Wall Decor",
        "Metal Wall Decor",
        "Fabric Wall Decor"
      ],
      Vases: [],
      Clocks: []
    },
    Lighting: {},
    "Kitchen & Dining": {},
    "Bedding & Furnishings": {}
  }
};
const level4ToBaseCategoryMap = {
  /* WOMEN → SAREES */
  "Handwoven Pattu Silk Sarees": "Saree",
  "Handloom Kanchipuram Sarees": "Saree",
  "Handloom Banarasi Sarees": "Saree",
  "Handwoven Cotton Sarees": "Saree",
  "Linen Handloom Sarees": "Saree",
  "Chanderi Handloom Sarees": "Saree",
  "Tussar Handloom Sarees": "Saree",
  "Hand Block Printed Sarees": "Saree",

  /* MEN → KURTA SETS */
  "Cotton Kurta Sets": "Dresses",
  "Silk Kurta Sets": "Dresses",
  "Festive Kurta Sets": "Dresses",
  "Wedding Kurta Sets": "Dresses",

  /* KIDS → ROMPERS */
  "Cotton Rompers": "Dresses",
  "Organic Rompers": "Dresses",
  "Printed Rompers": "Dresses",

  /* FURNITURE → BEDS */
  "Wooden Beds": "Furniture",
  "Upholstered Beds": "Furniture",
  "Storage Beds": "Furniture",
  "King Size Beds": "Furniture",
  "Queen Size Beds": "Furniture",

  /* ARTS */
  "Abstract Art": "Art",
  "Contemporary Art": "Art",
  "Traditional Art": "Art",
  "Nature & Landscape": "Art",

  /* HOME DECOR */
  "Wooden Wall Decor": "Art",
  "Metal Wall Decor": "Art",
  "Fabric Wall Decor": "Art"
};

const level1 = document.getElementById("categoryLevel1");
const level2 = document.getElementById("categoryLevel2");
const level3 = document.getElementById("categoryLevel3");
const level4 = document.getElementById("categoryLevel4");

/* Populate Level 1 */
Object.keys(categoryHierarchy).forEach(cat => {
  level1.appendChild(new Option(cat, cat));
});

/* LEVEL 1 → LEVEL 2 */
level1.addEventListener("change", () => {
  resetSelect(level2);
  resetSelect(level3);
  resetSelect(level4);

  if (!level1.value) return;

  Object.keys(categoryHierarchy[level1.value]).forEach(cat => {
    level2.appendChild(new Option(cat, cat));
  });

  level2.disabled = false;
});

/* LEVEL 2 → LEVEL 3 */
level2.addEventListener("change", () => {
  resetSelect(level3);
  resetSelect(level4);

  const data = categoryHierarchy[level1.value][level2.value];
  if (!data) return;

  Object.keys(data).forEach(cat => {
    level3.appendChild(new Option(cat, cat));
  });

  level3.disabled = false;
});

/* LEVEL 3 → LEVEL 4 */
level3.addEventListener("change", () => {
  resetSelect(level4);

  const list =
    categoryHierarchy[level1.value][level2.value][level3.value];

  if (!list || !list.length) return;

  list.forEach(item => {
    level4.appendChild(new Option(item, item));
  });

  level4.disabled = false;
});

function resetSelect(select) {
  select.innerHTML = `<option value="">Select</option>`;
  select.disabled = true;
}
function fieldSellingPrice() {
  return {
    name: "sellingPrice",
    label: "Selling Price",
    type: "text",
    placeholder: "₹ 1299",
    required: true
  };
}

function fieldFabric(options) {
  return {
    name: "fabric",
    label: "Fabric",
    type: "select",
    options,
    required: true
  };
}

function fieldOccasion(options = ["Casual", "Festive", "Wedding", "Party"]) {
  return {
    name: "occasion",
    label: "Occasion",
    type: "select",
    options
  };
}

function fieldColor() {
  return {
    name: "colorsAvailable",
    label: "Colours Available",
    type: "color"
  };
}

function fieldSize() {
  return {
    name: "size",
    label: "Size",
    type: "select",
    options: ["S", "M", "L", "XL", "XXL"]
  };
}

function fieldQuantity() {
  return {
    name: "totalQuantity",
    label: "Total Quantity",
    type: "text",
    placeholder: "100",
    required: true
  };
}

function fieldBrand() {
  return {
    name: "brand",
    label: "Brand",
    type: "text",
    placeholder: "Handloom India"
  };
}

function fieldReturn() {
  return {
    name: "applicableReturn",
    label: "Applicable to Return",
    type: "select",
    options: ["Yes", "No"],
    required: true
  };
}

function fieldCare(options) {
  return {
    name: "careInformation",
    label: "Care Information",
    type: "select",
    options
  };
}

/* Furniture / Art helpers */
function fieldDimensions() {
  return {
    name: "dimensions",
    label: "Dimensions",
    type: "text",
    placeholder: "L x W x H (cm)"
  };
}

function fieldMaterial(options) {
  return {
    name: "material",
    label: "Material",
    type: "select",
    options
  };
}

function fieldFrame() {
  return {
    name: "frame",
    label: "Frame",
    type: "select",
    options: ["With Frame", "Without Frame"]
  };
}
function fieldLength(options) {
  return {
    name: "length",
    label: "Length",
    type: "select",
    options
  };
}

function fieldBlousePiece() {
  return {
    name: "blousePiece",
    label: "Blouse Piece Included",
    type: "select",
    options: ["Yes", "No"]
  };
}

function fieldWeave(options) {
  return {
    name: "weave",
    label: "Weave",
    type: "select",
    options
  };
}

function fieldSleeve() {
  return {
    name: "sleeve",
    label: "Sleeve Type",
    type: "select",
    options: ["Full Sleeve", "Half Sleeve", "Sleeveless"]
  };
}

function fieldFit() {
  return {
    name: "fit",
    label: "Fit",
    type: "select",
    options: ["Regular", "Slim", "Relaxed"]
  };
}

function fieldAgeGroup() {
  return {
    name: "ageGroup",
    label: "Age Group",
    type: "select",
    options: ["0-6 Months", "6-12 Months", "1-2 Years"]
  };
}

function fieldFinish() {
  return {
    name: "finish",
    label: "Finish",
    type: "select",
    options: ["Matte", "Glossy", "Natural"]
  };
}

function fieldWeightCapacity() {
  return {
    name: "weightCapacity",
    label: "Weight Capacity",
    type: "text",
    placeholder: "In Kg"
  };
}

function fieldMedium(options) {
  return {
    name: "medium",
    label: "Medium",
    type: "select",
    options
  };
}

const level4Select = document.getElementById("categoryLevel4");
const dynamicFields = document.getElementById("dynamicFields");

level4Select.addEventListener("change", () => {
  dynamicFields.innerHTML = "";

  const level4Value = level4Select.value;
  const baseCategory = level4ToBaseCategoryMap[level4Value];

  // 🔒 No mapping → no dynamic fields
  if (!baseCategory || !categoryFields[baseCategory]) return;

  const grid = document.createElement("div");
  grid.className = "form-grid";
  grid.style.marginTop = "16px";

  categoryFields[baseCategory].forEach(field => {
    const group = document.createElement("div");
    group.className = "form-group";

    const label = document.createElement("label");
    label.className = "form-label";
    label.innerHTML =
      field.label +
      (field.required ? ' <span class="required">*</span>' : "");

    let input;

    // 🎨 COLOR FIELD
    if (field.name === "colorsAvailable") {
      const wrapper = document.createElement("div");
      wrapper.className = "color-selector";

      const swatch = document.createElement("div");
      swatch.className = "color-swatch";

      input = document.createElement("select");
      input.className = "form-select color-select";
      input.innerHTML = `<option value="">Select ${field.label}</option>`;

      field.options.forEach(opt => {
        input.appendChild(new Option(opt, opt));
      });

      wrapper.appendChild(swatch);
      wrapper.appendChild(input);
      group.append(label, wrapper);
    }

    // 🔽 SELECT
    else if (field.type === "select") {
      input = document.createElement("select");
      input.className = "form-select";
      input.innerHTML = `<option value="">Select ${field.label}</option>`;

      field.options.forEach(opt => {
        input.appendChild(new Option(opt, opt));
      });

      group.append(label, input);
    }

    // ✏️ TEXT
    else {
      input = document.createElement("input");
      input.type = "text";
      input.className = "form-input";
      input.placeholder = field.placeholder || "";
      group.append(label, input);
    }

    grid.appendChild(group);
  });

  dynamicFields.appendChild(grid);
  attachDynamicFieldBlurValidation();
});



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

// Variant uploads
document.addEventListener("click", (e) => {
  if (e.target.closest(".variant-upload")) {
    const box = e.target.closest(".variant-upload");
    const input = box.querySelector('input[type="file"]');
    input.click();
  }
});

document.addEventListener("change", (e) => {
  if (e.target.type === "file" && e.target.closest(".variant-upload")) {
    const box = e.target.closest(".variant-upload");
    const preview = box.querySelector(".preview-image");
    handleFileSelect(e, box, preview);
  }
});

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
  };
  reader.readAsDataURL(file);
}

// Product name - no leading spaces
const productName = document.getElementById("productName");
productName.addEventListener("input", (e) => {
  if (e.target.value.startsWith(" ")) {
    e.target.value = e.target.value.trimStart();
  }
});

// Product description - no leading spaces + char counter
const productDescription = document.getElementById("productDescription");
const charCount = document.getElementById("charCount");

productDescription.addEventListener("input", (e) => {
  if (e.target.value.startsWith(" ")) {
    e.target.value = e.target.value.trimStart();
  }
  charCount.textContent = e.target.value.length;
});

// Category change
// const categorySelect = document.getElementById("category");
// const subCategorySelect = document.getElementById("subCategory");
// const dynamicFields = document.getElementById("dynamicFields");

// categorySelect.addEventListener("change", (e) => {
//   const category = e.target.value;

//   // Update sub categories
//   subCategorySelect.innerHTML = '<option value="">Select Sub Category</option>';
//   if (category && subCategories[category]) {
//     subCategories[category].forEach((sub) => {
//       const option = document.createElement("option");
//       option.value = sub;
//       option.textContent = sub;
//       subCategorySelect.appendChild(option);
//     });
//   }

//   // Update dynamic fields
//   dynamicFields.innerHTML = "";
//   if (category && categoryFields[category]) {
//     const gridDiv = document.createElement("div");
//     gridDiv.className = "form-grid";
//     gridDiv.style.marginTop = "16px";

//     categoryFields[category].forEach((field) => {
//       const formGroup = document.createElement("div");
//       formGroup.className = "form-group";
//       if (field.col === "full") {
//         formGroup.classList.add("full-width");
//       }

//       const label = document.createElement("label");
//       label.className = "form-label";
//       label.innerHTML =
//         field.label +
//         (field.required ? ' <span class="required">*</span>' : "");

//       let input;
//       if (field.type === "select") {

//         if (field.name === "colorsAvailable") {

//     const wrapper = document.createElement("div");
//     wrapper.className = "color-selector";

//     const swatch = document.createElement("div");
//     swatch.className = "color-swatch";

//     input = document.createElement("select");
//     input.className = "form-select color-select";

//     const opt = document.createElement("option");
//     opt.value = "";
//     opt.textContent = "Select " + field.label;
//     input.appendChild(opt);

//     field.options.forEach((optVal) => {
//       const option = document.createElement("option");
//       option.value = optVal;
//       option.textContent = optVal;
//       input.appendChild(option);
//     });

//     wrapper.appendChild(swatch);
//     wrapper.appendChild(input);

//     formGroup.appendChild(label);
//     formGroup.appendChild(wrapper);
//     gridDiv.appendChild(formGroup);
//     return; // important
//   }
//         input = document.createElement("select");
//         input.className = "form-select";
//         input.innerHTML =
//           '<option value="">Select ' + field.label + "</option>";
//         field.options.forEach((opt) => {
//           const option = document.createElement("option");
//           option.value = opt;
//           option.textContent = opt;
//           input.appendChild(option);
//         });
//       } else {
//         input = document.createElement("input");
//         input.type = "text";
//         input.className = "form-input";
//         input.placeholder = field.placeholder || "";

//         if (field.name === "sellingPrice") {
//           input.addEventListener("input", (e) => {
//             e.target.value = e.target.value.replace(/[^0-9]/g, "").trimStart();
//           });
//         }

//         if (field.name === "totalQuantity") {
//   input.classList.add("quantity-input");
// }

// if (field.name === "brand") {
//   input.addEventListener("input", (e) => {
//     e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
//   });
// }

        
//       }

//       formGroup.appendChild(label);
//       formGroup.appendChild(input);
//       gridDiv.appendChild(formGroup);
//     });

//     dynamicFields.appendChild(gridDiv);
//     attachDynamicFieldBlurValidation();
//   }
// });

// Quantity input - only numbers
document.addEventListener("input", (e) => {
  if (e.target.classList.contains("quantity-input")) {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  }
});

// Variants
let variantCount = 1;

document.getElementById("addVariantBtn").addEventListener("click", () => {
  variantCount++;
  const container = document.getElementById("variantsContainer");
  const newVariant = createVariant(variantCount);
  container.appendChild(newVariant);
});

function createVariant(number) {
  const div = document.createElement("div");
  div.className = "variant-container";
  div.dataset.variant = number;
  div.innerHTML = `
                <div class="variant-header">
                    <h3 class="variant-title">Variant ${number}</h3>
                    <div class="variant-actions">
                        <button class="icon-btn edit-variant">
                            <img src="../assets/vendorAddProduct/PencilSimple.svg" alt="Edit">
                        </button>
                        <button class="icon-btn delete-variant">
                        <img src="../assets/vendorAddProduct/Trash.svg" alt="">
                        </button>
                    </div>
                </div>
                
                <div class="variant-body">
                    <div class="form-group">
                        <label class="form-label">Product Image</label>
                        <div class="variant-upload-grid">
                            ${Array(6)
                              .fill(0)
                              .map(
                                (_, i) => `
                                <div class="upload-box variant-upload" data-variant-upload="${i}">
                                <img class="upload-box-icon" src="../assets/vendorAddProduct/UploadSimple.svg" alt="">
                                <span class="upload-box-text">Upload</span>
                                <img class="preview-image" alt="Preview">
                                <input type="file" accept="image/*">
                            </div>
                        `
                              )
                              .join("")}
                    </div>
                </div>

                <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Colours Available</label>
                            <div class="color-selector">
                                <div class="color-swatch"></div>
                                <select class="form-select color-select" >
                                    <option value="" selected disabled>Select color</option>
                                    <option value="#9b8bc9">Lavender</option>
                                    <option value="#ff0000">Red</option>
                                    <option value="#0000ff">Blue</option>
                                    <option value="#008000">Green</option>
                                    <option value="#ffa500">Orange</option>
                                    <option value="#ff00ff">Fuchsia</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Sizes</label>
                            <select class="form-select variant-size-select">
                                <option>S</option>
                                <option>M</option>
                                <option>L</option>
                                <option>XL</option>
                            </select>
                        </div>

                    <div class="form-group full-width">
                        <label class="form-label">Total Quantity</label>
                        <input type="text" class="form-input " placeholder="112">
                    </div>
                </div>
            `;
  return div;
}

document.addEventListener("click", (e) => {
  if (e.target.closest(".delete-variant")) {
    const variant = e.target.closest(".variant-container");
    if (document.querySelectorAll(".variant-container").length > 1) {
      variant.remove();
    }
  }
});

document.addEventListener("change", function (e) {
  if (!e.target.classList.contains("color-select")) return;

  const select = e.target;
  const colorValue = select.value;

  if (!colorValue) return;

  const colorBox = select
    .closest(".color-selector")
    .querySelector(".color-swatch");

  colorBox.style.backgroundColor = colorValue;
});

// Address
const addAddressBtn = document.getElementById("addAddressBtn");
const addressForm = document.getElementById("addressForm");
const closeAddressForm = document.getElementById("closeAddressForm");
const saveAddressBtn = document.getElementById("saveAddressBtn");

addAddressBtn.addEventListener("click", () => {
  addressForm.classList.add("active");
 document.getElementById("addressList").classList.add("hidden");

});

closeAddressForm.addEventListener("click", () => {
  addressForm.classList.remove("active");
  document.getElementById("addressList").classList.remove("hidden");

});

let addressCount = document.querySelectorAll(".address-card").length;

saveAddressBtn.addEventListener("click", () => {
  const state = document.getElementById("addressState").value;
  const city = document.getElementById("addressCity").value;
  const pincode = document.getElementById("addressPincode").value;
  const landmark = document.getElementById("addressLandmark").value;
  const lane = document.getElementById("addressLane").value;

let isValid = true;

  mandatoryFields.forEach(id => {
    const field = document.getElementById(id);
    if (!field.value.trim()) {
      showError(field, "This field is required");
      isValid = false;
    }
  });

  // const pincode = pincodeInput.value;
  if (pincode.length !== 6 || pincode === "000000") {
    showError(pincodeInput, "Enter valid 6 digit pincode");
    isValid = false;
  }

  if (!isValid) return;


  
addressCount++;

const addressCard = document.createElement("div");
addressCard.className = "address-card";

addressCard.innerHTML = `
                      <div class="use-address">
                    <input type="checkbox" class="address-checkbox">
                     <span>Use this address details</span>   
                    </div>
  <div class="address-content">
      <div class="address-name">Address ${addressCount}</div>
      <div class="address-details">
          ${lane}<br>
          ${landmark},<br>
          ${city}, ${state},<br>
          ${pincode}
      </div>
  </div>
`;


  document.getElementById("addressList").appendChild(addressCard);
  addressForm.classList.remove("active");
 document.getElementById("addressList").classList.remove("hidden");

  // Reset form
  document.getElementById("addressState").value = "";
  document.getElementById("addressCity").value = "";
  document.getElementById("addressPincode").value = "";
  document.getElementById("addressLandmark").value = "";
  document.getElementById("addressLane").value = "";
  document.getElementById("addressMapLink").value = "";
});

// mandatory field validation for address form
const mandatoryFields = [
  "addressState",
  "addressCity",
  "addressPincode",
  "addressLandmark",
  "addressMapLink",
  "addressLane",
];

mandatoryFields.forEach(id => {
  const field = document.getElementById(id);

  field.addEventListener("blur", () => {
    if (!field.value.trim()) {
      showError(field, "This field is required");
    } else {
      clearError(field);
    }
  });
});


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



// pin code validation for address form 
const pincodeInput = document.getElementById("addressPincode");

// only digits, max 6
pincodeInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6);
});

// blur validation
pincodeInput.addEventListener("blur", () => {
  const value = pincodeInput.value;

  if (!value) {
    showError(pincodeInput, "Pincode is required");
  } else if (value.length !== 6) {
    showError(pincodeInput, "Pincode must be 6 digits");
  } else if (value === "000000") {
    showError(pincodeInput, "Invalid pincode");
  } else {
    clearError(pincodeInput);
  }
});

// landmark validation for address form - only letters and spaces
const landmarkInput = document.getElementById("addressLandmark");

landmarkInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
});


// lane validation for address form - no leading spaces
const laneInput = document.getElementById("addressLane");

laneInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/^\s+/g, "");
});


const productMandatoryFields = [
  { id: "productName", message: "Product name is required" },
  { id: "productDescription", message: "Product description is required" },
  // { id: "category", message: "Please select category" }
];

productMandatoryFields.forEach(obj => {
  const field = document.getElementById(obj.id);

  field.addEventListener("blur", () => {
    if (!field.value.trim()) {
      showError(field, obj.message);
    } else {
      clearError(field);
    }
  });
});
// const subCategory = document.getElementById("subCategory");

// subCategory.addEventListener("blur", () => {
//   if (!subCategory.value) {
//     showError(subCategory, "Please select sub category");
//   } else {
//     clearError(subCategory);
//   }
// });
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

function validateAddressSelection() {
  const checkboxes = document.querySelectorAll(".address-checkbox");
  const isChecked = Array.from(checkboxes).some(cb => cb.checked);

  let error = document.getElementById("addressError");

  if (!isChecked) {
    if (!error) {
      error = document.createElement("div");
      error.id = "addressError";
      error.className = "error-text";
      error.innerText = "Please select pickup address";
      document.getElementById("addressErrorContainer").appendChild(error);

    }
    return false;
  } else {
    if (error) error.remove();
    return true; 
  }
}

const savePreviewBtn = document.querySelector(".save-preview-btn");
savePreviewBtn.addEventListener("click", () => {
  let isValid = true;

  // Main image mandatory
if (!validateMainImage()) {
  isValid = false;
}

    if (!validateImages()) {
    isValid = false;
  }

  // Variant quantity validation
if (!validateVariantQuantities()) {
  isValid = false;
}
  // Product details
  productMandatoryFields.forEach(obj => {
    const field = document.getElementById(obj.id);
    if (!field.value.trim()) {
      showError(field, obj.message);
      isValid = false;
    }
  });

  // Sub category
  if (!subCategory.value) {
    showError(subCategory, "Please select sub category");
    isValid = false;
  }

  // Dynamic fields
  if (!validateDynamicFields()) {
    isValid = false;
  }

  // Address checkbox (already implemented earlier)
  if (!validateAddressSelection()) {
    isValid = false;
  }

  if (!isValid) {
    const firstError = document.querySelector(".error-text");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }
//   if (!level1.value || !level2.value || !level3.value || !level4.value) {
//   alert("Please select all category levels");
//   return;
// }
if (!level1.value || !level2.value || !level3.value || !level4.value) {
  alert("Please select all 4 category levels");
  return;
}

  // ALL VALID
  window.location.href='../html/vendorProductPreview.html'
});



// checkbox - only one selectable
document.addEventListener("change", function (e) {
  if (!e.target.classList.contains("address-checkbox")) return;

  const allCheckboxes = document.querySelectorAll(".address-checkbox");

  allCheckboxes.forEach(cb => {
    if (cb !== e.target) {
      cb.checked = false;
    }
  });

  const error = document.getElementById("addressError");
  if (error) error.remove();
});


// image upload functionality
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

// 
function validateVariantQuantities() {
  let valid = true;

  document.querySelectorAll(".quantity-input").forEach((input) => {
    if (!input.value.trim()) {
      showError(input, "Total quantity is required");
      valid = false;
    } else {
      clearError(input);
    }
  });

  return valid;
}


// validate main image 
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

document.querySelector("#sidebar-main-vendor ul>li:nth-child(2)").classList.add("sidebar-active");

document.querySelector("#account-menu li:nth-child(2) .dropdown-header").classList.add("dropdown-header-active");

