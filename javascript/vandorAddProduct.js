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
    { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Silk", "Silk Cotton"] },
    { name: "borderType", label: "Border Type", type: "select", required: true, options: ["Contrast Border", "Temple Border"] },
    { name: "palluDesign", label: "Pallu Design", type: "select", required: true, options: ["Rich Zari", "Traditional Motif"] },
    { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Wedding", "Festive"] },
    { name: "bodyPattern", label: "Body Pattern", type: "select", required: true, options: ["Butta", "Floral", "Plain"] },
    { name: "sareeLength", label: "Saree Length", type: "select", required: true, options: ["5.5 m", "6.3 m"] },
    { name: "careInformation", label: "Care Instructions", type: "select", required: true, options: ["Dry Clean Only"] }
  ],

  "Kalamkari": [
    { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Cotton", "Silk"] },
    { name: "printType", label: "Print Type", type: "select", required: true, options: ["Hand Painted", "Block Print"] },
    { name: "theme", label: "Theme", type: "select", required: true, options: ["Mythology", "Nature"] },
    { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Casual", "Festive"] },
    { name: "colorTone", label: "Color Tone", type: "select", required: true, options: ["Earthy", "Vibrant"] },
    { name: "sareeLength", label: "Saree Length", type: "select", required: true, options: ["5.5 m"] },
    { name: "careInformation", label: "Care Instructions", type: "select", required: true, options: ["Hand Wash", "Dry Clean"] }
  ],

  "Venkatagiri": [
    { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Pure Cotton", "Silk"] },
    { name: "weaveType", label: "Weave Type", type: "select", required: true, options: ["Lightweight Weave"] },
    { name: "borderDesign", label: "Border Design", type: "select", required: true, options: ["Zari Border", "Plain Border"] },
    { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Daily Wear", "Festive"] },
    { name: "bodyPattern", label: "Body Pattern", type: "select", required: true, options: ["Butta", "Plain"] },
    { name: "sareeLength", label: "Saree Length", type: "select", required: true, options: ["5.5 m"] },
    { name: "careInformation", label: "Care Instructions", type: "select", required: true, options: ["Hand Wash"] }
  ],

  "Gadwal": [
    { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Cotton Silk"] },
    { name: "borderType", label: "Border Type", type: "select", required: true, options: ["Contrast Silk Border"] },
    { name: "palluDesign", label: "Pallu Design", type: "select", required: true, options: ["Zari Work"] },
    { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Wedding", "Festive"] },
    { name: "bodyPattern", label: "Body Pattern", type: "select", required: true, options: ["Temple Motif", "Plain"] },
    { name: "weight", label: "Weight", type: "select", required: true, options: ["Light", "Medium"] },
    { name: "careInformation", label: "Care Instructions", type: "select", required: true, options: ["Dry Clean Only"] }
  ],

  "Ponduru": [
    { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Fine Cotton"] },
    { name: "weaveType", label: "Weave Type", type: "select", required: true, options: ["Handspun", "Handwoven"] },
    { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Daily Wear"] },
    { name: "texture", label: "Texture", type: "select", required: true, options: ["Soft", "Lightweight"] },
    // { name: "color", label: "Color", type: "text", required: true },
    { name: "sareeLength", label: "Saree Length", type: "select", required: true, options: ["5.5 m"] },
    { name: "careInformation", label: "Care Instructions", type: "select", required: true, options: ["Hand Wash"] }
  ],

  "Dulla": [
    { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Cotton"] },
    { name: "weaveType", label: "Weave Type", type: "select", required: true, options: ["Traditional Weave"] },
    { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Casual"] },
    { name: "borderStyle", label: "Border Style", type: "select", required: true, options: ["Simple Border"] },
    { name: "pattern", label: "Pattern", type: "select", required: true, options: ["Stripes", "Checks"] },
    { name: "sareeLength", label: "Saree Length", type: "select", required: true, options: ["5.5 m"] },
    { name: "careInformation", label: "Care Instructions", type: "select", required: true, options: ["Hand Wash"] }
  ],

  "Bobbili": [
    { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Cotton", "Silk Blend"] },
    { name: "weaveType", label: "Weave Type", type: "select", required: true, options: ["Traditional Weave"] },
    { name: "borderDesign", label: "Border Design", type: "select", required: true, options: ["Zari", "Simple Border"] },
    { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Festive"] },
    { name: "bodyPattern", label: "Body Pattern", type: "select", required: true, options: ["Butta", "Plain"] },
    { name: "sareeLength", label: "Saree Length", type: "select", required: true, options: ["5.5 m"] },
    { name: "careInformation", label: "Care Instructions", type: "select", required: true, options: ["Dry Clean", "Hand Wash"] }
  ],

  // dress
  "Kalamkari": [
  { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Cotton", "Silk"] },
  { name: "printType", label: "Print Type", type: "select", required: true, options: ["Hand Painted", "Block Print"] },
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Casual", "Festive"] },
  { name: "sleeveLength", label: "Sleeve Length", type: "select", required: true, options: ["Half Sleeve", "Full Sleeve"] },
  { name: "careInformation", label: "Care", type: "select", required: true, options: ["Hand Wash"] }
],

"Madhubani": [
  { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Cotton"] },
  { name: "printTheme", label: "Theme", type: "select", required: true, options: ["Nature", "Mythology"] },
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Casual"] },
  { name: "fit", label: "Fit", type: "select", required: true, options: ["Regular", "Flared"] },
  { name: "careInformation", label: "Care", type: "select", required: true, options: ["Hand Wash"] }
],

"Bandhani": [
  { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Georgette", "Cotton"] },
  { name: "pattern", label: "Pattern", type: "select", required: true, options: ["Tie & Dye"] },
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Festive"] },
  { name: "dupattaIncluded", label: "Dupatta Included", type: "select", required: true, options: ["Yes", "No"] },
  { name: "careInformation", label: "Care", type: "select", required: true, options: ["Dry Clean"] }
],

"Ajrak": [
  { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Cotton"] },
  { name: "printStyle", label: "Print Style", type: "select", required: true, options: ["Block Print"] },
  { name: "colorTone", label: "Color Tone", type: "select", required: true, options: ["Indigo", "Maroon"] },
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Casual"] },
  { name: "careInformation", label: "Care", type: "select", required: true, options: ["Hand Wash"] }
],

"Leheriya": [
  { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Chiffon", "Georgette"] },
  { name: "pattern", label: "Pattern", type: "select", required: true, options: ["Wave Pattern"] },
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Festive"] },
  { name: "dupattaIncluded", label: "Dupatta Included", type: "select", required: true, options: ["Yes", "No"] },
  { name: "careInformation", label: "Care", type: "select", required: true, options: ["Dry Clean"] }
],
// footwear
"KolhapuriChappal": [
  { name: "material", label: "Material", type: "select", required: true, options: ["Leather"] },
  { name: "soleType", label: "Sole Type", type: "select", required: true, options: ["Flat"] },
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Casual", "Festive"] },
  { name: "sizes", label: "Sizes", type: "select", required: true, options: ["6", "7", "8", "9", "10"] },
  { name: "careInformation", label: "Care", type: "select", required: true, options: ["Wipe with dry cloth"] }
],

"JaipurChappal": [
  { name: "material", label: "Material", type: "select", required: true, options: ["Leather"] },
  { name: "embroidery", label: "Embroidery", type: "select", required: true, options: ["Hand Embroidery"] },
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Festive"] },
  { name: "sizes", label: "Sizes", type: "select", required: true, options: ["6", "7", "8", "9"] },
  { name: "careInformation", label: "Care", type: "select", required: true, options: ["Dry Clean"] }
],
// jewellery
"Wooden": [
  { name: "type", label: "Type", type: "select", required: true, options: ["Necklace", "Earrings"] },
  { name: "finish", label: "Finish", type: "select", required: true, options: ["Matte", "Polished"] },
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Daily Wear"] },
  { name: "weight", label: "Weight", type: "text", required: true },
  { name: "returnable", label: "Returnable", type: "select", required: true, options: ["Yes", "No"] }
],

"Terracotta": [
  { name: "type", label: "Type", type: "select", required: true, options: ["Earrings", "Pendant"] },
  // { name: "color", label: "Color", type: "text", required: true },
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Festive"] },
  { name: "handmade", label: "Handmade", type: "select", required: true, options: ["Yes"] },
  { name: "returnable", label: "Returnable", type: "select", required: true, options: ["Yes", "No"] }
],
// arts
"Cheriyal": [
  { name: "medium", label: "Medium", type: "select", required: true, options: ["Natural Colors"] },
  { name: "theme", label: "Theme", type: "select", required: true, options: ["Mythology"] },
  { name: "size", label: "Size", type: "text", required: true },
  { name: "frame", label: "Frame", type: "select", required: true, options: ["With Frame", "Without Frame"] },
  { name: "careInformation", label: "Care", type: "select", required: true, options: ["Avoid Moisture"] }
],

"Gond": [
  { name: "medium", label: "Medium", type: "select", required: true, options: ["Acrylic", "Natural Colors"] },
  { name: "theme", label: "Theme", type: "select", required: true, options: ["Nature", "Animals"] },
  { name: "size", label: "Size", type: "text", required: true },
  { name: "frame", label: "Frame", type: "select", required: true, options: ["With Frame"] },
  { name: "returnable", label: "Returnable", type: "select", required: true, options: ["Yes", "No"] }
],
// crafts
"KondapalliToys": [
  { name: "material", label: "Material", type: "select", required: true, options: ["Soft Wood"] },
  { name: "handpainted", label: "Hand Painted", type: "select", required: true, options: ["Yes"] },
  { name: "theme", label: "Theme", type: "select", required: true, options: ["Village Life"] },
  { name: "size", label: "Size", type: "text", required: true },
  { name: "careInformation", label: "Care", type: "select", required: true, options: ["Keep Dry"] }
],
// HERITAGE
"Dupatta": [
  { name: "fabric", label: "Fabric", type: "select", required: true, options: ["Cotton", "Silk"] },
  { name: "length", label: "Length", type: "text", required: true },
  { name: "pattern", label: "Pattern", type: "select", required: true, options: ["Printed", "Embroidered"] },
  { name: "occasion", label: "Occasion", type: "select", required: true, options: ["Casual", "Festive"] },
  { name: "careInformation", label: "Care", type: "select", required: true, options: ["Hand Wash"] }
],

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
let lastRenderedCategory = null;

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
  lastRenderedCategory = null; 
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
  if (!categoryKey) return;
    if (categoryKey === lastRenderedCategory) return;
  lastRenderedCategory = categoryKey;
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


  function restrictToAlpha(input) {
  input.addEventListener("keydown", function (e) {
    const key = e.key;
    // Allow control keys
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(key)) return;

    // Block leading space
    if (key === " " && input.value.length === 0) {
      e.preventDefault();
      return;
    }

    // Block double space
    if (key === " " && input.value.slice(-1) === " ") {
      e.preventDefault();
      return;
    }

    // Allow only letters and space
    if (!/^[a-zA-Z ]$/.test(key)) {
      e.preventDefault();
    }
  });

  // Handle paste
  input.addEventListener("paste", function (e) {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData("text");
    const cleaned = pasted.replace(/[^a-zA-Z ]/g, "").replace(/^\s+/, "").replace(/\s{2,}/g, " ");
    const start = input.selectionStart;
    const end = input.selectionEnd;
    input.value = input.value.slice(0, start) + cleaned + input.value.slice(end);
  });
}

function restrictToNumeric(input) {
  input.addEventListener("keydown", function (e) {
    const key = e.key;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(key)) return;

    // Allow only digits
    if (!/^[0-9]$/.test(key)) {
      e.preventDefault();
    }
  });

  // Handle paste
  input.addEventListener("paste", function (e) {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData("text");
    const cleaned = pasted.replace(/[^0-9]/g, "");
    const start = input.selectionStart;
    const end = input.selectionEnd;
    input.value = input.value.slice(0, start) + cleaned + input.value.slice(end);
  });
}

  /* ===============================
     3️⃣ FINAL FIELD LIST
     =============================== */
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
      input.innerHTML = `<option value="">Select ${field.label}</option>`;
      field.options.forEach(opt => {
        input.innerHTML += `<option value="${opt}">${opt}</option>`;
      });

    } else {
      input = document.createElement("input");
      input.type = "text";
      input.className = "form-input";
      input.placeholder = field.placeholder || "";
    }
      if (field.name === "state") {
    restrictToAlpha(input);
  } else if (field.name === "sellingPrice" || field.name === "totalQuantity") {
    restrictToNumeric(input);
  }


    group.append(label, input);
    grid.appendChild(group);
  });

  dynamicFields.appendChild(grid);
  attachDynamicFieldBlurValidation();
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

    addDeleteButton(container, preview);
    validateImages(); // re-check count
  };

  reader.readAsDataURL(file);
}

function addDeleteButton(container, preview) {
  // avoid duplicate buttons
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
  const deleteBtn = e.target.closest(".delete-variant");
  if (!deleteBtn) return;

  const variant = deleteBtn.closest(".variant-container");

  if (document.querySelectorAll(".variant-container").length <= 1) return;

  showConfirm({
    title: "Delete Variant",
    message: "Are you sure you want to delete this variant?",
    onConfirm: () => {
      variant.remove();
    }
  });
});


// AFTER — replace with this:
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
  const colorValue = select.value;
  const colorBox = select
    .closest(".color-selector")
    .querySelector(".color-swatch");

  if (!colorValue) {
    colorBox.style.backgroundColor = "";
    return;
  }

  colorBox.style.backgroundColor = COLOR_MAP[colorValue] || colorValue;
});

// CONDITIONAL VALIDATION: availableForReturnRefund → refundDays
document.addEventListener("change", function (e) {
  const select = e.target;
  if (!select.classList.contains("form-select")) return;

  // Check if this is the "Available for Return/Refund" select
  const formGroup = select.closest(".form-group");
  if (!formGroup) return;

  const labelEl = formGroup.querySelector(".form-label");
  if (!labelEl) return;

  // Use trim() to avoid whitespace/star issues
  const labelText = labelEl.childNodes[0]?.nodeValue?.trim();
  if (labelText !== "Available for Return/Refund") return;

  // Find refundDays in the same grid
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

  // Toggle * indicator
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
  { id: "categoryLevel1", message: "Please select main category" }
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
function getDeepestSelectedCategory() {
  return (
    lvl4.value ||
    lvl3.value ||
    lvl2.value ||
    lvl1.value ||
    ""
  );
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
const finalConfirmModal = document.getElementById("finalConfirmModal");
const confirmCheckbox = document.getElementById("confirmCheckbox");
const confirmCheckboxError = document.getElementById("confirmCheckboxError");
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

 

  // Dynamic fields
  if (!validateDynamicFields()) {
    isValid = false;
  }

  // Address checkbox (already implemented earlier)
  if (!validateAddressSelection()) {
    isValid = false;
  }

  if (!getDeepestSelectedCategory()) {
    showError(lvl1, "Please complete category selection");
    isValid = false;
  }
  if (!isValid) {
    const firstError = document.querySelector(".error-text");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }
  if (!getDeepestSelectedCategory()) {
  showError(lvl1, "Please complete category selection");
  isValid = false;
}
// ✅ SHOW CONFIRMATION POPUP
  finalConfirmModal.classList.remove("hidden");

  // ALL VALID
  // window.location.href='../html/vendorProductPreview.html'
});

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

  // ✅ FINAL SUBMIT / PREVIEW
  window.location.href = "../html/vendorProductPreview.html";
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

// Restore dynamic fields on browser back navigation
window.addEventListener("pageshow", function (e) {
  // e.persisted = true means page was restored from cache (back button)
  const restoredCategory = getDeepestSelectedCategory();
  if (restoredCategory) {
    lastRenderedCategory = null; // force re-render
    loadDynamicFields(restoredCategory);
  }
});

document.querySelector("#sidebar-main-vendor ul>li:nth-child(2)").classList.add("sidebar-active");

document.querySelector("#account-menu li:nth-child(2) .dropdown-header").classList.add("dropdown-header-active");

