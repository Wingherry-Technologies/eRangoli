  document.querySelector(".continue-btn").addEventListener("click", function () {
      const customer = document.getElementById("customer-radio");
      const vendor = document.getElementById("vendor-radio");

      if (customer.checked) {
          window.location.href = "login.html"; // Redirect to Customer Login
      } 
      else if (vendor.checked) {
          window.location.href = "vendorlogin.html"; // Redirect to Vendor Login
      } 
      else {
          document.getElementById("error-tostify").style.display="flex";
      }
  });
