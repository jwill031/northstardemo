
// MOBILE NAVIGATION

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

// CLOSE MENU WHEN A LINK IS CLICKED

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

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
    "Thanks, " + name + "! Your demonstration enquiry has been completed.";

  formMessage.className = "form-message success";

  contactForm.reset();
});
