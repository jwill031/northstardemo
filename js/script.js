// Navigation uses native anchor scrolling so touch, keyboard and browser history stay natural.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function setMenuOpen(open) {
  navLinks.classList.toggle("open", open);
  menuToggle.classList.toggle("active", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

document.addEventListener("click", event => {
  if (!event.target.closest(".navbar")) setMenuOpen(false);
});

const mobileLayout = window.matchMedia("(max-width: 760px)");
mobileLayout.addEventListener("change", () => setMenuOpen(false));

// Track the section nearest the header without running work on every scroll event.
const sections = [...document.querySelectorAll("main section[id]")];
const navigation = [...navLinks.querySelectorAll("a")];
if ("IntersectionObserver" in window) {
  const visibleSections = new Set();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visibleSections.add(entry.target);
      else visibleSections.delete(entry.target);
    });
    const current = sections.find(section => visibleSections.has(section));
    navigation.forEach(link => {
      if (current && link.hash === "#" + current.id) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-90px 0px -45% 0px", threshold: 0 });
  sections.forEach(section => observer.observe(section));
}

// ENQUIRY FORM

const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const phone = document.querySelector("#phone").value.trim();
  const service = document.querySelector("#service").value;

  // Basic validation
  if (!name || !phone || !service) {
    formMessage.textContent = "Please complete all required fields.";
    formMessage.className = "form-message error";
    return;
  }

  // Basic phone number validation
  const phonePattern = /^[0-9+\s().-]{7,20}$/;

  if (!phonePattern.test(phone)) {
    formMessage.textContent = "Please enter a valid phone number.";
    formMessage.className = "form-message error";
    return;
  }

  // Demonstration success state
  formMessage.textContent =
    "Thanks, " + name + "! This was a demo submission; no enquiry has been sent.";

  formMessage.className = "form-message success";

  contactForm.reset();
});
