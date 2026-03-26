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
 * PREFILL DATA
 * — Edit values here to change what gets pre-loaded on the page
 ************************************/
const editProductData = {
  productName: "Dharmavaram Silk Saree",
  productDescription: "Pure silk handwoven saree with zari border.",
  category: {
    lvl1: "Clothing",
    lvl2: "Women",
    lvl3: "Sarees",
    lvl4: "Dharmavaram"
  },
  dynamicFields: {
    brand: "Heritage Looms",
    state: "Andhra Pradesh",
    sellingPrice: "5999",
    totalQuantity: "25",
    occasion: "Wedding",
    sareeFabric: "Silk",
    blouseFabric: "Silk",
    sareeWork: "Zari Work",
    borderType: "Temple Border",
    palluDesign: "Rich Zari",
    color: "Red",
    sizes: "6.3 m",
    regionalTag: "Andhra Pradesh",
    careInformation: "Dry Clean Only",
    applicableToReturn: "Yes",
    coloursAvailable: "Red",
    personalization: "No",
    availableForReturnRefund: "Yes",
    refundDays: "Within 5 Days"
  },
  // Each object = one row. First row fills the existing HTML row; extras are created dynamically.
  productInfo: [
    { name: "Material",          desc: "Pure mulberry silk with hand-woven zari." },
    { name: "Country of Origin", desc: "India" }
  ],
  additionalInfo: [
    { name: "SKU",    desc: "DHR-SILK-RED-001" },
    { name: "Weight", desc: "650 grams" }
  ],
  careInstructions: [
    { name: "Washing", desc: "Dry clean only. Do not machine wash." },
    { name: "Storage", desc: "Store in a muslin cloth. Keep away from moisture." }
  ],
  returnPolicy: [
    { desc: "Returns accepted within 7 days of delivery. Product must be unused and in original packaging. Refund processed within 5 business days after inspection." }
  ],
  images: [
    "../assets/adminProductRecentlyAdded/Rectangle 34628176.svg",
    "../assets/adminProductRecentlyAdded/Rectangle 34628176.svg",
    "../assets/adminProductRecentlyAdded/Rectangle 34628176.svg",
    "../assets/adminProductRecentlyAdded/Rectangle 34628176.svg",
    "../assets/adminProductRecentlyAdded/Rectangle 34628176.svg"
  ]
};


/************************************
 * CATEGORY TREE (4 LEVEL)
 ************************************/
const categoryTree = {
  Clothing: {
    Women: {
      Sarees: {
        Dharmavaram: {}, Kalamkari: {}, Venkatagiri: {}, Gadwal: {}, Ponduru: {},
        Dulla: {}, Bobbili: {}, Mangalagiri: {}, Bandarulanka: {}, Uppada: {},
        Chirala: {}, Mysore: {}, Ilkal: {}, Udupi: {}, Kanjeevaram: {},
        Sungudi: {}, Chettinad: {}, Arani: {}, Muga: {}, Eri: {}, Pat: {},
        MekhelaChador: {}, Bhagalpuri: {}, Madhubani: {}, Tussar: {}, Kosa: {},
        Patola: {}, Bandhani: {}, KutchEmbroidery: {}, Ajrak: {}, Leheriya: {},
        Gajji: {}, KalaCotton: {}, MirrorWork: {}, Batik: {}, Tangaliya: {},
        ChambaRumal: {}, Chanderi: {}, Maheshwari: {}, BaghPrint: {}, Tant: {},
        BanjaraEmbroidery: {}, Paithani: {}, Wari: {}, Himroo: {}, Ikat: {},
        Patta: {}, Sambalpuri: {}, Bomkai: {}, Pattachitra: {}, Phulkari: {},
        KotaDoria: {}, Sanganeri: {}, Bagru: {}, BarmerAppliqueWork: {},
        Pochampally: {}, Narayanpet: {}, Gollabama: {}, GunturCotton: {},
        Banarasi: {}, ChikankariLucknowi: {}, Baluchari: {}, Kantha: {},
        Jamdani: {}, Kasavu: {}, Ghicha: {}, Nauvari: {}
      },
      Dress: {
        Kalamkari: {}, Madhubani: {}, Bandhani: {}, Ajrak: {}, Leheriya: {},
        MirrorWork: {}, Batik: {}, BaghPrint: {}, Warli: {}, Ikat: {},
        Sanganeri: {}, Bagru: {}, ChikankariLucknowi: {}
      },
      DressMaterial: {
        Dharmavaram: {}, Kalamkari: {}, Venkatagiri: {}, Mangalagiri: {},
        Kanjeevaram: {}, MekhelaChador: {}, Madhubani: {}, Patola: {},
        Bandhani: {}, Ajrak: {}, Leheriya: {}, KalaCotton: {}, MirrorWork: {},
        Batik: {}, Pangaliya: {}, Chanderi: {}, BaghPrint: {}, Paithani: {},
        Warli: {}, Ikat: {}, Pattachitra: {}, Phulkari: {}, KotaDoria: {},
        Sanganeri: {}, Bagru: {}, BarmerAppliqueWork: {}, Pochampally: {},
        Narayanpet: {}, Banarasi: {}, Chikankari: {}, Kantha: {}, Jamdani: {}
      }
    }
  },
  Footwear: {
    Women: { KolhapuriChappal: {}, JaipurChappal: {}, DesignerHandEmbroideryFootwear: {} },
    Men:   { KolhapuriChappal: {}, DesignerHandEmbroideryFootwear: {} }
  },
  Jewellery: {
    Women: {
      WoodenJewellery: {}, TerracottaJewellery: {}, ConchShellJewellery: {},
      SilverCoatedJewellery: {}, BrassJewellery: {}, EmbroideryJewellery: {},
      CrochetJewellery: {}, TribalJewellery: {}
    },
    Men: { WoodenJewellery: {}, SilverCoatedJewellery: {}, TribalJewellery: {} }
  },
  Arts: {
    CheriyalPainting: {}, KalamkariPainting: {}, OdishaPattachitraPainting: {},
    MadhubaniPainting: {}, PichwaiPainting: {}, WarliPainting: {}, KalighatPainting: {},
    PataArt: {}, WestBengalPattachitra: {}, SavaraPainting: {}, GondArt: {},
    MiniaturePainting: {}, TanjorePainting: {}, SauraPainting: {}, MataNiPachediPainting: {},
    YakshaganaPainting: {}, RoganArt: {}, BhilPainting: {}
  },
  Crafts: {
    KondapalliToys: {}, EtikoppakaToys: {}, ChannapatnaToys: {}, NatungramWoodenDolls: {},
    BidriWare: {}, Dhokra: {}, BrassWare: {}, BluePottery: {}, SikkiCrafts: {},
    BambooCrafts: {}, JuteCrafts: {}, BulrushReedCrafts: {}, BellMetalCrafts: {},
    PaperMache: {}, LeatherCrafts: {}, TribalMakes: {}, HandBags: {}, BastarIronCraft: {}
  },
  HeritageWraps: { Dupatta: {}, Stole: {}, Shawl: {}, Muffler: {} }
};


/************************************
 * DEFAULT FIELDS (always shown)
 ************************************/
const defaultCategoryFields = [
  { name: "brand",         label: "Brand",            type: "text",   required: true, placeholder: "Brand name" },
  { name: "state",         label: "State",             type: "text",   required: true, placeholder: "Enter state" },
  { name: "sellingPrice",  label: "Selling Price (₹)", type: "text",   required: true, placeholder: "₹ 2499" },
  { name: "totalQuantity", label: "Total Quantity",    type: "text",   required: true, placeholder: "100" }
];

