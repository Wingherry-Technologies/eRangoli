document.getElementById("back-btn").addEventListener("click", () => {
  window.location.href = "../html/productcatalog.html";
});

document.getElementById("back-btn-media").addEventListener("click", () => {
  window.location.href = "../html/productcatalog.html";
});

document.getElementById("back-btn-mob").addEventListener("click", () => {
  window.location.href = "../html/productcatalog.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const toggle = item.querySelector(".faq-toggle");

    item.addEventListener("click", () => {
      const isOpen = answer.classList.contains("open");

      // Close all answers
      document.querySelectorAll(".faq-answer.open").forEach((a) => {
        a.style.height = a.scrollHeight + "px"; // set current height
        requestAnimationFrame(() => {
          a.style.height = "0px";
        });
        a.classList.remove("open");
      });

      document.querySelectorAll(".faq-question.active").forEach((q) => {
        q.classList.remove("active");
        q.querySelector(".faq-toggle").textContent = "+";
      });

      // Open clicked one
      if (!isOpen) {
        answer.classList.add("open");
        answer.style.height = answer.scrollHeight + "px";
        question.classList.add("active");
        toggle.textContent = "–";
      }
    });
  });
});
