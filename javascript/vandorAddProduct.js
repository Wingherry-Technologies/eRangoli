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


/************************************
 * 1. CATEGORY TREE (4 LEVEL FLEXIBLE)
 ************************************/
const categoryTree = {
  Clothing: {
    Women: {
      Sarees: {
        Dharmavaram: {},
        Kalamkari: {},
        Venkatagiri: {},
        Gadwal: {},
        Ponduru: {},
        Dulla: {},
        Bobbili: {},
        Mangalagiri: {},
        Bandarulanka: {},
        Uppada: {},
        Chirala: {},
        Mysore: {},
        Ilkal: {},
        Udupi: {},
        Kanjeevaram: {},
        Sungudi: {},
        Chettinad: {},
        Arani: {},
        Muga: {},
        Eri: {},
        Pat: {},
        MekhelaChador: {},
        Bhagalpuri: {},
        Madhubani: {},
        Tussar: {},
        Kosa: {},
        Patola: {},
        Bandhani: {},
        KutchEmbroidery: {},
        Ajrak: {},
        Leheriya: {},
        Gajji: {},
        KalaCotton: {},
        MirrorWork: {},
        Batik: {},
        Tangaliya: {},
        ChambaRumal: {},
        Chanderi: {},
        Maheshwari: {},
        BaghPrint: {},
        Tant: {},
        BanjaraEmbroidery: {},
        Paithani: {},
        Wari: {},
        Himroo: {},
        Ikat: {},
        Patta: {},
        Sambalpuri: {},
        Bomkai: {},
        Pattachitra: {},
        Phulkari: {},
        KotaDoria: {},
        Sanganeri: {},
        Bagru: {},
        BarmerAppliqueWork: {},
        Pochampally: {},
        Narayanpet: {},
        Gollabama: {},
        GunturCotton: {},
        Banarasi: {},
        ChikankariLucknowi: {},
        Baluchari: {},
        Kantha: {},
        Jamdani: {},
        Kasavu: {},
        Ghicha: {},
        Nauvari: {}
      },

      Dress: {
        Kalamkari: {},
        Madhubani: {},
        Bandhani: {},
        Ajrak: {},
        Leheriya: {},
        MirrorWork: {},
        Batik: {},
        BaghPrint: {},
        Warli: {},
        Ikat: {},
        Sanganeri: {},
        Bagru: {},
        ChikankariLucknowi: {}
      },

      DressMaterial: {
        Dharmavaram: {},
        Kalamkari: {},
        Venkatagiri: {},
        Mangalagiri: {},
        Kanjeevaram: {},
        MekhelaChador: {},
        Madhubani: {},
        Patola: {},
        Bandhani: {},
        Ajrak: {},
        Leheriya: {},
        KalaCotton: {},
        MirrorWork: {},
        Batik: {},
        Pangaliya: {},
        Chanderi: {},
        BaghPrint: {},
        Paithani: {},
        Warli: {},
        Ikat: {},
        Pattachitra: {},
        Phulkari: {},
        KotaDoria: {},
        Sanganeri: {},
        Bagru: {},
        BarmerAppliqueWork: {},
        Pochampally: {},
        Narayanpet: {},
        Banarasi: {},
        Chikankari: {},
        Kantha: {},
        Jamdani: {}
      }
    }
  },

  Footwear: {
    Women: {
      KolhapuriChappal: {},
      JaipurChappal: {},
      DesignerHandEmbroideryFootwear: {}
    },
    Men: {
      KolhapuriChappal: {},
      DesignerHandEmbroideryFootwear: {}
    }
  },

  Jewellery: {
    Women: {
      WoodenJewellery: {},
      TerracottaJewellery: {},
      ConchShellJewellery: {},
      SilverCoatedJewellery: {},
      BrassJewellery: {},
      EmbroideryJewellery: {},
      CrochetJewellery: {},
      TribalJewellery: {}
    },
    Men: {
      WoodenJewellery: {},
      SilverCoatedJewellery: {},
      TribalJewellery: {}
    }
  },

  Arts: {
    CheriyalPainting: {},
    KalamkariPainting: {},
    OdishaPattachitraPainting: {},
    MadhubaniPainting: {},
    PichwaiPainting: {},
    WarliPainting: {},
    KalighatPainting: {},
    PataArt: {},
    WestBengalPattachitra: {},
    SavaraPainting: {},
    GondArt: {},
    MiniaturePainting: {},
    TanjorePainting: {},
    SauraPainting: {},
    MataNiPachediPainting: {},
    YakshaganaPainting: {},
    RoganArt: {},
    BhilPainting: {}
  },

  Crafts: {
    KondapalliToys: {},
    EtikoppakaToys: {},
    ChannapatnaToys: {},
    NatungramWoodenDolls: {},
    BidriWare: {},
    Dhokra: {},
    BrassWare: {},
    BluePottery: {},
    SikkiCrafts: {},
    BambooCrafts: {},
    JuteCrafts: {},
    BulrushReedCrafts: {},
    BellMetalCrafts: {},
    PaperMache: {},
    LeatherCrafts: {},
    TribalMakes: {},
    HandBags: {},
    BastarIronCraft: {}
  },

  HeritageWraps: {
    Dupatta: {},
    Stole: {},
    Shawl: {},
    Muffler: {}
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
    name: "state",
    label: "state",
    type: "text",
    required: true,
    placeholder: "enter state"
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

// GLOBAL FIELDS - Applied to all Sub Categories (Level 3 & 4)
const globalReturnRefundFields = [
  {
    name: "applicableToReturn",
    label: "Applicable to Return/Exchange",
    type: "select",
    required: true,
    options: ["Yes", "No"]
  },
  {
  name: "coloursAvailable",
  label: "Colours Available",
  type: "select",
  required: true,
  options: ["Red", "Maroon", "Blue", "Navy Blue", "Green", "Black", "White", "Yellow", "Pink", "Purple", "Orange", "Gold", "Silver", "Brown", "Beige"]
},
  
  {
    name: "personalization",
    label: "Personalization Available",
    type: "select",
    required: true,
    options: ["Yes", "No"]
  },

    {
    name: "availableForReturnRefund",
    label: "Available for Return/Refund",
    type: "select",
    required: true,
    options: ["Yes", "No"]
  },
  {
    name: "refundDays",
    label: "Refund Processing (Days)",
    type: "select",
    required: true,
    options: ["Within 3 Days", "Within 5 Days", "Within 7 Days", "Within 10 Days"]
  },

];

// const categoryFields = {

//   /* =====================================================
//      WOMEN
//   ===================================================== */

//   /* Clothing → Sarees (applies to all Level-4 sarees) */
// Sarees: [

//   /* ===== BASIC DETAILS ===== */
//   {
//     name: "occasion",
//     label: "Occasion",
//     type: "select",
//     required: true,
//     options: ["Casual", "Festive", "Wedding"]
//   },

//   {
//     name: "sareeFabric",
//     label: "Saree Fabric",
//     type: "select",
//     required: true,
//     options: ["Pure Silk", "Cotton", "Linen"]
//   },

//   {
//     name: "blouseFabric",
//     label: "Blouse Fabric",
//     type: "select",
//     required: true,
//     options: ["Pure Silk", "Cotton"]
//   },

//   {
//     name: "sareePrint",
//     label: "Saree Print",
//     type: "select",
//     required: true,
//     options: ["Peacock", "Floral", "Paisley", "Abstract"]
//   },

//   {
//     name: "sareeWork",
//     label: "Saree Work",
//     type: "select",
//     required: true,
//     options: ["Zari Work", "Thread Work", "Plain"]
//   },

//   /* ===== VARIANT DETAILS ===== */
//   {
//   name: "coloursAvailable",
//   label: "Colours Available",
//   type: "select",
//   required: true,
//   options: ["Maroon", "Red", "Green", "Blue", "Black", "Gold"]
// },

//   {
//     name: "sizes",
//     label: "Sizes",
//     type: "select",
//     required: true,
//     options: ["Size 1", "Size 2", "Size 3"]
//   },

//   /* ===== RETURN & DELIVERY ===== */
//   {
//     name: "applicableToReturn",
//     label: "Applicable to Return",
//     type: "select",
//     required: true,
//     options: ["Yes", "No"]
//   },

//   {
//     name: "refundProcess",
//     label: "Refund process in days",
//     type: "select",
//     required: true,
//     options: ["within 3 days", "within 5 days", "within 7 days"]
//   },

//   {
//     name: "availableToPickup",
//     label: "Available to pick up",
//     type: "select",
//     required: true,
//     options: ["Immediately", "Within 2 Days", "Within 5 Days"]
//   },

//   /* ===== EXTRA DETAILS ===== */
//   {
//     name: "regionalTag",
//     label: "Regional Tag",
//     type: "select",
//     required: false,
//     options: [
//       "Maharashtra",
//       "Karnataka",
//       "Tamil Nadu",
//       "Andhra Pradesh",
//       "West Bengal"
//     ]
//   },

//   {
//     name: "personalisedOrders",
//     label: "Do you take personalised orders",
//     type: "select",
//     required: true,
//     options: ["Yes", "No"]
//   },

//   {
//     name: "careInformation",
//     label: "Care Information",
//     type: "select",
//     required: true,
//     options: ["Dry clean only", "Hand wash", "Machine wash"]
//   }
// ],

//   Dresses: [

//   /* ===== BASIC DETAILS ===== */
//   {
//     name: "occasion",
//     label: "Occasion",
//     type: "select",
//     required: true,
//     options: ["Casual", "Party", "Festive"]
//   },

//   {
//     name: "topFabric",
//     label: "Top / Bottom Fabric",
//     type: "select",
//     required: true,
//     options: ["Semi Crepe", "Cotton", "Rayon"]
//   },

//   {
//     name: "dupattaFabric",
//     label: "Dupatta Fabric",
//     type: "select",
//     required: true,
//     options: ["Semi Crepe", "Chiffon", "Georgette"]
//   },

//   {
//     name: "materialPrint",
//     label: "Material Print",
//     type: "select",
//     required: true,
//     options: ["Floral", "Abstract", "Paisley"]
//   },

//   {
//     name: "materialWork",
//     label: "Material Work",
//     type: "select",
//     required: true,
//     options: ["Threadwork", "Embroidery", "Plain"]
//   },

//   /* ===== FIT & STYLE ===== */
//   {
//     name: "sleevesLength",
//     label: "Sleeves Length",
//     type: "select",
//     required: true,
//     options: ["Sleeveless", "Three fourth Sleeves", "Full Sleeves"]
//   },

//   {
//     name: "kurtaLength",
//     label: "Kurta Length",
//     type: "select",
//     required: true,
//     options: ["Knee length", "Calf length", "Ankle length"]
//   },

//   {
//     name: "neckPattern",
//     label: "Neck Pattern",
//     type: "select",
//     required: true,
//     options: ["Round", "V Neck", "Boat Neck"]
//   },

//   {
//     name: "bottomStyle",
//     label: "Bottom Style",
//     type: "select",
//     required: true,
//     options: ["Straight pants", "Palazzo", "Churidar"]
//   },

//   /* ===== VARIANT DETAILS ===== */
//   {
//     name: "coloursAvailable",
//     label: "Colours Available",
//     type: "select",
//     required: true,
//     options: ["Maroon", "Red", "Green", "Blue", "Black"]
//   },

//   {
//     name: "sizes",
//     label: "Sizes",
//     type: "select",
//     required: true,
//     options: ["Size 1", "Size 2", "Size 3"]
//   },

//   /* ===== RETURN & DELIVERY ===== */
//   {
//     name: "applicableToReturn",
//     label: "Applicable to Return",
//     type: "select",
//     required: true,
//     options: ["Yes", "No"]
//   },

//   {
//     name: "refundProcess",
//     label: "Refund process in days",
//     type: "select",
//     required: true,
//     options: ["within 3 days", "within 5 days", "within 7 days"]
//   },

//   {
//     name: "availableToPickup",
//     label: "Available to pick up",
//     type: "select",
//     required: true,
//     options: ["Immediately", "Within 2 Days", "Within 5 Days"]
//   },

//   /* ===== EXTRA DETAILS ===== */
//   {
//     name: "regionalTag",
//     label: "Regional Tag",
//     type: "select",
//     required: false,
//     options: ["Maharashtra", "Karnataka", "Tamil Nadu", "West Bengal"]
//   },

//   {
//     name: "personalisedOrders",
//     label: "Do you take personalized orders",
//     type: "select",
//     required: true,
//     options: ["Yes", "No"]
//   },

//   {
//     name: "careInformation",
//     label: "Care Information",
//     type: "select",
//     required: true,
//     options: ["Hand wash", "Dry clean only", "Machine wash"]
//   }
// ]
// ,

//   "Dress Materials": [

//   /* ===== BASIC DETAILS ===== */
//   {
//     name: "occasion",
//     label: "Occasion",
//     type: "select",
//     required: true,
//     options: ["Casual", "Party", "Festive"]
//   },

//   {
//     name: "topBottomFabric",
//     label: "Top / Bottom Fabric",
//     type: "select",
//     required: true,
//     options: ["Pure Silk", "Cotton", "Semi Crepe", "Rayon"]
//   },

//   {
//     name: "dupattaFabric",
//     label: "Dupatta Fabric",
//     type: "select",
//     required: true,
//     options: ["Crepe", "Chiffon", "Georgette"]
//   },

//   {
//     name: "materialPrint",
//     label: "Material Print",
//     type: "select",
//     required: true,
//     options: ["Floral", "Paisley", "Abstract"]
//   },

//   {
//     name: "materialWork",
//     label: "Material Work",
//     type: "select",
//     required: true,
//     options: ["Thread", "Gottapatti", "Embroidery", "Plain"]
//   },

//   /* ===== VARIANT DETAILS ===== */
//   {
//     name: "coloursAvailable",
//     label: "Colours Available",
//     type: "select",
//     required: true,
//     options: ["Maroon", "Red", "Green", "Blue", "Black"]
//   },

//   {
//     name: "sizes",
//     label: "Sizes",
//     type: "select",
//     required: true,
//     options: ["Size 1", "Size 2", "Size 3"]
//   },

//   /* ===== RETURN & DELIVERY ===== */
//   {
//     name: "applicableToReturn",
//     label: "Applicable to Return",
//     type: "select",
//     required: true,
//     options: ["Yes", "No"]
//   },

//   {
//     name: "refundProcess",
//     label: "Refund process in days",
//     type: "select",
//     required: true,
//     options: ["within 3 days", "within 5 days", "within 7 days"]
//   },

//   {
//     name: "availableToPickup",
//     label: "Available to pick up",
//     type: "select",
//     required: true,
//     options: ["Immediately", "Within 2 Days", "Within 5 Days"]
//   },

//   /* ===== EXTRA DETAILS ===== */
//   {
//     name: "regionalTag",
//     label: "Regional Tag",
//     type: "select",
//     required: false,
//     options: ["Maharashtra", "Karnataka", "Tamil Nadu", "Andhra Pradesh"]
//   },

//   {
//     name: "personalisedOrders",
//     label: "Do you take personalized orders",
//     type: "select",
//     required: true,
//     options: ["Yes", "No"]
//   },

//   {
//     name: "careInformation",
//     label: "Care Information",
//     type: "select",
//     required: true,
//     options: ["Hand wash", "Dry clean only", "Machine wash"]
//   }
// ]
// ,

//   "Kurtis & Kurtas": [
//     { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Cotton", "Rayon", "Silk"] },
//     { name: "length", label: "Kurti Length", type: "select", required: true, options: ["Short", "Knee Length", "Ankle Length"] },
//     { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Daily Wear", "Office", "Festive"] }
//   ],

//   "Ethnic Sets": [
//     { name: "setType", label: "Set Type", type: "select", required: true, options: ["Kurta Set", "Co-ord Set"] },
//     { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Cotton", "Silk"] }
//   ],

//   "Women_Footwear": [
//   {
//     name: "heelHeight",
//     label: "Heel Height",
//     type: "select",
//     required: true,
//     options: ["Flat", "1 inch", "2 inch", "3 inch", "4 inch"]
//   },
//   {
//     name: "ornamentation",
//     label: "Ornamentation",
//     type: "select",
//     required: true,
//     options: ["Embroidered", "Beaded", "Printed", "Plain"]
//   },
//   {
//     name: "toeShape",
//     label: "Toe Shape",
//     type: "select",
//     required: true,
//     options: ["Round Toe", "Pointed Toe", "Open Toe"]
//   },
//   {
//     name: "material",
//     label: "Material",
//     type: "select",
//     required: true,
//     options: ["Leather", "Canvas", "Synthetic"]
//   },
//   {
//     name: "occasion",
//     label: "Occasion",
//     type: "select",
//     required: true,
//     options: ["Casual", "Party", "Festive", "Wedding"]
//   },

//   /* COMMON */
//   {
//     name: "coloursAvailable",
//     label: "Colours Available",
//     type: "select",
//     required: true,
//     options: ["Maroon", "Red", "Black", "Gold"]
//   },
//   {
//     name: "sizes",
//     label: "Sizes",
//     type: "select",
//     required: true,
//     options: ["Size 1", "Size 2", "Size 3"]
//   },
//   {
//     name: "applicableToReturn",
//     label: "Applicable to Return",
//     type: "select",
//     required: true,
//     options: ["Yes", "No"]
//   },
//   {
//     name: "careInformation",
//     label: "Care Information",
//     type: "select",
//     required: true,
//     options: ["Wipe with dry cloth", "Hand wash"]
//   }
// ]

// ,
// "Men_Footwear": [
//   {
//     name: "footwearType",
//     label: "Footwear Type",
//     type: "select",
//     required: true,
//     options: ["Formal Shoes", "Loafers", "Sandals", "Sneakers"]
//   },
//   {
//     name: "soleMaterial",
//     label: "Sole Material",
//     type: "select",
//     required: true,
//     options: ["Rubber", "PU", "Leather"]
//   },
//   {
//     name: "material",
//     label: "Upper Material",
//     type: "select",
//     required: true,
//     options: ["Leather", "Synthetic", "Canvas"]
//   },
//   {
//     name: "toeShape",
//     label: "Toe Shape",
//     type: "select",
//     required: true,
//     options: ["Round Toe", "Square Toe"]
//   },
//   {
//     name: "occasion",
//     label: "Occasion",
//     type: "select",
//     required: true,
//     options: ["Casual", "Formal", "Office"]
//   },

//   /* COMMON */
//   {
//     name: "coloursAvailable",
//     label: "Colours Available",
//     type: "select",
//     required: true,
//     options: ["Black", "Brown", "Tan"]
//   },
//   {
//     name: "sizes",
//     label: "Sizes",
//     type: "select",
//     required: true,
//     options: ["6", "7", "8", "9", "10", "11"]
//   },
//   {
//     name: "applicableToReturn",
//     label: "Applicable to Return",
//     type: "select",
//     required: true,
//     options: ["Yes", "No"]
//   },
//   {
//     name: "careInformation",
//     label: "Care Information",
//     type: "select",
//     required: true,
//     options: ["Wipe with dry cloth"]
//   }
// ]
// ,
//   Jewellery: [

//   /* ===== BASIC DETAILS ===== */
//   {
//     name: "design",
//     label: "Design",
//     type: "select",
//     required: true,
//     options: ["Antique", "Traditional", "Contemporary", "Temple"]
//   },

//   {
//     name: "metal",
//     label: "Metal",
//     type: "select",
//     required: true,
//     options: ["Gold", "Silver", "Bronze", "Copper", "Alloy"]
//   },

//   {
//     name: "polish",
//     label: "Polish",
//     type: "select",
//     required: true,
//     options: ["Gold", "Silver", "Rose Gold", "Matte"]
//   },

//   {
//     name: "stone",
//     label: "Stone",
//     type: "select",
//     required: true,
//     options: ["Zircon AD", "Kundan", "Pearl", "Ruby", "None"]
//   },

//   {
//     name: "occasion",
//     label: "Occasion",
//     type: "select",
//     required: true,
//     options: ["Wedding", "Festive", "Party", "Daily Wear"]
//   },

//   /* ===== VARIANT DETAILS ===== */
//   {
//     name: "coloursAvailable",
//     label: "Colours Available",
//     type: "select",
//     required: true,
//     options: ["Maroon", "Red", "Green", "Gold", "Silver"]
//   },

//   {
//     name: "sizes",
//     label: "Sizes",
//     type: "select",
//     required: true,
//     options: ["Size 1", "Size 2", "Size 3"]
//   },

//   /* ===== RETURN & DELIVERY ===== */
//   {
//     name: "applicableToReturn",
//     label: "Applicable to Return",
//     type: "select",
//     required: true,
//     options: ["Yes", "No"]
//   },

//   {
//     name: "refundProcess",
//     label: "Refund process in days",
//     type: "select",
//     required: true,
//     options: ["within 3 days", "within 5 days", "within 7 days"]
//   },

//   {
//     name: "availableToPickup",
//     label: "Available to pick up",
//     type: "select",
//     required: true,
//     options: ["Immediately", "Within 2 Days", "Within 5 Days"]
//   },

//   /* ===== EXTRA DETAILS ===== */
//   {
//     name: "regionalTag",
//     label: "Regional Tag",
//     type: "select",
//     required: false,
//     options: ["Rajasthan", "Tamil Nadu", "Karnataka", "Maharashtra"]
//   },

//   {
//     name: "personalisedOrders",
//     label: "Do you take personalized orders",
//     type: "select",
//     required: true,
//     options: ["Yes", "No"]
//   }
// ]
// ,

//   Accessories: [
//     { name: "accessoryType", label: "Accessory Type", type: "select", required: true, options: ["Handbags", "Clutches", "Stoles"] }
//   ],

//   /* =====================================================
//      MEN
//   ===================================================== */

// "Kurta Sets": [

//   /* ===== BASIC DETAILS ===== */
//   {
//     name: "fabric",
//     label: "Fabric",
//     type: "select",
//     required: true,
//     options: ["Cotton", "Silk", "Linen", "Rayon"]
//   },

//   {
//     name: "kurtaLength",
//     label: "Kurta Length",
//     type: "select",
//     required: true,
//     options: ["Knee Length", "Calf Length", "Ankle Length"]
//   },

//   {
//     name: "fit",
//     label: "Fit",
//     type: "select",
//     required: true,
//     options: ["Slim Fit", "Regular Fit", "Relaxed Fit"]
//   },

//   {
//     name: "sleeveLength",
//     label: "Sleeve Length",
//     type: "select",
//     required: true,
//     options: ["Full Sleeve", "Half Sleeve", "Sleeveless"]
//   },

//   {
//     name: "neckPattern",
//     label: "Neck Pattern",
//     type: "select",
//     required: true,
//     options: ["Round Neck", "Mandarin Collar", "V Neck"]
//   },

//   {
//     name: "occasion",
//     label: "Occasion",
//     type: "select",
//     required: true,
//     options: ["Casual", "Festive", "Wedding", "Office"]
//   },

//   /* ===== VARIANT DETAILS ===== */
//   {
//     name: "coloursAvailable",
//     label: "Colours Available",
//     type: "select",
//     required: true,
//     options: ["White", "Cream", "Maroon", "Blue", "Green", "Black"]
//   },

//   {
//     name: "sizes",
//     label: "Sizes",
//     type: "select",
//     required: true,
//     options: ["S", "M", "L", "XL", "XXL"]
//   },

//   /* ===== RETURN & DELIVERY ===== */
//   {
//     name: "applicableToReturn",
//     label: "Applicable to Return",
//     type: "select",
//     required: true,
//     options: ["Yes", "No"]
//   },

//   {
//     name: "refundProcess",
//     label: "Refund process in days",
//     type: "select",
//     required: true,
//     options: ["within 3 days", "within 5 days", "within 7 days"]
//   },

//   {
//     name: "availableToPickup",
//     label: "Available to pick up",
//     type: "select",
//     required: true,
//     options: ["Immediately", "Within 2 Days", "Within 5 Days"]
//   },

//   /* ===== EXTRA DETAILS ===== */
//   {
//     name: "regionalTag",
//     label: "Regional Tag",
//     type: "select",
//     required: false,
//     options: ["Rajasthan", "Karnataka", "Tamil Nadu", "Uttar Pradesh"]
//   },

//   {
//     name: "personalisedOrders",
//     label: "Do you take personalized orders",
//     type: "select",
//     required: true,
//     options: ["Yes", "No"]
//   },

//   {
//     name: "careInformation",
//     label: "Care Information",
//     type: "select",
//     required: true,
//     options: ["Hand wash", "Dry clean only", "Machine wash"]
//   }
// ]
// ,

//   Sherwanis: [
//     { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Silk", "Velvet"] },
//     { name: "work", label: "Work", type: "select", required: true, options: ["Embroidery", "Zardozi"] }
//   ],

//   "Dhoti & Veshti": [
//     { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Cotton", "Silk"] }
//   ],

//   "Nehru Jackets": [
//     { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Cotton", "Tweed"] }
//   ],

//   /* =====================================================
//      KIDS
//   ===================================================== */

//  "Baby Wear": [

//   /* ===== BASIC DETAILS ===== */
//   {
//     name: "ageGroup",
//     label: "Age Group",
//     type: "select",
//     required: true,
//     options: [
//       "0–3 Months",
//       "3–6 Months",
//       "6–9 Months",
//       "9–12 Months",
//       "1–2 Years"
//     ]
//   },

//   {
//     name: "gender",
//     label: "Gender",
//     type: "select",
//     required: true,
//     options: ["Unisex", "Boy", "Girl"]
//   },

//   {
//     name: "fabric",
//     label: "Fabric",
//     type: "select",
//     required: true,
//     options: ["Cotton", "Organic Cotton", "Bamboo Cotton", "Wool"]
//   },

//   {
//     name: "wearType",
//     label: "Wear Type",
//     type: "select",
//     required: true,
//     options: [
//       "Rompers",
//       "Bodysuits",
//       "Sleepwear",
//       "Winter Wear",
//       "Daily Wear"
//     ]
//   },

//   /* ===== FIT & SAFETY ===== */
//   {
//     name: "sleeveLength",
//     label: "Sleeve Length",
//     type: "select",
//     required: true,
//     options: ["Sleeveless", "Half Sleeve", "Full Sleeve"]
//   },

//   {
//     name: "closureType",
//     label: "Closure Type",
//     type: "select",
//     required: true,
//     options: ["Snap Button", "Zipper", "Tie-up", "Pullover"]
//   },

//   {
//     name: "skinFriendly",
//     label: "Skin Friendly",
//     type: "select",
//     required: true,
//     options: ["Yes", "No"]
//   },

//   /* ===== VARIANT DETAILS ===== */
//   {
//     name: "coloursAvailable",
//     label: "Colours Available",
//     type: "select",
//     required: true,
//     options: ["White", "Yellow", "Pink", "Blue", "Green", "Grey"]
//   },

//   {
//     name: "sizes",
//     label: "Sizes",
//     type: "select",
//     required: true,
//     options: ["Newborn", "0–3M", "3–6M", "6–12M", "1–2Y"]
//   },

//   /* ===== RETURN & DELIVERY ===== */
//   {
//     name: "applicableToReturn",
//     label: "Applicable to Return",
//     type: "select",
//     required: true,
//     options: ["Yes", "No"]
//   },

//   {
//     name: "refundProcess",
//     label: "Refund process in days",
//     type: "select",
//     required: true,
//     options: ["within 3 days", "within 5 days", "within 7 days"]
//   },

//   {
//     name: "availableToPickup",
//     label: "Available to pick up",
//     type: "select",
//     required: true,
//     options: ["Immediately", "Within 2 Days", "Within 5 Days"]
//   },

//   /* ===== EXTRA DETAILS ===== */
//   {
//     name: "careInformation",
//     label: "Care Information",
//     type: "select",
//     required: true,
//     options: ["Hand wash", "Machine wash", "Do not bleach"]
//   },

//   {
//     name: "personalisedOrders",
//     label: "Do you take personalized orders",
//     type: "select",
//     required: true,
//     options: ["Yes", "No"]
//   }
// ]
// ,

//   /* =====================================================
//      FURNITURE
//   ===================================================== */

//   Beds: [

//   /* ===== BASIC DETAILS ===== */
//   {
//     name: "bedType",
//     label: "Bed Type",
//     type: "select",
//     required: true,
//     options: [
//       "Single Bed",
//       "Double Bed",
//       "Queen Size Bed",
//       "King Size Bed"
//     ]
//   },

//   {
//     name: "material",
//     label: "Material",
//     type: "select",
//     required: true,
//     options: [
//       "Solid Wood",
//       "Engineered Wood",
//       "Metal",
//       "Upholstered"
//     ]
//   },

//   {
//     name: "finish",
//     label: "Finish",
//     type: "select",
//     required: true,
//     options: [
//       "Natural",
//       "Walnut",
//       "Teak",
//       "Wenge",
//       "Matte",
//       "Glossy"
//     ]
//   },

//   /* ===== SIZE & STRUCTURE ===== */
//   {
//     name: "size",
//     label: "Size",
//     type: "select",
//     required: true,
//     options: [
//       "Single",
//       "Queen",
//       "King"
//     ]
//   },

//   {
//     name: "storage",
//     label: "Storage",
//     type: "select",
//     required: true,
//     options: [
//       "With Storage",
//       "Without Storage",
//       "Hydraulic Storage",
//       "Drawer Storage"
//     ]
//   },

//   {
//     name: "headboardType",
//     label: "Headboard Type",
//     type: "select",
//     required: true,
//     options: [
//       "Box",
//       "Panel",
//       "Upholstered",
//       "No Headboard"
//     ]
//   },

//   /* ===== DIMENSIONS ===== */
//   {
//     name: "bedDimensions",
//     label: "Dimensions (L × W × H)",
//     type: "text",
//     required: true,
//     placeholder: "78 x 60 x 36 inches"
//   },

//   {
//     name: "maxLoad",
//     label: "Maximum Load Capacity",
//     type: "select",
//     required: true,
//     options: [
//       "Up to 150 kg",
//       "Up to 200 kg",
//       "Up to 300 kg"
//     ]
//   },

//   /* ===== VARIANT DETAILS ===== */
//   {
//     name: "coloursAvailable",
//     label: "Colours Available",
//     type: "select",
//     required: true,
//     options: [
//       "Brown",
//       "Walnut",
//       "Black",
//       "White",
//       "Grey"
//     ]
//   },

//   /* ===== DELIVERY & INSTALLATION ===== */
//   {
//     name: "installation",
//     label: "Installation Provided",
//     type: "select",
//     required: true,
//     options: ["Yes", "No"]
//   },

//   {
//     name: "deliveryTime",
//     label: "Delivery Time",
//     type: "select",
//     required: true,
//     options: [
//       "3–5 Days",
//       "5–7 Days",
//       "7–10 Days"
//     ]
//   },

//   /* ===== RETURN & WARRANTY ===== */
//   {
//     name: "applicableToReturn",
//     label: "Applicable to Return",
//     type: "select",
//     required: true,
//     options: ["Yes", "No"]
//   },

//   {
//     name: "warranty",
//     label: "Warranty",
//     type: "select",
//     required: true,
//     options: [
//       "No Warranty",
//       "6 Months",
//       "1 Year",
//       "5 Years"
//     ]
//   },

//   /* ===== EXTRA DETAILS ===== */
//   {
//     name: "careInformation",
//     label: "Care Information",
//     type: "select",
//     required: true,
//     options: [
//       "Wipe with dry cloth",
//       "Use wood polish",
//       "Avoid direct sunlight"
//     ]
//   }
// ]
// ,

//   /* =====================================================
//      ARTS
//   ===================================================== */

//   "Acrylic Paintings": [
//     { name: "style", label: "Art Style", type: "select", required: true, options: ["Abstract", "Contemporary", "Traditional", "Nature"] },
//     { name: "frame", label: "Frame", type: "select", required: true, options: ["With Frame", "Without Frame"] }
//   ],

//   /* =====================================================
//      CRAFTS
//   ===================================================== */

//   "Handwoven Items": [
//     { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Cotton", "Jute"] },
//     { name: "usage", label: "Usage", type: "select", required: true, options: ["Decor", "Utility"] }
//   ],

//   /* =====================================================
//      HOME & LIVING
//   ===================================================== */

//   "Wall Decor": [
//     { name: "material", label: "Material", type: "select", required: true, options: ["Wood", "Metal", "Fabric"] },
//     { name: "mountType", label: "Mount Type", type: "select", required: true, options: ["Nail", "Adhesive"] }
//   ],

//   Lighting: [
//     { name: "lightType", label: "Light Type", type: "select", required: true, options: ["Table Lamp", "Hanging Lamp"] },
//     { name: "powerSource", label: "Power Source", type: "select", required: true, options: ["Electric", "Battery"] }
//   ]
// };


const categoryFields = {

  /* =====================================================
     WOMEN → HANDLOOMS → PURE SILK (7 DEMO)
  ===================================================== */

  "Dharmavaram": [
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Wedding", "Festive"] },

  { name: "sareeFabric", label: "Saree Fabric", type: "select", required: true, options: ["Silk", "Silk Cotton"] },

  { name: "blouseFabric", label: "Blouse Fabric", type: "select", required: true, options: ["Silk"] },

  { name: "sareeWork", label: "Saree Work", type: "select", required: true, options: ["Zari Work"] },

  { name: "borderType", label: "Border Type", type: "select", required: true, options: ["Contrast Border", "Temple Border"] },

  { name: "palluDesign", label: "Pallu Design", type: "select", required: true, options: ["Rich Zari", "Traditional Motif"] },

  { name: "color", label: "Colours Available", type: "select", required: true, options: ["Red", "Green", "Gold"] },

  { name: "sizes", label: "Sizes", type: "select", required: true, options: ["Free Size","5.5 m", "6.0 m", "6.3 m"] },

  { name: "regionalTag", label: "Regional Tag", type: "select", required: true, options: ["Andhra Pradesh"] },

  { name: "careInformation", label: "Care Information", type: "select", required: true, options: ["Dry Clean Only"] }
],

  "Kalamkari": [
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Casual", "Festive"] },

  { name: "sareeFabric", label: "Saree Fabric", type: "select", required: true, options: ["Cotton", "Silk"] },

  { name: "blouseFabric", label: "Blouse Fabric", type: "select", required: true, options: ["Cotton"] },

  { name: "printType", label: "Print Type", type: "select", required: true, options: ["Hand Painted", "Block Print"] },

  { name: "theme", label: "Theme", type: "select", required: true, options: ["Mythology", "Nature"] },

  { name: "color", label: "Colours Available", type: "select", required: true, options: ["Earthy", "Multicolor"] },

  { name: "sizes", label: "Sizes", type: "select", required: false, options: ["Free Size","5.5 m", "6.0 m", "6.3 m"] },

  { name: "regionalTag", label: "Regional Tag", type: "select", required: false, options: ["Andhra Pradesh"] },

  { name: "careInformation", label: "Care Information", type: "select", required: true, options: ["Hand Wash", "Dry Clean"] }
],

  "Venkatagiri": [
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Daily Wear", "Festive"] },

  { name: "sareeFabric", label: "Saree Fabric", type: "select", required: true, options: ["Pure Cotton", "Silk"] },

  { name: "blouseFabric", label: "Blouse Fabric", type: "select", required: true, options: ["Cotton"] },

  { name: "borderDesign", label: "Border Design", type: "select", required: true, options: ["Zari Border", "Plain Border"] },

  { name: "bodyPattern", label: "Body Pattern", type: "select", required: true, options: ["Butta", "Plain"] },

  { name: "color", label: "Colours Available", type: "select", required: true, options: ["White", "Pastel"] },

  { name: "sizes", label: "Sizes", type: "select", required: true, options: ["Free Size","5.5 m", "6.0 m", "6.3 m"] },

  { name: "regionalTag", label: "Regional Tag", type: "select", required: true, options: ["Andhra Pradesh"] },

  { name: "careInformation", label: "Care Information", type: "select", required: true, options: ["Hand Wash"] }
],

  "Gadwal": [
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Wedding", "Festive"] },

  { name: "sareeFabric", label: "Saree Fabric", type: "select", required: true, options: ["Cotton Silk"] },

  { name: "blouseFabric", label: "Blouse Fabric", type: "select", required: true, options: ["Silk"] },

  { name: "sareeWork", label: "Saree Work", type: "select", required: true, options: ["Zari Work"] },

  { name: "borderType", label: "Border Type", type: "select", required: true, options: ["Contrast Border"] },

  { name: "color", label: "Colours Available", type: "select", required: true, options: ["Red", "Green", "Maroon"] },

  { name: "sizes", label: "Sizes", type: "select", required: true, options: ["Free Size","5.5 m", "6.0 m", "6.3 m"] },

  { name: "regionalTag", label: "Regional Tag", type: "select", required: true, options: ["Telangana"] },

  { name: "careInformation", label: "Care Information", type: "select", required: true, options: ["Dry Clean Only"] }
],

  "Ponduru": [
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Daily Wear"] },

  { name: "sareeFabric", label: "Saree Fabric", type: "select", required: true, options: ["Fine Cotton"] },

  { name: "blouseFabric", label: "Blouse Fabric", type: "select", required: true, options: ["Cotton"] },

  { name: "weaveType", label: "Weave Type", type: "select", required: true, options: ["Handspun", "Handwoven"] },

  { name: "texture", label: "Texture", type: "select", required: true, options: ["Soft", "Lightweight"] },

  { name: "color", label: "Colours Available", type: "select", required: true, options: ["White", "Off White"] },

  { name: "sizes", label: "Sizes", type: "select", required: true, options: ["Free Size","5.5 m", "6.0 m", "6.3 m"] },

  { name: "regionalTag", label: "Regional Tag", type: "select", required: true, options: ["Andhra Pradesh"] },

  { name: "careInformation", label: "Care Information", type: "select", required: true, options: ["Hand Wash"] }
],

  "Dulla": [
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Casual"] },

  { name: "sareeFabric", label: "Saree Fabric", type: "select", required: true, options: ["Cotton"] },

  { name: "blouseFabric", label: "Blouse Fabric", type: "select", required: true, options: ["Cotton"] },

  { name: "weaveType", label: "Weave Type", type: "select", required: true, options: ["Traditional Weave"] },

  { name: "pattern", label: "Pattern", type: "select", required: true, options: ["Stripes", "Checks"] },

  { name: "borderStyle", label: "Border Style", type: "select", required: true, options: ["Simple Border"] },

  { name: "color", label: "Colours Available", type: "select", required: true, options: ["White", "Blue"] },

  { name: "sizes", label: "Sizes", type: "select", required: true, options: ["Free Size","5.5 m", "6.0 m", "6.3 m"] },

  { name: "regionalTag", label: "Regional Tag", type: "select", required: true, options: ["India"] },

  { name: "careInformation", label: "Care Information", type: "select", required: true, options: ["Hand Wash"] }
],

 "Bobbili": [
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Festive"] },

  { name: "sareeFabric", label: "Saree Fabric", type: "select", required: true, options: ["Cotton", "Silk Blend"] },

  { name: "blouseFabric", label: "Blouse Fabric", type: "select", required: true, options: ["Silk Blend"] },

  { name: "weaveType", label: "Weave Type", type: "select", required: true, options: ["Traditional Weave"] },

  { name: "borderDesign", label: "Border Design", type: "select", required: true, options: ["Zari", "Simple Border"] },

  { name: "bodyPattern", label: "Body Pattern", type: "select", required: true, options: ["Butta", "Plain"] },

  { name: "color", label: "Colours Available", type: "select", required: true, options: ["Red", "Yellow"] },

  { name: "sizes", label: "Sizes", type: "select", required: true, options: ["Free Size","5.5 m", "6.0 m", "6.3 m"] },

  { name: "regionalTag", label: "Regional Tag", type: "select", required: true, options: ["Andhra Pradesh"] },

  { name: "careInformation", label: "Care Information", type: "select", required: true, options: ["Dry Clean", "Hand Wash"] }
],

  // dress
"Dress_Kalamkari": [
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Casual", "Festive"] },

  { name: "topBottomFabric", label: "Top / Bottom Fabric", type: "select", required: true, options: ["Cotton", "Silk"] },

  { name: "dupattaFabric", label: "Dupatta Fabric", type: "select", required: true, options: ["Cotton"] },

  { name: "materialPrint", label: "Material Print", type: "select", required: true, options: ["Hand Painted", "Block Print"] },

  { name: "materialWork", label: "Material Work", type: "select", required: false, options: ["None"] },

  { name: "sleevesLength", label: "Sleeves Length", type: "select", required: true, options: ["Half Sleeve", "Full Sleeve"] },

  { name: "kurtaLength", label: "Kurta Length", type: "select", required: true, options: ["Knee Length", "Calf Length"] },

  { name: "neckPattern", label: "Neck Pattern", type: "select", required: true, options: ["Round", "V Neck"] },

  { name: "bottomStyle", label: "Bottom Style", type: "select", required: true, options: ["Straight Pants", "Palazzo"] },

  { name: "color", label: "Colours Available", type: "select", required: true, options: ["Multicolor"] },

  { name: "sizes", label: "Sizes", type: "select", required: true, options: ["XS","S","M","L","XL","XXL"] },

  { name: "regionalTag", label: "Regional Tag", type: "select", required: true, options: ["Andhra Pradesh"] },

  { name: "careInformation", label: "Care Information", type: "select", required: true, options: ["Hand Wash"] }
],

"Dress_Madhubani": [
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Casual"] },

  { name: "topBottomFabric", label: "Top / Bottom Fabric", type: "select", required: true, options: ["Cotton"] },

  { name: "dupattaFabric", label: "Dupatta Fabric", type: "select", required: true, options: ["Cotton"] },

  { name: "materialPrint", label: "Material Print", type: "select", required: true, options: ["Nature", "Mythology"] },

  { name: "materialWork", label: "Material Work", type: "select", required: true, options: ["None"] },

  { name: "sleevesLength", label: "Sleeves Length", type: "select", required: true, options: ["Half Sleeve", "Full Sleeve"] },

  { name: "kurtaLength", label: "Kurta Length", type: "select", required: true, options: ["Knee Length"] },

  { name: "neckPattern", label: "Neck Pattern", type: "select", required: true, options: ["Round"] },

  { name: "bottomStyle", label: "Bottom Style", type: "select", required: true, options: ["Straight Pants"] },

  { name: "color", label: "Colours Available", type: "select", required: true, options: ["Multicolor"] },

  { name: "sizes", label: "Sizes", type: "select", required: true, options: ["XS","S","M","L","XL","XXL"] },

  { name: "regionalTag", label: "Regional Tag", type: "select", required: false, options: ["Bihar"] },

  { name: "careInformation", label: "Care Information", type: "select", required: true, options: ["Hand Wash"] }
],

"Dress_Bandhani": [
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Festive"] },

  { name: "topBottomFabric", label: "Top / Bottom Fabric", type: "select", required: true, options: ["Georgette", "Cotton"] },

  { name: "dupattaFabric", label: "Dupatta Fabric", type: "select", required: true, options: ["Georgette"] },

  { name: "materialPrint", label: "Material Print", type: "select", required: true, options: ["Tie & Dye"] },

  { name: "materialWork", label: "Material Work", type: "select", required: false, options: ["Bandhani Work"] },

  { name: "sleevesLength", label: "Sleeves Length", type: "select", required: true, options: ["Three Fourth", "Full Sleeve"] },

  { name: "kurtaLength", label: "Kurta Length", type: "select", required: true, options: ["Knee Length"] },

  { name: "neckPattern", label: "Neck Pattern", type: "select", required: true, options: ["Round", "Boat Neck"] },

  { name: "bottomStyle", label: "Bottom Style", type: "select", required: true, options: ["Straight Pants", "Churidar"] },

  { name: "color", label: "Colours Available", type: "select", required: true, options: ["Red", "Yellow"] },

  { name: "sizes", label: "Sizes", type: "select", required: true, options: ["XS","S","M","L","XL","XXL"] },

  { name: "regionalTag", label: "Regional Tag", type: "select", required: false, options: ["Gujarat", "Rajasthan"] },

  { name: "careInformation", label: "Care Information", type: "select", required: true, options: ["Dry Clean"] }
],

"DressMaterial_Kalamkari": [
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Casual", "Festive"] },

  { name: "topBottomFabric", label: "Top / Bottom Fabric", type: "select", required: true, options: ["Cotton", "Silk"] },

  { name: "dupattaFabric", label: "Dupatta Fabric", type: "select", required: true, options: ["Crepe", "Cotton"] },

  { name: "materialPrint", label: "Material Print", type: "select", required: true, options: ["Hand Painted", "Block Print"] },

  { name: "materialWork", label: "Material Work", type: "select", required: false, options: ["None"] },

  { name: "color", label: "Colours Available", type: "select", required: true, options: ["Multicolor"] },

  { name: "sizes", label: "Sizes", type: "select", required: true, options: ["Free Size"] },

  { name: "regionalTag", label: "Regional Tag", type: "select", required: false, options: ["Andhra Pradesh"] },

  { name: "careInformation", label: "Care Information", type: "select", required: true, options: ["Hand Wash"] }
],

// footwear
"KolhapuriChappal": [

  { name: "heelHeight", label: "Heel Height", type: "select", required: true, options: ["Flat", "Low", "Medium"] },

  { name: "ornamentation", label: "Ornamentation", type: "select", required: false, options: ["Plain", "Embroidered", "Braided"] },

  { name: "material", label: "Material", type: "select", required: true, options: ["Leather"] },

  { name: "toeShape", label: "Toe Shape", type: "select", required: true, options: ["Round Toe", "Square Toe"] },

  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Casual", "Festive"] },

  { name: "color", label: "Colours Available", type: "select", required: true, options: ["Brown", "Tan", "Black"] },

  { name: "sizes", label: "Sizes", type: "select", required: true, options: ["6", "7", "8", "9", "10"] },

  { name: "regionalTag", label: "Regional Tag", type: "select", required: false, options: ["Maharashtra"] },

  { name: "careInformation", label: "Care Information", type: "select", required: true, options: ["Wipe with dry cloth"] }
],

"JaipurChappal": [
  { name: "heelHeight", label: "Heel Height", type: "select", required: true, options: ["Flat", "Low"] },

  { name: "ornamentation", label: "Ornamentation", type: "select", required: true, options: ["Hand Embroidery"] },

  { name: "material", label: "Material", type: "select", required: true, options: ["Leather", "Fabric"] },

  { name: "toeShape", label: "Toe Shape", type: "select", required: true, options: ["Round Toe", "Pointed"] },

  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Festive", "Party"] },

  { name: "color", label: "Colours Available", type: "select", required: true, options: ["Maroon", "Red", "Golden"] },

  { name: "sizes", label: "Sizes", type: "select", required: true, options: ["6", "7", "8", "9"] },

  { name: "regionalTag", label: "Regional Tag", type: "select", required: false, options: ["Rajasthan"] },

  { name: "careInformation", label: "Care Information", type: "select", required: true, options: ["Dry Clean"] }
],
// jewellery
"WoodenJewellery": [

  { name: "design", label: "Design", type: "select", required: true, options: ["Antique", "Modern", "Handcrafted"] },

  { name: "material", label: "Material", type: "select", required: true, options: ["Wood"] },

  { name: "polish", label: "Polish", type: "select", required: true, options: ["Matte", "Glossy", "Natural"] },

  { name: "stone", label: "Stone", type: "select", required: false, options: ["None", "Beads", "Artificial Stones"] },

  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Daily Wear", "Casual"] },

  { name: "color", label: "Colours Available", type: "select", required: true, options: ["Brown", "Dark Brown", "Black"] },

  { name: "sizes", label: "Sizes", type: "select", required: false, options: ["Free Size"] },

  { name: "weight", label: "Weight", type: "text", required: true },

  { name: "regionalTag", label: "Regional Tag", type: "select", required: false, options: ["India"] },

  { name: "careInformation", label: "Care Information", type: "select", required: true, options: ["Keep away from water", "Wipe with dry cloth"] }
],

"TerracottaJewellery": [

  { name: "design", label: "Design", type: "select", required: true, options: ["Traditional", "Handmade", "Antique"] },

  { name: "material", label: "Material", type: "select", required: true, options: ["Clay", "Terracotta"] },

  { name: "polish", label: "Polish", type: "select", required: true, options: ["Matte", "Glossy"] },

  { name: "stone", label: "Stone", type: "select", required: false, options: ["None", "Beads", "Zircon", "Artificial Stones"] },

  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Festive", "Wedding"] },

  { name: "color", label: "Colours Available", type: "select", required: true, options: ["Red", "Maroon", "Multicolor"] },

  { name: "sizes", label: "Sizes", type: "select", required: false, options: ["Free Size"] },

  { name: "handmade", label: "Handmade", type: "select", required: true, options: ["Yes"] },

  { name: "regionalTag", label: "Regional Tag", type: "select", required: false, options: ["Rajasthan", "West Bengal"] },

  { name: "careInformation", label: "Care Information", type: "select", required: true, options: ["Avoid water", "Store in dry place"] }
],
// arts
"Cheriyal": [
  { name: "frame", label: "Frame", type: "select", required: true, options: ["With Frame", "Without Frame"] },

  { name: "frameColor", label: "Frame Colour", type: "select", required: true, options: ["Black", "Brown"] },

  { name: "weight", label: "Weight", type: "text", required: true },

  { name: "material", label: "Material", type: "select", required: true, options: ["Canvas", "Cloth"] },

  { name: "type", label: "Type", type: "select", required: true, options: ["Traditional Painting"] },

  { name: "medium", label: "Medium", type: "select", required: true, options: ["Natural Colors"] },

  { name: "theme", label: "Theme", type: "select", required: true, options: ["Mythology"] },

  { name: "color", label: "Colours Available", type: "select", required: true, options: ["Multicolor", "Red"] },

  { name: "sizes", label: "Sizes", type: "select", required: true, options: ["Small", "Medium", "Large"] },

  { name: "regionalTag", label: "Regional Tag", type: "select", required: true, options: ["Telangana"] },

  { name: "careInformation", label: "Care Information", type: "select", required: true, options: ["Avoid Moisture", "Keep Dry"] }
],

"Gond": [
  { name: "frame", label: "Frame", type: "select", required: true, options: ["With Frame", "Without Frame"] },

  { name: "frameColor", label: "Frame Colour", type: "select", required: true, options: ["Black", "Brown"] },

  { name: "weight", label: "Weight", type: "text", required: true },

  { name: "material", label: "Material", type: "select", required: true, options: ["Canvas", "Paper"] },

  { name: "type", label: "Type", type: "select", required: true, options: ["Traditional Painting"] },

  { name: "medium", label: "Medium", type: "select", required: true, options: ["Acrylic", "Natural Colors"] },

  { name: "theme", label: "Theme", type: "select", required: true, options: ["Nature", "Animals"] },

  { name: "color", label: "Colours Available", type: "select", required: true, options: ["Multicolor"] },

  { name: "sizes", label: "Sizes", type: "select", required: true, options: ["Small", "Medium", "Large"] },

  { name: "regionalTag", label: "Regional Tag", type: "select", required: true, options: ["Madhya Pradesh"] },

  { name: "careInformation", label: "Care Information", type: "select", required: true, options: ["Avoid Moisture"] }
],
// crafts
"KondapalliToys": [
  { name: "weight", label: "Weight", type: "text", required: true },

  { name: "material", label: "Material", type: "select", required: true, options: ["Soft Wood"] },

  { name: "type", label: "Type", type: "select", required: true, options: ["Handicraft Toy"] },

  { name: "handpainted", label: "Hand Painted", type: "select", required: true, options: ["Yes"] },

  { name: "theme", label: "Theme", type: "select", required: true, options: ["Village Life"] },

  { name: "color", label: "Colours Available", type: "select", required: true, options: ["Multicolor"] },

  { name: "sizes", label: "Sizes", type: "select", required: true, options: ["Small", "Medium"] },

  { name: "regionalTag", label: "Regional Tag", type: "select", required: true, options: ["Andhra Pradesh"] },

  { name: "careInformation", label: "Care Information", type: "select", required: true, options: ["Keep Dry", "Handle with care"] }
],
// HERITAGE
"Dupatta": [
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Casual", "Festive", "Wedding"] },

  { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Cotton", "Silk", "Chiffon", "Georgette"] },

  { name: "pattern", label: "Pattern / Work", type: "select", required: true, options: ["Printed", "Embroidered", "Zari Work"] },

  { name: "length", label: "Length", type: "text", required: true },

  { name: "color", label: "Colours Available", type: "select", required: true, options: ["Red", "Maroon", "Yellow", "Multicolor"] },

  { name: "sizes", label: "Sizes", type: "select", required: false, options: ["Free Size"] },

  { name: "regionalTag", label: "Regional Tag", type: "select", required: false, options: ["Rajasthan", "Punjab", "Gujarat"] },

  { name: "careInformation", label: "Care Information", type: "select", required: true, options: ["Hand Wash", "Dry Clean"] }
],

};




/* ─────────────────────────────────────────────
   DOM REFERENCES
───────────────────────────────────────────── */
const lvl1 = document.getElementById("categoryLevel1");
const lvl2 = document.getElementById("categoryLevel2");
const lvl3 = document.getElementById("categoryLevel3");
const lvl4 = document.getElementById("categoryLevel4");

const lvl1Wrap = document.getElementById("lvl1Wrap");
const lvl2Wrap = document.getElementById("lvl2Wrap");
const lvl3Wrap = document.getElementById("lvl3Wrap");
const lvl4Wrap = document.getElementById("lvl4Wrap");

const dynamicFields = document.getElementById("dynamicFields");
let lastRenderedCategory = null;
let variantMeasurementField = null;


/* ─────────────────────────────────────────────
   HELPERS — show / hide category levels
───────────────────────────────────────────── */
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
  lastRenderedCategory = null;
}


/* ─────────────────────────────────────────────
   INIT — show level-1, hide the rest
───────────────────────────────────────────── */
showLevel(lvl1Wrap, lvl1, categoryTree, "Select Main Category");
hideLevel(lvl2Wrap, lvl2);
hideLevel(lvl3Wrap, lvl3);
hideLevel(lvl4Wrap, lvl4);
clearDynamic();


/* ─────────────────────────────────────────────
   CATEGORY CHAIN LISTENERS
───────────────────────────────────────────── */

// LEVEL 1
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

// LEVEL 2
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

// LEVEL 3
lvl3.addEventListener("change", () => {
  hideLevel(lvl4Wrap, lvl4);
  clearDynamic();

  const data = categoryTree[lvl1.value]?.[lvl2.value]?.[lvl3.value];
  if (data && Object.keys(data).length) {
    showLevel(lvl4Wrap, lvl4, data, "Select Sub Sub Category");
  } else {
    // FIX #8: removed wrong || lvl2.value fallback — use lvl3.value directly
    loadDynamicFields(lvl3.value);
  }
});

// LEVEL 4
lvl4.addEventListener("change", () => {
  clearDynamic();
  loadDynamicFields(lvl4.value);
});


/* ─────────────────────────────────────────────
   VALIDATION HELPERS — alpha / numeric restrict
───────────────────────────────────────────── */
function restrictToAlpha(input) {
  input.addEventListener("keydown", function (e) {
    const key = e.key;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(key)) return;
    if (key === " " && input.value.length === 0) { e.preventDefault(); return; }
    if (key === " " && input.value.slice(-1) === " ") { e.preventDefault(); return; }
    if (!/^[a-zA-Z ]$/.test(key)) e.preventDefault();
  });
  input.addEventListener("paste", function (e) {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData("text");
    const cleaned = pasted.replace(/[^a-zA-Z ]/g, "").replace(/^\s+/, "").replace(/\s{2,}/g, " ");
    input.value = input.value.slice(0, input.selectionStart) + cleaned + input.value.slice(input.selectionEnd);
  });
}

function restrictToNumeric(input) {
  input.addEventListener("keydown", function (e) {
    const key = e.key;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(key)) return;
    if (!/^[0-9]$/.test(key)) e.preventDefault();
  });
  input.addEventListener("paste", function (e) {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData("text");
    const cleaned = pasted.replace(/[^0-9]/g, "");
    input.value = input.value.slice(0, input.selectionStart) + cleaned + input.value.slice(input.selectionEnd);
  });
}