const globalReturnRefundFields = [
  { name: "applicableToReturn",       label: "Applicable to Return/Exchange", type: "select", required: true,  options: ["Yes","No"] },
  { name: "coloursAvailable",         label: "Colours Available",             type: "select", required: true,  options: ["Red","Maroon","Blue","Navy Blue","Green","Black","White","Yellow","Pink","Purple","Orange","Gold","Silver","Brown","Beige"] },
  { name: "personalization",          label: "Personalization Available",     type: "select", required: true,  options: ["Yes","No"] },
  { name: "availableForReturnRefund", label: "Available for Return/Refund",   type: "select", required: true,  options: ["Yes","No"] },
  { name: "refundDays",               label: "Refund Processing (Days)",      type: "select", required: false, options: ["Within 3 Days","Within 5 Days","Within 7 Days","Within 10 Days"] }
];


/************************************
 * CATEGORY-SPECIFIC FIELDS
 ************************************/
const categoryFields = {
  "Dharmavaram": [
    { name: "occasion",        label: "Occasion",          type: "select", required: true, options: ["Wedding","Festive"] },
    { name: "sareeFabric",     label: "Saree Fabric",      type: "select", required: true, options: ["Silk","Silk Cotton"] },
    { name: "blouseFabric",    label: "Blouse Fabric",     type: "select", required: true, options: ["Silk"] },
    { name: "sareeWork",       label: "Saree Work",        type: "select", required: true, options: ["Zari Work"] },
    { name: "borderType",      label: "Border Type",       type: "select", required: true, options: ["Contrast Border","Temple Border"] },
    { name: "palluDesign",     label: "Pallu Design",      type: "select", required: true, options: ["Rich Zari","Traditional Motif"] },
    { name: "color",           label: "Colours Available", type: "select", required: true, options: ["Red","Green","Gold"] },
    { name: "sizes",           label: "Sizes",             type: "select", required: true, options: ["Free Size","5.5 m","6.0 m","6.3 m"] },
    { name: "regionalTag",     label: "Regional Tag",      type: "select", required: true, options: ["Andhra Pradesh"] },
    { name: "careInformation", label: "Care Information",  type: "select", required: true, options: ["Dry Clean Only"] }
  ],
  "Kalamkari": [
    { name: "occasion",        label: "Occasion",          type: "select", required: true,  options: ["Casual","Festive"] },
    { name: "sareeFabric",     label: "Saree Fabric",      type: "select", required: true,  options: ["Cotton","Silk"] },
    { name: "blouseFabric",    label: "Blouse Fabric",     type: "select", required: true,  options: ["Cotton"] },
    { name: "printType",       label: "Print Type",        type: "select", required: true,  options: ["Hand Painted","Block Print"] },
    { name: "theme",           label: "Theme",             type: "select", required: true,  options: ["Mythology","Nature"] },
    { name: "color",           label: "Colours Available", type: "select", required: true,  options: ["Earthy","Multicolor"] },
    { name: "sizes",           label: "Sizes",             type: "select", required: false, options: ["Free Size","5.5 m","6.0 m","6.3 m"] },
    { name: "regionalTag",     label: "Regional Tag",      type: "select", required: false, options: ["Andhra Pradesh"] },
    { name: "careInformation", label: "Care Information",  type: "select", required: true,  options: ["Hand Wash","Dry Clean"] }
  ],
  "Venkatagiri": [
    { name: "occasion",        label: "Occasion",          type: "select", required: true, options: ["Daily Wear","Festive"] },
    { name: "sareeFabric",     label: "Saree Fabric",      type: "select", required: true, options: ["Pure Cotton","Silk"] },
    { name: "blouseFabric",    label: "Blouse Fabric",     type: "select", required: true, options: ["Cotton"] },
    { name: "borderDesign",    label: "Border Design",     type: "select", required: true, options: ["Zari Border","Plain Border"] },
    { name: "bodyPattern",     label: "Body Pattern",      type: "select", required: true, options: ["Butta","Plain"] },
    { name: "color",           label: "Colours Available", type: "select", required: true, options: ["White","Pastel"] },
    { name: "sizes",           label: "Sizes",             type: "select", required: true, options: ["Free Size","5.5 m","6.0 m","6.3 m"] },
    { name: "regionalTag",     label: "Regional Tag",      type: "select", required: true, options: ["Andhra Pradesh"] },
    { name: "careInformation", label: "Care Information",  type: "select", required: true, options: ["Hand Wash"] }
  ],
  "Gadwal": [
    { name: "occasion",        label: "Occasion",          type: "select", required: true, options: ["Wedding","Festive"] },
    { name: "sareeFabric",     label: "Saree Fabric",      type: "select", required: true, options: ["Cotton Silk"] },
    { name: "blouseFabric",    label: "Blouse Fabric",     type: "select", required: true, options: ["Silk"] },
    { name: "sareeWork",       label: "Saree Work",        type: "select", required: true, options: ["Zari Work"] },
    { name: "borderType",      label: "Border Type",       type: "select", required: true, options: ["Contrast Border"] },
    { name: "color",           label: "Colours Available", type: "select", required: true, options: ["Red","Green","Maroon"] },
    { name: "sizes",           label: "Sizes",             type: "select", required: true, options: ["Free Size","5.5 m","6.0 m","6.3 m"] },
    { name: "regionalTag",     label: "Regional Tag",      type: "select", required: true, options: ["Telangana"] },
    { name: "careInformation", label: "Care Information",  type: "select", required: true, options: ["Dry Clean Only"] }
  ],
  "Ponduru": [
    { name: "occasion",        label: "Occasion",          type: "select", required: true, options: ["Daily Wear"] },
    { name: "sareeFabric",     label: "Saree Fabric",      type: "select", required: true, options: ["Fine Cotton"] },
    { name: "blouseFabric",    label: "Blouse Fabric",     type: "select", required: true, options: ["Cotton"] },
    { name: "weaveType",       label: "Weave Type",        type: "select", required: true, options: ["Handspun","Handwoven"] },
    { name: "texture",         label: "Texture",           type: "select", required: true, options: ["Soft","Lightweight"] },
    { name: "color",           label: "Colours Available", type: "select", required: true, options: ["White","Off White"] },
    { name: "sizes",           label: "Sizes",             type: "select", required: true, options: ["Free Size","5.5 m","6.0 m","6.3 m"] },
    { name: "regionalTag",     label: "Regional Tag",      type: "select", required: true, options: ["Andhra Pradesh"] },
    { name: "careInformation", label: "Care Information",  type: "select", required: true, options: ["Hand Wash"] }
  ],
  "Dulla": [
    { name: "occasion",        label: "Occasion",          type: "select", required: true, options: ["Casual"] },
    { name: "sareeFabric",     label: "Saree Fabric",      type: "select", required: true, options: ["Cotton"] },
    { name: "blouseFabric",    label: "Blouse Fabric",     type: "select", required: true, options: ["Cotton"] },
    { name: "weaveType",       label: "Weave Type",        type: "select", required: true, options: ["Traditional Weave"] },
    { name: "pattern",         label: "Pattern",           type: "select", required: true, options: ["Stripes","Checks"] },
    { name: "borderStyle",     label: "Border Style",      type: "select", required: true, options: ["Simple Border"] },
    { name: "color",           label: "Colours Available", type: "select", required: true, options: ["White","Blue"] },
    { name: "sizes",           label: "Sizes",             type: "select", required: true, options: ["Free Size","5.5 m","6.0 m","6.3 m"] },
    { name: "regionalTag",     label: "Regional Tag",      type: "select", required: true, options: ["India"] },
    { name: "careInformation", label: "Care Information",  type: "select", required: true, options: ["Hand Wash"] }
  ],
  "Bobbili": [
    { name: "occasion",        label: "Occasion",          type: "select", required: true, options: ["Festive"] },
    { name: "sareeFabric",     label: "Saree Fabric",      type: "select", required: true, options: ["Cotton","Silk Blend"] },
    { name: "blouseFabric",    label: "Blouse Fabric",     type: "select", required: true, options: ["Silk Blend"] },
    { name: "weaveType",       label: "Weave Type",        type: "select", required: true, options: ["Traditional Weave"] },
    { name: "borderDesign",    label: "Border Design",     type: "select", required: true, options: ["Zari","Simple Border"] },
    { name: "bodyPattern",     label: "Body Pattern",      type: "select", required: true, options: ["Butta","Plain"] },
    { name: "color",           label: "Colours Available", type: "select", required: true, options: ["Red","Yellow"] },
    { name: "sizes",           label: "Sizes",             type: "select", required: true, options: ["Free Size","5.5 m","6.0 m","6.3 m"] },
    { name: "regionalTag",     label: "Regional Tag",      type: "select", required: true, options: ["Andhra Pradesh"] },
    { name: "careInformation", label: "Care Information",  type: "select", required: true, options: ["Dry Clean","Hand Wash"] }
  ],
  "Dress_Kalamkari": [
    { name: "occasion",        label: "Occasion",           type: "select", required: true,  options: ["Casual","Festive"] },
    { name: "topBottomFabric", label: "Top / Bottom Fabric",type: "select", required: true,  options: ["Cotton","Silk"] },
    { name: "dupattaFabric",   label: "Dupatta Fabric",     type: "select", required: true,  options: ["Cotton"] },
    { name: "materialPrint",   label: "Material Print",     type: "select", required: true,  options: ["Hand Painted","Block Print"] },
    { name: "materialWork",    label: "Material Work",      type: "select", required: false, options: ["None"] },
    { name: "sleevesLength",   label: "Sleeves Length",     type: "select", required: true,  options: ["Half Sleeve","Full Sleeve"] },
    { name: "kurtaLength",     label: "Kurta Length",       type: "select", required: true,  options: ["Knee Length","Calf Length"] },
    { name: "neckPattern",     label: "Neck Pattern",       type: "select", required: true,  options: ["Round","V Neck"] },
    { name: "bottomStyle",     label: "Bottom Style",       type: "select", required: true,  options: ["Straight Pants","Palazzo"] },
    { name: "color",           label: "Colours Available",  type: "select", required: true,  options: ["Multicolor"] },
    { name: "sizes",           label: "Sizes",              type: "select", required: true,  options: ["XS","S","M","L","XL","XXL"] },
    { name: "regionalTag",     label: "Regional Tag",       type: "select", required: true,  options: ["Andhra Pradesh"] },
    { name: "careInformation", label: "Care Information",   type: "select", required: true,  options: ["Hand Wash"] }
  ],
  "Dress_Madhubani": [
    { name: "occasion",        label: "Occasion",           type: "select", required: true,  options: ["Casual"] },
    { name: "topBottomFabric", label: "Top / Bottom Fabric",type: "select", required: true,  options: ["Cotton"] },
    { name: "dupattaFabric",   label: "Dupatta Fabric",     type: "select", required: true,  options: ["Cotton"] },
    { name: "materialPrint",   label: "Material Print",     type: "select", required: true,  options: ["Nature","Mythology"] },
    { name: "materialWork",    label: "Material Work",      type: "select", required: true,  options: ["None"] },
    { name: "sleevesLength",   label: "Sleeves Length",     type: "select", required: true,  options: ["Half Sleeve","Full Sleeve"] },
    { name: "kurtaLength",     label: "Kurta Length",       type: "select", required: true,  options: ["Knee Length"] },
    { name: "neckPattern",     label: "Neck Pattern",       type: "select", required: true,  options: ["Round"] },
    { name: "bottomStyle",     label: "Bottom Style",       type: "select", required: true,  options: ["Straight Pants"] },
    { name: "color",           label: "Colours Available",  type: "select", required: true,  options: ["Multicolor"] },
    { name: "sizes",           label: "Sizes",              type: "select", required: true,  options: ["XS","S","M","L","XL","XXL"] },
    { name: "regionalTag",     label: "Regional Tag",       type: "select", required: false, options: ["Bihar"] },
    { name: "careInformation", label: "Care Information",   type: "select", required: true,  options: ["Hand Wash"] }
  ],
  "Dress_Bandhani": [
    { name: "occasion",        label: "Occasion",           type: "select", required: true,  options: ["Festive"] },
    { name: "topBottomFabric", label: "Top / Bottom Fabric",type: "select", required: true,  options: ["Georgette","Cotton"] },
    { name: "dupattaFabric",   label: "Dupatta Fabric",     type: "select", required: true,  options: ["Georgette"] },
    { name: "materialPrint",   label: "Material Print",     type: "select", required: true,  options: ["Tie & Dye"] },
    { name: "materialWork",    label: "Material Work",      type: "select", required: false, options: ["Bandhani Work"] },
    { name: "sleevesLength",   label: "Sleeves Length",     type: "select", required: true,  options: ["Three Fourth","Full Sleeve"] },
    { name: "kurtaLength",     label: "Kurta Length",       type: "select", required: true,  options: ["Knee Length"] },
    { name: "neckPattern",     label: "Neck Pattern",       type: "select", required: true,  options: ["Round","Boat Neck"] },
    { name: "bottomStyle",     label: "Bottom Style",       type: "select", required: true,  options: ["Straight Pants","Churidar"] },
    { name: "color",           label: "Colours Available",  type: "select", required: true,  options: ["Red","Yellow"] },
    { name: "sizes",           label: "Sizes",              type: "select", required: true,  options: ["XS","S","M","L","XL","XXL"] },
    { name: "regionalTag",     label: "Regional Tag",       type: "select", required: false, options: ["Gujarat","Rajasthan"] },
    { name: "careInformation", label: "Care Information",   type: "select", required: true,  options: ["Dry Clean"] }
  ],
  "DressMaterial_Kalamkari": [
    { name: "occasion",        label: "Occasion",           type: "select", required: true,  options: ["Casual","Festive"] },
    { name: "topBottomFabric", label: "Top / Bottom Fabric",type: "select", required: true,  options: ["Cotton","Silk"] },
    { name: "dupattaFabric",   label: "Dupatta Fabric",     type: "select", required: true,  options: ["Crepe","Cotton"] },
    { name: "materialPrint",   label: "Material Print",     type: "select", required: true,  options: ["Hand Painted","Block Print"] },
    { name: "materialWork",    label: "Material Work",      type: "select", required: false, options: ["None"] },
    { name: "color",           label: "Colours Available",  type: "select", required: true,  options: ["Multicolor"] },
    { name: "sizes",           label: "Sizes",              type: "select", required: true,  options: ["Free Size"] },
    { name: "regionalTag",     label: "Regional Tag",       type: "select", required: false, options: ["Andhra Pradesh"] },
    { name: "careInformation", label: "Care Information",   type: "select", required: true,  options: ["Hand Wash"] }
  ],
  "KolhapuriChappal": [
    { name: "heelHeight",      label: "Heel Height",        type: "select", required: true,  options: ["Flat","Low","Medium"] },
    { name: "ornamentation",   label: "Ornamentation",      type: "select", required: false, options: ["Plain","Embroidered","Braided"] },
    { name: "material",        label: "Material",           type: "select", required: true,  options: ["Leather"] },
    { name: "toeShape",        label: "Toe Shape",          type: "select", required: true,  options: ["Round Toe","Square Toe"] },
    { name: "occasion",        label: "Occasion",           type: "select", required: true,  options: ["Casual","Festive"] },
    { name: "color",           label: "Colours Available",  type: "select", required: true,  options: ["Brown","Tan","Black"] },
    { name: "sizes",           label: "Sizes",              type: "select", required: true,  options: ["6","7","8","9","10"] },
    { name: "regionalTag",     label: "Regional Tag",       type: "select", required: false, options: ["Maharashtra"] },
    { name: "careInformation", label: "Care Information",   type: "select", required: true,  options: ["Wipe with dry cloth"] }
  ],
  "JaipurChappal": [
    { name: "heelHeight",      label: "Heel Height",        type: "select", required: true,  options: ["Flat","Low"] },
    { name: "ornamentation",   label: "Ornamentation",      type: "select", required: true,  options: ["Hand Embroidery"] },
    { name: "material",        label: "Material",           type: "select", required: true,  options: ["Leather","Fabric"] },
    { name: "toeShape",        label: "Toe Shape",          type: "select", required: true,  options: ["Round Toe","Pointed"] },
    { name: "occasion",        label: "Occasion",           type: "select", required: true,  options: ["Festive","Party"] },
    { name: "color",           label: "Colours Available",  type: "select", required: true,  options: ["Maroon","Red","Golden"] },
    { name: "sizes",           label: "Sizes",              type: "select", required: true,  options: ["6","7","8","9"] },
    { name: "regionalTag",     label: "Regional Tag",       type: "select", required: false, options: ["Rajasthan"] },
    { name: "careInformation", label: "Care Information",   type: "select", required: true,  options: ["Dry Clean"] }
  ],
  "WoodenJewellery": [
    { name: "design",          label: "Design",             type: "select", required: true,  options: ["Antique","Modern","Handcrafted"] },
    { name: "material",        label: "Material",           type: "select", required: true,  options: ["Wood"] },
    { name: "polish",          label: "Polish",             type: "select", required: true,  options: ["Matte","Glossy","Natural"] },
    { name: "stone",           label: "Stone",              type: "select", required: false, options: ["None","Beads","Artificial Stones"] },
    { name: "occasion",        label: "Occasion",           type: "select", required: true,  options: ["Daily Wear","Casual"] },
    { name: "color",           label: "Colours Available",  type: "select", required: true,  options: ["Brown","Dark Brown","Black"] },
    { name: "sizes",           label: "Sizes",              type: "select", required: false, options: ["Free Size"] },
    { name: "weight",          label: "Weight",             type: "text",   required: true },
    { name: "regionalTag",     label: "Regional Tag",       type: "select", required: false, options: ["India"] },
    { name: "careInformation", label: "Care Information",   type: "select", required: true,  options: ["Keep away from water","Wipe with dry cloth"] }
  ],
  "TerracottaJewellery": [
    { name: "design",          label: "Design",             type: "select", required: true,  options: ["Traditional","Handmade","Antique"] },
    { name: "material",        label: "Material",           type: "select", required: true,  options: ["Clay","Terracotta"] },
    { name: "polish",          label: "Polish",             type: "select", required: true,  options: ["Matte","Glossy"] },
    { name: "stone",           label: "Stone",              type: "select", required: false, options: ["None","Beads","Zircon","Artificial Stones"] },
    { name: "occasion",        label: "Occasion",           type: "select", required: true,  options: ["Festive","Wedding"] },
    { name: "color",           label: "Colours Available",  type: "select", required: true,  options: ["Red","Maroon","Multicolor"] },
    { name: "sizes",           label: "Sizes",              type: "select", required: false, options: ["Free Size"] },
    { name: "handmade",        label: "Handmade",           type: "select", required: true,  options: ["Yes"] },
    { name: "regionalTag",     label: "Regional Tag",       type: "select", required: false, options: ["Rajasthan","West Bengal"] },
    { name: "careInformation", label: "Care Information",   type: "select", required: true,  options: ["Avoid water","Store in dry place"] }
  ],
  "Cheriyal": [
    { name: "frame",           label: "Frame",              type: "select", required: true, options: ["With Frame","Without Frame"] },
    { name: "frameColor",      label: "Frame Colour",       type: "select", required: true, options: ["Black","Brown"] },
    { name: "weight",          label: "Weight",             type: "text",   required: true },
    { name: "material",        label: "Material",           type: "select", required: true, options: ["Canvas","Cloth"] },
    { name: "type",            label: "Type",               type: "select", required: true, options: ["Traditional Painting"] },
    { name: "medium",          label: "Medium",             type: "select", required: true, options: ["Natural Colors"] },
    { name: "theme",           label: "Theme",              type: "select", required: true, options: ["Mythology"] },
    { name: "color",           label: "Colours Available",  type: "select", required: true, options: ["Multicolor","Red"] },
    { name: "sizes",           label: "Sizes",              type: "select", required: true, options: ["Small","Medium","Large"] },
    { name: "regionalTag",     label: "Regional Tag",       type: "select", required: true, options: ["Telangana"] },
    { name: "careInformation", label: "Care Information",   type: "select", required: true, options: ["Avoid Moisture","Keep Dry"] }
  ],
  "Gond": [
    { name: "frame",           label: "Frame",              type: "select", required: true, options: ["With Frame","Without Frame"] },
    { name: "frameColor",      label: "Frame Colour",       type: "select", required: true, options: ["Black","Brown"] },
    { name: "weight",          label: "Weight",             type: "text",   required: true },
    { name: "material",        label: "Material",           type: "select", required: true, options: ["Canvas","Paper"] },
    { name: "type",            label: "Type",               type: "select", required: true, options: ["Traditional Painting"] },
    { name: "medium",          label: "Medium",             type: "select", required: true, options: ["Acrylic","Natural Colors"] },
    { name: "theme",           label: "Theme",              type: "select", required: true, options: ["Nature","Animals"] },
    { name: "color",           label: "Colours Available",  type: "select", required: true, options: ["Multicolor"] },
    { name: "sizes",           label: "Sizes",              type: "select", required: true, options: ["Small","Medium","Large"] },
    { name: "regionalTag",     label: "Regional Tag",       type: "select", required: true, options: ["Madhya Pradesh"] },
    { name: "careInformation", label: "Care Information",   type: "select", required: true, options: ["Avoid Moisture"] }
  ],
  "KondapalliToys": [
    { name: "weight",          label: "Weight",             type: "text",   required: true },
    { name: "material",        label: "Material",           type: "select", required: true, options: ["Soft Wood"] },
    { name: "type",            label: "Type",               type: "select", required: true, options: ["Handicraft Toy"] },
    { name: "handpainted",     label: "Hand Painted",       type: "select", required: true, options: ["Yes"] },
    { name: "theme",           label: "Theme",              type: "select", required: true, options: ["Village Life"] },
    { name: "color",           label: "Colours Available",  type: "select", required: true, options: ["Multicolor"] },
    { name: "sizes",           label: "Sizes",              type: "select", required: true, options: ["Small","Medium"] },
    { name: "regionalTag",     label: "Regional Tag",       type: "select", required: true, options: ["Andhra Pradesh"] },
    { name: "careInformation", label: "Care Information",   type: "select", required: true, options: ["Keep Dry","Handle with care"] }
  ],
  "Dupatta": [
    { name: "occasion",        label: "Occasion",           type: "select", required: true,  options: ["Casual","Festive","Wedding"] },
    { name: "fabric",          label: "Fabric",             type: "select", required: true,  options: ["Cotton","Silk","Chiffon","Georgette"] },
    { name: "pattern",         label: "Pattern / Work",     type: "select", required: true,  options: ["Printed","Embroidered","Zari Work"] },
    { name: "length",          label: "Length",             type: "text",   required: true },
    { name: "color",           label: "Colours Available",  type: "select", required: true,  options: ["Red","Maroon","Yellow","Multicolor"] },
    { name: "sizes",           label: "Sizes",              type: "select", required: false, options: ["Free Size"] },
    { name: "regionalTag",     label: "Regional Tag",       type: "select", required: false, options: ["Rajasthan","Punjab","Gujarat"] },
    { name: "careInformation", label: "Care Information",   type: "select", required: true,  options: ["Hand Wash","Dry Clean"] }
  ]
};


