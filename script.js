function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  if (!lightbox || !lightboxImg) return;

  const galleryImages = Array.from(document.querySelectorAll("#gallery .gallery-grid img"));
  const currentIndex = galleryImages.findIndex(img => img.src === src);

  lightbox.dataset.index = String(currentIndex >= 0 ? currentIndex : 0);
  lightbox.style.display = "flex";
  lightboxImg.src = src;
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.style.display = "none";
  }
}

function scrollToContact() {
  const contact = document.getElementById("contact");
  if (contact) {
    contact.scrollIntoView({
      behavior: "smooth"
    });
  }
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

/* ===== THEME TOGGLE ===== */
const toggleBtn = document.getElementById("themeToggle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    toggleBtn.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";
  });
}

/* ===== SCROLL REVEAL (INTERSECTION OBSERVER + FALLBACK) ===== */
const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach(el => revealObserver.observe(el));
} else {
  function revealOnScroll() {
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll, { passive: true });
  revealOnScroll();
}

/* ===== 3D CARD HOVER EFFECT (UNCHANGED TRANSITION) ===== */
const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -16;
    const rotateY = ((x - centerX) / centerX) * 16;

    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;

    card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "0%");
  });
});

/* ===== LIGHTBOX ENHANCEMENTS (KEYBOARD + PREV/NEXT) ===== */
function navigateLightbox(direction) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const galleryImages = Array.from(document.querySelectorAll("#gallery .gallery-grid img"));

  if (!lightbox || !lightboxImg || !galleryImages.length || lightbox.style.display !== "flex") return;

  const currentIndex = Number(lightbox.dataset.index || 0);
  const nextIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;

  lightbox.dataset.index = String(nextIndex);
  lightboxImg.src = galleryImages[nextIndex].src;
}

window.addEventListener("keydown", e => {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox || lightbox.style.display !== "flex") return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") navigateLightbox(1);
  if (e.key === "ArrowLeft") navigateLightbox(-1);
});

/* ===== ANIMATED HAMBURGER + MENU TOGGLE ===== */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  const navLinks = document.querySelectorAll("#navMenu a");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
}