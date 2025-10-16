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

// Mobile menu functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change icon when menu is open
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on links
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupDarkMode();
    setupTeamAnimations();
    setupMobileMenu();
});