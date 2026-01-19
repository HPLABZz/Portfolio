document.addEventListener("DOMContentLoaded", () => {

  const profileWrapper = document.querySelector(".profile-wrapper");

  if (profileWrapper) {
    const particleCount = 80;
    const styleSheet = document.createElement("style");
    document.head.appendChild(styleSheet);

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      const size = Math.random() * 10 + 1;
      const posX = Math.random() * 130 - 20;
      const posY = Math.random() * 130 - 20;
      const duration = Math.random() * 8 + 4;
      const delay = Math.random() * 5;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      particle.style.backgroundColor = `hsl(${Math.random() * 360},100%,70%)`;

      const animationName = `float-${Math.random().toString(36).slice(2, 7)}`;
      styleSheet.textContent += `
        @keyframes ${animationName} {
          0% { transform: translate(0,0); }
          50% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px); }
          100% { transform: translate(0,0); }
        }
      `;

      particle.style.animation = `${animationName} ${duration}s ease-in-out ${delay}s infinite`;
      profileWrapper.appendChild(particle);
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href");
      if (id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll("section, .project-card").forEach(el => {
    observer.observe(el);
  });

  const profileContainer = document.querySelector(".profile-container");
  const navbar = document.querySelector(".navbar");
  const heroContent = document.querySelector(".hero-content");

  function handleProfilePosition() {
    if (!profileContainer || !navbar || !heroContent) return;

    if (window.innerWidth <= 768) {
      if (!navbar.contains(profileContainer)) {
        navbar.prepend(profileContainer);
      }
    } else {
      if (!heroContent.contains(profileContainer)) {
        heroContent.appendChild(profileContainer);
      }
    }
  }

  window.addEventListener("load", handleProfilePosition);
  window.addEventListener("resize", handleProfilePosition);


  const toggle = document.querySelector(".menu-toggle");
  const navActions = document.querySelector(".nav-actions");

  if (toggle && navActions) {
    toggle.addEventListener("click", e => {
      e.stopPropagation();
      navActions.classList.toggle("active");
    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {
      link.addEventListener("click", () => {
        navActions.classList.remove("active");
      });
    });

    document.addEventListener("click", e => {
      if (!navActions.contains(e.target)) {
        navActions.classList.remove("active");
      }
    });
  }

  if (navbar) {
    let lastScroll = window.scrollY;

    window.addEventListener("scroll", () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 80) {
        navbar.classList.add("nav-hidden");
      } else {
        navbar.classList.remove("nav-hidden");
      }

      lastScroll = current;
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
