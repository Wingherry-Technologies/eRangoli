
  // State tab switching
  const tabs = document.querySelectorAll('.ESVP-state-tab');
  const panels = document.querySelectorAll('.ESVP-state-panel');
  const venues =document.querySelectorAll('.ESVP-venue-item');
  const backBtn =document.getElementById("ESVP-BackBtn");

  backBtn.addEventListener('click', function(e){
    e.preventDefault();
    window.history.back();
  })

  venues.forEach(function(venue){
    venue.addEventListener('click', function() {
      window.location.href = 'E-EducationSelectTime.html';
    });
  })

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('ESVP-active'); });
      tab.classList.add('ESVP-active');
      var state = tab.getAttribute('data-state');
      panels.forEach(function(p) { p.classList.remove('ESVP-visible'); });
      var target = document.getElementById('ESVP-state-' + state);
      if (target) target.classList.add('ESVP-visible');
    });
  });

  // Accordion toggle — only one open at a time within the same state panel
  document.querySelectorAll('.ESVP-city-header').forEach(function(header) {
    header.addEventListener('click', function() {
      var accordion = header.parentElement;
      var panel = accordion.closest('.ESVP-state-panel');
      var isOpen = accordion.classList.contains('ESVP-open');

      // Close all in this panel
      panel.querySelectorAll('.ESVP-city-accordion').forEach(function(a) {
        a.classList.remove('ESVP-open');
      });

      // If was closed, open it
      if (!isOpen) {
        accordion.classList.add('ESVP-open');
      }
    });
  });
