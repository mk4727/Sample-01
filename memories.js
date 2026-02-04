// Initialize memories page
document.addEventListener('DOMContentLoaded', function() {
    // Create floating hearts and stars
    createFloatingHearts();
    createStars();
    
    // Setup mobile navigation
    setupMobileNav();
    
    // Setup gallery filter
    setupGalleryFilter();
    
    // Add scroll animations
    setupScrollAnimations();
    
    // Setup memory card interactions
    setupMemoryCards();
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

function setupMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

function setupGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const memoryCards = document.querySelectorAll('.memory-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            memoryCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function setupMemoryCards() {
    const memoryCards = document.querySelectorAll('.memory-card');
    
    memoryCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add a click effect
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
            
            // Create sparkle effect
            createSparkleEffect(card);

            // Added: Toggle video playback if the card contains a video
            const video = card.querySelector('video');
            if (video) {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        });
    });
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
    
    const animatedElements = document.querySelectorAll('.memory-card, .timeline-item, .filter-btn');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

function createSparkleEffect(element) {
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = '1.2rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        sparkle.style.zIndex = '10';
        
        element.style.position = 'relative';
        element.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
}

// Add CSS for fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);