/* ─────────────────────────────────────────────
   ERROR DISPLAY — showError / clearError
   FIX #4: clearError now REMOVES the element
   so validateDynamicFields duplicate-check works
───────────────────────────────────────────── */
function showError(input, message) {
  input.classList.add("error");
  const group = input.closest(".form-group");
  if (!group) return;

  let error = group.querySelector(".error-text");
  if (!error) {
    error = document.createElement("div");
    error.className = "error-text";
    group.appendChild(error);
  }
  error.innerText = message;
}

function clearError(input) {
  input.classList.remove("error");
  const group = input.closest(".form-group");
  if (!group) return;
  // FIX #4: remove the element entirely instead of just clearing text
  const error = group.querySelector(".error-text");
  if (error) error.remove();
}


/* ─────────────────────────────────────────────
   DYNAMIC FIELD LOADER
   FIX #6: reset sizePriceMap on every load
   FIX #8: no wrong lvl2 fallback
───────────────────────────────────────────── */
function loadDynamicFields(categoryKey) {
  dynamicFields.innerHTML = "";
  if (!categoryKey) return;
  if (categoryKey === lastRenderedCategory) return;
  lastRenderedCategory = categoryKey;

  // FIX #6 — clear stale size→price map from previous category
  window.sizePriceMap = {};

  const MEASUREMENT_NAMES = ["sizes", "size", "sareeLength", "length", "weight"];
  variantMeasurementField = null;

  const gender = lvl1.value;
  const parentCategory = lvl3.value;

  let resolvedFields = [];

  // Dress sub-category (level 4 selected under Dress)
  if (parentCategory === "Dress" && categoryFields[`Dress_${categoryKey}`]) {
    resolvedFields = categoryFields[`Dress_${categoryKey}`];
  }
  // DressMaterial sub-category
  else if (parentCategory === "DressMaterial" && categoryFields[`DressMaterial_${categoryKey}`]) {
    resolvedFields = categoryFields[`DressMaterial_${categoryKey}`];
  }
  // Exact match in categoryFields
  else if (categoryFields[categoryKey]) {
    resolvedFields = categoryFields[categoryKey];
  }
  // Women footwear fallback
  else if (
    ["Flats", "Heels", "Kolhapuri", "Juttis"].includes(categoryKey) &&
    categoryFields[`${gender}_Footwear`]
  ) {
    resolvedFields = categoryFields[`${gender}_Footwear`];
  }
  // Men footwear fallback
  else if (
    ["Mojaris", "Sandals", "FormalShoes"].includes(categoryKey) &&
    categoryFields["Men_Footwear"]
  ) {
    resolvedFields = categoryFields["Men_Footwear"];
  }

  // Detect measurement field for variant section
  variantMeasurementField = resolvedFields.find(f =>
    MEASUREMENT_NAMES.includes(f.name)
  ) || null;

  const fields = [
    ...defaultCategoryFields,
    ...resolvedFields,
    ...globalReturnRefundFields
  ];

  const grid = document.createElement("div");
  grid.className = "form-grid";
  grid.style.marginTop = "16px";

  fields.forEach(field => {
    const group = document.createElement("div");
    group.className = "form-group";

    const label = document.createElement("label");
    label.className = "form-label";
    label.innerHTML = field.label + (field.required ? ' <span class="required">*</span>' : "");

    let input;

    if (field.type === "select") {
      // Colour selector with swatch
      if (field.name === "coloursAvailable") {
        const wrapper = document.createElement("div");
        wrapper.className = "color-selector";

        const swatch = document.createElement("div");
        swatch.className = "color-swatch";

        input = document.createElement("select");
        input.name = field.name;
        input.className = "form-select color-select";
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
      input.name = field.name;
      input.className = "form-select";
      input.innerHTML = `<option value="">Select ${field.label}</option>`;
      field.options.forEach(opt => {
        input.innerHTML += `<option value="${opt}">${opt}</option>`;
      });

    } else {
      input = document.createElement("input");
      input.name = field.name;
      input.type = "text";
      input.className = "form-input";
      input.placeholder = field.placeholder || "";

      if (field.name === "state") {
        restrictToAlpha(input);
      } else if (field.name === "sellingPrice" || field.name === "totalQuantity") {
        restrictToNumeric(input);
      }
    }

    group.append(label, input);
    grid.appendChild(group);
  });

  dynamicFields.appendChild(grid);
  attachDynamicFieldBlurValidation();
  updateVariantMeasurementFields();

  // Disable refundDays by default
  grid.querySelectorAll(".form-group").forEach(fg => {
    const lbl = fg.querySelector(".form-label");
    const lblText = lbl?.childNodes[0]?.nodeValue?.trim();
    if (lblText === "Refund Processing (Days)") {
      const sel = fg.querySelector("select");
      if (sel) { sel.disabled = true; sel.required = false; }
    }
  });
}


/* ─────────────────────────────────────────────
   IMAGE UPLOAD SYSTEM
───────────────────────────────────────────── */
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

// Sub images
document.querySelectorAll(".upload-box").forEach((box) => {
  const input = box.querySelector('input[type="file"]');
  const preview = box.querySelector(".preview-image");
  box.addEventListener("click", () => input.click());
  input.addEventListener("change", (e) => handleFileSelect(e, box, preview));
});

// Variant uploads — delegated
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
    addDeleteButton(container, preview);
    validateImages();
    // validateSubImages();
  };
  reader.readAsDataURL(file);
}

