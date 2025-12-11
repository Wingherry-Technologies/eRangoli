// FAQ Accordion Logic
document.addEventListener("DOMContentLoaded", function () {
  const questions = document.querySelectorAll(".faq-question");

  questions.forEach((question) => {
    question.addEventListener("click", function () {
      const questionIndex = this.getAttribute("data-question");
      const answer = document.querySelector(`[data-answer="${questionIndex}"]`);

      // Close all other answers
      document
        .querySelectorAll(".faq-answer.active")
        .forEach((activeAnswer) => {
          if (activeAnswer !== answer) {
            activeAnswer.classList.remove("active");
            const activeQuestionIndex =
              activeAnswer.getAttribute("data-answer");
            const activeQuestion = document.querySelector(
              `[data-question="${activeQuestionIndex}"]`
            );
            activeQuestion.classList.remove("active");
            activeQuestion.querySelector(".faq-toggle").textContent = "+";
          }
        });

      // Toggle current answer
      answer.classList.toggle("active");
      this.classList.toggle("active");

      // Update toggle symbol
      const toggle = this.querySelector(".faq-toggle");
      toggle.textContent = this.classList.contains("active") ? "–" : "+";
    });
  });
});
