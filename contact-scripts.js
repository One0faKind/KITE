// Fade-in and fade-out transitions for page navigation
window.addEventListener('pageshow', function () {
  document.body.classList.add('loaded');
  document.body.classList.remove('fade-out');
});

document.querySelectorAll('a').forEach(link => {
  if (
    link.hostname === window.location.hostname &&
    !link.hasAttribute('target') &&
    !link.href.startsWith('mailto:') &&
    !link.href.startsWith('tel:')
  ) {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      if (
        href &&
        !href.startsWith('#') &&
        !link.classList.contains('no-fade')
      ) {
        e.preventDefault();
        document.body.classList.remove('loaded');
        document.body.classList.add('fade-out');
        setTimeout(function() {
          window.location.href = href;
        }, 600);
      }
    });
  }
});

// Dropdown functionality
document.querySelectorAll('.dropdown-toggle').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.dropdown').forEach(function(drop) {
      if (drop.contains(btn)) {
        drop.classList.toggle('open');
      } else {
        drop.classList.remove('open');
      }
    });
  });
});
window.addEventListener('click', function(e) {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown').forEach(function(drop) {
      drop.classList.remove('open');
    });
  }
});