/************************************
 * DOM REFERENCES
 ************************************/
const lvl1     = document.getElementById("categoryLevel1");
const lvl2     = document.getElementById("categoryLevel2");
const lvl3     = document.getElementById("categoryLevel3");
const lvl4     = document.getElementById("categoryLevel4");
const lvl1Wrap = document.getElementById("lvl1Wrap");
const lvl2Wrap = document.getElementById("lvl2Wrap");
const lvl3Wrap = document.getElementById("lvl3Wrap");
const lvl4Wrap = document.getElementById("lvl4Wrap");
const dynamicFieldsContainer = document.getElementById("dynamicFields");

let lastRenderedCategory = null;

// true while DOMContentLoaded is running its initial fillCategories() chain.
// Dynamic fields will be prefilled only during this window.
// Once false (user changes category manually), dynamic fields render blank.
let isPrefilling = false;


/************************************
 * CATEGORY LEVEL HELPERS
 ************************************/
function hideLevel(wrapper, select) {
  wrapper.classList.add("hidden");
  select.innerHTML = `<option value="">Select</option>`;
  select.disabled  = true;
}

function showLevel(wrapper, select, data, placeholder) {
  select.innerHTML = `<option value="">${placeholder}</option>`;
  Object.keys(data).forEach(key => {
    const opt = document.createElement("option");
    opt.value = key; opt.textContent = key;
    select.appendChild(opt);
  });
  select.disabled = false;
  wrapper.classList.remove("hidden");
}

