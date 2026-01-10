const sizeOptions = document.querySelectorAll('.productOverviewSizeOption');

  sizeOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Remove active class from all
      sizeOptions.forEach(opt => 
        opt.classList.remove('productOverviewSizeOptionActive')
      );

      // Add active class to clicked one
      option.classList.add('productOverviewSizeOptionActive');
    });
});

document.getElementById("size-chart-btn").addEventListener("click",()=>{
    document.querySelector(".size-chart-main-box").style.display='flex'
})
document.getElementById("close-size-chart-main-box").addEventListener("click",()=>{
  document.querySelector(".size-chart-main-box").style.display='none'
})