function addDeleteButton(container, preview) {
  if (container.querySelector(".delete-image-btn")) return;

  const btn = document.createElement("div");
  btn.className = "delete-image-btn";
  btn.innerHTML = "×";

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    showConfirm({
      title: "Delete Image",
      message: "Are you sure you want to delete this image?",
      onConfirm: () => {
        preview.src = "";
        container.classList.remove("has-image");
        const input = container.querySelector('input[type="file"]');
        if (input) input.value = "";
        btn.remove();
        validateImages();
        validateMainImage();
      }
    });
  });

  container.appendChild(btn);
}


/* ─────────────────────────────────────────────
   CONFIRM MODAL (reusable)
───────────────────────────────────────────── */
let confirmCallback = null;

function showConfirm({ title, message, onConfirm }) {
  const modal = document.getElementById("confirmModal");
  document.getElementById("confirmTitle").innerText = title;
  document.getElementById("confirmMessage").innerText = message;
  confirmCallback = onConfirm;
  modal.classList.remove("hidden");
}

document.getElementById("confirmOk").onclick = () => {
  document.getElementById("confirmModal").classList.add("hidden");
  if (confirmCallback) confirmCallback();
};

document.getElementById("confirmCancel").onclick = () => {
  document.getElementById("confirmModal").classList.add("hidden");
};


