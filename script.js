document.addEventListener('DOMContentLoaded', function () {

    const box = document.getElementById('exp-card-box');
    const leftBtn = document.getElementById('exp-arrow-left');
    const rightBtn = document.getElementById('exp-arrow-right');

    function updateArrows() {
        leftBtn.classList.toggle('disabled', box.scrollLeft <= 0);
        rightBtn.classList.toggle('disabled', box.scrollLeft + box.clientWidth >= box.scrollWidth - 1);
    }

    function scrollBox(direction) {
        const card = box.querySelector('.experience-card');
        if (card) {
            const gap = parseInt(window.getComputedStyle(box).gap) || 16;
            box.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' });
        }
    }

    leftBtn.addEventListener('click', () => scrollBox(-1));
    rightBtn.addEventListener('click', () => scrollBox(1));
    box.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);

    updateArrows();

    const menu = document.querySelector('.menu');
    const leftArrow = document.querySelector('.menu-arrow.left');
    const rightArrow = document.querySelector('.menu-arrow.right');
    const scrollAmount = 120;

    if (menu && leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            menu.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        rightArrow.addEventListener('click', () => {
            menu.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    const achievementBox = document.querySelector('.achievement-box');
    const leftAchievement = document.querySelector('.achievement-arrow.left');
    const rightAchievement = document.querySelector('.achievement-arrow.right');

    if (achievementBox && leftAchievement && rightAchievement) {
        leftAchievement.addEventListener('click', () => {
            achievementBox.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        rightAchievement.addEventListener('click', () => {
            achievementBox.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
});

const socialIcons = document.getElementById('socialIcons');
let isDragging = false;
let startY, startTop;

socialIcons.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.clientY;
    startTop = parseInt(window.getComputedStyle(socialIcons).top, 10);
    document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    let deltaY = e.clientY - startY;
    let newTop = startTop + deltaY;
    
    newTop = Math.max(0, Math.min(window.innerHeight - socialIcons.offsetHeight, newTop));
    socialIcons.style.top = newTop + 'px';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
});


socialIcons.addEventListener('touchstart', (e) => {
    isDragging = true;
    startY = e.touches[0].clientY;
    startTop = parseInt(window.getComputedStyle(socialIcons).top, 10);
}, { passive: false });

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    let deltaY = e.touches[0].clientY - startY;
    let newTop = startTop + deltaY;
    newTop = Math.max(0, Math.min(window.innerHeight - socialIcons.offsetHeight, newTop));
    socialIcons.style.top = newTop + 'px';
}, { passive: false });

document.addEventListener('touchend', () => {
    isDragging = false;
});

(function() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    let currentTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    function applyTheme(theme) {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme);
    }

    applyTheme(currentTheme);

    themeToggle.addEventListener('click', function() {
        currentTheme = (currentTheme === 'dark') ? 'light' : 'dark';
        applyTheme(currentTheme);
    });
})();
