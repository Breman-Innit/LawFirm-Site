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

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme or prefered scheme
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-mode');
}

// Toggle dark mode
darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    // Save theme preference
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});