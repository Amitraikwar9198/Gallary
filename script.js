// Insert 100 images dynamically
const galleryContainer = document.getElementById("gallery");
const categories = ["nature", "animals", "architecture"];

for (let i = 1; i <= 100; i++) {
  const category = categories[i % categories.length];
  const div = document.createElement("div");
  div.className = "card";
  div.setAttribute("data-category", category);

  const img = document.createElement("img");
  img.src = `https://picsum.photos/300/200?random=${i}`;
  img.alt = `Image ${i}`;

  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const overlayContent = `
    <h3>Image ${i}</h3>
    <p>${category.charAt(0).toUpperCase() + category.slice(1)} Category</p>
    <button class="view-btn">View</button>
  `;

  overlay.innerHTML = overlayContent;

  div.appendChild(img);
  div.appendChild(overlay);
  galleryContainer.appendChild(div);
}

// Lightbox Logic
let images = [], currentIndex = 0;

function updateImageList() {
  images = document.querySelectorAll(".card img");
  images.forEach((img, index) => {
    img.addEventListener("click", () => showLightbox(index));
  });
}

function showLightbox(index) {
  currentIndex = index;
  const img = images[index];
  document.querySelector(".lightbox-img").src = images[index].src;
  document.querySelector(".lightbox").style.display = "flex";
  document.querySelector(".lightbox-img").src = img.src;
  document.querySelector(".lightbox-title").textContent = img.alt;
  
}

document.querySelector(".close").onclick = () =>
  document.querySelector(".lightbox").style.display = "none";

document.querySelector(".next").onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  showLightbox(currentIndex);
};

document.querySelector(".prev").onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showLightbox(currentIndex);
};

updateImageList();

// Filter Buttons
document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".card").forEach(card => {
      const category = card.getAttribute("data-category");
      card.style.display = (filter === "all" || category === filter) ? "block" : "none";
    });

    updateImageList(); // Refresh image list
  });
});

// Navbar toggle for mobile
document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("show");
});



  // Re-attach event listener for lightbox after DOM update
function updateImageList() {
  images = document.querySelectorAll(".card img");

  images.forEach((img, index) => {
    img.addEventListener("click", () => showLightbox(index));
  });

  // Add lightbox open to "View" buttons too
  document.querySelectorAll(".view-btn").forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // avoid bubbling
      showLightbox(index);
    });
  });
}
updateImageList(); // call after gallery render

