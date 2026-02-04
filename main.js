// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const currentDate = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = currentDate.toLocaleDateString('en-US', options);
    }
    
    // Create floating hearts
    createFloatingHearts();
    
    // Create stars
    createStars();
    
    // Setup countdown timer
    setupCountdown();
    
    // Setup mobile navigation
    setupMobileNav();
    
    // Add scroll animations
    setupScrollAnimations();
});

function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    if (!heartsContainer) return;
    
    const heartSymbols = ['💕', '💖', '💗', '💝', '💘', '💓', '💜', '💛'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 7000);
    }, 1000);
}

function createStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (Math.random() * 2 + 1) + 's';
        
        starsContainer.appendChild(star);
    }
}
function setupCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Set target date to July 9, 2025
    const targetDate = new Date('2026-02-05T00:00:00');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeUntil = targetDate.getTime() - now;
        
        // If the target date has passed, display zeros
        if (timeUntil <= 0) {
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            return;
        }
        
        const days = Math.floor(timeUntil / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeUntil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeUntil % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}
function setupMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 1s ease-out';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.wish-card, .stat-item, .intro-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Add touch interaction for mobile
document.addEventListener('touchstart', function(e) {
    if (e.target.matches('.btn')) {
        e.target.style.transform = 'scale(0.95)';
    }
});

document.addEventListener('touchend', function(e) {
    if (e.target.matches('.btn')) {
        setTimeout(() => {
            e.target.style.transform = '';
        }, 100);
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Page transition effects
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-out';
});

// Add sparkle effect function for other pages to use
function createSparkleEffect(element) {
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        
        element.style.position = 'relative';
        element.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
}