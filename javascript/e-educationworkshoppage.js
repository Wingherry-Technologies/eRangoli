const items = document.querySelectorAll(".WS-item");

items.forEach((item) => {

  const top = item.querySelector(".WS-top");

  const toggle = item.querySelector("input");

  // OPEN DROPDOWN

  top.addEventListener("click", (e) => {

    if (e.target.closest(".WS-switch")) return;

    if (!item.classList.contains("inactive-item")) return;

    document.querySelectorAll(".inactive-item").forEach((el) => {

      if (el !== item) {
        el.classList.remove("open");
      }

    });

    item.classList.toggle("open");

  });


  // TOGGLE ACTIVE / INACTIVE

  toggle.addEventListener("change", () => {

    if (toggle.checked) {

      item.classList.remove("inactive-item");
      item.classList.remove("open");

      item.classList.add("active-item");

    } else {

      item.classList.remove("active-item");

      item.classList.add("inactive-item");

    }

  });

});