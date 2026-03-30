/* ============================================================
   script.js - Portfolio Vanilla JS
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     1. NAVBAR SCROLL EFFECT
  ------------------------------------------------------- */
  const navbar = document.getElementById("navbar");

  const handleNavScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleNavScroll, { passive: true });

  /* -------------------------------------------------------
     2. ACTIVE NAV LINK (spy on scroll)
  ------------------------------------------------------- */
  const sections = ["introduction", "profile", "work-process", "portfolio", "contact"];
  const allNavLinks = document.querySelectorAll(".nav-link");

  const updateActiveNavLink = () => {
    let current = "";
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 160) {
          current = id;
        }
      }
    });

    allNavLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.dataset.section === current) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });

  /* -------------------------------------------------------
     3. SMOOTH SCROLL
  ------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#" || href === "#!") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 140;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });

        const mobileMenu = document.getElementById("mobileMenu");
        mobileMenu.classList.remove("open");
      }
    });
  });

  /* -------------------------------------------------------
     4. MOBILE MENU
  ------------------------------------------------------- */
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburgerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove("open");
    }
  });

  /* -------------------------------------------------------
     7. WORK STEP HOVER
  ------------------------------------------------------- */
  document.querySelectorAll(".work-step").forEach((step) => {
    const svgPaths = step.querySelectorAll(".step-svg path");

    step.addEventListener("mouseenter", () => {
      svgPaths.forEach((p) => p.setAttribute("fill", "#ffffff"));
    });

    step.addEventListener("mouseleave", () => {
      svgPaths.forEach((p) => p.setAttribute("fill", "#A53DFF"));
    });
  });

  /* -------------------------------------------------------
     8. SCROLL TO TOP
  ------------------------------------------------------- */
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  }, { passive: true });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* -------------------------------------------------------
     9. COPYRIGHT YEAR
  ------------------------------------------------------- */
  const yearEl = document.getElementById("copyrightYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* -------------------------------------------------------
     10. CONTACT FORM
  ------------------------------------------------------- */
  const form = document.getElementById("contactForm");

  if (form) {
    const fields = [
      { id: "formName", errorId: "nameError", label: "Name" },
      { id: "formEmail", errorId: "emailError", label: "Email" },
      { id: "formPhone", errorId: "phoneError", label: "Phone" },
      { id: "formSubject", errorId: "subjectError", label: "Subject" },
      { id: "formMessage", errorId: "messageError", label: "Message" },
    ];

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPhone = (phone) => /^[6-9][0-9]{9}$/.test(phone); // ✅ ADDED

    const showError = (field, msg) => {
      const input = document.getElementById(field.id);
      const errEl = document.getElementById(field.errorId);
      input.classList.add("error");
      if (errEl) errEl.textContent = msg;
    };

    const clearError = (field) => {
      const input = document.getElementById(field.id);
      const errEl = document.getElementById(field.errorId);
      input.classList.remove("error");
      if (errEl) errEl.textContent = "";
    };

    // Live validation
    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      if (input) {
        input.addEventListener("input", () => {
          const value = input.value.trim();

          if (!value) {
            showError(field, `${field.label} is required.`);
          } else if (field.id === "formEmail" && !isValidEmail(value)) {
            showError(field, "Please enter a valid email.");
          } else if (field.id === "formPhone" && !isValidPhone(value)) {
            showError(field, "Enter valid 10-digit phone number.");
          } else {
            clearError(field);
          }
        });
      }
    });

    const hiddenIframe = document.getElementById("hidden_iframe");
    let isSubmitting = false;

    if (hiddenIframe) {
      hiddenIframe.addEventListener("load", function () {
        if (isSubmitting) {
          const submitText = document.getElementById("submitBtnText");

          if (submitText) {
            submitText.textContent = "Submitted ✅";
          }

          form.reset();
          fields.forEach((f) => clearError(f));

          setTimeout(() => {
            if (submitText) {
              submitText.textContent = "Submit another response";
            }
          }, 2000);

          isSubmitting = false;
        }
      });
    }

    form.addEventListener("submit", (e) => {
      let valid = true;

      fields.forEach((field) => {
        const input = document.getElementById(field.id);
        if (!input) return;

        const value = input.value.trim();

        if (!value) {
          showError(field, `${field.label} is required.`);
          valid = false;
        } else if (field.id === "formEmail" && !isValidEmail(value)) {
          showError(field, "Please enter a valid email.");
          valid = false;
        } else if (field.id === "formPhone" && !isValidPhone(value)) {
          showError(field, "Enter valid 10-digit phone number.");
          valid = false;
        } else {
          clearError(field);
        }
      });

      if (!valid) {
        e.preventDefault();
      } else {
        isSubmitting = true;
        document.getElementById("submitBtnText").textContent = "Sending...";
      }
    });
  }

  /* -------------------------------------------------------
     11. ADDRESS HOVER
  ------------------------------------------------------- */
  document.querySelectorAll(".address-item").forEach((item) => {
    const iconWrap = item.querySelector(".address-icon-wrap");

    item.addEventListener("mouseenter", () => {
      iconWrap.style.backgroundColor = "var(--picto-primary)";
      iconWrap.style.color = "#fff";
    });

    item.addEventListener("mouseleave", () => {
      iconWrap.style.backgroundColor = "rgba(237, 216, 255, 0.5)";
      iconWrap.style.color = "var(--picto-primary)";
    });
  });

});
