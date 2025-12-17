// Smooth scrolling for navigation links (excluding mobile menu links)
document.querySelectorAll('a[href^="#"]:not(.mobile-nav-link)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ accordion functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const icon = question.querySelector('i');

        // Close all other FAQ items within the same category
        const category = faqItem.closest('.faq-category');
        category.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                const otherAnswer = item.querySelector('.faq-answer');
                const otherQuestion = item.querySelector('.faq-question');
                const otherIcon = otherQuestion.querySelector('i');

                otherAnswer.style.display = 'none';
                otherQuestion.classList.remove('active');
                otherIcon.classList.remove('fa-minus');
                otherIcon.classList.add('fa-plus');
            }
        });

        // Toggle current FAQ item
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            question.classList.remove('active');
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        } else {
            answer.style.display = 'block';
            question.classList.add('active');
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');

            // Smooth scroll to show the answer
            setTimeout(() => {
                answer.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 300);
        }
    });
});


// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Burger menu functionality
const burgerMenu = document.querySelector('.burger-menu');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a');

function toggleMobileMenu() {
    burgerMenu.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    document.body.classList.toggle('mobile-menu-open');
}

function closeMobileMenu() {
    burgerMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.classList.remove('mobile-menu-open');
}

// Burger menu click
burgerMenu.addEventListener('click', toggleMobileMenu);

// Close button click
mobileMenuClose.addEventListener('click', closeMobileMenu);

// Close menu when clicking on overlay
mobileMenuOverlay.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) {
        closeMobileMenu();
    }
});


// Handle mobile navigation links
const allMobileLinks = document.querySelectorAll('.mobile-nav-link');
console.log('Found mobile links:', allMobileLinks.length);
allMobileLinks.forEach((link, index) => {
    const handleClick = function(e) {
        console.log('Mobile link clicked:', index, this.getAttribute('href'));
        e.preventDefault();
        e.stopPropagation();

        // Close menu first
        closeMobileMenu();

        // Then scroll after a delay
        const targetId = this.getAttribute('href').substring(1);
        console.log('Scrolling to:', targetId);
        setTimeout(() => {
            scrollToSection(targetId);
        }, 400);
    };

    link.addEventListener('click', handleClick);
    link.addEventListener('touchstart', handleClick, { passive: false });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Animate cards on scroll
document.querySelectorAll('.benefit-card, .contact-card, .stat-item, .mission-point').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    observer.observe(card);
});

// Animate stats on scroll
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNumber = parseInt(target.textContent.replace(/\D/g, ''));
                animateNumber(target, 0, targetNumber, 2000);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        observer.observe(stat);
    });
};

// Animate number counter
const animateNumber = (element, start, end, duration) => {
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current + (element.textContent.includes('+') ? '+' : '');

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    };

    requestAnimationFrame(updateNumber);
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
});

// Timeline animation on scroll
const animateTimeline = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
};

// Enhanced card hover effects
const addCardHoverEffects = () => {
    const cards = document.querySelectorAll('.benefit-card, .contact-card, .stat-item, .mission-point');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.02)';
            card.style.boxShadow = '0 25px 60px rgba(78, 110, 73, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 8px 32px rgba(78, 110, 73, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
        });
    });
};

// Magnetic effect for contact links
const addMagneticEffect = () => {
    const links = document.querySelectorAll('.contact-link');

    links.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            link.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translate(0, 0)';
        });
    });
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
    animateTimeline();
    addCardHoverEffects();
    addMagneticEffect();

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
    }, 100);

});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
