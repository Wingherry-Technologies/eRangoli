document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("userForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const usernameEl = document.getElementById("username");
    const emailEl = document.getElementById("email");
    const mobileEl = document.getElementById("mobile");
    const passwordEl = document.getElementById("password");
    const roleEl = document.getElementById("role");

    const username = usernameEl.value.trim();
    const email = emailEl.value.trim();
    const mobile = mobileEl.value.trim();
    const password = passwordEl.value.trim();
    const role = roleEl.value;

    let isValid = true;

    document.querySelectorAll(".error").forEach((err) => (err.innerText = ""));

    if (username === "") {
      showError("username", "Username is required");
      isValid = false;
    }

    if (email === "") {
      showError("email", "Email is required");
      isValid = false;
    } else if (!email.includes("@")) {
      showError("email", "Enter valid email");
      isValid = false;
    }

    if (mobile === "") {
      showError("mobile", "Mobile number is required");
      isValid = false;
    } else if (mobile.replace(/\s/g, "").length < 10) {
      showError("mobile", "Enter valid mobile number");
      isValid = false;
    }

    if (password === "") {
      showError("password", "Password is required");
      isValid = false;
    }

    if (role === "") {
      showError("role", "Role is required");
      isValid = false;
    }

    if (isValid) {
      document.getElementById("createCard").style.display = "none";
      document.getElementById("verifyCard").style.display = "block";
      document.getElementById("pageTitle").innerText = "Verify Credentials";

      document.getElementById("vUsername").innerText = username;
      document.getElementById("vEmail").innerText = email;
      document.getElementById("vPassword").innerText = password;
    }
  });

  const sendBtn = document.getElementById("sendBtn");
  if (sendBtn) {
    sendBtn.addEventListener("click", function () {
      document.getElementById("successModal").style.display = "flex";

      setTimeout(() => {
        document.getElementById("successModal").style.display = "none";
      }, 2500);
    });
  }
});

function showError(id, msg) {
  document.getElementById(id).parentElement.querySelector(".error").innerText =
    msg;
}
