document.addEventListener("DOMContentLoaded", () => {
  const rejectBtn = document.querySelector(".ADVOFaRejectButton");
  const rejectModal = document.getElementById("ADVOFaRejectModal");
  const rejectClose = document.getElementById("ADVOFaCloseRejectModal");
  const rejectNo = document.getElementById("ADVOFaRejectNo");
  const rejectYes = document.getElementById("ADVOFaRejectYes");
  const rejectSuccess = document.getElementById("ADVOFaRejectSuccessScreen");

  const rejectReasonBox = document.querySelector(".ADVOFaAdminTextareaWrapper");
  const rejectReasonText = document.getElementById("ADVOReviewTextarea");
  const rejectError = document.getElementById("rejectError");

  let rejectStep = 0;

  rejectBtn?.addEventListener("click", () => {
    if (rejectStep === 0) {
      rejectReasonBox.style.display = "block";
      rejectReasonText.focus();
      rejectStep = 1;
      return;
    }

    if (rejectReasonText.innerText.trim() === "") {
      rejectError.style.display = "block";
      rejectReasonText.classList.add("error");
      return;
    }

    rejectError.style.display = "none";
    rejectReasonText.classList.remove("error");
    rejectModal.classList.add("active");
  });

  const closeRejectModal = () => {
    rejectModal.classList.remove("active");
  };

  rejectClose?.addEventListener("click", closeRejectModal);
  rejectNo?.addEventListener("click", closeRejectModal);

  rejectYes?.addEventListener("click", () => {
    closeRejectModal();
    rejectSuccess.classList.add("active");
  });

  const sendBtn = document.getElementById("ADVOSentToAdminbtn");
  const sendModal = document.getElementById("FAsentModal");
  const sendClose = document.getElementById("FAcloseSentModal");
  const sendNo = document.getElementById("FAsentNo");
  const sendYes = document.getElementById("FAsentYes");
  const sendSuccess = document.getElementById("FAsentSuccessScreen");

  sendBtn?.addEventListener("click", () => {
    rejectReasonBox.style.display = "none";
    rejectReasonText.innerText = "";
    rejectError.style.display = "none";
    rejectReasonText.classList.remove("error");
    rejectStep = 0;
    sendModal.classList.add("active");
  });

  const closeSendModal = () => {
    sendModal.classList.remove("active");
  };

  sendClose?.addEventListener("click", closeSendModal);
  sendNo?.addEventListener("click", closeSendModal);

  sendYes?.addEventListener("click", () => {
    closeSendModal();
    sendSuccess.classList.add("active");
  });
});