/* ─────────────────────────────────────────────
   PRODUCT NAME & DESCRIPTION
───────────────────────────────────────────── */
const productName = document.getElementById("productName");
productName.addEventListener("input", (e) => {
  if (e.target.value.startsWith(" ")) {
    e.target.value = e.target.value.trimStart();
  }
});

const productDescription = document.getElementById("productDescription");
const charCount = document.getElementById("charCount");

productDescription.addEventListener("input", (e) => {
  if (e.target.value.startsWith(" ")) {
    e.target.value = e.target.value.trimStart();
  }
  charCount.textContent = e.target.value.length;
});


/* ─────────────────────────────────────────────
   QUANTITY INPUT — digits only (delegated)
───────────────────────────────────────────── */
document.addEventListener("input", (e) => {
  if (e.target.classList.contains("quantity-input")) {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  }
});

document.addEventListener("input", function (e) {
  if (e.target.classList.contains("variant-price-input")) {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  }
});


/* ─────────────────────────────────────────────
   SIZE → PRICE HELPERS
───────────────────────────────────────────── */
function getMainSizeAndPrice() {
  if (!variantMeasurementField) return null;
  const measurementName = variantMeasurementField.name;
  const mainSize = document.querySelector(
    `#dynamicFields select[name="${measurementName}"],
     #dynamicFields input[name="${measurementName}"]`
  );
  const mainPrice = document.querySelector('#dynamicFields input[placeholder="₹ 2499"]');
  if (!mainSize || !mainPrice) return null;
  return {
    size: mainSize.value.trim(),
    price: mainPrice.value.trim()
  };
}

