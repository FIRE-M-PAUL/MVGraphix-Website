document.addEventListener('DOMContentLoaded', function () {
    // Move mobile toggle to top right
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (mobileToggle) {
        mobileToggle.style.position = 'absolute';
        mobileToggle.style.top = '30px';
        mobileToggle.style.right = '20px';
        mobileToggle.style.background = 'black';
        mobileToggle.style.zIndex = '1100';
        mobileToggle.style.border = '2px solid black';
        mobileToggle.style.outline = 'none';
    }

    // Mobile Menu Toggle
    const navMenu = document.querySelector('.nav-menu');
    if (mobileToggle && navMenu) {
        // Toggle menu open/close
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle icon: ☰ ↔ ✖
            mobileToggle.textContent = navMenu.classList.contains('active') ? '✖' : '☰';
        });

        // Auto-close menu and reset icon when link is clicked
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.textContent = '☰';
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission with EmailJS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();

            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // EmailJS template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                service: service,
                message: message,
                to_name: 'MVGraphix Team'
            };

            // Send email using EmailJS
            // TODO: Replace with your actual EmailJS service ID and template ID from your dashboard
            emailjs.send('service_5pme2f1', 'template_ksb136z', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Thank you! Your message was sent successfully. We will get back to you soon.');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .portfolio-item');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animation
    document.querySelectorAll('.service-card, .portfolio-item').forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Check for animations on scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});
