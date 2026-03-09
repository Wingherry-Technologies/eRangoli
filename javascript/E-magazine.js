const tabs    = document.getElementById('stateTabs');
const prevBtn = document.getElementById('prevState');
const nextBtn = document.getElementById('nextState');


function getStepWidth() {
  const tab = tabs.querySelector('.EMH-tab');
  const gap = parseInt(getComputedStyle(tabs).gap) || 16;
  
  return (tab.offsetWidth + gap) * 1; 
}

function updateArrows() {
  const max = tabs.scrollWidth - tabs.clientWidth;
  prevBtn.classList.toggle('disabled', tabs.scrollLeft <= 1);
  nextBtn.classList.toggle('disabled', tabs.scrollLeft >= max - 1);
}

nextBtn.addEventListener('click', () => {
  const step = getStepWidth();
  const nextStop = Math.ceil(tabs.scrollLeft / step) * step;
  tabs.scrollTo({ left: nextStop + step, behavior: 'smooth' });
  setTimeout(updateArrows, 400);
});

prevBtn.addEventListener('click', () => {
  const step = getStepWidth();
  const prevStop = Math.floor(tabs.scrollLeft / step) * step;
  tabs.scrollTo({ left: Math.max(0, prevStop - step), behavior: 'smooth' });
  setTimeout(updateArrows, 400);
});

tabs.querySelectorAll('.EMH-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.querySelectorAll('.EMH-tab').forEach(t => t.classList.remove('EMH-tab-active'));
    tab.classList.add('EMH-tab-active');
  });
});

tabs.addEventListener('scroll', updateArrows);
updateArrows(); 