function getPriceFromExistingSize(size) {
  const mainData = getMainSizeAndPrice();
  if (mainData && mainData.size === size) return mainData.price;
  if (window.sizePriceMap && window.sizePriceMap[size]) return window.sizePriceMap[size];
  return null;
}


/* ─────────────────────────────────────────────
   VARIANTS
───────────────────────────────────────────── */
let variantCount = 1;

document.getElementById("addVariantBtn").addEventListener("click", () => {
  variantCount++;
  const container = document.getElementById("variantsContainer");
  container.appendChild(createVariant(variantCount));
});

function createVariant(number) {
  const div = document.createElement("div");
  div.className = "variant-container";
  div.dataset.variant = number;

  const measurementHTML = buildMeasurementHTML();

  div.innerHTML = `
    <div class="variant-header">
      <h3 class="variant-title">Variant ${number}</h3>
      <div class="variant-actions">
        <button class="icon-btn delete-variant">
          <img src="../assets/vendorAddProduct/Trash.svg" alt="">
        </button>
      </div>
    </div>

    <div class="variant-body">
      <div class="form-group">
        <label class="form-label">Product Image</label>
        <div class="variant-upload-grid">
          ${Array(6).fill(0).map((_, i) => `
            <div class="upload-box variant-upload" data-variant-upload="${i}">
              <img class="upload-box-icon" src="../assets/vendorAddProduct/UploadSimple.svg" alt="">
              <span class="upload-box-text">Upload</span>
              <img class="preview-image" alt="Preview">
              <input type="file" accept="image/*">
            </div>
          `).join("")}
        </div>
      </div>

      <div class="form-grid">

        ${measurementHTML}

        <div class="form-group">
          <label class="form-label">Colours Available</label>
          <div class="color-selector">
            <div class="color-swatch"></div>
            <select class="form-select color-select">
              <option value="" selected disabled>Select color</option>
              <option value="Red">Red</option>
              <option value="Maroon">Maroon</option>
              <option value="Blue">Blue</option>
              <option value="Navy Blue">Navy Blue</option>
              <option value="Green">Green</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Yellow">Yellow</option>
              <option value="Pink">Pink</option>
              <option value="Purple">Purple</option>
              <option value="Orange">Orange</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Brown">Brown</option>
              <option value="Beige">Beige</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Price (₹) <span class="required">*</span></label>
          <input type="text" class="form-input variant-price-input" placeholder="1200">
        </div>

        <div class="form-group full-width">
          <label class="form-label">Total Quantity <span class="required">*</span></label>
          <input type="text" class="form-input quantity-input" placeholder="112">
        </div>

      </div>
    </div>
  `;
  return div;
}

