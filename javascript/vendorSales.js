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

const canvas = document.getElementById("lineChart");
const ctx = canvas.getContext("2d");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
    datasets: [
      {
        label: "Earned",
        data: [10, 50, 30, 65, 40, 30, 28, 50, 20, 35, 50, 75],
        borderColor: "#2D9CDB",
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        fill: 'origin',

        // 👇 PERFECT gradient fill
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );

          gradient.addColorStop(0, "rgba(45, 156, 219, 0.35)");
          gradient.addColorStop(1, "rgba(45, 156, 219, 0)");

          return gradient;
        }
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#3F3F3F",
          font: { size: 12 }
        }
      },
      y: {
        min: 0,
        max: 80,
        ticks: {
          stepSize: 20,
          callback: (value) => value.toString().padStart(2, "0"),
          color: "#3F3F3F",
          font: { size: 12 }
        },
        grid: { display: false }
      }
    }
  }
});

document.querySelector("#sidebar-main-vendor ul>li:nth-child(5)").classList.add("sidebar-active");

document.querySelector("#account-menu li:nth-child(5) .dropdown-header").classList.add("dropdown-header-active");
