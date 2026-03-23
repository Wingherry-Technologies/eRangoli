document.addEventListener("DOMContentLoaded", function () {

document.querySelector('.ESTP-back').addEventListener('click', function(e){
  e.preventDefault();
  window.history.back();
});

const INDIVIDUAL_BASE = 1299;
const INDIVIDUAL_TOTAL = 1459;
const GROUP_BASE_PER = 1299;
const TAX_MULTIPLIER = INDIVIDUAL_TOTAL / INDIVIDUAL_BASE;

let selectedDate = null;
let selectedTime = null;
let selectedTicket = null;
let groupCount = 2;


// DATE BUTTON
document.querySelectorAll('.ESTP-date-option').forEach(btn=>{
  btn.addEventListener('click', function(){

    document.querySelectorAll('.ESTP-date-option')
      .forEach(b=>b.classList.remove('ESTP-selected'));

    this.classList.add('ESTP-selected');
    selectedDate = this.dataset.date;

    checkComplete();
  });
});


// TIME BUTTON
document.querySelectorAll('.ESTP-time-option').forEach(btn=>{
  btn.addEventListener('click', function(){

    document.querySelectorAll('.ESTP-time-option')
      .forEach(b=>b.classList.remove('ESTP-selected'));

    this.classList.add('ESTP-selected');
    selectedTime = this.dataset.time;

    checkComplete();
  });
});


function checkComplete(){

  if(!selectedDate || !selectedTime) return;

  const dtEl = document.getElementById('ESTP-venue-datetime');
  dtEl.textContent = selectedDate + " | " + selectedTime;
  dtEl.classList.remove('ESTP-hidden');

  document.getElementById('ESTP-datetime-card').classList.add('ESTP-hidden');
  document.getElementById('ESTP-ticket-card').classList.remove('ESTP-hidden');
  document.getElementById('ESTP-pay-card').classList.remove('ESTP-hidden');

  resetTicket();
}


function resetTicket(){

  selectedTicket = null;

  document.getElementById('ESTP-btn-individual')
  .classList.remove('ESTP-selected');

  document.getElementById('ESTP-btn-group')
  .classList.remove('ESTP-selected');

  document.getElementById('ESTP-btn-group')
  .classList.remove('ESTP-hidden');

  document.getElementById('ESTP-group-counter')
  .classList.add('ESTP-hidden');

  groupCount = 2;

  document.getElementById('ESTP-group-count').textContent = groupCount;
  document.getElementById('ESTP-dec-btn').disabled = true;

  updatePayable();
}


// TICKET BUTTON
document.querySelectorAll('.ESTP-ticket-btn').forEach(btn=>{
  btn.addEventListener('click', function(){

    selectedTicket = this.dataset.ticket;

    if(selectedTicket === "individual"){

      document.getElementById('ESTP-btn-individual')
      .classList.add('ESTP-selected');

      document.getElementById('ESTP-btn-group')
      .classList.remove('ESTP-hidden');

      document.getElementById('ESTP-group-counter')
      .classList.add('ESTP-hidden');

      groupCount = 2;

    }else{

      document.getElementById('ESTP-btn-individual')
      .classList.remove('ESTP-selected');

      document.getElementById('ESTP-btn-group')
      .classList.add('ESTP-hidden');

      document.getElementById('ESTP-group-counter')
      .classList.remove('ESTP-hidden');

      groupCount = 2;

    }

    document.getElementById('ESTP-group-count').textContent = groupCount;
    document.getElementById('ESTP-dec-btn').disabled = true;

    updatePayable();

  });
});


// COUNTER
document.querySelectorAll('.ESTP-counter-btn').forEach(btn=>{
  btn.addEventListener('click', function(){

    const delta = Number(this.dataset.change);

    if(isNaN(delta)) return;

    groupCount += delta;

    if(groupCount < 2) groupCount = 2;

    document.getElementById('ESTP-group-count').textContent = groupCount;
    document.getElementById('ESTP-dec-btn').disabled = (groupCount <= 2);

    updatePayable();

  });
});


function updatePayable(){

  const taxEl = document.getElementById('ESTP-pay-tax');
  const totalEl = document.getElementById('ESTP-pay-total');
  const payBtn = document.getElementById('ESTP-pay-btn');

  if(!selectedTicket){

    taxEl.textContent = "₹0 + Taxes";
    totalEl.textContent = "₹0";
    payBtn.disabled = true;
    return;
  }

  let base;
  let total;

  if(selectedTicket === "individual"){

    base = INDIVIDUAL_BASE;
    total = INDIVIDUAL_TOTAL;

  }else{

    base = GROUP_BASE_PER * groupCount;
    total = Math.round(base * TAX_MULTIPLIER);

  }

  taxEl.textContent = "₹" + base.toLocaleString('en-IN') + " + Taxes";
  totalEl.textContent = "₹" + total.toLocaleString('en-IN');

  payBtn.disabled = false;

}


document.getElementById('ESTP-pay-btn').addEventListener('click', function(){

  window.location.href = "../html/E-EducationTicketOverview.html";

});

});