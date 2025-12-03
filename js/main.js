// ===========================
// Scroll Reveal Animation
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe all elements with scroll-reveal class
document.querySelectorAll('.scroll-reveal').forEach((el) => {
    observer.observe(el);
});

// ===========================
// Smooth Scroll for Anchor Links
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// ===========================
// Optional: Add more interactive features
// ===========================

// Example: Log when a project card is clicked
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        const projectName = this.querySelector('h3').textContent;
        console.log(`Clicked on: ${projectName}`);
    });
});
