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

const labels = {
  Daily: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  Weekly: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  Monthly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  Annually: ["2020", "2021", "2022", "2023", "2024"],
};

/* ---------- Revenue ---------- */
const revenueChart = new Chart(document.getElementById("DD-revenueChart"), {
  type: "line",
  data: {
    labels: labels.Weekly,
    datasets: [
      {
        data: [3000, 4100, 2800, 4000, 4500, 3700, 4300],
        borderColor: "#6c63ff",
        backgroundColor: "rgba(108, 99, 255, 0.15)",
        fill: true,
        tension: 0.15,
        cubicInterpolationMode: "monotone",
        clip: true,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#6c63ff",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#1A1B4B",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#6c63ff",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        animation: {
          duration: 300,
          easing: "easeOutCubic",
        },
        callbacks: {
          title: (items) => items[0].label.toUpperCase(),
          label: (item) => {
            const sales = item.parsed.y.toLocaleString();
            return `${sales} sales\n₹${sales}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#999",
        },
      },
      y: {
        min: 1000,
        max: 5000,
        grace: "5%",
        grid: {
          color: "rgba(107, 99, 255, 0.25)",
          borderDash: [4, 4],
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          stepSize: 1000,
          color: "#999",
          callback: (v) => `${v / 1000}k`,
        },
      },
    },
    elements: {
      line: {
        borderJoinStyle: "round",
      },
    },
    hover: {
      mode: "index",
      intersect: false,
    },
  },
  plugins: [
    {
      id: "verticalLine",
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
          ctx.strokeStyle = "#6c63ff";
          ctx.setLineDash([]);
          ctx.stroke();
          ctx.restore();
        }
      },
    },
  ],
});

// ---------- UPDATE FUNCTION ----------
function updateRevenue(type) {
  const newData = labels[type].map(() => Math.floor(Math.random() * 5000));

  revenueChart.data.labels = labels[type];
  revenueChart.data.datasets[0].data = newData;
  revenueChart.update();
}

/* ---------- Orders ---------- */
const orderChart = new Chart(document.getElementById("DD-orderChart"), {
  type: "bar",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Received",
        data: [70, 50, 75, 20, 80, 60, 25],
        backgroundColor: "#339af0",
        borderRadius: 10,
        barThickness: 10,
      },
      {
        label: "Delivered",
        data: [40, 45, 65, 15, 50, 45, 10],
        backgroundColor: "#845ef7",
        borderRadius: 10,
        barThickness: 10,
      },
      {
        label: "In transit",
        data: [20, 40, 40, 10, 35, 40, 15],
        backgroundColor: "#f06595",
        borderRadius: 10,
        barThickness: 10,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#111",
        bodyColor: "#555",
        borderColor: "#e9ecef",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
        displayColors: false,
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        max: 80,
        ticks: {
          stepSize: 20,
        },
        grid: {
          borderDash: [4, 4],
          color: "#edf0f5",
        },
      },
    },
  },
});

// -------- UPDATE FUNCTION ----------
function updateOrders(type) {
  const labelsMap = labels;

  orderChart.data.labels = labelsMap[type];

  orderChart.data.datasets.forEach((ds) => {
    ds.data = labelsMap[type].map(() => Math.floor(Math.random() * 80));
  });

  document.getElementById("DD-receivedTotal").innerText =
    orderChart.data.datasets[0].data.reduce((a, b) => a + b, 0);

  document.getElementById("DD-deliveredTotal").innerText =
    orderChart.data.datasets[1].data.reduce((a, b) => a + b, 0);

  document.getElementById("DD-transitTotal").innerText =
    orderChart.data.datasets[2].data.reduce((a, b) => a + b, 0);

  orderChart.update();
}

const tpDropdown = document.getElementById("DD-tpDropdown");
const tpMenu = tpDropdown.querySelector(".DD-dash-dropdown-menu");
const tpLabel = tpDropdown.querySelector("span");

// Toggle dropdown
tpDropdown.addEventListener("click", function (e) {
  e.stopPropagation();
  tpMenu.style.display = tpMenu.style.display === "block" ? "none" : "block";
});

// Option select
tpMenu.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.stopPropagation();
    tpLabel.innerText = this.innerText + " ▾";
    tpMenu.style.display = "none";
  });
});

// Close when clicking outside
document.addEventListener("click", function () {
  tpMenu.style.display = "none";
});

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(1)").classList.add("sidebar-active");


document.querySelector("#account-menu .mobile-dropdown:nth-child(1) .dropdown-header").classList.add("dropdown-header-active");
