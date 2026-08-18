/**
 * FORGE & OAK - Static Client-Side Engine
 * Handles Navigation, Filtering, Smooth Scrolling, and Form Submission
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Current Year for Copyright
  const yearSpan = document.getElementById('yearSpan');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Mobile Hamburger Navigation Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburgerBtn.classList.toggle('is-open');
    });

    // Close mobile menu on click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburgerBtn.classList.remove('is-open');
      });
    });
  }

  // 3. Header Scroll Glassmorphism Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.background = 'rgba(14, 16, 18, 0.98)';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.6)';
    } else {
      navbar.style.background = 'rgba(18, 20, 23, 0.92)';
      navbar.style.boxShadow = 'none';
    }
  });

  // 4. Portfolio Category Filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active class
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // 5. Contact Form Submission (Asynchronous Static Formspree/Fallback Handler)
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      const endpoint = contactForm.getAttribute('action');

      // Check if user has not yet substituted the placeholder
      if (endpoint.includes('YOUR_FORM_ENDPOINT_HERE')) {
        e.preventDefault();
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = '<strong>Demo Mode:</strong> Form structure is validated! To receive actual client emails, replace <code>YOUR_FORM_ENDPOINT_HERE</code> in <code>index.html</code> with your Formspree endpoint.';
        contactForm.reset();
        return;
      }

      // If a real Formspree endpoint is set, handle standard AJAX submit
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending Consultation Request...';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formFeedback.className = 'form-feedback success';
          formFeedback.textContent = 'Thank you. Your consultation request has been received. A Forge & Oak specialist will contact you shortly.';
          contactForm.reset();
        } else {
          throw new Error('Failed response');
        }
      } catch (error) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Unable to send enquiry. Please contact us directly via telephone or email.';
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});