function clearDynamic() {
  dynamicFieldsContainer.innerHTML = "";
  lastRenderedCategory = null;
}


/************************************
 * INIT CATEGORY DROPDOWNS
 ************************************/
showLevel(lvl1Wrap, lvl1, categoryTree, "Select Main Category");
hideLevel(lvl2Wrap, lvl2);
hideLevel(lvl3Wrap, lvl3);
hideLevel(lvl4Wrap, lvl4);
clearDynamic();


/************************************
 * CATEGORY CHAIN LISTENERS
 ************************************/
lvl1.addEventListener("change", () => {
  hideLevel(lvl2Wrap, lvl2);
  hideLevel(lvl3Wrap, lvl3);
  hideLevel(lvl4Wrap, lvl4);
  clearDynamic();
  const data = categoryTree[lvl1.value];
  if (data && Object.keys(data).length) showLevel(lvl2Wrap, lvl2, data, "Select Category");
  else loadDynamicFields(lvl1.value);
});

lvl2.addEventListener("change", () => {
  hideLevel(lvl3Wrap, lvl3);
  hideLevel(lvl4Wrap, lvl4);
  clearDynamic();
  const data = categoryTree[lvl1.value]?.[lvl2.value];
  if (data && Object.keys(data).length) showLevel(lvl3Wrap, lvl3, data, "Select Sub Category");
  else loadDynamicFields(lvl2.value);
});

