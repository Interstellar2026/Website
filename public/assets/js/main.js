/* =================================================================
   INTERSTELLAR I.S. — SITE-WIDE INTERACTIONS
   Mobile nav, smooth scroll, scroll-triggered effects
   ================================================================= */

(function() {
  'use strict';

  // ============ MOBILE NAV ============
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    // Close mobile nav when clicking a link
    siteNav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        siteNav.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteNav.classList.contains('nav-open')) {
        siteNav.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  // ============ HEADER SCROLL STATE ============
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  if (header) {
    window.addEventListener('scroll', () => {
      const scroll = window.pageYOffset;
      if (scroll > 60) {
        header.style.borderBottomColor = 'rgba(255, 255, 255, 0.12)';
      } else {
        header.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
      }
      lastScroll = scroll;
    }, { passive: true });
  }

  // ============ INTERSECTION OBSERVER FOR SECTION REVEAL (subtle) ============
  if ('IntersectionObserver' in window) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      document.querySelectorAll('.segment-card, .solution-card, .outcome-card, .process-step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
      });
    }
  }

})();
