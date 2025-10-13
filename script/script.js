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