lvl3.addEventListener("change", () => {
  hideLevel(lvl4Wrap, lvl4);
  clearDynamic();
  const data = categoryTree[lvl1.value]?.[lvl2.value]?.[lvl3.value];
  if (data && Object.keys(data).length) showLevel(lvl4Wrap, lvl4, data, "Select Sub Sub Category");
  else loadDynamicFields(lvl3.value);
});

lvl4.addEventListener("change", () => {
  clearDynamic();
  loadDynamicFields(lvl4.value);
});


/************************************
 * FILL CATEGORIES (prefill only)
 ************************************/
function fillCategories(data) {
  isPrefilling = true;

  lvl1.value = data.lvl1;
  lvl1.dispatchEvent(new Event("change"));

  setTimeout(() => {
    lvl2.value = data.lvl2;
    lvl2.dispatchEvent(new Event("change"));

    setTimeout(() => {
      lvl3.value = data.lvl3;
      lvl3.dispatchEvent(new Event("change"));

      setTimeout(() => {
        if (data.lvl4) {
          lvl4.value = data.lvl4;
          lvl4.dispatchEvent(new Event("change"));
        }
        // Mark prefill complete after all dispatches settle
        setTimeout(() => { isPrefilling = false; }, 50);
      }, 100);
    }, 100);
  }, 100);
}


/************************************
 * INPUT RESTRICTION HELPERS
 ************************************/
function restrictToAlpha(input) {
  input.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (["Backspace","Delete","ArrowLeft","ArrowRight","Tab"].includes(e.key)) return;
    if (e.key === " " && input.value.length === 0)      { e.preventDefault(); return; }
    if (e.key === " " && input.value.slice(-1) === " ") { e.preventDefault(); return; }
    if (!/^[a-zA-Z ]$/.test(e.key)) e.preventDefault();
  });
  input.addEventListener("paste", function (e) {
    e.preventDefault();
    const pasted  = (e.clipboardData || window.clipboardData).getData("text");
    const cleaned = pasted.replace(/[^a-zA-Z ]/g,"").replace(/^\s+/,"").replace(/\s{2,}/g," ");
    input.value   = input.value.slice(0, input.selectionStart) + cleaned + input.value.slice(input.selectionEnd);
  });
}

function restrictToNumeric(input) {
  input.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (["Backspace","Delete","ArrowLeft","ArrowRight","Tab"].includes(e.key)) return;
    if (!/^[0-9]$/.test(e.key)) e.preventDefault();
  });
  input.addEventListener("paste", function (e) {
    e.preventDefault();
    const pasted  = (e.clipboardData || window.clipboardData).getData("text");
    const cleaned = pasted.replace(/[^0-9]/g,"");
    input.value   = input.value.slice(0, input.selectionStart) + cleaned + input.value.slice(input.selectionEnd);
  });
}


/************************************
 * ERROR HELPERS
 ************************************/
function showError(input, message) {
  if (!input) return;
  input.classList.add("input-error");

  // For info-section dedicated error spans use them directly
  const group = input.closest(".form-group") || input.closest(".input-group") || input.closest(".textarea-group");
  if (!group) return;

  const dedicated = group.querySelector(".name-error, .desc-error");
  if (dedicated) { dedicated.innerText = message; return; }

  let err = group.querySelector(".error-text");
  if (!err) {
    err = document.createElement("div");
    err.className = "error-text";
    group.appendChild(err);
  }
  err.innerText = message;
}

function clearError(input) {
  if (!input) return;
  input.classList.remove("input-error");

  const group = input.closest(".form-group") || input.closest(".input-group") || input.closest(".textarea-group");
  if (!group) return;

  const dedicated = group.querySelector(".name-error, .desc-error");
  if (dedicated) { dedicated.innerText = ""; return; }

  const err = group.querySelector(".error-text");
  if (err) err.remove();
}


/************************************
 * DYNAMIC FIELD LOADER
 *
 * isPrefilling=true  → fills values from editProductData.dynamicFields
 * isPrefilling=false → renders blank fields (user switched category)
 ************************************/
