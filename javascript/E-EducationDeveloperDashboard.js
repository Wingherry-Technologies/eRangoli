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
  Daily: [
    "Pottery",
    "painting",
    "Pottery",
    "painting",
    "Pottery",
    "painting",
    "Pottery",
    "painting",
    "Pottery",
    "painting",
    "Pottery",
    "painting",
  ],
  Weekly: [
    "Pottery",
    "painting",
    "Pottery",
    "painting",
    "Pottery",
    "painting",
    "Pottery",
    "painting",
    "Pottery",
    "painting",
    "Pottery",
    "painting",
  ],
  Monthly: [
    "Pottery",
    "painting",
    "Pottery",
    "painting",
    "Pottery",
    "painting",
    "Pottery",
    "painting",
    "Pottery",
    "painting",
    "Pottery",
    "painting",
  ],
  Annually: [
    "Pottery",
    "painting",
    "Pottery",
    "painting",
    "Pottery",
    "painting",
    "Pottery",
    "painting",
    "Pottery",
    "painting",
    "Pottery",
    "painting",
  ],
};

const revenueLabels = {
  Daily: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  Weekly: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  Monthly: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  Annually: ["2020", "2021", "2022", "2023", "2024", "2025"],
};

const revenueChart = new Chart(document.getElementById("EEDD-revenueChart"), {
  type: "line",
  data: {
    labels: revenueLabels.Weekly,
    datasets: [
      {
        data: revenueLabels.Weekly.map(() => Math.floor(Math.random() * 4000)),
        borderColor: "#6c63ff",
        backgroundColor: "rgba(108, 99, 255, 0.15)",
        fill: true,
        tension: 0.15,
        cubicInterpolationMode: "monotone",
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
    interaction: { mode: "index", intersect: false },
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
        animation: { duration: 300, easing: "easeOutCubic" },
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
        },
        border: { display: false },
        ticks: { color: "#999" },
      },
      y: {
        min: 0,
        max: 4000,
        ticks: {
          stepSize: 1000,
          autoSkip: false,
          padding: 10,
          callback: (v) => `${v / 1000}k`,
        },
        grid: {
          color: "rgba(107, 99, 255, 0.25)",
          borderDash: [],
          drawBorder: false,
        },
      },
    },
    elements: { line: { borderJoinStyle: "round" } },
    hover: { mode: "index", intersect: false },
  },
  plugins: [
    {
      id: "verticalLine",
      id: "verticalLine",
      afterDatasetsDraw(chart) {
        if (chart.tooltip._active && chart.tooltip._active.length) {
          const ctx = chart.ctx;
          const activePoint = chart.tooltip._active[0];

          const x = activePoint.element.x;
          const y = activePoint.element.y;

          const bottomY = chart.scales.y.bottom;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, y);
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

function updateRevenue(type) {
  revenueChart.data.labels = revenueLabels[type];
  revenueChart.data.datasets[0].data = revenueLabels[type].map(() =>
    Math.floor(Math.random() * 4000),
  );
  revenueChart.update();
}

const orderChart = new Chart(document.getElementById("EEDD-orderChart"), {
  type: "bar",
  data: {
    labels: labels.Weekly,
    datasets: [
      {
        label: "Enrolled",
        data: [340, 250, 100, 200, 340, 250, 100, 200, 340, 250, 100, 200],
        backgroundColor: "#2e90fa",
        borderRadius: 6,
        categoryPercentage: 0.55,
        barPercentage: 0.75,
      },
      {
        label: "Attended",
        data: [230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230],
        backgroundColor: "#7b5dd6",
        borderRadius: 6,
        categoryPercentage: 0.55,
        barPercentage: 0.75,
      },
      {
        label: "Absent",
        data: [180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180],
        backgroundColor: "#d670d5",
        borderRadius: 6,
        categoryPercentage: 0.55,
        barPercentage: 0.75,
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
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        max: 400,
        ticks: { stepSize: 100 },
        grid: { borderDash: [4, 4], color: "#edf0f5" },
      },
    },
  },
});

function updateOrders(type) {
  orderChart.data.labels = labels[type];
  orderChart.data.datasets.forEach((ds) => {
    ds.data = labels[type].map(() => Math.floor(Math.random() * 80));
  });

  const receivedEl = document.getElementById("EEDD-receivedTotal");
  const deliveredEl = document.getElementById("EEDD-deliveredTotal");
  const transitEl = document.getElementById("EEDD-transitTotal");

  if (receivedEl)
    receivedEl.innerText = orderChart.data.datasets[0].data.reduce(
      (a, b) => a + b,
      0,
    );
  if (deliveredEl)
    deliveredEl.innerText = orderChart.data.datasets[1].data.reduce(
      (a, b) => a + b,
      0,
    );
  if (transitEl)
    transitEl.innerText = orderChart.data.datasets[2].data.reduce(
      (a, b) => a + b,
      0,
    );

  orderChart.update();
}

new Chart(document.getElementById("EEDD-revenueDonutChart"), {
  type: "doughnut",
  data: {
    labels: ["Workshop Courses", "Short Workshop"],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#15ebe0", "#7b5dd6"],
        borderWidth: 0,
        spacing: 0,
        cutout: "75%",
      },
    ],
  },
  options: {
    responsive: false,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
    },
  },
});

document.querySelectorAll(".EEDD-custom-select").forEach(function (select) {
  var trigger = select.querySelector(".EEDD-select-trigger");
  var dropdown = select.querySelector(".EEDD-select-dropdown");
  var items = select.querySelectorAll("li");

  trigger.addEventListener("click", function (e) {
    e.stopPropagation();
    var isOpen = select.classList.contains("open");
    document.querySelectorAll(".EEDD-custom-select").forEach(function (s) {
      s.classList.remove("open");
    });
    if (!isOpen) select.classList.add("open");
  });

  items.forEach(function (item) {
    item.addEventListener("click", function () {
      items.forEach(function (i) {
        i.classList.remove("active");
      });
      item.classList.add("active");
      trigger.innerHTML =
        item.textContent + ' <span class="EEDD-select-arrow">&#9662;</span>';
      select.classList.remove("open");

      var val = item.getAttribute("data-value");
      if (select.id === "EEDD-select-orders") updateOrders(val);
      if (select.id === "EEDD-select-revenue") updateRevenue(val);
    });
  });
});

document.addEventListener("click", function () {
  document.querySelectorAll(".EEDD-custom-select").forEach(function (s) {
    s.classList.remove("open");
  });
});

document.querySelector(".sidebar-main-vendor > article > ul >li:nth-of-type(5)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul>ul:nth-of-type(3)>li:nth-child(1)").classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(5) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(5)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(5) li:nth-child(1)").classList.add("submenu-active-page");
