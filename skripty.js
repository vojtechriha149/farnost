const img = new Image();
img.src = "img/header-bg.webp";
img.onload = function () {
    document.querySelector('header').classList.add('loaded');
};

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
    });
});
lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

document.addEventListener('click', function (e) {

    const link = e.target.closest('.open-prayer');
    if (!link) return;

    e.preventDefault();

    const target = link.dataset.target;
    const overlay = document.getElementById('prayerOverlay');
    if (!overlay) return;

    const contents = overlay.querySelectorAll('.prayer-content');
    contents.forEach(c => c.classList.remove('active'));

    const activeContent = overlay.querySelector(
        '.prayer-content[data-content="' + target + '"]'
    );

    if (activeContent) {
        activeContent.classList.add('active');
        overlay.classList.add('active');
    }
});

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('close-btn') ||
        e.target.id === 'prayerOverlay') {

        document.getElementById('prayerOverlay')
            .classList.remove('active');
    }
});

fetch("aktualni.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("aktualni-tabulka").innerHTML = data;
    });

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const startPosition = window.pageYOffset;
            const targetPosition = targetElement.getBoundingClientRect().top + startPosition - 0;
            const distance = targetPosition - startPosition;
            const duration = 1800;
            let startTime = null;

            function appleEasing(t) {
                return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            }

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);

                window.scrollTo(0, startPosition + distance * appleEasing(progress));

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            requestAnimationFrame(animation);
        }
    });
});

const topBtn = document.getElementById("scrollToTop");

window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

topBtn.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};