function loadDynamicFields(categoryKey) {
  dynamicFieldsContainer.innerHTML = "";
  if (!categoryKey) return;
  if (categoryKey === lastRenderedCategory) return;
  lastRenderedCategory = categoryKey;

  const parentCategory = lvl3.value;
  let resolvedFields   = [];

  if (parentCategory === "Dress" && categoryFields[`Dress_${categoryKey}`]) {
    resolvedFields = categoryFields[`Dress_${categoryKey}`];
  } else if (parentCategory === "DressMaterial" && categoryFields[`DressMaterial_${categoryKey}`]) {
    resolvedFields = categoryFields[`DressMaterial_${categoryKey}`];
  } else if (categoryFields[categoryKey]) {
    resolvedFields = categoryFields[categoryKey];
  }

  const fields = [...defaultCategoryFields, ...resolvedFields, ...globalReturnRefundFields];

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
      if (field.name === "coloursAvailable") {
        // Colour swatch selector
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
          opt.value = color; opt.textContent = color;
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
      field.options.forEach(o => {
        input.innerHTML += `<option value="${o}">${o}</option>`;
      });

    } else {
      input = document.createElement("input");
      input.type = "text";
      input.className = "form-input";
      input.placeholder = field.placeholder || "";
      input.name = field.name;
      if (field.name === "state") restrictToAlpha(input);
      else if (field.name === "sellingPrice" || field.name === "totalQuantity") restrictToNumeric(input);
    }

    group.append(label, input);
    grid.appendChild(group);
  });

  dynamicFieldsContainer.appendChild(grid);

  // Disable refundDays until availableForReturnRefund = "Yes"
  grid.querySelectorAll(".form-group").forEach(fg => {
    const lblText = fg.querySelector(".form-label")?.childNodes[0]?.nodeValue?.trim();
    if (lblText === "Refund Processing (Days)") {
      const sel = fg.querySelector("select");
      if (sel) { sel.disabled = true; sel.required = false; }
    }
  });

  attachDynamicFieldBlurValidation();

  // Prefill only on initial page load
  if (isPrefilling && editProductData?.dynamicFields) {
    fillDynamicFields(editProductData.dynamicFields);
    // Fire change on every select so conditional logic (refundDays) runs
    setTimeout(() => {
      dynamicFieldsContainer.querySelectorAll("select").forEach(sel => {
        sel.dispatchEvent(new Event("change", { bubbles: true }));
      });
    }, 0);
  }
  // If user changed the category → leave all dynamic fields blank
}


/************************************
 * PREFILL HELPERS
 ************************************/
function safeSetSelectValue(select, value) {
  if (!select || value === undefined || value === null) return;
  const match = [...select.options].find(o => o.value.trim() === String(value).trim());
  if (match) select.value = match.value;
}

function fillDynamicFields(savedData) {
  Object.keys(savedData).forEach(key => {
    const input = dynamicFieldsContainer.querySelector(`[name="${key}"]`);
    if (!input) return;
    if (input.tagName === "SELECT") safeSetSelectValue(input, savedData[key]);
    else input.value = savedData[key];
  });
}

function fillBasicFields(data) {
  const nameEl  = document.getElementById("productName");
  const descEl  = document.getElementById("productDescription");
  const countEl = document.getElementById("charCount");
  if (nameEl)  nameEl.value  = data.productName        || "";
  if (descEl)  descEl.value  = data.productDescription || "";
  if (countEl) countEl.textContent = (data.productDescription || "").length;
}

/************************************
 * FILL INFO SECTIONS
 *
 * The FIRST row already exists in the HTML — populate it.
 * Extra rows (index > 0) are created and appended dynamically.
 * isReturnSection=true  → rows have only a textarea (no field-name input)
 * isReturnSection=false → rows have field-name + textarea
 ************************************/
function fillInfoSection(containerId, rows, isReturnSection) {
  const container = document.getElementById(containerId);
  if (!container || !rows || !rows.length) return;

  rows.forEach((rowData, index) => {
    let row;

    if (index === 0) {
      // Use the existing HTML row
      row = container.querySelector(".info-row");
    } else {
      // Build and append an extra row
      row = document.createElement("div");
      row.className = "info-row";

      if (isReturnSection) {
        row.innerHTML = `
          <div class="form-group textarea-group full-width">
            <label>Write Description <span class="required">*</span></label>
            <textarea class="field-desc" maxlength="1000"></textarea>
            <div class="char-count">0/1000</div>
            <span class="error-text desc-error"></span>
          </div>
          <button type="button" class="delete-row-btn">X</button>
        `;
      } else {
        row.innerHTML = `
          <div class="input-group">
            <label>Enter Field Name <span class="required">*</span></label>
            <input type="text" class="field-name" maxlength="50">
            <span class="error-text name-error"></span>
          </div>
          <div class="textarea-group">
            <label>Write Description <span class="required">*</span></label>
            <textarea class="field-desc" maxlength="1000"></textarea>
            <div class="char-count">0/1000</div>
            <span class="error-text desc-error"></span>
          </div>
          <button type="button" class="delete-row-btn">X</button>
        `;
      }
      container.appendChild(row);
    }

    if (!row) return;

    // Populate field-name input (non-return sections only)
    if (!isReturnSection) {
      const nameInput = row.querySelector(".field-name");
      if (nameInput && rowData.name) nameInput.value = rowData.name;
    }

    // Populate description textarea + char counter
    const descInput = row.querySelector(".field-desc");
    if (descInput && rowData.desc) {
      descInput.value = rowData.desc;
      const counter = row.querySelector(".char-count");
      if (counter) counter.textContent = `${rowData.desc.length}/1000`;
    }
  });
}


/************************************
 * IMAGE UPLOAD
 ************************************/
const mainUpload    = document.getElementById("mainUpload");
const mainFileInput = document.getElementById("mainFileInput");
const mainPreview   = document.getElementById("mainPreview");

mainUpload.addEventListener("click", () => mainFileInput.click());
mainFileInput.addEventListener("change", e => handleFileSelect(e, mainUpload, mainPreview));

mainUpload.addEventListener("dragover", e => {
  e.preventDefault();
  mainUpload.style.borderColor = "#16a085";
});
mainUpload.addEventListener("dragleave", () => {
  mainUpload.style.borderColor = "#ddd";
});
mainUpload.addEventListener("drop", e => {
  e.preventDefault();
  mainUpload.style.borderColor = "#ddd";
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) handleFileUpload(file, mainUpload, mainPreview);
});

document.querySelectorAll(".upload-box").forEach(box => {
  const input   = box.querySelector('input[type="file"]');
  const preview = box.querySelector(".preview-image");
  box.addEventListener("click", () => input.click());
  input.addEventListener("change", e => handleFileSelect(e, box, preview));
});

function handleFileSelect(e, container, preview) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) { alert("Please select a valid image file."); return; }
  handleFileUpload(file, container, preview);
  e.target.value = "";
}

function handleFileUpload(file, container, preview) {
  const reader = new FileReader();
  reader.onload = e => {
    preview.src = e.target.result;
    container.classList.add("has-image");
    container.classList.remove("error");
    addImageMenu(container, preview);
    validateImages();
  };
  reader.readAsDataURL(file);
}

