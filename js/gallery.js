const gallery_data = {
  portrait: [
    "images/portrait/image001.webp",
    "images/portrait/image002.webp",
    "images/portrait/image003.webp",
    "images/portrait/image004.webp",
    "images/portrait/image005.webp",
    "images/portrait/image006.webp",
    "images/portrait/image007.webp",
    "images/portrait/image008.webp",
    "images/portrait/image009.webp",
  ],
  event: [
    "images/events/image001.webp",
    "images/events/image002.webp",
    "images/events/image003.webp",
    "images/events/image004.webp",
    "images/events/image005.webp",
    "images/events/image006.webp",
    "images/events/image007.webp",
    "images/events/image008.webp",
    "images/events/image009.webp",
  ],
  commercial: [
    "images/commercial/image001.webp",
    "images/commercial/image002.webp",
    "images/commercial/image003.webp",
    "images/commercial/image004.webp",
    "images/commercial/image005.webp",
    "images/commercial/image006.webp",
    "images/commercial/image007.webp",
    "images/commercial/image008.webp",
    "images/commercial/image009.webp",
  ],
  automotive: [
    "images/automotive/image001.webp",
    "images/automotive/image002.webp",
    "images/automotive/image003.webp",
    "images/automotive/image004.webp",
    "images/automotive/image005.webp",
    "images/automotive/image006.webp",
    "images/automotive/image007.webp",
    "images/automotive/image008.webp",
    "images/automotive/image009.webp",
  ],
};

// Create gallery item with category data attribute
function create_gallery_item(img, category) {
  return `<div class="col-lg-4 col-md-6 mb-4 gallery-item" data-category="${category}">
  <div class="gallery-card">
  <a href="${img}" class="gallery-link">
  <img class="gallery-img" src="${img}" alt="" />
  </a>
  </div>
  </div>`;
}

const filter_buttons = document.querySelectorAll(".filter-btn");
const gallery_container = document.getElementById("gallery-container");

// Lightbox instance
let lightboxGallery = null;
let hasShownHint = false;

// Initialize GLightbox
function initLightbox() {
  if (lightboxGallery) {
    lightboxGallery.destroy();
  }

  lightboxGallery = GLightbox({
    captions: false,
    selector: ".gallery-item:not(.hidden) .gallery-link",
    touchNavigation: true,
    slideEffect: "slide",
  });

  lightboxGallery.on("open", () => {
    if (!hasShownHint) {
      const slideImage = document.querySelector(".gslide-image");
      if (slideImage) {
        slideImage.classList.add("first-open");
        hasShownHint = true;
      }
    }
  });
}

// Initialize gallery with portrait first, then background-load others
function initialize_gallery() {
  let portrait_html = "";

  // Build only portrait items first
  gallery_data.portrait.forEach((item) => {
    portrait_html += create_gallery_item(item, "portrait");
  });

  gallery_container.innerHTML = portrait_html;

  // Initialize lightbox for portrait images
  initLightbox();

  // Background-load other categories after initial render
  setTimeout(() => {
    let other_html = "";
    for (const [category, items] of Object.entries(gallery_data)) {
      if (category !== "portrait") {
        items.forEach((item) => {
          other_html += create_gallery_item(item, category);
        });
      }
    }
    gallery_container.innerHTML += other_html;
    filter_gallery("portrait");
  }, 500);
}

// Filter gallery by showing/hiding items
function filter_gallery(category) {
  const all_items = gallery_container.querySelectorAll(".gallery-item");

  // Set min-height before filtering to prevent collapse
  const currentHeight = gallery_container.offsetHeight;
  gallery_container.style.minHeight = currentHeight + "px";

  all_items.forEach((item) => {
    if (item.dataset.category === category) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });

  // Reinitialize lightbox after filtering to recognize visible images
  setTimeout(() => {
    initLightbox();
    gallery_container.style.minHeight = "";
  }, 100);
}

// Initialize gallery on page load
initialize_gallery();

// Click handler for filter buttons
filter_buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const filter = this.getAttribute("data-filter");

    // Update active button
    filter_buttons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    // Filter gallery
    filter_gallery(filter);
  });
});
