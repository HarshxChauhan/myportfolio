document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. CUSTOM GHOST CURSOR --- */
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const follower = document.createElement('div');
    follower.classList.add('cursor-follower');
    document.body.appendChild(follower);

    document.addEventListener('mousemove', (e) => {
        // Main dot follows instantly
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Follower creates the "lag" or "ghost" effect
        follower.animate({
            left: e.clientX + 'px',
            top: e.clientY + 'px'
        }, { duration: 500, fill: "forwards" });
    });

    // Add magnetic/hover effect for links and buttons
    const interactiveElements = document.querySelectorAll('a, .cta-button, .project-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    });

    /* --- 2. IMMERSIVE SCROLL REVEAL (Intersection Observer) --- */
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of item is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Target elements to animate
    const revealElements = document.querySelectorAll('.project-card, .section-title, .about-text, .stat-item');
    revealElements.forEach(el => {
        el.classList.add('reveal-hidden'); // Set initial hidden state
        observer.observe(el);
    });

    /* --- 3. SMOOTH SCROLL FOR ANCHOR LINKS --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target){
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                document.getElementById('nav-toggle').checked = false;
            }
        });
    });
});