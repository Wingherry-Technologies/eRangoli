(function () {
  const grid = document.querySelector(".EME-artisan-grid");
  const cards = Array.from(document.querySelectorAll(".EME-artisan-card"));
  const prevBtn = document.querySelector(".EME-artisan-nav .EME-prev-btn");
  const nextBtn = document.querySelector(".EME-artisan-nav .EME-next-btn");

  const TOTAL = cards.length;
  let currentIndex = 0;

  const wrapper = document.createElement("div");
  wrapper.classList.add("EME-artisan-slider-wrapper");
  grid.parentNode.insertBefore(wrapper, grid);
  wrapper.appendChild(grid);

  function getVisible() {
    const w = window.innerWidth;
    if (w <= 594) return 1;
    if (w <= 1024) return 2;
    return 3;
  }

  function getCardWidth() {
    const VISIBLE = getVisible();
    const gap = 25;
    const wrapperWidth = wrapper.offsetWidth;
    return (wrapperWidth - gap * (VISIBLE - 1)) / VISIBLE + gap;
  }

  function updateSlider(animate) {
    const VISIBLE = getVisible();

    const maxIndex = Math.max(0, TOTAL - VISIBLE);
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    grid.style.transition = animate === false ? "none" : "transform 0.4s ease";
    const offset = currentIndex * getCardWidth();
    grid.style.transform = "translateX(-" + offset + "px)";

    if (currentIndex <= 0) {
      prevBtn.classList.add("EME-disabled");
    } else {
      prevBtn.classList.remove("EME-disabled");
    }

    if (currentIndex >= maxIndex) {
      nextBtn.classList.add("EME-disabled");
    } else {
      nextBtn.classList.remove("EME-disabled");
    }
  }

  nextBtn.addEventListener("click", function () {
    if (nextBtn.classList.contains("EME-disabled")) return;
    currentIndex++;
    updateSlider();
  });

  prevBtn.addEventListener("click", function () {
    if (prevBtn.classList.contains("EME-disabled")) return;
    currentIndex--;
    updateSlider();
  });

  window.addEventListener("resize", function () {
    updateSlider(false);
    requestAnimationFrame(function () {
      grid.style.transition = "transform 0.4s ease";
    });
  });

  updateSlider(false);
})();
