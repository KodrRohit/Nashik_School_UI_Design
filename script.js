const login = document.querySelector('.login')
login.addEventListener('click', () => {
  alert('Login functionality is not implemented yet.')
})

  const nav = document.querySelector("nav");
  const page1 = document.querySelector(".page1");

  window.addEventListener("scroll", () => {
    const page1Bottom =
      page1.offsetTop + page1.offsetHeight;

    if (window.scrollY < page1Bottom - nav.offsetHeight) {
      nav.style.opacity = "1";
      nav.style.pointerEvents = "auto";
    } else {
      nav.style.opacity = "0";
      nav.style.pointerEvents = "none";
    }
  });

const read_more = document.querySelector(".read-more")
const dots = document.querySelector(".dots")
const more = document.querySelector(".more")

const menuIcon = document.getElementById("menuIcon");
const navMenu = document.getElementById("navMenu");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("active");
  navMenu.classList.toggle("active");
});


function readMore() {
  if (more.style.display == 'inline') {
    more.style.display = 'none';
    dots.style.display = 'inline'
    read_more.innerText = 'Read More'
  } else {
    more.style.display = 'inline'
    dots.style.display = 'none'
    read_more.innerText = "Less"
  }
}

read_more.addEventListener("click", () => {
  readMore();
})


const track = document.querySelector(".slider-track");
const gap = 50;

function slideNext() {
  const firstCard = track.children[0];
  const cardWidth = firstCard.offsetWidth + gap;

  // move left
  track.style.transition = "transform 0.9s ease";
  track.style.transform = `translateX(-${cardWidth}px)`;

  // after animation
  setTimeout(() => {
    track.style.transition = "none";
    track.style.transform = "translateX(0)";
    track.appendChild(firstCard); // move first card to last
  }, 700);
}

setInterval(slideNext, 2500);


const photos = document.querySelectorAll(".photo-area img");
const infos = document.querySelectorAll(".info");
const dot = document.querySelectorAll(".dot span");

let index = 0;

function show(i) {
  photos.forEach(p => p.classList.remove("active"));
  infos.forEach(info => info.classList.remove("active"));
  dot.forEach(d => d.classList.remove("active"));

  photos[i].classList.add("active");
  infos[i].classList.add("active");
  dot[i].classList.add("active");

  index = i;
}

setInterval(() => {
  let next = (index + 1) % photos.length;
  show(next);
}, 4500);




const items = document.querySelectorAll(".event-item");
const spotlightImg = document.getElementById("spotlightImg");
const spotlightDate = document.getElementById("spotlightDate");
// const spotlightTitle = document.getElementById("spotlightTitle");
// const spotlightDesc = document.getElementById("spotlightDesc");

let currentIndexs = 0;

function showEvent(index) {
  // remove active
  items.forEach(item => item.classList.remove("active"));

  const item = items[index];
  item.classList.add("active");

  // fade effect
  spotlightImg.style.opacity = 0;
  setTimeout(() => {
    spotlightImg.src = item.dataset.img;
    spotlightDate.innerText = item.dataset.date;
    spotlightTitle.innerText = item.dataset.title;
    spotlightDesc.innerText = item.dataset.desc;
    spotlightImg.style.opacity = 1;
  }, 300);
}

function startAutoSlider() {
  showEvent(currentIndexs);

  setInterval(() => {
    currentIndexs = (currentIndexs + 1) % items.length;
    showEvent(currentIndexs);
  }, 4000);
}

startAutoSlider();



const counters = document.querySelectorAll(".counter");
let hasAnimated = false;

function startCounterAnimation() {
  if (hasAnimated) return;
  hasAnimated = true;

  counters.forEach(counter => {
    const target = +counter.dataset.target;
    const speed = +counter.dataset.speed || 60;
    const plus = counter.dataset.plus || "";
    let count = 0;

    const update = () => {
      count += target / speed;

      if (count < target) {
        counter.innerText = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target + plus;
      }
    };

    update();
  });
}

/* Intersection Observer */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounterAnimation();
        observer.disconnect();
      }
    });
  },
  {
    threshold: 0.4
  }
);

observer.observe(document.querySelector(".stats-section"));



const images = [...document.querySelectorAll(".gallery-item img")];
const modal = document.getElementById("modal");
const modalImg = document.querySelector(".modal-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;


images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    openModal();
  });
});

function openModal() {
  modal.classList.add("active");
  document.body.classList.add("modal-open");
  modalImg.src = images[currentIndex].src;
}

function closeModal() {
  modal.classList.add("closing");


  setTimeout(() => {
    modal.classList.remove("active");
    modal.classList.remove("closing");
    document.body.classList.remove("modal-open");
    modalImg.src = "";
  }, 350);
}


closeBtn.onclick = closeModal;


nextBtn.onclick = () => changeImage(1);
prevBtn.onclick = () => changeImage(-1);

function changeImage(dir) {
  modalImg.style.transform = "scale(0.8)";
  modalImg.style.opacity = "0";

  setTimeout(() => {
    currentIndex = (currentIndex + dir + images.length) % images.length;
    modalImg.src = images[currentIndex].src;
    modalImg.style.transform = "scale(1)";
    modalImg.style.opacity = "1";
  }, 200);
}


modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});



let startX = 0;
let startY = 0;

modal.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

modal.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;

  const diffX = endX - startX;
  const diffY = endY - startY;

  if (Math.abs(diffX) > 50) {
    diffX > 0 ? changeImage(-1) : changeImage(1);
  }

  if (diffY > 80) {
    closeModal();
  }
});



// const studItem = document.querySelector('.toppers-grid');
// const studeCard = studItem.innerHTML;
// studItem.innerHTML += studeCard;

const tra = document.querySelector(".anime");
let speed = 0.6;        // scroll speed
let pos = 0;

// duplicate cards ONCE via JS (internally)
const cards = [...tra.children];
cards.forEach(card => {
  tra.appendChild(card.cloneNode(true));
});

const singleSetWidth = tra.scrollWidth / 2;

function animate() {
  pos -= speed;

  // reset without user noticing
  if (Math.abs(pos) >= singleSetWidth) {
    pos = 0;
  }

  tra.style.transform = `translateX(${pos}px)`;
  requestAnimationFrame(animate);
}

animate();
