// Initialize message page
document.addEventListener('DOMContentLoaded', function() {
    // Create floating hearts and stars
    createFloatingHearts();
    createStars();
    
    // Setup mobile navigation
    setupMobileNav();
    
    // Set up reveal button
    setupRevealButton();
    
    // Set message date
    setMessageDate();
    
    // Add scroll animations
    setupScrollAnimations();
    
    // Setup love notes interactions
    setupLoveNotes();
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

function setupRevealButton() {
    const revealBtn = document.getElementById('revealBtn');
    const hiddenMessage = document.getElementById('hiddenMessage');
    
    if (!revealBtn || !hiddenMessage) return;
    
    let isRevealed = false;
    
    revealBtn.addEventListener('click', function() {
        if (!isRevealed) {
            hiddenMessage.classList.add('show');
            revealBtn.innerHTML = '<span class="btn-text">Hide Message</span><span class="btn-heart">💕</span>';
            isRevealed = true;
            
            // Add sparkle effect
            createSparkleEffect(revealBtn);
            
            // Scroll to message
            setTimeout(() => {
                hiddenMessage.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 400);
        } else {
            hiddenMessage.classList.remove('show');
            revealBtn.innerHTML = '<span class="btn-text">Click to Reveal Your Message</span><span class="btn-heart">💝</span>';
            isRevealed = false;
        }
    });
}

function setMessageDate() {
    const messageDate = document.getElementById('messageDate');
    if (messageDate) {
        const currentDate = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        messageDate.textContent = currentDate.toLocaleDateString('en-US', options);
    }
}

function setupLoveNotes() {
    const loveNotes = document.querySelectorAll('.love-note');
    
    loveNotes.forEach((note, index) => {
        note.addEventListener('mouseenter', () => {
            note.style.transform = 'translateY(-5px) rotate(' + (Math.random() * 6 - 3) + 'deg)';
            createMiniSparkles(note);
        });
        
        note.addEventListener('mouseleave', () => {
            note.style.transform = '';
        });
        
        // Add staggered animation
        note.style.animationDelay = (index * 0.1) + 's';
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
    
    const animatedElements = document.querySelectorAll('.love-note, .playlist-item, .message-intro');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

function createSparkleEffect(element) {
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkle 1.5s ease-out forwards';
        sparkle.style.zIndex = '10';
        
        element.style.position = 'relative';
        element.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1500);
    }
}

function createMiniSparkles(element) {
    const sparkles = ['✨', '💫'];
    
    for (let i = 0; i < 3; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = '1rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkle 0.8s ease-out forwards';
        sparkle.style.zIndex = '5';
        
        element.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 800);
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes sparkle {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);