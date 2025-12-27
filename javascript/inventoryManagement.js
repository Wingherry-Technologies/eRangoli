const products = [
  {
    img: "../assets/inventoryManagement/img.svg",
    name: "Painting Cart Vishu God",
    sku: "64767890",
    date: "12/12/25",
    category: "Yash Painting",
    size: "S",
    color: "#C85454",
    orders: 214,
    instock: 20,
    total: 334,
    price: "₹ 5,110",
    status: "Approved",
  },
  {
    img: "../assets/inventoryManagement/img.svg",
    name: "Madhubani Painting Art Vishu God",
    sku: "64767890",
    date: "12/12/25",
    category: "Madhubani Painting",
    size: "M",
    color: "#21A593",
    orders: 114,
    instock: 20,
    total: 234,
    price: "₹ 5,110",
    status: "Approved",
  },
  {
    img: "../assets/inventoryManagement/img.svg",
    name: "Madhubani Painting Art Vishu God",
    sku: "64767890",
    date: "12/12/25",
    category: "Madhubani Painting",
    size: "L",
    color: "#B55E7D",
    orders: 314,
    instock: 20,
    total: 434,
    price: "₹ 5,110",
    status: "Rejected",
  },
  {
    img: "../assets/inventoryManagement/img.svg",
    name: "Madhubani Painting Art Vishu God",
    sku: "64767890",
    date: "12/12/25",
    category: "Madhubani Painting",
    size: "S",
    color: "#CE34B9",
    orders: 214,
    instock: 20,
    total: 34,
    price: "₹ 5,110",
    status: "Pending",
  },
  {
    img: "../assets/inventoryManagement/img.svg",
    name: "Madhubani Painting Art Vishu God",
    sku: "64767890",
    date: "12/12/25",
    category: "Madhubani Painting",
    size: "M",
    color: "#ECC824",
    orders: 114,
    instock: 20,
    total: 34,
    price: "₹ 5,110",
    status: "Approved",
  },

  {
    img: "../assets/inventoryManagement/img.svg",
    name: "Madhubani Painting Art Vishu God",
    sku: "64767890",
    date: "12/12/25",
    category: "Madhubani Painting",
    size: "S",
    color: "#F1EFAF",
    orders: 214,
    instock: 20,
    total: 334,
    price: "₹ 5,110",
    status: "Approved",
  },
  {
    img: "../assets/inventoryManagement/img.svg",
    name: "Madhubani Painting Art Vishu God",
    sku: "64767890",
    date: "12/12/25",
    category: "Madhubani Painting",
    size: "M",
    color: "#D44444",
    orders: 114,
    instock: 20,
    total: 234,
    price: "₹ 5,110",
    status: "Approved",
  },
  {
    img: "../assets/inventoryManagement/img.svg",
    name: "Madhubani Painting Art Vishu God",
    sku: "64767890",
    date: "12/12/25",
    category: "Madhubani Painting",
    size: "L",
    color: "#78E618",
    orders: 314,
    instock: 20,
    total: 2,
    price: "₹ 5,110",
    status: "Rejected",
  },
  {
    img: "../assets/inventoryManagement/img.svg",
    name: "Madhubani Painting Art Vishu God",
    sku: "64767890",
    date: "12/12/25",
    category: "Madhubani Painting",
    size: "S",
    color: "#C85454",
    orders: 214,
    instock: 20,
    total: 34,
    price: "₹ 5,110",
    status: "Pending",
  },
  {
    img: "../assets/inventoryManagement/img.svg",
    name: "Madhubani Painting Art Vishu God",
    sku: "64767890",
    date: "12/12/25",
    category: "Madhubani Painting",
    size: "M",
    color: "#21A593",
    orders: 114,
    instock: 20,
    total: 34,
    price: "₹ 5,110",
    status: "Approved",
  },
  {
    img: "../assets/inventoryManagement/img.svg",
    name: "Madhubani Painting Art Vishu God",
    sku: "64767890",
    date: "12/12/25",
    category: "Madhubani Painting",
    size: "L",
    color: "#B55E7D",
    orders: 314,
    instock: 20,
    total: 434,
    price: "₹ 5,110",
    status: "Rejected",
  },
];

const tbody = document.getElementById("productTableBody");

products.forEach((p) => {
  let stockBg = "#c9e1c7";

  if (p.total < 10) {
    stockBg = "#FF4B4B";
  } else if (p.total >= 10 && p.total <= 50) {
    stockBg = "#FAC097";
  }
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td class="action-cell">
  <div class="action-wrapper">
    <span class="three-dots">⋮</span>


    <div class="action-menu">
      <div class="action-item">
        <img src="../assets/inventoryManagement/edit.svg" />
        <span>Edit</span>
      </div>

      <div class="action-item">
        <img src="../assets/inventoryManagement/delete.svg" />
        <span>Remove</span>
      </div>

      <div class="action-item">
        <img src="../assets/inventoryManagement/hold.svg" />
        <span>On hold</span>
      </div>
    </div>
  </div>
</td>


    <td>
      <div class="product-info">
        <img src="${p.img}" />
        <div>
          <div class="product-name">
                <span class="main-name">
                    ${p.name.replace(" Vishu God", "")}
                </span>
                <span class="sub-name">Vishu God</span>
            </div>

          <div class="product-sku">SKU: ${p.sku}</div>
        </div>
      </div>
    </td>

    <td>${p.date}</td>
    <td>${p.category}</td>
    <td>${p.size}</td>
    <td><div class="color-box" style="background:${p.color}"></div></td>
    <td>${p.orders}</td>
    <td>${p.instock}</td>
    <td><span class="stock-badge-suf" style="background:${stockBg}">${
    p.total
  }</span></td>
    <td>${p.price}</td>
   <td class="${
     p.status === "Approved"
       ? "approved"
       : p.status === "Rejected"
       ? "rejected"
       : "pending"
   }">
  ${p.status}
</td>

  `;

  tbody.appendChild(tr);
});

document.addEventListener("click", function (e) {
  document.querySelectorAll(".action-menu").forEach((menu) => {
    menu.classList.remove("show");
  });

  if (e.target.classList.contains("three-dots")) {
    e.target.nextElementSibling.classList.toggle("show");
    e.stopPropagation();
  }
});

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
  const searchValue = this.value.toLowerCase().trim();

  const rows = document.querySelectorAll("#productTableBody tr");

  rows.forEach((row) => {
    const nameCell = row.querySelector(".product-name");
    const categoryCell = row.children[3]; // category column

    const nameText = nameCell ? nameCell.textContent.toLowerCase() : "";
    const categoryText = categoryCell
      ? categoryCell.textContent.toLowerCase()
      : "";

    if (nameText.includes(searchValue) || categoryText.includes(searchValue)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
  updatePageData();
});

const pageDataEl = document.querySelector(".page-data");
const totalRows = products.length;

function updatePageData() {
  const rows = document.querySelectorAll("#productTableBody tr");
  let visibleCount = 0;

  rows.forEach((row) => {
    if (row.style.display !== "none") {
      visibleCount++;
    }
  });

  pageDataEl.textContent = `${visibleCount}/${totalRows}`;
}

updatePageData();
