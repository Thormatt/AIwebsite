// Smooth scrolling for navigation links (but not for external links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip if it's actually pointing to a file
    if (anchor.getAttribute('href') === '#') return;

    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only prevent default for actual anchor links, not file paths
        if (href && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Animate numbers on scroll
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats on page load
window.addEventListener('load', () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.getAttribute('data-value'));
        animateValue(stat, 0, finalValue, 1500);
    });
});

// Subtle scroll animations (Linear-style)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements
    const elementsToAnimate = [
        '.article',
        '.misconception',
        '.service',
        '.about-text p',
        '.hero-content > *',
        '.blind-spot',
        '.key-stat',
        '.insight-text'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.transitionDelay = `${index * 0.1}s`;
            fadeInObserver.observe(element);
        });
    });

    // Animate hero content on load
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Nav background on scroll
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 10) {
        nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
    } else {
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Active nav link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--sage)';
        }
    });
});

// Subtle hover effect for service cards
document.querySelectorAll('.service').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Contact form handler using Formspree or similar service
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const formStatus = document.getElementById('form-status');

        // Convert to object for easier handling
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Option 1: Use Formspree (sign up at https://formspree.io)
            // Replace 'YOUR_FORM_ID' with your actual Formspree form ID
            // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(data)
            // });

            // For now, simulate success (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Thank you for your message. I\'ll get back to you within 24 hours.';
            contactForm.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);

        } catch (error) {
            // Show error message
            formStatus.className = 'form-status error';
            formStatus.textContent = 'There was an error sending your message. Please try again or contact via LinkedIn.';
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Animate chart bars on scroll
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('chart-visible');

            // Set the width based on data-percent
            const bars = entry.target.querySelectorAll('.bar-fill');
            bars.forEach(bar => {
                const percent = bar.getAttribute('data-percent');
                bar.style.setProperty('--percent', percent + '%');
            });
        }
    });
}, { threshold: 0.3 });

const chartContainer = document.querySelector('.chart-container');
if (chartContainer) {
    chartObserver.observe(chartContainer);
}

// Animate blind spot icons
const iconObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.spot-icon').forEach(icon => {
    iconObserver.observe(icon);
});

// Add subtle floating animation to stat cards
document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

console.log('Thor - AI Strategy Without the Hype');

// Add parallax effect to imperative section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const imperative = document.querySelector('.imperative');

    if (imperative) {
        const rect = imperative.getBoundingClientRect();
        const speed = 0.5;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = -(scrolled * speed);
            imperative.style.backgroundPosition = `center ${yPos}px`;
        }
    }
});