function buildMeasurementHTML() {
  if (!variantMeasurementField) return "";
  const f = variantMeasurementField;
  if (f.type === "select" && f.options) {
    const optionsHTML = f.options.map(o => `<option value="${o}">${o}</option>`).join("");
    return `
      <div class="form-group variant-measurement-group">
        <label class="form-label">${f.label} <span class="required">*</span></label>
        <select class="form-select variant-size-select">
          <option value="">Select ${f.label}</option>
          ${optionsHTML}
        </select>
      </div>`;
  } else if (f.type === "text") {
    return `
      <div class="form-group variant-measurement-group">
        <label class="form-label">${f.label} <span class="required">*</span></label>
        <input type="text" class="form-input variant-size-input" placeholder="Enter ${f.label}">
      </div>`;
  }
  return "";
}

function updateVariantMeasurementFields() {
  document.querySelectorAll(".variant-container").forEach(variant => {
    const formGrid = variant.querySelector(".form-grid");
    if (!formGrid) return;

    const existing = formGrid.querySelector(".variant-measurement-group");
    if (existing) existing.remove();

    const newHTML = buildMeasurementHTML();
    if (newHTML) {
      const quantityGroup = formGrid.querySelector(".full-width");
      if (quantityGroup) {
        quantityGroup.insertAdjacentHTML("beforebegin", newHTML);
      }
    }

    // FIX #7 — reset price readOnly when category changes
    const priceInput = formGrid.querySelector(".variant-price-input");
    if (priceInput) {
      priceInput.readOnly = false;
      priceInput.value = "";
    }
  });
}


