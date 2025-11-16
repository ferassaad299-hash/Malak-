// ck.js — mobile nav toggle, smooth scroll, active link highlight, back-to-top
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('#main-nav a');
  const toTop = document.getElementById('toTop');
  const yearSpan = document.getElementById('year');

  // set year
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // hamburger toggle (mobile)
  navToggle.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('open');
  });

  // smooth scroll & close mobile menu when link clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // close mobile menu if open
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Back-to-top visibility
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      toTop.style.display = 'flex';
    } else {
      toTop.style.display = 'none';
    }
  });

  toTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Active link highlighting using IntersectionObserver
  const sections = document.querySelectorAll('main section[id]');
  const options = { root: null, rootMargin: '0px', threshold: 0.55 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`#main-nav a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }, options);
  sections.forEach(s => observer.observe(s));
});
