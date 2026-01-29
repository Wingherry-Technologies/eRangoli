// Payment Mode Donut Chart
const adminSalesPaymentModeCtx = document
  .getElementById("adminSalesPaymentModeChart")
  .getContext("2d");
const adminSalesPaymentModeChart = new Chart(adminSalesPaymentModeCtx, {
  type: "doughnut",
  data: {
    labels: ["Credit/Debit", "Google Pay", "Net Banking", "UPI BHIM"],
    datasets: [
      {
        data: [63, 37, 15, 0],
        backgroundColor: ["#7C3AED", "#14B8A6", "#F59E0B", "#6B7280"],
        borderWidth: 0,
        spacing: 0,
        cutout: "75%",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  },
});

// Business Chart (Revenue) - Area Chart
const adminSalesBusinessCtx = document
  .getElementById("adminSalesBusinessChart")
  .getContext("2d");
const adminSalesBusinessChart = new Chart(adminSalesBusinessCtx, {
  type: "line",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [10, 42, 32, 65, 28, 25, 22, 42, 15, 32, 28, 65],
        borderColor: "#532DDB",
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 0,

        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );
          gradient.addColorStop(0, "rgba(124, 58, 237, 0.35)");
          gradient.addColorStop(0.6, "rgba(124, 58, 237, 0.15)");
          gradient.addColorStop(1, "rgba(124, 58, 237, 0.02)");
          return gradient;
        },
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#3F3F3F",
        },
      },
      y: {
        min: 0,
        max: 80,

        grid: {
          display: false,
        },
        border: {
          display: false,
        },

        ticks: {
          stepSize: 20,
          padding: 10,
          font: {
            size: 12,
            weight: 500,
          },
          color: "#716B6B",
          callback: function (value) {
            return value < 10 ? "0" + value : value;
          },
        },
      },
    },
  },
});

// State Wise Revenues Donut Chart
const adminSalesStateWiseCtx = document
  .getElementById("adminSalesStateWiseChart")
  .getContext("2d");
const adminSalesStateWiseChart = new Chart(adminSalesStateWiseCtx, {
  type: "doughnut",
  data: {
    labels: ["MH", "GJ", "RJ"],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ["#7C3AED", "#C084FC", "#BEF264"],
        borderWidth: 0,
        spacing: 0,
        cutout: "75%",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  },
});

// Target vs Reality Chart
const adminSalesTargetCtx = document
  .getElementById("adminSalesTargetChart")
  .getContext("2d");
window.adminSalesTargetChart = new Chart(adminSalesTargetCtx, {
  type: "bar",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Target",
        data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );
          gradient.addColorStop(0, "#FFEB11");
          gradient.addColorStop(0.5, "#B6D339");
          gradient.addColorStop(1, "#F3C57A");

          return gradient;
        },
        borderRadius: 4,
        barThickness: 8,
      },
      {
        label: "Reality",
        data: [85, 83, 84, 83, 84, 83, 83, 84, 84, 83, 83, 84],
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );

          gradient.addColorStop(0, "#57DA65");
          gradient.addColorStop(0.5, "#51CC5D");
          gradient.addColorStop(1, "#46A46C");

          return gradient;
        },

        borderRadius: 4,
        barThickness: 8,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#6B7280",
        },
      },
      y: {
        min: 20,
        max: 100,

        grid: {
          display: false,
        },
        border: {
          display: false,
        },

        ticks: {
          stepSize: 20,
          padding: 12,
          font: {
            size: 12,
          },
          color: "#6B7280",
          callback: function (value) {
            if (value === 20) return "20k";
            if (value === 40) return "40k";
            if (value === 60) return "60k";
            if (value === 80) return "80k";
            if (value === 100) return "1.0M";
            return "";
          },
        },
      },
    },
  },
});

// State Revenues Bar Chart
const adminSalesStateRevenuesCtx = document
  .getElementById("adminSalesStateRevenuesChart")
  .getContext("2d");
const adminSalesStateRevenuesChart = new Chart(adminSalesStateRevenuesCtx, {
  type: "bar",
  data: {
    labels: [
      "MH",
      "MH",
      "MH",
      "MH",
      "MH",
      "MH",
      "MH",
      "MH",
      "MH",
      "MH",
      "MH",
      "MH",
    ],
    datasets: [
      {
        data: [22, 26, 22, 20, 16, 18, 22, 26, 22, 20, 7, 18],
        backgroundColor: "#0095FF",
        borderRadius: 2,
        barThickness: 10,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: "#6B7280",
        },
      },

      y: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: { size: 11 },
          color: "#6B7280",
          callback: function (value) {
            return value + "k";
          },
        },
        max: 25,
      },
    },
  },
});

function applyMobileOrder() {
  if (window.innerWidth > 595) return;

  const container = document.querySelector(".adminSalesDashboardContainer");
  if (!container) return;

  const statsRow = document.querySelector(".adminSalesStatsRow");
  const topRevenue = document.querySelector(".adminSalesRowTop .revenue");
  const businessChart = document.querySelector(
    ".adminSalesRowMiddle .adminSalesCardLarge",
  );
  const targetReality = document.querySelector(".adminSalesRowBottom .target");
  const paymentMode = document.querySelector(".adminSalesRowTop .payment");
  const stateWise = document.querySelector(".adminSalesRowMiddle .statewise");
  const topStateRevenue = document.querySelector(
    ".adminSalesRowBottom .adminSalesCardSmall",
  );

  const mobileWrapper = document.createElement("div");
  mobileWrapper.className = "mobile-dashboard-flow";

  [
    statsRow,
    topRevenue,
    businessChart,
    targetReality,
    paymentMode,
    stateWise,
    topStateRevenue,
  ].forEach((el) => el && mobileWrapper.appendChild(el));

  container.innerHTML = "";
  container.appendChild(mobileWrapper);

  setTimeout(() => {
    if (window.adminSalesTargetChart) {
      window.adminSalesTargetChart.resize();
      window.adminSalesTargetChart.update();
    }
  }, 100);
}
