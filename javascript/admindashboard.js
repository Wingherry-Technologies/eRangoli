// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");


hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    window.scrollTo(0, 0);
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow="auto";
    document.querySelector(".bottom-nav").style.display="flex";
  }
});
const labels = {
    Daily: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    Weekly: ['Mon','Tue','Wed','Thu','Fri', 'Sat','Sun'],
    Monthly: ['Jan','Feb','Mar','Apr','May','Jun'],
    Annually: ['2020','2021','2022','2023','2024']
};

// const tooltipStyle = {
//     backgroundColor: '#fff',
//     titleColor: '#111',
//     bodyColor: '#555',
//     borderColor: '#eee',
//     borderWidth: 1,
//     padding: 12,
//     cornerRadius: 10,
//     displayColors: false
// };

/* ---------- Revenue ---------- */
const revenueChart = new Chart(
  document.getElementById('revenueChart'),
  {
    type: 'line',
    data: {
      labels: labels.Weekly,
      datasets: [{
        data: [3000, 4100, 2800, 4000, 4500, 3700, 4300],
        borderColor: '#6c63ff',
        backgroundColor: 'rgba(108, 99, 255, 0.15)',
        fill: true,

        tension: 0.45,
        cubicInterpolationMode: 'monotone',
        borderWidth: 3,

        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#6c63ff',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,

      interaction: {
        mode: 'index',
        intersect: false
      },

      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: '#1A1B4B',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#6c63ff',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 8,
          displayColors: false,
          animation: {
            duration: 300,
            easing: 'easeOutCubic'
          },
          callbacks: {
            title: (items) => {
              return items[0].label.toUpperCase();
            },
            label: (item) => {
              const sales = item.parsed.y.toLocaleString();
              return `${sales} sales\n₹${sales}`;
            }
          }
        }
      },

      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false   // ❌ remove x-axis line
          },
          border: {
            display: false     // Chart.js v4+
          },
          ticks: {
            color :"#999"   // optional: hide x-axis labels too
          }
        },

        y: {
          min: 1000,
          max: 5000,

          grid: {
            color: 'rgba(107, 99, 255, 0.25)',
            borderDash: [4, 4],
            drawBorder: false  // ❌ remove y-axis line
          },
          border: {
            display: false     // Chart.js v4+
          },

          ticks: {
            stepSize: 1000,
            color: '#999',
            callback: v => `${v / 1000}k`
          }
        }
      },

      elements: {
        line: {
          borderJoinStyle: 'round'
        }
      },

      hover: {
        mode: 'index',
        intersect: false
      }
    },
    plugins: [{
      id: 'verticalLine',
      afterDatasetsDraw(chart) {
        if (chart.tooltip._active && chart.tooltip._active.length) {
          const ctx = chart.ctx;
          const activePoint = chart.tooltip._active[0];
          const x = activePoint.element.x;
          const topY = chart.scales.y.top;
          const bottomY = chart.scales.y.bottom;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#6c63ff';
          ctx.setLineDash([5, 5]);
          ctx.stroke();
          ctx.restore();
        }
      }
    }]
  }
);

// ---------- UPDATE FUNCTION ----------
function updateRevenue(type) {
  const newData = labels[type].map(() =>
    Math.floor(Math.random() * 5000)
  );

  revenueChart.data.labels = labels[type];
  revenueChart.data.datasets[0].data = newData;
  revenueChart.update();

  // Update main revenue value
  const totalRevenue = newData.reduce((a, b) => a + b, 0);
  document.getElementById('revenueValue').innerText = `₹${totalRevenue.toLocaleString()}`;
}


