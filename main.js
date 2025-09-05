// Initialize AOS
AOS.init();

// Initialize GLightbox
const lightbox = GLightbox({
  selector: '.glightbox',
  openEffect: 'fade',
  closeEffect: 'fade',
  zoomable: true,
  loop: true
});

// Dynamically wrap all portfolio images for GLightbox
document.querySelectorAll('.portfolio-card img').forEach(img => {
  // Skip if already wrapped
  if(!img.parentElement.classList.contains('glightbox')) {
    const link = document.createElement('a');
    link.href = img.src;        // Full image link
    link.className = 'glightbox';
    
    // Insert the <a> before the image and move the image inside it
    img.parentNode.insertBefore(link, img);
    link.appendChild(img);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // 1) Wrap IMG + OVERLAY inside <a.glightbox href="...">
  document.querySelectorAll('.portfolio-card').forEach(card => {
    const img = card.querySelector('img');
    if (!img) return;

    // Skip if already wrapped
    if (img.closest('a.glightbox')) return;

    const overlay = card.querySelector('.overlay');

    // Prefer data-full for high-res if you add it; else use src
    const fullSrc = img.getAttribute('data-full') || img.getAttribute('src');

    const link = document.createElement('a');
    link.className = 'glightbox';
    link.href = fullSrc;
    link.setAttribute('data-gallery', 'portfolio'); // group all images

    // Optional caption (from overlay title or img alt)
    const caption =
      (overlay && overlay.querySelector('h3') && overlay.querySelector('h3').textContent.trim()) ||
      img.getAttribute('alt') ||
      '';
    if (caption) link.setAttribute('data-title', caption);

    // Move children into the link so overlay stays on top but clicks go to <a>
    link.appendChild(img);            // move img into link
    if (overlay) link.appendChild(overlay); // move overlay into link

    // Replace card contents with the link
    card.innerHTML = '';
    card.appendChild(link);
  });

  // 2) Init GLightbox (guard if library not loaded)
  if (typeof GLightbox === 'function') {
    window.portfolioLightbox = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      openEffect: 'fade',
      closeEffect: 'fade',
      zoomable: true,
    });
  } else {
    console.warn('GLightbox script not found. Make sure the CDN <script> tag is included.');
  }
});


// Auto Text Changing
var typed = new Typed(".changing-text", {
  strings: [
    "Web Development", 
    "Graphic Design", 
    "WordPress & Shopify", 
    "Digital Marketing",
     "UI/UX Design"
  ],
  typeSpeed: 80,
  backSpeed: 60,
  backDelay: 1000,
  loop: true
});



// portfolio-gallery-Filter

const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // remove active from all
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    portfolioItems.forEach(item => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = "block";
        item.classList.add("animate__animated", "animate__fadeInUp");
      } else {
        item.style.display = "none";
      }
    });
  });
});





// Subtle 3D tilt on hover
const cards = document.querySelectorAll('[data-tilt]');
const maxTilt = 8; // degrees
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y / r.height) - 0.5) * -maxTilt;
    const ry = ((x / r.width) - 0.5) * maxTilt;
    card.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
  });
});

// Stagger reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((en, i) => {
    if (en.isIntersecting) {
      en.target.animate([
        { opacity: 0, transform: 'translateY(18px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 500, delay: i * 70, fill: 'forwards', easing: 'ease-out' });
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.service-card').forEach((el) => io.observe(el));

// Duplicate tools badges for seamless ticker
const track = document.getElementById('toolsTrack');
track.innerHTML += track.innerHTML;
