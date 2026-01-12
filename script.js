    document.addEventListener("DOMContentLoaded", () => {

    const profileWrapper = document.querySelector(".profile-wrapper");
    if (!profileWrapper) return;

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
        const opacity = Math.random() * 0.5 + 0.1;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity;
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;

        const animationName = `float-${Math.random().toString(36).slice(2, 7)}`;
        styleSheet.textContent += `
            @keyframes ${animationName} {
                0% { transform: translate(0, 0); }
                50% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px); }
                100% { transform: translate(0, 0); }
            }
        `;

        particle.style.animation = `${animationName} ${duration}s ease-in-out ${delay}s infinite`;

        profileWrapper.appendChild(particle);
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

});
