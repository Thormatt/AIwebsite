// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.nav-menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (menuButton && navLinks) {
        menuButton.addEventListener('click', function() {
            const isOpen = navLinks.classList.toggle('active');
            menuButton.setAttribute('aria-expanded', String(isOpen));
            if (isOpen) {
                const firstLink = navLinks.querySelector('a');
                if (firstLink) {
                    firstLink.focus();
                }
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuButton.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuButton.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

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
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateValue(element, start, end) {
    element.textContent = end;
}

// Animate stats on page load
window.addEventListener('load', () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.getAttribute('data-value'));
        animateValue(stat, 0, finalValue);
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
            // Send to Vercel serverless function
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to send message');
            }

            // Log for debugging
            // Email sent successfully

            // Show success message with debug info
            formStatus.style.display = 'block'; // Reset display before adding class
            formStatus.className = 'form-status success';
            formStatus.textContent = result.debug
                ? `Thank you! Email sent to ${result.to}. ${result.debug}`
                : 'Thank you for your message. I\'ll get back to you within 24 hours.';
            contactForm.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = '';  // Clear inline style instead of setting to 'none'
                formStatus.className = 'form-status'; // Reset class
            }, 5000);

        } catch (error) {
            // Show error message
            console.error('Contact form error:', error);
            formStatus.style.display = 'block'; // Reset display before adding class
            formStatus.className = 'form-status error';

            // Show more specific error if available
            if (error.message) {
                formStatus.textContent = `Error: ${error.message}. Please try again or contact via LinkedIn.`;
            } else {
                formStatus.textContent = 'There was an error sending your message. Please try again or contact via LinkedIn.';
            }
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

// Thor - AI Strategy Without the Hype

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        // Browser handles it automatically
    });
} else {
    // Fallback for older browsers
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Animate framework preview on scroll
const frameworkVisual = document.getElementById('framework-visual');
if (frameworkVisual) {
    const frameworkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });

    frameworkObserver.observe(frameworkVisual);
}

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
