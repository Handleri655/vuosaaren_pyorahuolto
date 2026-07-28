// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .review-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add current year to footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
}

// Check if store is currently open
function checkIfOpen() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour * 60 + minute;

    let isOpen = false;
    let statusText = '';

    if (day >= 1 && day <= 5) {
        // Monday - Friday: 10:00 - 18:00
        if (currentTime >= 600 && currentTime < 1080) {
            isOpen = true;
            const closingIn = 1080 - currentTime;
            if (closingIn <= 60) {
                statusText = `Sulkeutuu ${closingIn} minuutin kuluttua`;
            }
        }
    } else if (day === 6) {
        // Saturday: 10:00 - 14:00
        if (currentTime >= 600 && currentTime < 840) {
            isOpen = true;
            const closingIn = 840 - currentTime;
            if (closingIn <= 60) {
                statusText = `Sulkeutuu ${closingIn} minuutin kuluttua`;
            }
        }
    }

    return { isOpen, statusText };
}

// Update open/closed status indicator
function updateOpenStatus() {
    const { isOpen, statusText } = checkIfOpen();
    const hoursBanner = document.querySelector('.hours-banner');
    
    if (hoursBanner) {
        const statusIndicator = document.createElement('div');
        statusIndicator.className = 'status-indicator';
        statusIndicator.style.cssText = `
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.625rem 1.25rem;
            background-color: ${isOpen ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
            border: 1px solid ${isOpen ? 'rgba(74, 222, 128, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
            color: ${isOpen ? '#4ade80' : '#ef4444'};
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.9rem;
        `;
        
        const dot = document.createElement('span');
        dot.style.cssText = `
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: currentColor;
            ${isOpen ? 'animation: pulse 2s infinite;' : ''}
        `;
        
        statusIndicator.appendChild(dot);
        statusIndicator.appendChild(document.createTextNode(isOpen ? 'Avoinna nyt' : 'Suljettu'));
        
        if (statusText) {
            const subText = document.createElement('span');
            subText.textContent = ` - ${statusText}`;
            subText.style.opacity = '0.8';
            statusIndicator.appendChild(subText);
        }

        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
        `;
        document.head.appendChild(style);

        // Insert status indicator
        const hoursGrid = hoursBanner.querySelector('.hours-grid');
        if (hoursGrid) {
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'display: flex; justify-content: center; margin-bottom: 1rem;';
            wrapper.appendChild(statusIndicator);
            hoursBanner.querySelector('.container').insertBefore(wrapper, hoursGrid);
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateOpenStatus();
});
