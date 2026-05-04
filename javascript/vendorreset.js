// Simulated existing numbers — replace with API call if needed
    const existingNumbers = ["8855447755", "9876543210", "7890123456"];

    const form = document.getElementById("vendorResetForm");
    const input = document.getElementById("vendorResetUser");
    const errorSpan = document.getElementById("vendorResetUserError");

    function showError(message) {
      errorSpan.textContent = message;
      input.classList.add("error");
      input.classList.remove("success");
    }

    function clearError() {
      errorSpan.textContent = "";
      input.classList.remove("error");
      input.classList.add("success");
    }

    // Live: clear error as user types
    input.addEventListener("input", () => {
      if (errorSpan.textContent) {
        errorSpan.textContent = "";
        input.classList.remove("error", "success");
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const mobile = input.value.trim();

      // 1. Empty check
      if (mobile === "") {
        showError("Mobile number is required.");
        return;
      }

      // 2. Only digits
      if (!/^\d+$/.test(mobile)) {
        showError("Mobile number must contain digits only.");
        return;
      }

      // 3. Exactly 10 digits
      if (mobile.length !== 10) {
        showError("Mobile number must be exactly 10 digits.");
        return;
      }

      // 4. Must start with 6, 7, 8, or 9 (Indian mobile format)
      if (!/^[6-9]/.test(mobile)) {
        showError("Enter a valid Indian mobile number.");
        return;
      }

      // 5. Check if number exists
      if (!existingNumbers.includes(mobile)) {
        showError("This mobile number is not registered.");
        return;
      }

      // All valid — navigate to next page
      clearError();
      window.location.href = "../html/vendorresetotp.html";
    });