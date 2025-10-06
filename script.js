// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления элементов на первой странице
    animateFirstPage();
    
    // Инициализация навигации
    initNavigation();
    
    // Инициализация скролла
    initScroll();
});

// Анимация появления элементов на первой странице
function animateFirstPage() {
    const title = document.querySelector('.main-title');
    const characteristics = document.querySelector('.characteristics');
    const image = document.querySelector('.character-image');
    
    // Сбрасываем начальные стили для анимации
    title.style.opacity = '0';
    title.style.transform = 'translateX(-50px)';
    characteristics.style.opacity = '0';
    characteristics.style.transform = 'translateX(-30px)';
    image.style.opacity = '0';
    image.style.transform = 'translateX(50px) scale(0.9)';
    
    // Анимация появления с задержками
    setTimeout(() => {
        title.style.transition = 'opacity 1s ease, transform 1s ease';
        title.style.opacity = '1';
        title.style.transform = 'translateX(0)';
    }, 300);
    
    setTimeout(() => {
        characteristics.style.transition = 'opacity 1s ease, transform 1s ease';
        characteristics.style.opacity = '1';
        characteristics.style.transform = 'translateX(0)';
    }, 800);
    
    setTimeout(() => {
        image.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
        image.style.opacity = '1';
        image.style.transform = 'translateX(0) scale(1)';
    }, 1200);
}

// Инициализация навигации
function initNavigation() {
    const navDots = document.querySelectorAll('.nav-dot');
    const pages = document.querySelectorAll('.page');
    
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            
            // Обновляем активную страницу
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(`page${targetPage}`).classList.add('active');
            
            // Обновляем активную точку навигации
            navDots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
            
            // Прокручиваем к верху страницы
            window.scrollTo(0, 0);
        });
    });
}

// Инициализация скролла
function initScroll() {
    let isScrolling = false;
    
    window.addEventListener('wheel', function(e) {
        if (isScrolling) return;
        
        isScrolling = true;
        
        const currentPage = document.querySelector('.page.active');
        const pages = document.querySelectorAll('.page');
        const navDots = document.querySelectorAll('.nav-dot');
        
        let currentIndex = Array.from(pages).indexOf(currentPage);
        let nextIndex;
        
        if (e.deltaY > 0) {
            // Прокрутка вниз
            nextIndex = Math.min(currentIndex + 1, pages.length - 1);
        } else {
            // Прокрутка вверх
            nextIndex = Math.max(currentIndex - 1, 0);
        }
        
        if (nextIndex !== currentIndex) {
            // Переключаем страницы
            pages.forEach(page => page.classList.remove('active'));
            pages[nextIndex].classList.add('active');
            
            // Обновляем навигацию
            navDots.forEach(dot => dot.classList.remove('active'));
            navDots[nextIndex].classList.add('active');
            
            // Прокручиваем к верху страницы
            window.scrollTo(0, 0);
        }
        
        // Задержка перед следующим скроллом
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    });
    
    // Обработка касаний для мобильных устройств
    let startY;
    
    document.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (!startY) return;
        
        const endY = e.changedTouches[0].clientY;
        const diff = startY - endY;
        
        if (Math.abs(diff) < 50) return; // Минимальное расстояние свайпа
        
        const currentPage = document.querySelector('.page.active');
        const pages = document.querySelectorAll('.page');
        const navDots = document.querySelectorAll('.nav-dot');
        
        let currentIndex = Array.from(pages).indexOf(currentPage);
        let nextIndex;
        
        if (diff > 0) {
            // Свайп вверх
            nextIndex = Math.min(currentIndex + 1, pages.length - 1);
        } else {
            // Свайп вниз
            nextIndex = Math.max(currentIndex - 1, 0);
        }
        
        if (nextIndex !== currentIndex) {
            // Переключаем страницы
            pages.forEach(page => page.classList.remove('active'));
            pages[nextIndex].classList.add('active');
            
            // Обновляем навигацию
            navDots.forEach(dot => dot.classList.remove('active'));
            navDots[nextIndex].classList.add('active');
            
            // Прокручиваем к верху страницы
            window.scrollTo(0, 0);
        }
        
        startY = null;
    });
}

// Параллакс эффект для фона
document.addEventListener('mousemove', function(e) {
    const pages = document.querySelectorAll('.page');
    const activePage = document.querySelector('.page.active');
    
    if (!activePage) return;
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    activePage.style.backgroundPosition = `${50 + mouseX * 10}% ${50 + mouseY * 10}%`;
});