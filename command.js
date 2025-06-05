window.addEventListener('pageshow', function () {
  // Always ensure body is visible
  document.body.classList.add('loaded');
  document.body.classList.remove('fade-out');
});

document.addEventListener('DOMContentLoaded', function () {
  // Dropdown functionality
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

  // Fade-in on initial load only (already handled by pageshow too, but safe here)
  document.body.classList.add('loaded');

  // Fade-out transition on link click, but prevent if already on this page
  document.querySelectorAll('a').forEach(link => {
    if (
      link.hostname === window.location.hostname &&
      !link.hasAttribute('target') &&
      !link.href.startsWith('mailto:') &&
      !link.href.startsWith('tel:')
    ) {
      link.addEventListener('click', function(e) {
        const href = link.getAttribute('href');
        function normalize(path) {
          return path.replace(/\/index\.html$/, '').replace(/\/$/, '');
        }
        const current = normalize(window.location.pathname);
        const target = normalize(link.pathname);
        if (current === target) {
          e.preventDefault();
          return;
        }
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

  // Gallery slider image (for side section, no arrows)
  const images = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg"
  ];
  let currentIndex = 0;
  let autoSlideInterval;
  const mainImage = document.getElementById("mainImage");

  function animateSlide(nextIndex) {
    mainImage.classList.remove("slide-in-left", "slide-in-right", "slide-out-left", "slide-out-right");
    mainImage.classList.add("slide-out-left");
    setTimeout(() => {
      mainImage.classList.remove("slide-out-left");
      mainImage.src = images[nextIndex];
      mainImage.classList.add("slide-in-right");
      currentIndex = nextIndex;
    }, 600);
    setTimeout(() => {
      mainImage.classList.remove("slide-in-right");
    }, 1200);
  }

  function showNext() {
    let nextIndex = (currentIndex + 1) % images.length;
    animateSlide(nextIndex);
  }

  function startAutoplay() {
    autoSlideInterval = setInterval(() => {
      showNext();
    }, 3500);
  }

  function resetAutoplay() {
    clearInterval(autoSlideInterval);
    startAutoplay();
  }

  if (mainImage) {
    mainImage.onerror = function() {
      showNext();
    };

    mainImage.src = images[0];
    startAutoplay();
  }

  // --- Info Row Scroll Animation ---
  const infoRows = document.querySelectorAll('.info-row');
  const rowOptions = {
    threshold: 0.3
  };

  const rowObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-in');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, rowOptions);

  infoRows.forEach(row => {
    rowObserver.observe(row);
  });

  // --- Mobile Hamburger Nav Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      navLinks.classList.toggle('open');
    });

    // Close nav menu when clicking a link (for mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });

    // Also close nav on outside click for mobile
    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }
});