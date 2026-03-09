document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", function () {
    if (this.retryCount === undefined) this.retryCount = 0;
    if (this.retryCount < 5) {
      this.retryCount++;
      setTimeout(() => {
        const src = this.src;
        this.src = "";
        this.src = src;
      }, 1000 * this.retryCount);
    }
  });
});

window.addEventListener("load", () => {
  document.querySelectorAll("img").forEach((img) => {
    if (!img.complete || img.naturalWidth === 0) {
      const src = img.src;
      img.src = "";
      img.src = src;
    }
  });
});