/* ─────────────────────────────────────────────
   VARIANT — size change → auto-fill price
───────────────────────────────────────────── */
document.addEventListener("change", function (e) {
  const sizeField = e.target.closest(".variant-size-select, .variant-size-input");
  if (!sizeField) return;

  checkAllVariantCombinations(sizeField);

  const variant = sizeField.closest(".variant-container");
  const priceInput = variant.querySelector(".variant-price-input");
  const variantSize = sizeField.value.trim();
  const existingPrice = getPriceFromExistingSize(variantSize);

  if (existingPrice) {
    priceInput.value = existingPrice;
    priceInput.readOnly = true;
  } else {
    priceInput.value = "";
    priceInput.readOnly = false;
  }
});

// When main price changes → sync locked variant prices
document.addEventListener("input", function (e) {
  const mainPrice = document.querySelector('#dynamicFields input[placeholder="₹ 2499"]');
  if (e.target !== mainPrice) return;

  const mainData = getMainSizeAndPrice();
  if (!mainData) return;

  document.querySelectorAll(".variant-container").forEach(variant => {
    const size = variant.querySelector(".variant-size-select, .variant-size-input");
    const price = variant.querySelector(".variant-price-input");
    if (!size || !price) return;
    if (size.value.trim() === mainData.size) {
      price.value = mainData.price;
      price.readOnly = false;
    }
  });
});

// Store price by size when user manually types in variant price
document.addEventListener("input", function (e) {
  if (!e.target.classList.contains("variant-price-input")) return;
  const variant = e.target.closest(".variant-container");
  const sizeField = variant.querySelector(".variant-size-select, .variant-size-input");
  if (!sizeField) return;
  const size = sizeField.value.trim();
  const price = e.target.value.trim();
  if (size && price) {
    window.sizePriceMap = window.sizePriceMap || {};
    window.sizePriceMap[size] = price;
  }
});


/* ─────────────────────────────────────────────
   VARIANT — delete
───────────────────────────────────────────── */
document.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-variant");
  if (!deleteBtn) return;
  const variant = deleteBtn.closest(".variant-container");
  if (document.querySelectorAll(".variant-container").length <= 1) return;

  showConfirm({
    title: "Delete Variant",
    message: "Are you sure you want to delete this variant?",
    onConfirm: () => variant.remove()
  });
});


/* ─────────────────────────────────────────────
   COLOR MAP & SWATCH UPDATE
   FIX #5: variant options use colour NAMES (not hex)
   so duplicate-check keys are consistent
───────────────────────────────────────────── */
const COLOR_MAP = {
  "Red": "#e53935",
  "Maroon": "#880e4f",
  "Blue": "#1e88e5",
  "Navy Blue": "#1a237e",
  "Green": "#43a047",
  "Black": "#212121",
  "White": "#f5f5f5",
  "Yellow": "#fdd835",
  "Pink": "#e91e63",
  "Purple": "#8e24aa",
  "Orange": "#fb8c00",
  "Gold": "#ffc107",
  "Silver": "#90a4ae",
  "Brown": "#6d4c41",
  "Beige": "#d7ccc8"
};

document.addEventListener("change", function (e) {
  if (!e.target.classList.contains("color-select")) return;

  const select = e.target;
  const swatch = select.closest(".color-selector")?.querySelector(".color-swatch");
  // value is now a colour name — look up hex for swatch
  if (swatch) {
    swatch.style.backgroundColor = COLOR_MAP[select.value] || select.value || "";
  }

  checkAllVariantCombinations(select);
});


/* ─────────────────────────────────────────────
   DUPLICATE VARIANT COMBINATION CHECK
   FIX #5: keys now always use colour NAME strings
   FIX — called with null on submit so no field reset
───────────────────────────────────────────── */
function checkAllVariantCombinations(changedField) {
  const combinations = new Set();

  // Include main product colour + size
  const mainColorName = document.querySelector("#dynamicFields .color-select")?.value || "";
  const mainData = getMainSizeAndPrice();
  if (mainColorName && mainData?.size) {
    combinations.add(mainData.size + "_" + mainColorName);
  }

  let valid = true;

  document.querySelectorAll(".variant-container").forEach(variant => {
    const colorSelect = variant.querySelector(".color-select");
    const sizeField = variant.querySelector(".variant-size-select, .variant-size-input");

    const colorName = colorSelect?.value || "";
    const size = sizeField?.value || "";

    if (!colorName || !size) return;

    const key = size + "_" + colorName;

    if (combinations.has(key)) {
      alert("Same Size + Colour combination already exists");

      // Only reset the field the user just changed (not on submit scan)
      if (changedField && changedField === colorSelect) {
        colorSelect.value = "";
        const swatch = colorSelect.closest(".color-selector")?.querySelector(".color-swatch");
        if (swatch) swatch.style.backgroundColor = "";
      }
      if (changedField && changedField === sizeField) {
        sizeField.value = "";
      }

      valid = false;
    } else {
      combinations.add(key);
    }
  });

  return valid;
}


/* ─────────────────────────────────────────────
   CONDITIONAL: availableForReturnRefund → refundDays
───────────────────────────────────────────── */
document.addEventListener("change", function (e) {
  const select = e.target;
  if (!select.classList.contains("form-select")) return;

  const formGroup = select.closest(".form-group");
  if (!formGroup) return;

  const labelEl = formGroup.querySelector(".form-label");
  if (!labelEl) return;

  const labelText = labelEl.childNodes[0]?.nodeValue?.trim();
  if (labelText !== "Available for Return/Refund") return;

  const grid = select.closest(".form-grid");
  if (!grid) return;

  let refundSelect = null;
  grid.querySelectorAll(".form-group").forEach(fg => {
    const lbl = fg.querySelector(".form-label");
    const lblText = lbl?.childNodes[0]?.nodeValue?.trim();
    if (lblText === "Refund Processing (Days)") {
      refundSelect = fg.querySelector("select");
    }
  });

  if (!refundSelect) return;

  const isRequired = select.value === "Yes";
  refundSelect.required = isRequired;
  refundSelect.disabled = !isRequired;

  const refundLabel = refundSelect.closest(".form-group")?.querySelector(".form-label");
  if (refundLabel) {
    const existingStar = refundLabel.querySelector(".required");
    if (isRequired && !existingStar) {
      const star = document.createElement("span");
      star.className = "required";
      star.textContent = " *";
      refundLabel.appendChild(star);
    } else if (!isRequired && existingStar) {
      existingStar.remove();
      clearError(refundSelect);
    }
  }
});


