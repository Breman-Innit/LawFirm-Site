    // Add scroll effect to nav bar
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

        // Fade-in animation on scroll
        document.addEventListener('DOMContentLoaded', function() {
            const fadeElements = document.querySelectorAll('.fade-in');
            
            const fadeInOnScroll = function() {
                fadeElements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    const elementVisible = 150;
                    
                    if (elementTop < window.innerHeight - elementVisible) {
                        element.classList.add('visible');
                    }
                });
            };
            
            // Initial check
            fadeInOnScroll();
            
            // Check on scroll
            window.addEventListener('scroll', fadeInOnScroll);

            // Form submission
            const consultationForm = document.getElementById('consultationForm');
            
            consultationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // In a real application, you would send the form data to a server
                // For this example, we'll just show a success message
                alert('Thank you for your consultation request! We will contact you within 24 hours to confirm your appointment.');
                consultationForm.reset();
            });

            // Dark theme toggle functionality
            const themeToggle = document.getElementById('themeToggle');
            const themeIcon = themeToggle.querySelector('i');
            
            // Check for saved theme preference or default to light
            const currentTheme = localStorage.getItem('theme') || 'light';
            
            if (currentTheme === 'dark') {
                document.body.classList.add('dark-theme');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-theme');
                
                if (document.body.classList.contains('dark-theme')) {
                    localStorage.setItem('theme', 'dark');
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    localStorage.setItem('theme', 'light');
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            });

            // Set minimum date for date input to today
            const dateInput = document.getElementById('preferred-date');
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
        });