function addImageMenu(container, preview) {
  if (container.querySelector(".image-menu")) return;

  const menuWrapper = document.createElement("div");
  menuWrapper.className = "image-menu";

  const dots = document.createElement("div");
  dots.className = "image-dots";
  dots.innerHTML = "⋮";

  const dropdown = document.createElement("div");
  dropdown.className = "image-dropdown hidden";
  dropdown.innerHTML = `
    <div class="menu-item upload-option">Upload</div>
    <div class="menu-item download-option">Download</div>
  `;
  menuWrapper.appendChild(dots);
  menuWrapper.appendChild(dropdown);
  container.appendChild(menuWrapper);

  dots.addEventListener("click", e => {
    e.stopPropagation();
    dropdown.classList.toggle("hidden");
  });

  dropdown.querySelector(".upload-option").addEventListener("click", e => {
    e.stopPropagation();
    const fi = container.querySelector('input[type="file"]');
    fi.value = ""; fi.click();
    dropdown.classList.add("hidden");
  });

  dropdown.querySelector(".download-option").addEventListener("click", e => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = preview.src; link.download = "product-image.jpg";
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    dropdown.classList.add("hidden");
  });

  document.addEventListener("click", () => dropdown.classList.add("hidden"));
}

function loadExistingImages(images) {
  if (!images || !images.length) return;
  const all = [mainUpload, ...document.querySelectorAll(".upload-box")];
  images.forEach((src, i) => {
    if (!all[i]) return;
    const p = all[i].querySelector(".preview-image");
    p.src = src;
    all[i].classList.add("has-image");
    addImageMenu(all[i], p);
  });
}


/************************************
 * IMAGE VALIDATION
 ************************************/
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

function validateImages() {
  let count = 0;
  if (mainUpload.classList.contains("has-image")) count++;
  document.querySelectorAll(".upload-box").forEach(b => { if (b.classList.contains("has-image")) count++; });
  const errorDiv = document.getElementById("imageError");
  if (count < 4) {
    errorDiv.innerText = "Please upload at least 4 product images";
    errorDiv.style.display = "block";
    return false;
  }
  errorDiv.style.display = "none";
  return true;
}


/************************************
 * CONFIRM MODAL (reusable)
 ************************************/
let confirmCallback = null;