/* ─────────────────────────────────────────────
   ADDRESS MANAGEMENT
───────────────────────────────────────────── */
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
  const stateVal    = document.getElementById("addressState").value;
  const cityVal     = document.getElementById("addressCity").value;
  const pincodeVal  = document.getElementById("addressPincode").value;
  const landmarkVal = document.getElementById("addressLandmark").value;
  const laneVal     = document.getElementById("addressLane").value;

  let isValid = true;

  // Validate all mandatory address fields
  addressMandatoryFields.forEach(id => {
    const field = document.getElementById(id);
    if (!field.value.trim()) {
      showError(field, "This field is required");
      isValid = false;
    }
  });

  // Extra pincode validation
  if (pincodeVal && (pincodeVal.length !== 6 || pincodeVal === "000000")) {
    showError(document.getElementById("addressPincode"), "Enter valid 6 digit pincode");
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
        ${laneVal}<br>
        ${landmarkVal},<br>
        ${cityVal}, ${stateVal},<br>
        ${pincodeVal}
      </div>
    </div>
  `;

  document.getElementById("addressList").appendChild(addressCard);
  addressForm.classList.remove("active");
  document.getElementById("addressList").classList.remove("hidden");

  // Reset form
  ["addressState","addressCity","addressPincode","addressLandmark","addressLane","addressMapLink"]
    .forEach(id => { document.getElementById(id).value = ""; });
});

// Mandatory address fields blur validation
const addressMandatoryFields = [
  "addressState",
  "addressCity",
  "addressPincode",
  "addressLandmark",
  "addressMapLink",
  "addressLane",
];

addressMandatoryFields.forEach(id => {
  const field = document.getElementById(id);
  field.addEventListener("blur", () => {
    if (!field.value.trim()) {
      showError(field, "This field is required");
    } else {
      clearError(field);
    }
  });
});

// Pincode — digits only, max 6
const pincodeInput = document.getElementById("addressPincode");
pincodeInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6);
});
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

// Landmark — letters and spaces only
const landmarkInput = document.getElementById("addressLandmark");
landmarkInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
});

// Lane — no leading spaces
const laneInput = document.getElementById("addressLane");
laneInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/^\s+/g, "");
});


/* ─────────────────────────────────────────────
   ADDRESS CHECKBOX — single-select behaviour
───────────────────────────────────────────── */
document.addEventListener("change", function (e) {
  if (!e.target.classList.contains("address-checkbox")) return;
  document.querySelectorAll(".address-checkbox").forEach(cb => {
    if (cb !== e.target) cb.checked = false;
  });
  const error = document.getElementById("addressError");
  if (error) error.remove();
});


/* ─────────────────────────────────────────────
   PRODUCT MANDATORY FIELDS BLUR VALIDATION
───────────────────────────────────────────── */
const productMandatoryFields = [
  { id: "productName",        message: "Product name is required" },
  { id: "productDescription", message: "Product description is required" },
  { id: "categoryLevel1",     message: "Please select main category" }
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


/* ─────────────────────────────────────────────
   DYNAMIC FIELDS BLUR VALIDATION
───────────────────────────────────────────── */
function attachDynamicFieldBlurValidation() {
  dynamicFields.querySelectorAll(".form-group").forEach(formGroup => {
    const label = formGroup.querySelector(".form-label");
    const input = formGroup.querySelector("input, select, textarea");
    if (!input || !label) return;

    const isRequired = label.innerHTML.includes("*");
    if (!isRequired) return; // skip truly optional fields

    input.addEventListener("blur", () => {
      if (!input.value.trim()) {
        showError(input, "This field is required");
      } else {
        clearError(input);
      }
    });
  });
}


/* ─────────────────────────────────────────────
   LIVE CLEAR ON INPUT/CHANGE
───────────────────────────────────────────── */
document.addEventListener("input", function (e) {
  if (e.target.matches("input, textarea")) {
    if (e.target.value.trim()) clearError(e.target);
  }
});

document.addEventListener("change", function (e) {
  if (e.target.matches("select")) {
    if (e.target.value) clearError(e.target);
  }
});


/* ─────────────────────────────────────────────
   VARIANT BLUR VALIDATION
───────────────────────────────────────────── */
document.addEventListener("blur", function (e) {
  if (
    e.target.classList.contains("variant-price-input") ||
    e.target.classList.contains("quantity-input") ||
    e.target.classList.contains("variant-size-select")
  ) {
    if (!e.target.value) {
      showError(e.target, "This field is required");
    } else {
      clearError(e.target);
    }
  }
}, true);


/* ─────────────────────────────────────────────
   VALIDATION FUNCTIONS
───────────────────────────────────────────── */
function getDeepestSelectedCategory() {
  return lvl4.value || lvl3.value || lvl2.value || lvl1.value || "";
}

function validateMainImage() {
  const errorDiv = document.getElementById("imageError");
  if (!mainUpload.classList.contains("has-image")) {
    errorDiv.innerText = "Product cover photo is required";
    errorDiv.style.display = "block";
    mainUpload.classList.add("error");
    mainUpload.scrollIntoView({ behavior: "smooth", block: "center" });
    return false;
  }
  mainUpload.classList.remove("error");
  errorDiv.style.display = "none";
  return true;
}

// function validateSubImages() {
//   const boxes = document.querySelectorAll(".upload-box");
//   let hasImage = false;
//   boxes.forEach(box => { if (box.classList.contains("has-image")) hasImage = true; });

//   if (!hasImage) {
//     boxes.forEach(b => b.classList.add("error"));
//     document.getElementById("imageError").innerText = "At least one image is required";
//     document.getElementById("imageError").style.display = "block";
//     return false;
//   }

//   boxes.forEach(b => b.classList.remove("error"));
//   document.getElementById("imageError").style.display = "none";
//   return true;
// }

function validateImages() {
  let count = 0;
  if (mainUpload.classList.contains("has-image")) count++;
  document.querySelectorAll(".upload-box").forEach(box => {
    if (box.classList.contains("has-image")) count++;
  });

  const errorDiv = document.getElementById("imageError");
  if (count < 1) {
    errorDiv.innerText = "Please upload at least 1 product image";
    errorDiv.style.display = "block";
    return false;
  }
  errorDiv.style.display = "none";
  return true;
}

function validateVariantImages() {
  let valid = true;
  document.querySelectorAll(".variant-container").forEach(variant => {
    if (variant.style.display === "none") return;
    const uploads = variant.querySelectorAll(".variant-upload");
    let imageCount = 0;
    uploads.forEach(box => { if (box.classList.contains("has-image")) imageCount++; });

    variant.querySelectorAll(".variant-image-error").forEach(e => e.remove());
    uploads.forEach(box => box.classList.remove("error"));

    if (imageCount < 1) {
      valid = false;
      uploads.forEach(box => box.classList.add("error"));
      const error = document.createElement("div");
      error.className = "error-text variant-image-error";
      error.innerText = "Please upload at least 1 image for this variant";
      const group = variant.querySelector(".variant-upload-grid").parentElement;
      group.appendChild(error);
    }
  });
  return valid;
}

function validateDynamicFields() {
  let isValid = true;
  document.querySelectorAll("#dynamicFields .form-group").forEach(group => {
    const input = group.querySelector("input, select");
    const label = group.querySelector(".form-label");
    if (!input || !label) return;
    const isRequired = label.innerHTML.includes("*");
    if (isRequired && !input.value.trim()) {
      showError(input, "This field is required");
      isValid = false;
    }
  });
  return isValid;
}

function validateVariants() {
  let valid = true;

  document.querySelectorAll(".variant-container").forEach(variant => {
    if (variant.style.display === "none") return;

    const color = variant.querySelector(".color-select");
    const size  = variant.querySelector(".variant-size-select, .variant-size-input");
    const price = variant.querySelector(".variant-price-input");
    const qty   = variant.querySelector(".quantity-input");

    if (color && !color.value) { showError(color, "Colour is required"); valid = false; }
    else if (color) clearError(color);

    if (size && !size.value) { showError(size, "Size is required"); valid = false; }
    else if (size) clearError(size);

    if (price && !price.value.trim()) { showError(price, "Price is required"); valid = false; }
    else if (price) clearError(price);

    if (qty && !qty.value.trim()) { showError(qty, "Total quantity is required"); valid = false; }
    else if (qty) clearError(qty);
  });

  if (!validateVariantImages()) valid = false;

  return valid;
}

function validateVariantCombinations() {
  const combinations = new Set();
  let valid = true;

  document.querySelectorAll(".variant-container").forEach(variant => {
    const color = variant.querySelector(".color-select")?.value;
    const size  = variant.querySelector(".variant-size-select, .variant-size-input")?.value;
    if (!color || !size) return;
    const key = size + "_" + color;
    if (combinations.has(key)) {
      alert("Same Size and Colour combination already exists in another variant");
      const colorField = variant.querySelector(".color-select");
      const sizeField  = variant.querySelector(".variant-size-select, .variant-size-input");
      showError(colorField, "Duplicate variant combination");
      showError(sizeField,  "Duplicate variant combination");
      valid = false;
    } else {
      combinations.add(key);
    }
  });
  return valid;
}

function hasVariants() {
  return document.querySelectorAll(".variant-container:not([style*='display: none'])").length > 0;
}

function validateAddressSelection() {
  const checkboxes = document.querySelectorAll(".address-checkbox");
  const isChecked  = Array.from(checkboxes).some(cb => cb.checked);
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
  }
  if (error) error.remove();
  return true;
}

// FIX #3: guard against null .field-name in return-only rows
function validateInfoSections() {
  let isValid = true;

  document.querySelectorAll(".info-row").forEach(row => {
    const name    = row.querySelector(".field-name");
    const desc    = row.querySelector(".field-desc");
    const nameErr = row.querySelector(".name-error");
    const descErr = row.querySelector(".desc-error");

    // Return-section rows have no .field-name — skip name check
    if (name) {
      if (!name.value.trim()) {
        name.classList.add("error");
        if (nameErr) nameErr.innerText = "Required";
        isValid = false;
      } else {
        name.classList.remove("error");
        if (nameErr) nameErr.innerText = "";
      }
    }

    if (desc) {
      if (!desc.value.trim()) {
        desc.classList.add("error");
        if (descErr) descErr.innerText = "Required";
        isValid = false;
      } else {
        desc.classList.remove("error");
        if (descErr) descErr.innerText = "";
      }
    }
  });

  return isValid;
}

function validateReturnSection() {
  let valid = true;
  document.querySelectorAll("#returnInfoContainer .info-row").forEach(row => {
    const textarea = row.querySelector("textarea");
    if (!textarea) return;
    if (!textarea.value.trim()) {
      showError(textarea, "Return policy is required");
      valid = false;
    } else {
      clearError(textarea);
    }
  });
  return valid;
}


/* ─────────────────────────────────────────────
   INFO SECTIONS — add another / delete row
   FIX #9: ONE delete-row listener (was registered twice)
───────────────────────────────────────────── */
document.addEventListener("click", function (e) {
  // ADD ANOTHER
  if (e.target.classList.contains("add-another-btn")) {
    const section   = e.target.dataset.section;
    const container = document.getElementById(section + "InfoContainer");
    if (!container) return;

    const newRow = document.createElement("div");
    newRow.className = "info-row";

    if (section === "return") {
      newRow.innerHTML = `
        <div class="textarea-group full-width">
          <label>Write Description <span class="required">*</span></label>
          <textarea class="field-desc" maxlength="1000"></textarea>
          <div class="char-count">0/1000</div>
          <span class="error-text desc-error"></span>
        </div>
        <button type="button" class="delete-row-btn"> X </button>
      `;
    } else {
      newRow.innerHTML = `
        <div class="input-group">
          <label>Enter Field Name <span class="required">*</span></label>
          <input type="text" class="field-name">
          <span class="error-text name-error"></span>
        </div>
        <div class="textarea-group">
          <label>Description <span class="required">*</span></label>
          <textarea class="field-desc"></textarea>
          <span class="error-text desc-error"></span>
        </div>
        <button type="button" class="delete-row-btn"> X </button>
      `;
    }

    container.appendChild(newRow);
    return;
  }

  // DELETE ROW — FIX #9: single listener only
  if (e.target.classList.contains("delete-row-btn")) {
    const row = e.target.closest(".info-row");
    showConfirm({
      title: "Delete Field",
      message: "Are you sure you want to delete this?",
      onConfirm: () => row.remove()
    });
  }
});

document.addEventListener("click", function (e) {
  const btn = e.target.closest(".delete-btn");

  if (btn) {
    btn.closest(".return-item").remove();
  }
});
// Live clear on return textarea
document.addEventListener("input", function (e) {
  if (e.target.matches("#returnInfoContainer textarea")) {
    if (e.target.value.trim()) {
      e.target.classList.remove("error");
      const err = e.target.closest(".info-row")?.querySelector(".desc-error");
      if (err) err.innerText = "";
    }
  }
});


/* ─────────────────────────────────────────────
   FINAL CONFIRM MODAL REFERENCES
───────────────────────────────────────────── */
const savePreviewBtn    = document.querySelector(".save-preview-btn");
const finalConfirmModal = document.getElementById("finalConfirmModal");
const confirmCheckbox   = document.getElementById("confirmCheckbox");
const confirmCheckboxError = document.getElementById("confirmCheckboxError");


/* ─────────────────────────────────────────────
   SAVE & PREVIEW — SINGLE SUBMIT HANDLER
   FIX #1: was registered TWICE, now only once
   FIX #10: validateReturnSection called once
   FIX #11: validateDynamicFields works correctly
      because clearError now removes the element
───────────────────────────────────────────── */
savePreviewBtn.addEventListener("click", function () {
  let isValid = true;

  // 1. Main image
  if (!validateMainImage())        isValid = false;

  // 2. Sub images
  // if (!validateSubImages())        isValid = false;

  // 3. Variants (only when variants exist)
  if (hasVariants()) {
    if (!validateVariants())            isValid = false;
    if (!validateVariantCombinations()) isValid = false;
  }

  // 4. Product mandatory fields (name, description, category)
  productMandatoryFields.forEach(obj => {
    const field = document.getElementById(obj.id);
    if (!field.value.trim()) {
      showError(field, obj.message);
      isValid = false;
    }
  });

  // 5. Cross-variant + main-product duplicate combination check
  if (!checkAllVariantCombinations(null)) isValid = false;

  // 6. Dynamic category fields
  if (!validateDynamicFields())    isValid = false;

  // 7. Info sections (product / additional / care) + return section
  //    FIX #10: validateInfoSections covers all rows;
  //    validateReturnSection handles return textareas specifically — called ONCE each
  if (!validateInfoSections())     isValid = false;
  if (!validateReturnSection())    isValid = false;

  // 8. Address selection
  if (!validateAddressSelection()) isValid = false;

  // 9. Category fully selected
  if (!getDeepestSelectedCategory()) {
    showError(lvl1, "Please complete category selection");
    isValid = false;
  }

  if (!isValid) {
    const firstError = document.querySelector(".error-text");
    if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  // All valid — show confirmation modal
  finalConfirmModal.classList.remove("hidden");
});

// Final confirm modal buttons
document.getElementById("finalConfirmCancel").addEventListener("click", () => {
  finalConfirmModal.classList.add("hidden");
  confirmCheckbox.checked = false;
  confirmCheckboxError.style.display = "none";
});

document.getElementById("finalConfirmOk").addEventListener("click", () => {
  if (!confirmCheckbox.checked) {
    confirmCheckboxError.style.display = "block";
    return;
  }
  confirmCheckboxError.style.display = "none";
  window.location.href = "../html/vendorProductPreview.html";
});


/* ─────────────────────────────────────────────
   BROWSER BACK / CACHE RESTORE
───────────────────────────────────────────── */
window.addEventListener("pageshow", function (e) {
  const restoredCategory = getDeepestSelectedCategory();
  if (restoredCategory) {
    lastRenderedCategory = null;
    loadDynamicFields(restoredCategory);
  }
});



document.querySelector("#sidebar-main-vendor ul>li:nth-child(2)").classList.add("sidebar-active");

document.querySelector("#account-menu li:nth-child(2) .dropdown-header").classList.add("dropdown-header-active");

