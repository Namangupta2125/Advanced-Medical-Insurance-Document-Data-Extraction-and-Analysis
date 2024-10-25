document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const themeToggle = document.getElementById('themeToggle');
    const menuButtons = document.querySelectorAll('.menu-button');
    const homeBtn = document.getElementById('homeBtn');
    const demoBtn = document.getElementById('demoBtn');
    const innovationBtn = document.getElementById('innovationBtn');
    let currentSlide = 0;
    const slideInterval = 2000; // Changed to 2 seconds

    function showSlide(index) {
        
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }

    let slideTimer = setInterval(nextSlide, slideInterval);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(slideTimer);
            showSlide(index);
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    });

    // Theme toggle functionality
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggleIcon(newTheme);
    });

    function updateThemeToggleIcon(theme) {
        themeToggle.innerHTML = theme === 'light' 
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
    }

    // Menu button functionality
    menuButtons.forEach((button) => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateX(0)';
            button.style.opacity = '1';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateX(-100px)';
            button.style.opacity = '0';
        });

        button.addEventListener('click', () => {
            const slideIndex = parseInt(button.getAttribute('data-slide'));
            showSlide(slideIndex);
        });
    });

    // Navigation button functionality
    homeBtn.addEventListener('click', () => {
        showSlide(0);
    });

    demoBtn.addEventListener('click', () => {
        showSlide(2);
    });

    innovationBtn.addEventListener('click', () => {
        showSlide(4);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            clearInterval(slideTimer);
            nextSlide();
            slideTimer = setInterval(nextSlide, slideInterval);
        } else if (e.key === 'ArrowLeft') {
            clearInterval(slideTimer);
            showSlide((currentSlide - 1 + slides.length) % slides.length);
            slideTimer = setInterval(nextSlide, slideInterval);
        }
    });

    // Touch support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            clearInterval(slideTimer);
            if (swipeDistance > 0) {
                // Swipe right - show previous slide
                showSlide((currentSlide - 1 + slides.length) % slides.length);
            } else {
                // Swipe left - show next slide
                nextSlide();
            }
            slideTimer = setInterval(nextSlide, slideInterval);
        }
    }

    // Initialize first slide
    showSlide(0);
});