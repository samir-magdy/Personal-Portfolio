lightbox.option({ resizeDuration: 0 });

const gallery_data = {
  portrait: [
    {
      img: "images/portrait/image001.webp",
      title: "Natural Beauty",
      desc: "Black & white floral portrait",
    },
    {
      img: "images/portrait/image002.webp",
      title: "Dapper Gentleman",
      desc: "High-angle formal suit portrait",
    },
    {
      img: "images/portrait/image003.webp",
      title: "Cozy Elegance",
      desc: "Studio portrait in knit sweater",
    },
    {
      img: "images/portrait/image004.webp",
      title: "Urban Night",
      desc: "Young professional in city bokeh",
    },
    {
      img: "images/portrait/image005.webp",
      title: "Bold Fashion",
      desc: "Fashionable portrait against blue wall",
    },
    {
      img: "images/portrait/image006.webp",
      title: "Dramatic Glow",
      desc: "Portrait with circular orange light",
    },
    {
      img: "images/portrait/image007.webp",
      title: "Genuine Smile",
      desc: "Outdoor portrait with natural charm",
    },
    {
      img: "images/portrait/image008.webp",
      title: "Floral Dreams",
      desc: "Cyan-lit portrait with flowers",
    },
    {
      img: "images/portrait/image009.webp",
      title: "Classic Grace",
      desc: "Elegant white shirt portrait",
    },
  ],
  event: [
    {
      img: "images/events/image001.webp",
      title: "Concert Energy",
      desc: "Crowd with dramatic stage lights",
    },
    {
      img: "images/events/image002.webp",
      title: "Celebration Moment",
      desc: "Couple tossing confetti celebration",
    },
    {
      img: "images/events/image003.webp",
      title: "Sweet Tradition",
      desc: "Wedding cake cutting ceremony detail",
    },
    {
      img: "images/events/image004.webp",
      title: "Live Music",
      desc: "Blue-lit concert atmosphere",
    },
    {
      img: "images/events/image005.webp",
      title: "Evening Elegance",
      desc: "Candlelit dining at dusk",
    },
    {
      img: "images/events/image006.webp",
      title: "Sunset Reception",
      desc: "Aerial wedding at golden hour",
    },
    {
      img: "images/events/image007.webp",
      title: "Graduate Pride",
      desc: "Graduates in caps and gowns",
    },
    {
      img: "images/events/image008.webp",
      title: "Team Spirit",
      desc: "Team huddle from below",
    },
    {
      img: "images/events/image009.webp",
      title: "Timeless Romance",
      desc: "Black & white wedding portrait",
    },
  ],
  commercial: [
    {
      img: "images/commercial/image001.webp",
      title: "Modern Architecture",
      desc: "Contemporary apartment complex exterior",
    },
    {
      img: "images/commercial/image002.webp",
      title: "Leafy Greens",
      desc: "Restaurant's top salad dish ",
    },
    {
      img: "images/commercial/image003.webp",
      title: "Artisan Chocolate",
      desc: "Dark chocolate with cacao nibs",
    },
    {
      img: "images/commercial/image004.webp",
      title: "Coffee Essence",
      desc: "Coffee with steam and beans",
    },
    {
      img: "images/commercial/image005.webp",
      title: "BBQ Perfection",
      desc: "Grilled skewers with smoke",
    },
    {
      img: "images/commercial/image006.webp",
      title: "Stylish Watch",
      desc: "Luxury watch product shot",
    },
    {
      img: "images/commercial/image007.webp",
      title: "Urban Footwear",
      desc: "Athletic shoes in neon-lit tunnel",
    },
    {
      img: "images/commercial/image008.webp",
      title: "Fragrance Elegance",
      desc: "Perfume with floral elements",
    },
    {
      img: "images/commercial/image009.webp",
      title: "Men's Grooming",
      desc: "Men's grooming product shot",
    },
  ],
  automotive: [
    {
      img: "images/automotive/image001.webp",
      title: "Golden Hour Drive",
      desc: "Yellow car with stylish backdrop",
    },
    {
      img: "images/automotive/image002.webp",
      title: "Urban Coupe",
      desc: "Silver car under concrete bridge",
    },
    {
      img: "images/automotive/image003.webp",
      title: "Garage Shadows",
      desc: "Luxury car in moody parking",
    },
    {
      img: "images/automotive/image004.webp",
      title: "Sunset Highway",
      desc: "Sports car at dusk",
    },
    {
      img: "images/automotive/image005.webp",
      title: "Bridge Muscle",
      desc: "Challenger on suspension bridge",
    },
    {
      img: "images/automotive/image006.webp",
      title: "Autumn Drive",
      desc: "Green car with fall foliage",
    },
    {
      img: "images/automotive/image007.webp",
      title: "Red Detail",
      desc: "Door handle close-up shot",
    },
    {
      img: "images/automotive/image008.webp",
      title: "Spoiler Art",
      desc: "White car wing and taillight",
    },
    {
      img: "images/automotive/image009.webp",
      title: "Garage Classic",
      desc: "White car in underground parking",
    },
  ],
};

// Create gallery item with category data attribute
function create_gallery_item(data, category) {
  return `<div class="col-lg-4 col-md-6 mb-4 gallery-item" data-category="${category}">
              <div class="gallery-card">
                <a href="${data.img}" class="lightbox-link" data-lightbox="${category}" data-title="${data.title} - ${data.desc}">
                  <img class="gallery-img" src="${data.img}" alt="${data.title}" />
                  <div class="gallery-overlay">
                    <h5 class="gallery-title">${data.title}</h5>
                    <p class="gallery-description">${data.desc}</p>
                  </div>
                </a>
              </div>
            </div>`;
}

const filter_buttons = document.querySelectorAll(".filter-btn");
const gallery_container = document.getElementById("gallery-container");

// Initialize gallery with portrait first, then background-load others
function initialize_gallery() {
  let portrait_html = "";

  // Build only portrait items first
  gallery_data.portrait.forEach((item) => {
    portrait_html += create_gallery_item(item, "portrait");
  });

  gallery_container.innerHTML = portrait_html;

  // Background-load other categories after initial render
  setTimeout(() => {
    let other_html = "";
    // Object.entries converts the gallery_data structure to key: value arrays to allow the use of for..of with destructuring
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

  // Set min-height before filtering to prevent collapse in case of low download speeds
  const currentHeight = gallery_container.offsetHeight;
  gallery_container.style.minHeight = currentHeight + "px";

  all_items.forEach((item) => {
    if (item.dataset.category === category) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });

  // Reset min-height after layout settles
  setTimeout(() => {
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
