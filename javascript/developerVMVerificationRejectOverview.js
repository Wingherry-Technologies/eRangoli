document.addEventListener("DOMContentLoaded", () => {
  const rejectBtn = document.querySelector(".ADVOFaRejectButton");
  const rejectModal = document.getElementById("ADVOFaRejectModal");
  const rejectClose = document.getElementById("ADVOFaCloseRejectModal");
  const rejectNo = document.getElementById("ADVOFaRejectNo");
  const rejectYes = document.getElementById("ADVOFaRejectYes");
  const rejectSuccess = document.getElementById("ADVOFaRejectSuccessScreen");

  rejectBtn?.addEventListener("click", () => {
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
