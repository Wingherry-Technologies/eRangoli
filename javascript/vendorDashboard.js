// Bar Chart with Chart.js
const barCtx = document.getElementById("barChart").getContext("2d");

new Chart(barCtx, {
  type: "bar",
  data: {
    labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    datasets: [
      {
        label: "Packed",
        data: [35, 40, 30, 30, 35, 20, 15],
        backgroundColor: "#ffa800",
        borderRadius: 4,
        barThickness: 6,
      },
      {
        label: "Received",
        data: [5, 15, 60, 85, 95, 30, 70],
        backgroundColor: "#2e90fa",
        borderRadius: 4,
        barThickness: 6,
      },
      {
        label: "Delivered",
        data: [3, 5, 45, 40, 70, 50, 40],
        backgroundColor: "#12b76a",
        borderRadius: 4,
        barThickness: 6,
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

        ticks: {
          font: {
            size: 12,
          },
          color: "#000000",
          fontWeight: "400",
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          font: {
            size: 11,
          },
          color: "#999",
        },
        grid: {
          color: "#716B6B",
          // drawBorder: false,
          borderDash: [2, 2],
          lineWidth: 1,
          drawBorder: false,
          color: (ctx) => {
            if (ctx.tick.value === 0) {
              return "transparent";
            }
            return "#9E9E9E";
          },
        },
      },
    },
  },
});

// Line Chart with Chart.js

const canvas = document.getElementById("lineChart");
const lineCtx = canvas.getContext("2d");

// Purple gradient (Earned)
const earnedGradient = lineCtx.createLinearGradient(0, 0, 0, canvas.height);
earnedGradient.addColorStop(0, "rgba(99, 102, 241, 0.35)");
earnedGradient.addColorStop(0.3, "rgba(99, 101, 241, 0)");

// Red gradient (Refund)
const refundGradient = lineCtx.createLinearGradient(0, 0, 0, canvas.height);
refundGradient.addColorStop(0, "rgba(220, 38, 38, 0.35)");
refundGradient.addColorStop(0.3, "rgba(220, 38, 38, 0.02)");

const shadowPlugin = {
  id: "shadow",
  beforeDatasetsDraw(chart) {
    const ctx = chart.ctx;
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.15)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 6;
  },
  afterDatasetsDraw(chart) {
    chart.ctx.restore();
  }
};


new Chart(lineCtx, {
  type: "line",
  plugins: [shadowPlugin],
  data: {
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"],
    datasets: [
      {
        label: "Earned",
        data: [104, 30, 115, 60, 48, 110, 55],
        borderColor: "#3E00C2",
        backgroundColor: earnedGradient,
        tension: 0.45,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        fill: true
      },
      {
        label: "Refund",
        data: [50, 12, 70, 32, 110, 20, 120],
        borderColor: "#922903",
        backgroundColor: refundGradient,
        tension: 0.45,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        fill: true
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}M`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#999", font: { size: 11 } }
      },
      y: {
        beginAtZero: true,
        max: 120,
        ticks: {
          stepSize: 50,
          callback: v => (v ? `${v}M` : ""),
          color: "#999",
          font: { size: 11 }
        },
        grid: {
          color: "#f0f0f0",
          drawBorder: false
        }
      }
    }
  }
});


const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    // Close all other items
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });

    // Toggle current item
    item.classList.toggle("active");
  });
});

function handleScrollForMobile() {
    const bar = document.querySelector(".mobile-search-bar-main");
    const contentbar = document.querySelector(".mobile-search-bar");
    const desktopERan = document.getElementById("desktop-erangoli-logo");
    const mobileERan = document.getElementById("mobile-erangoli-logo");
    const maginfyingMobile = document.getElementById("maginfying-mobile");
    // const bannerContent=document.querySelector(".banner-main-content");

    // Only apply logic when screen width <= 595px
    if (window.innerWidth <= 595) {

        if (window.scrollY > 10) {
            bar.style.position = "fixed";
            bar.style.backgroundColor = 'transparent';
            bar.style.top = "-2px";
            bar.style.left = "40px";

            contentbar.style.border = "1px solid #D9D9D9";
            contentbar.style.backgroundColor = "transparent";
            contentbar.style.borderLeft = "0px";
            contentbar.style.borderRadius = "0px 30px 30px 0px";
            contentbar.style.zIndex = 999;
            contentbar.style.padding = "8px 10px";
            contentbar.style.marginLeft='10px'

            desktopERan.style.display = 'none';
            mobileERan.style.display = "inline-block";
            maginfyingMobile.style.display = "none";

            // mobileSuggestion.style.top='80px';
            // bannerContent.style.top='130px';
            

        } else {
            bar.style.position = "relative";
            bar.style.backgroundColor = '#f5f5f5';
            bar.style.top = "75px";
            bar.style.left = "0px";

            contentbar.style.border = "none";
            contentbar.style.borderRadius = "30px";
            contentbar.style.backgroundColor = "white";
            contentbar.style.marginLeft='0px'

            desktopERan.style.display = 'flex';
            mobileERan.style.display = "none";
            maginfyingMobile.style.display = "block";

            // mobileSuggestion.style.top='100px';
            // bannerContent.style.top='230px';

        }

    } else {
        // Reset styles when screen is larger than 595px
        bar.style = "";
        contentbar.style = "";
        desktopERan.style.display = 'flex';
        mobileERan.style.display = 'none';
        maginfyingMobile.style.display = 'block';
    }
}

// Run on scroll
window.addEventListener("scroll", handleScrollForMobile);

// Run when screen resizes (mobile ↔ desktop)
window.addEventListener("resize", handleScrollForMobile);

// Run once on initial load
handleScrollForMobile();

// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");
const bar1 = document.querySelector(".mobile-search-bar-main");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    bar1.style.display="none"
    window.scrollTo(0, 0);
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow="auto";
    document.querySelector(".bottom-nav").style.display="flex";
     bar1.style.display="block"
  }
});

document.querySelector("#sidebar-main-vendor ul>li:first-child").classList.add("sidebar-active");

document.querySelector("#account-menu li:first-child .dropdown-header").classList.add("dropdown-header-active");
