document.addEventListener('DOMContentLoaded', function () {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(drop => {
    const toggle = drop.querySelector('.dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        // Close other dropdowns
        dropdowns.forEach(d => {
          if (d !== drop) d.classList.remove('open');
        });
        // Toggle current
        drop.classList.toggle('open');
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function () {
    dropdowns.forEach(drop => drop.classList.remove('open'));
  });

  // Optional: close on ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === "Escape") {
      dropdowns.forEach(drop => drop.classList.remove('open'));
    }
  });
});