//add scroll effect to nav bar
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.padding = '1rem 5%';
        nav.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.padding = '1.5rem 5%';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Counter animation function
function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    let current = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
            // Add symbols after reaching target
            if(target === 500 || target === 50) {
                counter.textContent = target + '+';
            } else if(target === 98) {
                counter.textContent = target + '%';
            }
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 16);
}

// Fade in on scroll function
function fadeInOnScroll() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Scroll detection for counters
let countersAnimated = false;

function checkCountersInView() {
    const statsSection = document.querySelector('.stats');
    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    // If section is in viewport and counters haven't been animated yet
    if (sectionTop < windowHeight - 100 && !countersAnimated) {
        countersAnimated = true;
        
        // Start only counters with data-target attribute (excludes 24/7)
        const counters = document.querySelectorAll('.stat-number[data-target]');
        counters.forEach(counter => {
            animateCounter(counter);
        });
    }
}

// Combined scroll event listener
window.addEventListener('scroll', () => {
    fadeInOnScroll();
    checkCountersInView();
});

// Also trigger on page load
window.addEventListener('load', () => {
    fadeInOnScroll();
    checkCountersInView();
});

// Dark Mode Toggle - Updated for both desktop and mobile
function setupDarkMode() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme or preferred scheme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
    }
    
    // Function to toggle dark mode
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        
        // Save theme preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    }
    
    // Set up desktop toggle
    const desktopDarkToggle = document.getElementById('darkModeToggle');
    if (desktopDarkToggle) {
        desktopDarkToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Set up mobile toggle
    const mobileDarkToggle = document.querySelector('.mobile-dark-toggle .dark-mode-toggle');
    if (mobileDarkToggle) {
        mobileDarkToggle.addEventListener('click', toggleDarkMode);
    }
}

// Team section animation
function setupTeamAnimations() {
    const teamSection = document.querySelector('.team-section');
    const teamCards = document.querySelectorAll('.team-member-card');
    const teamCta = document.querySelector('.team-cta-container');
    
    // Trigger fade-in animation
    setTimeout(() => {
        if (teamSection) {
            teamSection.classList.add('fade-in-visible');
            teamCta.classList.add('fade-in-visible');
            
            // Add staggered animation for individual cards
            teamCards.forEach(card => {
                card.classList.add('fade-in-visible');
            });
        }
    }, 300);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);
    
    // Observe team section if it exists
    if (teamSection) {
        observer.observe(teamSection);
    }
}

// Mobile menu functionality - UPDATED WITH CLOSE BUTTON
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const closeMenuBtn = document.querySelector('.close-menu');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.add('active');
        });
        
        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        }
        
        // Close menu when clicking on links
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking on overlay background
        navLinks.addEventListener('click', function(e) {
            if (e.target === this) {
                navLinks.classList.remove('active');
            }
        });
    }
}

// Blog Carousel Functionality
function initBlogCarousel() {
    const track = document.getElementById('carouselTrack');
    const cards = document.querySelectorAll('.blog-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!track || !cards.length) return;
    
    let currentIndex = 0;
    const totalCards = cards.length;
    const cardsPerView = getCardsPerView();
    
    // Create dots based on number of slides
    const totalSlides = Math.ceil(totalCards / cardsPerView);
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.dot');
    
    function getCardsPerView() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    }
    
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + 24; // card width + gap
        track.style.transform = `translateX(-${currentIndex * cardWidth * cardsPerView}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
        updateCarousel();
    }
    
    // Auto-rotate every 3 seconds
    let autoSlide = setInterval(nextSlide, 7000);
    
    // Pause auto-rotate when interacting with carousel
    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 7000);
    });
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateCarousel();
    });
    
    // Initialize
    updateCarousel();
}

// Footer fade-in animation
function initFooterAnimation() {
    const footer = document.querySelector('.footer-section.fade-in');
    if (!footer) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(footer);
}

// Newsletter form handling
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('.newsletter-input');
        const email = emailInput.value.trim();
        
        if (email) {
            // Simulate form submission
            emailInput.value = '';
            const btn = this.querySelector('.newsletter-btn');
            const originalHTML = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = '#45a049';
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
            }, 2000);
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupDarkMode();
    setupTeamAnimations();
    setupMobileMenu(); // Updated mobile menu function
    initBlogCarousel();
    initFooterAnimation();
    initNewsletterForm();
});