/* ---------- Orders ---------- */
const orderChart = new Chart(
    document.getElementById('orderChart'),
    {
        type: 'bar',
        data: {
            labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
            datasets: [
                {
                    label: 'Received',
                    data: [70, 50, 75, 20, 80, 60, 25],
                    backgroundColor: '#339af0',
                    borderRadius: 10,
                    barThickness: 10
                },
                {
                    label: 'Delivered',
                    data: [40, 45, 65, 15, 50, 45, 10],
                    backgroundColor: '#845ef7',
                    borderRadius: 10,
                    barThickness: 10
                },
                {
                    label: 'In transit',
                    data: [20, 40, 40, 10, 35, 40, 15],
                    backgroundColor: '#f06595',
                    borderRadius: 10,
                    barThickness: 10
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#111',
                    bodyColor: '#555',
                    borderColor: '#e9ecef',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 10,
                    displayColors: false,
                    callbacks: {
                        label: ctx =>
                            `${ctx.dataset.label}: ${ctx.parsed.y}`
                    }
                }
            },

            scales: {
                x: {
                    grid: { display: false }
                },
                y: {
                    beginAtZero: true,
                    max: 80,
                    ticks: {
                        stepSize: 20
                    },
                    grid: {
                        borderDash: [4, 4],
                        color: '#edf0f5'
                    }
                }
            }
        }
    }
);

// -------- UPDATE FUNCTION ----------
function updateOrders(type) {
    const labelsMap = {
        Daily: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        Weekly: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        Monthly: ['Jan','Feb','Mar','Apr','May','Jun'],
        Annually: ['2020','2021','2022','2023','2024']
    };

    orderChart.data.labels = labelsMap[type];

    orderChart.data.datasets.forEach(ds => {
        ds.data = labelsMap[type].map(() =>
            Math.floor(Math.random() * 80)
        );
    });

    // Update totals
    document.getElementById('receivedTotal').innerText =
        orderChart.data.datasets[0].data.reduce((a,b)=>a+b,0);

    document.getElementById('deliveredTotal').innerText =
        orderChart.data.datasets[1].data.reduce((a,b)=>a+b,0);

    document.getElementById('transitTotal').innerText =
        orderChart.data.datasets[2].data.reduce((a,b)=>a+b,0);

    orderChart.update();
}

