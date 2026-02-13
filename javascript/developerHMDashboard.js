document.addEventListener("DOMContentLoaded", () => {
  const listItems = document.querySelectorAll(".list li");

  listItems.forEach((item) => {
    const title = item.querySelector(".name")?.innerText.trim();

    item.addEventListener("click", () => {
      if (title === "Featured Bands") {
        window.location.href = "../html/developerHMFeatureBrands.html";
      }

      if (title === "Top Categories") {
        window.location.href = "../html/developerHMTopCattegories.html";
      }

      if (title === "Shop by State") {
        window.location.href = "../html/developerHMShopbyState.html";
      }
      if (title === "Artisans Story") {
        window.location.href = "../html/developerHMArtisanStory.html";
      }
      if (title === "Promotion") {
        window.location.href = "../html/developerHMPromotions.html";
      }
      if (title === "Exclusive Product") {
        window.location.href = "../html/developerHMExclusiveProducts.html";
      }
    });
  });
});
