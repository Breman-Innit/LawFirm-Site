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

// Scroll detection
let countersAnimated = false;

function checkIfInView() {
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
        
        // Remove scroll listener after animation starts
        window.removeEventListener('scroll', checkIfInView);
    }
}

// Add scroll event listener
window.addEventListener('scroll', checkIfInView);

// Also check on page load in case section is already visible
window.addEventListener('load', checkIfInView);