function showConfirm({ title, message, onConfirm }) {
  const modal = document.getElementById("confirmModal");
  document.getElementById("confirmTitle").innerText   = title;
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


/************************************
 * PRODUCT NAME & DESCRIPTION
 ************************************/
const productNameInput = document.getElementById("productName");
productNameInput.addEventListener("input", e => {
  if (e.target.value.startsWith(" ")) e.target.value = e.target.value.trimStart();
  if (e.target.value.trim()) clearError(e.target);
});

const productDescInput = document.getElementById("productDescription");
const charCountSpan    = document.getElementById("charCount");
productDescInput.addEventListener("input", e => {
  if (e.target.value.startsWith(" ")) e.target.value = e.target.value.trimStart();
  charCountSpan.textContent = e.target.value.length;
  if (e.target.value.trim()) clearError(e.target);
});


/************************************
 * COLOUR SWATCH UPDATE
 ************************************/
const COLOR_MAP = {
  "Red":"#e53935","Maroon":"#880e4f","Blue":"#1e88e5","Navy Blue":"#1a237e",
  "Green":"#43a047","Black":"#212121","White":"#f5f5f5","Yellow":"#fdd835",
  "Pink":"#e91e63","Purple":"#8e24aa","Orange":"#fb8c00","Gold":"#ffc107",
  "Silver":"#90a4ae","Brown":"#6d4c41","Beige":"#d7ccc8"
};
document.addEventListener("change", function (e) {
  if (!e.target.classList.contains("color-select")) return;
  const swatch = e.target.closest(".color-selector")?.querySelector(".color-swatch");
  if (swatch) swatch.style.backgroundColor = COLOR_MAP[e.target.value] || e.target.value || "";
});


/************************************
 * CONDITIONAL: availableForReturnRefund → refundDays
 ************************************/
document.addEventListener("change", function (e) {
  const select = e.target;
  if (!select.classList.contains("form-select")) return;
  const formGroup = select.closest(".form-group");
  if (!formGroup) return;
  const labelText = formGroup.querySelector(".form-label")?.childNodes[0]?.nodeValue?.trim();
  if (labelText !== "Available for Return/Refund") return;

  const grid = select.closest(".form-grid");
  if (!grid) return;

  let refundSelect = null;
  grid.querySelectorAll(".form-group").forEach(fg => {
    const t = fg.querySelector(".form-label")?.childNodes[0]?.nodeValue?.trim();
    if (t === "Refund Processing (Days)") refundSelect = fg.querySelector("select");
  });
  if (!refundSelect) return;

  const isRequired = select.value === "Yes";
  refundSelect.required = isRequired;
  refundSelect.disabled = !isRequired;
  if (!isRequired) { refundSelect.value = ""; clearError(refundSelect); }

  const refundLabel = refundSelect.closest(".form-group")?.querySelector(".form-label");
  if (refundLabel) {
    const star = refundLabel.querySelector(".required");
    if (isRequired && !star) {
      const s = document.createElement("span");
      s.className = "required"; s.textContent = " *";
      refundLabel.appendChild(s);
    } else if (!isRequired && star) {
      star.remove();
    }
  }
});


/************************************
 * LIVE CLEAR ERRORS
 ************************************/
document.addEventListener("input", function (e) {
  if (e.target.matches("input, textarea") && e.target.value.trim()) clearError(e.target);
});
document.addEventListener("change", function (e) {
  if (e.target.matches("select") && e.target.value) clearError(e.target);
});


/************************************
 * MANDATORY FIELD BLUR VALIDATION
 ************************************/
const productMandatoryFields = [
  { id: "productName",        message: "Product name is required" },
  { id: "productDescription", message: "Product description is required" },
  { id: "categoryLevel1",     message: "Please select main category" }
];
productMandatoryFields.forEach(obj => {
  const field = document.getElementById(obj.id);
  field.addEventListener("blur", () => {
    if (!field.value.trim()) showError(field, obj.message);
    else clearError(field);
  });
});


/************************************
 * DYNAMIC FIELD BLUR VALIDATION
 ************************************/
function attachDynamicFieldBlurValidation() {
  dynamicFieldsContainer.querySelectorAll(".form-group").forEach(group => {
    const label = group.querySelector(".form-label");
    const input = group.querySelector("input, select");
    if (!input || !label || !label.innerHTML.includes("*")) return;

    input.addEventListener("blur", () => {
      if (input.disabled) return;
      if (!input.value.trim()) showError(input, "This field is required");
      else clearError(input);
    });
  });
}


/************************************
 * VALIDATE DYNAMIC FIELDS
 ************************************/
function validateDynamicFields() {
  let isValid = true;
  dynamicFieldsContainer.querySelectorAll(".form-group").forEach(group => {
    const label = group.querySelector(".form-label");
    const input = group.querySelector("input, select");
    if (!input || !label || !label.innerHTML.includes("*")) return;
    if (input.disabled) return; // skip conditionally-disabled fields
    if (!input.value.trim()) {
      showError(input, "This field is required");
      isValid = false;
    }
  });
  return isValid;
}


/************************************
 * VALIDATE INFO SECTIONS
 ************************************/
function validateInfoSections() {
  let isValid = true;

  ["productInfoContainer","additionalInfoContainer","careInfoContainer"].forEach(id => {
    const container = document.getElementById(id);
    if (!container) return;

    container.querySelectorAll(".info-row").forEach(row => {
      const nameInput = row.querySelector(".field-name");
      const descInput = row.querySelector(".field-desc");
      const nameErr   = row.querySelector(".name-error");
      const descErr   = row.querySelector(".desc-error");

      if (nameInput) {
        if (!nameInput.value.trim()) {
          nameInput.classList.add("input-error");
          if (nameErr) nameErr.innerText = "Field name is required";
          isValid = false;
        } else {
          nameInput.classList.remove("input-error");
          if (nameErr) nameErr.innerText = "";
        }
      }

      if (descInput) {
        if (!descInput.value.trim()) {
          descInput.classList.add("input-error");
          if (descErr) descErr.innerText = "Description is required";
          isValid = false;
        } else {
          descInput.classList.remove("input-error");
          if (descErr) descErr.innerText = "";
        }
      }
    });
  });

  return isValid;
}

function validateReturnSection() {
  let valid = true;
  document.querySelectorAll("#returnInfoContainer .info-row").forEach(row => {
    const textarea = row.querySelector(".field-desc");
    const descErr  = row.querySelector(".desc-error");
    if (!textarea) return;
    if (!textarea.value.trim()) {
      textarea.classList.add("input-error");
      if (descErr) descErr.innerText = "Return policy description is required";
      valid = false;
    } else {
      textarea.classList.remove("input-error");
      if (descErr) descErr.innerText = "";
    }
  });
  return valid;
}


/************************************
 * INFO SECTIONS — live feedback (char count + blur validation)
 ************************************/
// Live char counter for all info section textareas
document.addEventListener("input", function (e) {
  if (!e.target.classList.contains("field-desc")) return;
  const counter = e.target.closest(".textarea-group, .form-group")?.querySelector(".char-count");
  if (counter) counter.textContent = `${e.target.value.length}/1000`;
});

// Blur validation for field-name inputs & field-desc textareas
document.addEventListener("blur", function (e) {
  if (e.target.classList.contains("field-name")) {
    const nameErr = e.target.closest(".input-group")?.querySelector(".name-error");
    if (!e.target.value.trim()) {
      e.target.classList.add("input-error");
      if (nameErr) nameErr.innerText = "Field name is required";
    } else {
      e.target.classList.remove("input-error");
      if (nameErr) nameErr.innerText = "";
    }
  }

  if (e.target.classList.contains("field-desc")) {
    const descErr = e.target.closest(".textarea-group, .form-group")?.querySelector(".desc-error");
    if (!e.target.value.trim()) {
      e.target.classList.add("input-error");
      if (descErr) descErr.innerText = "Description is required";
    } else {
      e.target.classList.remove("input-error");
      if (descErr) descErr.innerText = "";
    }
  }
}, true); // capture so blur fires on textareas too

// Live clear on field-name
document.addEventListener("input", function (e) {
  if (e.target.classList.contains("field-name") && e.target.value.trim()) {
    e.target.classList.remove("input-error");
    const nameErr = e.target.closest(".input-group")?.querySelector(".name-error");
    if (nameErr) nameErr.innerText = "";
  }
  if (e.target.classList.contains("field-desc") && e.target.value.trim()) {
    e.target.classList.remove("input-error");
    const descErr = e.target.closest(".textarea-group, .form-group")?.querySelector(".desc-error");
    if (descErr) descErr.innerText = "";
  }
});


/************************************
 * ADD ANOTHER ROW / DELETE ROW
 ************************************/
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
        <div class="form-group textarea-group full-width">
          <label>Write Description <span class="required">*</span></label>
          <textarea class="field-desc" maxlength="1000"></textarea>
          <div class="char-count">0/1000</div>
          <span class="error-text desc-error"></span>
        </div>
        <button type="button" class="delete-row-btn">X</button>
      `;
    } else {
      newRow.innerHTML = `
        <div class="input-group">
          <label>Enter Field Name <span class="required">*</span></label>
          <input type="text" class="field-name" maxlength="50">
          <span class="error-text name-error"></span>
        </div>
        <div class="textarea-group">
          <label>Write Description <span class="required">*</span></label>
          <textarea class="field-desc" maxlength="1000"></textarea>
          <div class="char-count">0/1000</div>
          <span class="error-text desc-error"></span>
        </div>
        <button type="button" class="delete-row-btn">X</button>
      `;
    }
    container.appendChild(newRow);
    return;
  }

  // DELETE ROW
  if (e.target.classList.contains("delete-row-btn")) {
    const row = e.target.closest(".info-row");
    showConfirm({
      title: "Delete Field",
      message: "Are you sure you want to delete this field?",
      onConfirm: () => row.remove()
    });
  }
});


/************************************
 * GET DEEPEST SELECTED CATEGORY
 ************************************/
function getDeepestSelectedCategory() {
  return lvl4.value || lvl3.value || lvl2.value || lvl1.value || "";
}


/************************************
 * SAVE BUTTON & FINAL CONFIRM MODAL
 ************************************/
const savePreviewBtn       = document.querySelector(".save-preview-btn");
const finalConfirmModal    = document.getElementById("finalConfirmModal");
const confirmCheckbox      = document.getElementById("confirmCheckbox");
const confirmCheckboxError = document.getElementById("confirmCheckboxError");

savePreviewBtn.addEventListener("click", () => {
  let isValid = true;

  // 1. Main cover image
  if (!validateMainImage()) isValid = false;

  // 2. Minimum 4 total images
  if (!validateImages()) isValid = false;

  // 3. Product name, description, category level 1
  productMandatoryFields.forEach(obj => {
    const field = document.getElementById(obj.id);
    if (!field.value.trim()) { showError(field, obj.message); isValid = false; }
  });

  // 4. Category must have a selection
  if (!getDeepestSelectedCategory()) {
    showError(lvl1, "Please complete category selection");
    isValid = false;
  }

  // 5. Dynamic category fields
  if (!validateDynamicFields()) isValid = false;

  // 6. Product Info, Additional Info, Care Instructions + Return Policy
  if (!validateInfoSections())  isValid = false;
  if (!validateReturnSection()) isValid = false;

  if (!isValid) {
    // Scroll to first visible problem
    const firstErr = document.querySelector(".input-error, .error-text:not(:empty), .name-error:not(:empty), .desc-error:not(:empty)");
    if (firstErr) firstErr.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  finalConfirmModal.classList.remove("hidden");
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
  finalConfirmModal.classList.add("hidden");

  const successOverlay = document.getElementById("successOverlay");
  if (successOverlay) successOverlay.classList.remove("hidden");

  setTimeout(() => {
    window.location.href = "../html/developerPMRecentlyAddedList.html";
  }, 2500);
});


/************************************
 * BROWSER BACK / CACHE RESTORE
 ************************************/
window.addEventListener("pageshow", function () {
  const restored = getDeepestSelectedCategory();
  if (restored) {
    lastRenderedCategory = null;
    loadDynamicFields(restored);
  }
});


/************************************
 * DOMContentLoaded — PREFILL EVERYTHING
 ************************************/
window.addEventListener("DOMContentLoaded", () => {
  // 1. Basic fields (name + description)
  fillBasicFields(editProductData);

  // 2. Info sections — filled from editProductData arrays
  fillInfoSection("productInfoContainer",    editProductData.productInfo,      false);
  fillInfoSection("additionalInfoContainer", editProductData.additionalInfo,   false);
  fillInfoSection("careInfoContainer",       editProductData.careInstructions, false);
  fillInfoSection("returnInfoContainer",     editProductData.returnPolicy,     true);

  // 3. Category chain → auto-triggers dynamic field load → prefills dynamic values
  fillCategories(editProductData.category);

  // 4. Existing product images
  setTimeout(() => loadExistingImages(editProductData.images), 400);
});

/* =====================================================
   GLOBAL SAFE EXPORT
===================================================== */

// window.DEV_enterEditMode = DEV_enterEditMode;
// window.DEV_exitEditMode = DEV_exitEditMode;

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(2)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(1)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(1)>li:nth-child(1)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(2) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(2)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(2) li:nth-child(1)").classList.add("submenu-active-page");