/* ---------- Customers ---------- */
const customerChart = new Chart(
  document.getElementById('customerChart'),
  {
    type: 'bar',
    data: {
      labels: labels.Weekly,
      datasets: [
        {
          label: 'Buyers',
          data: [1400, 1200, 1600, 1500, 1300, 1800, 1200],
          backgroundColor: '#69db7c',
          borderRadius: {topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0},
          barThickness: 16,
          maxBarThickness: 20,
        },
        {
          label: 'Sellers',
          data: [1100, 900, 1300, 1250, 1150, 1400, 1050],
          backgroundColor: '#74c0fc',
          borderRadius: {topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0},
          barThickness: 16,
          maxBarThickness: 20,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'nearest',
        intersect: false
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#fff',
          titleColor: '#111',
          bodyColor: '#333',
          borderColor: '#e9ecef',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 6,
          displayColors: false,
          animation: {
            duration: 200,
            easing: 'easeOutQuart'
          },
          callbacks: {
            label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#444', font: { size: 13 } }
        },
        y: {
          beginAtZero: true,
          max: 2600,
          ticks: {
            stepSize: 400,
            color: '#bbb',
            font: { size: 12 }
          },
          grid: {
            color: '#f0f1f4',
            borderDash: [5, 5]
          }
        }
      }
    }
  }
);

// Update function
function updateCustomers(type) {
  customerChart.data.labels = labels[type];
  customerChart.data.datasets.forEach(dataset => {
    dataset.data = labels[type].map(() =>
      Math.floor(Math.random() * 2000 + 500) // random values 500-2500 for realism
    );
  });
  customerChart.update();
}

/* ---------- Verification ---------- */
Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false;
Chart.defaults.plugins.legend.padding = 8;

// ============================
// CENTER TEXT PLUGIN
// ============================
const centerTextPlugin = {
  id: "centerText",
  beforeDraw(chart) {
    const { ctx, chartArea } = chart;
    if (!chart.options.centerText) return;

    ctx.save();
    ctx.font = "600 13px Inter";
    ctx.fillStyle = "#444";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const x = chartArea.left + chartArea.width / 2;
    const y = chartArea.top + chartArea.height / 2;

    ctx.fillText(chart.options.centerText, x, y);
    ctx.restore();
  }
};

// ============================
// TOOLTIP STYLE (VALUE + %)
// ============================
const tooltipStyle = {
  callbacks: {
    label(ctx) {
      const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
      const value = ctx.raw;
      const percent = Math.round((value / total) * 100);
      return `${value} (${percent}%)`;
    }
  }
};

// ============================
// COMMON LEGEND CONFIG
// ============================
const legendConfig = {
  position: "bottom",
  align: "center",
  labels: {
    usePointStyle: true,
    pointStyle: "circle",
    boxWidth: 8,
    boxHeight: 8,
    padding: 18
  }
};

// ============================
// VENDORS CHART
// ============================
const vendorsChart = new Chart(
  document.getElementById("vendorsChart"),
  {
    type: "doughnut",
    data: {
      labels: ["Verified", "Rejected", "Pending"],
      datasets: [{
        data: [45, 30, 25],
        backgroundColor: ["#6C63FF", "#F72585", "#F9C74F"],
        borderWidth: 0,
        hoverOffset: 10
      }]
    },
    options: {
      cutout: "68%",
      plugins: {
        legend: legendConfig,
        tooltip: tooltipStyle
      },
      centerText: "Vendors"
    },
    plugins: [centerTextPlugin]
  }
);

// ============================
// PRODUCTS CHART
// ============================
const productsChart = new Chart(
  document.getElementById("productsChart"),
  {
    type: "doughnut",
    data: {
      labels: ["Verified", "Rejected", "Pending"],
      datasets: [{
        data: [40, 20, 40],
        backgroundColor: ["#4CAF50", "#F3722C", "#00E5FF"],
        borderWidth: 0,
        hoverOffset: 10
      }]
    },
    options: {
      cutout: "68%",
      plugins: {
        legend: legendConfig,
        tooltip: tooltipStyle
      },
      centerText: "Products"
    },
    plugins: [centerTextPlugin]
  }
);

// ============================
// DROPDOWN UPDATE HANDLER
// ============================
function updateVerification() {
  vendorsChart.data.datasets[0].data = randomSet();
  productsChart.data.datasets[0].data = randomSet();

  vendorsChart.update();
  productsChart.update();
}

// ============================
// RANDOM DATA HELPER
// ============================
function randomSet() {
  const a = Math.floor(Math.random() * 40) + 20;
  const b = Math.floor(Math.random() * 30) + 10;
  const c = 100 - (a + b);
  return [a, b, c];
}

// table code
/* ================= DATA ================= */
const po$ = (selector, scope = document) => scope.querySelector(selector);
const po$$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

/* ==========================
   TIME FILTER DROPDOWN
========================== */
const poTimeFilter = po$("#poTimeFilter");
const poTimeMenu = po$("#poTimeMenu");
const poSelectedTime = po$("#poSelectedTime");

if (poTimeFilter && poTimeMenu) {
  poTimeFilter.addEventListener("click", (e) => {
    e.stopPropagation();
    poTimeMenu.classList.toggle("po-open");
    poTimeMenu.style.display = poTimeMenu.classList.contains("po-open")
      ? "block"
      : "none";
  });

  po$$(".po-time-option", poTimeMenu).forEach(option => {
    option.addEventListener("click", () => {
      poSelectedTime.textContent = option.textContent + " ▾";
      poTimeMenu.classList.remove("po-open");
      poTimeMenu.style.display = "none";

      /* Hook for API call later */
      console.log("Selected time range:", option.textContent);
    });
  });

  document.addEventListener("click", () => {
    poTimeMenu.classList.remove("po-open");
    poTimeMenu.style.display = "none";
  });
}

/* ==========================
   ROW HOVER HIGHLIGHT
========================== */
po$$(".po-table-row").forEach(row => {
  row.addEventListener("mouseenter", () => {
    row.style.background = "#fafbff";
  });

  row.addEventListener("mouseleave", () => {
    row.style.background = "";
  });
});

/* ==========================
   ROW CLICK (DETAILS HOOK)
========================== */
po$$(".po-table-row").forEach(row => {
  row.addEventListener("click", () => {
    const productName = po$(".po-product-name", row)?.innerText || "";
    const status = po$(".po-badge", row)?.innerText || "";

    /* Future: open modal */
    console.log("Order clicked:", {
      product: productName,
      status: status
    });
  });
});

/* ==========================
   STATUS COLOR SAFETY CHECK
   (In case backend injects text)
========================== */
po$$(".po-badge").forEach(badge => {
  const statusText = badge.innerText.toLowerCase();

  badge.classList.remove(
    "po-status-received",
    "po-status-delivered",
    "po-status-packed",
    "po-status-pending"
  );

  if (statusText.includes("received")) badge.classList.add("po-status-received");
  else if (statusText.includes("delivered")) badge.classList.add("po-status-delivered");
  else if (statusText.includes("packed")) badge.classList.add("po-status-packed");
  else if (statusText.includes("pending")) badge.classList.add("po-status-pending");
});

/* ==========================
   PAYMENT STATUS SAFETY
========================== */
po$$(".po-payment-success, .po-payment-pending").forEach(cell => {
  const text = cell.innerText.toLowerCase();

  cell.classList.remove("po-payment-success", "po-payment-pending");

  if (text.includes("credited")) {
    cell.classList.add("po-payment-success");
  } else {
    cell.classList.add("po-payment-pending");
  }
});

/* ==========================
   SCROLL SHADOW EFFECT
========================== */
const poTableBody = po$(".po-table-body");

if (poTableBody) {
  poTableBody.addEventListener("scroll", () => {
    poTableBody.classList.toggle(
      "po-scrolled",
      poTableBody.scrollTop > 0
    );
  });
}

// rows

const dashData = {
  daily: {
    productsSold: "324",
    growth: "+3.2%",
    vendorSales: "₹ 1,24,945",
    statePercent: [40, 35, 30, 25, 20, 15, 10, 8]
  },
  weekly: {
    productsSold: "1234",
    growth: "+15.3%",
    vendorSales: "₹ 6,14,945",
    statePercent: [70, 60, 55, 50, 45, 40, 35, 30]
  },
  monthly: {
    productsSold: "4821",
    growth: "+28.6%",
    vendorSales: "₹ 24,84,120",
    statePercent: [85, 78, 72, 65, 60, 55, 48, 42]
  },
  annually: {
    productsSold: "58,432",
    growth: "+64.9%",
    vendorSales: "₹ 2,84,12,640",
    statePercent: [95, 90, 85, 80, 75, 70, 65, 60]
  }
};

/* ======================================================
   DROPDOWN HANDLING
====================================================== */
const tpDropdown = document.getElementById("tpDropdown");
const tpMenu = tpDropdown.querySelector(".dash-dropdown-menu");
const tpLabel = tpDropdown.querySelector("span");

tpDropdown.addEventListener("click", (e) => {
  e.stopPropagation();
  tpMenu.style.display = "block";
});

document.addEventListener("click", () => {
  tpMenu.style.display = "none";
});

/* ======================================================
   APPLY DATA TO UI
====================================================== */
function applyDashboardData(type) {
  const data = dashData[type];
  if (!data) return;

  /* ---- TOP PRODUCTS ---- */
  document.querySelectorAll(".tp-sub").forEach(el => {
    el.innerHTML = `${data.productsSold} product sold <span>↗ ${data.growth}</span>`;
  });

  /* ---- TOP VENDORS ---- */
  document.querySelectorAll(".tv-amount").forEach(el => {
    el.innerText = data.vendorSales;
  });

  /* ---- STATE WISE COLLECTION ---- */
  document.querySelectorAll(".swc-bar span").forEach((bar, i) => {
    bar.style.width = data.statePercent[i] + "%";
  });
}

/* ======================================================
   OPTION CLICK
====================================================== */
document.querySelectorAll(".dash-dropdown-menu li").forEach(option => {
  option.addEventListener("click", () => {
    const type = option.innerText.toLowerCase();

    tpLabel.innerText = option.innerText + " ▾";
    tpMenu.style.display = "none";

    applyDashboardData(type);
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const rowCount = document.querySelectorAll(".po-table-body .po-table-row").length;
    document.querySelector(".po-title-count").textContent = `(${rowCount})`;
  });

/* ======================================================
   DEFAULT LOAD (Weekly)
====================================================== */
applyDashboardData("weekly");

document.querySelector(".sidebar-main-vendor ul>li:nth-child(1)").classList.add("sidebar-active");

document.querySelector("#account-menu .mobile-dropdown:nth-child(1) .dropdown-header").classList.add("dropdown-header-active");
