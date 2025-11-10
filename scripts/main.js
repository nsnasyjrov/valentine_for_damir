const magicBtn = document.getElementById("magicBtn");
const modal = document.getElementById("photoModal");
const closeBtn = document.querySelector(".closeBtn");
const music = document.getElementById("bgMusic");
const slidesContainer = document.querySelector(".slides");

const photoFolder = "assets/img";
const photoCount = 31;

const videoFolder = "assets/video";
const videoFiles = ["video_1.MP4", "video_2.MP4", "video_3.MP4", "video_4.MP4"];

// ===== Love текст сверху =====
const loveTextContainer = document.createElement("div");
loveTextContainer.classList.add("love-text");
loveTextContainer.style.top = "20px"; // чуть ниже верха
loveTextContainer.style.left = "5%";
loveTextContainer.style.width = "90%";
loveTextContainer.style.whiteSpace = "nowrap"; // строки в ширину
document.body.appendChild(loveTextContainer);

const loveTextLines = ["Любимая моя, сегодня, ровно год как мы начали встречаться. Год назад звезды сошлись как наши жизненные пути . Поздравляю нас с этой прекрасной датой родная❤️❤️❤️❤️❤️❤️❤️❤️❤️Ты не представляешь насколько сильно я тебя люблю, это нельзя описать словами и действиями ❤️❤️❤️❤️"];

function showLoveText() {
  loveTextContainer.textContent = "";
  loveTextContainer.classList.add("show");

  let fullText = loveTextLines.join(" ");
  let i = 0;

  // Сначала показываем текст полностью центрированным
  loveTextContainer.style.transform = "translateX(0)";
  loveTextContainer.style.opacity = "1";
  loveTextContainer.style.transition = "none";

  const typingInterval = setInterval(() => {
    if (i < fullText.length) {
      loveTextContainer.textContent += fullText[i];
      i++;
    } else {
      clearInterval(typingInterval);
      
      // После завершения печати ждем и начинаем анимацию
      setTimeout(() => {
        // Исчезаем влево
        loveTextContainer.style.transition = "transform 2s ease-in-out, opacity 2s ease-in-out";
        loveTextContainer.style.transform = "translateX(-100%)";
        loveTextContainer.style.opacity = "0";
        
        // После исчезновения влево - появляемся справа
        setTimeout(() => {
          loveTextContainer.textContent = fullText; // сразу весь текст
          loveTextContainer.style.transform = "translateX(100%)";
          loveTextContainer.style.opacity = "0";
          
          // Появление справа
          setTimeout(() => {
            loveTextContainer.style.transition = "transform 2s ease-in-out, opacity 2s ease-in-out";
            loveTextContainer.style.transform = "translateX(0)";
            loveTextContainer.style.opacity = "1";
            
            // Финальное исчезновение
            setTimeout(() => {
              loveTextContainer.style.transition = "transform 2s ease-in-out, opacity 2s ease-in-out";
              loveTextContainer.style.transform = "translateX(-100%)";
              loveTextContainer.style.opacity = "0";
              
              setTimeout(() => {
                loveTextContainer.textContent = "";
                loveTextContainer.classList.remove("show");
              }, 2000);
            }, 3000);
            
          }, 100);
        }, 2000);
      }, 2000);
    }
  }, 50);
}
// ===== Добавляем фото =====
for (let i = 1; i <= photoCount; i++) {
  const img = document.createElement("img");
  img.src = `${photoFolder}/photo_${i}.jpg`;
  img.alt = `Фото ${i}`;
  img.style.display = "none"; 
  slidesContainer.appendChild(img);
}

// ===== Добавляем видео =====
videoFiles.forEach(file => {
  const vid = document.createElement("video");
  vid.src = `${videoFolder}/${file}`;
  vid.autoplay = true;
  vid.muted = true;
  vid.loop = true;
  vid.playsInline = true; 
  vid.controls = true;    
  vid.style.display = "none";
  vid.style.maxWidth = "100%";
  vid.style.maxHeight = "80vh";
  vid.style.borderRadius = "15px";
  slidesContainer.appendChild(vid);
});

// ===== Слайды =====
const slides = document.querySelectorAll(".slides img, .slides video");
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((el, i) => {
    el.classList.toggle("active", i === index);
    if (el.tagName === "VIDEO") {
      if (i === index) el.style.display = "block", el.play();
      else el.pause(), el.style.display = "none";
    } else {
      el.style.display = i === index ? "block" : "none";
    }
  });
  currentIndex = index;
}

// ===== Навигация слайдов =====
document.querySelector(".prev").addEventListener("click", () => {
  showSlide((currentIndex - 1 + slides.length) % slides.length);
});

document.querySelector(".next").addEventListener("click", () => {
  showSlide((currentIndex + 1) % slides.length);
});

// ===== Открытие модалки =====
magicBtn.addEventListener("click", () => {
  modal.classList.add("show");
  if (music.paused) music.play(); 
  showSlide(0);
  createHearts();
  showLoveText();
});

// ===== Закрытие модалки =====
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  modal.classList.remove("show");
}

// ===== Сердечки =====
function createHearts() {
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = (-20 + Math.random() * 10) + 'vh';
    heart.style.animationDuration = (6 + Math.random() * 4) + 's';
    heart.style.animationDelay = (Math.random() * 2) + 's';
    heart.style.transform = `scale(${0.6 + Math.random() * 0.8}) rotate(45deg)`;

    document.body.appendChild(heart);

    heart.addEventListener('animationend', () => {
      heart.remove();
    });
  }
}

// ===== Плавное появление страницы =====
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});
