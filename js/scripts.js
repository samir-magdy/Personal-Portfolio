const menu = document.getElementById("navbar_nav");

// Close mobile menu when clicking nav links
document.querySelectorAll(".nav-link").forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("show");
  });
});
// Close mobile menu when clicking outside the menu
document.addEventListener("click", function (event) {
  if (menu.classList.contains("show") && !menu.contains(event.target)) {
    menu.classList.remove("show");
  }
});
// Close menu when clicking gallery images
document.querySelectorAll(".lightbox-link").forEach((link) => {
  link.addEventListener("click", function () {
    menu.classList.remove("show");
  });
});
// account for extra scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target_id = this.getAttribute("href");
    const target = document.querySelector(target_id);
    if (target) {
      // Account for navbar height for all sections
      const navbar_height = document.querySelector(".navbar").offsetHeight;
      const target_position = target.offsetTop - navbar_height - 20;

      window.scrollTo({
        top: target_position,
        behavior: "smooth",
      });
    }
  });
});
