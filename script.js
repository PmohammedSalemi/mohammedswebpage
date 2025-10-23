// ========== Mobile Menu Toggle ==========
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

// ========== Hero Slider ==========
function initHeroSlider() {
    const wrap = document.querySelector('.hero-image');
    if (!wrap) return;
    const slides = Array.from(wrap.querySelectorAll('img'));
    if (slides.length === 0) return;

    slides.forEach((img, i) => img.classList.toggle('is-active', i === 0));

    const btnPrev = document.createElement('button');
    btnPrev.className = 'hero-arrow left';
    btnPrev.type = 'button';
    btnPrev.setAttribute('aria-label', 'السابق');
    btnPrev.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

    const btnNext = document.createElement('button');
    btnNext.className = 'hero-arrow right';
    btnNext.type = 'button';
    btnNext.setAttribute('aria-label', 'التالي');
    btnNext.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'hero-dots';
    const dots = slides.map((_, i) => {
        const d = document.createElement('span');
        d.className = 'hero-dot' + (i === 0 ? ' active' : '');
        d.addEventListener('click', () => go(i));
        dotsWrap.appendChild(d);
        return d;
    });

    wrap.appendChild(btnPrev);
    wrap.appendChild(btnNext);
    wrap.appendChild(dotsWrap);

    let idx = 0;
    function go(n) {
        if (n === idx) return;
        slides[idx].classList.remove('is-active');
        idx = (n + slides.length) % slides.length;
        slides[idx].classList.add('is-active');
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        restart();
    }
    function next() { go(idx + 1); }
    function prev() { go(idx - 1); }

    btnNext.addEventListener('click', next);
    btnPrev.addEventListener('click', prev);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') next();
        if (e.key === 'ArrowRight') prev();
    });

    let timer = null;
    function start() { timer = setInterval(next, 6000); }
    function stop() { if (timer) clearInterval(timer); timer = null; }
    function restart() { stop(); start(); }
    start();

    wrap.addEventListener('mouseenter', stop);
    wrap.addEventListener('mouseleave', start);

    let startX = null;
    wrap.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    wrap.addEventListener('touchend', (e) => {
        if (startX == null) return;
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) { if (dx > 0) prev(); else next(); }
        startX = null;
    });
}

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // ========== Hero Slider Init ==========
    initHeroSlider();
    // ========== Interior Lightbox Init ==========
    initInteriorLightbox();
});

// ========== Smooth Scroll for Anchor Links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========== Form Submission ==========
document.addEventListener('DOMContentLoaded', function() {
    if (window.USE_FIREBASE === true) return; // Firebase will manage form submission
    const quoteForm = document.querySelector('.quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;
            if (name && email && phone && message) {
                alert('شكراً لك! تم استقبال طلبك بنجاح. سنتواصل معك قريباً.');
                this.reset();
                console.log({ name, email, phone, message, timestamp: new Date() });
            } else {
                alert('الرجاء ملء جميع الحقول المطلوبة');
            }
        });
    }
});

// ========== Scroll Animation for Elements (class-based) ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
        }
    });
}, observerOptions);

// Register elements for reveal
const revealSelectors = [
    '.about-card',
    '.service-card',
    '.project-card',
    '.branch-card',
    '.safety-item',
    '.contact-item',
    '.client-logo',
    '.testimonial-card',
    'section h2',
    '.objective-card'
].join(', ');

document.querySelectorAll(revealSelectors).forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// ========== Navbar Background on Scroll ==========
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ========== Counter Animation ==========
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ========== Testimonials Carousel (Optional) ==========
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

if (testimonials.length > 1) {
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Show first testimonial initially
    showTestimonial(0);
}

// ========== Active Navigation Link ==========
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========== Add Active Link Styling ==========
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--accent-color) !important;
        border-bottom: 2px solid var(--accent-color);
    }
`;
document.head.appendChild(style);

// ========== Lazy Loading Images ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== Print Current Year in Footer ==========
document.addEventListener('DOMContentLoaded', function() {
    const year = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.textContent = `© ${year} جميع الحقوق محفوظة لـ مكتب ايوان للاستشارات الهندسية | تصميم وتطوير`;
    }
});

// ========== Utility Functions ==========

// Scroll to top button
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        
    );
}

// Add click to call functionality
document.addEventListener('DOMContentLoaded', function() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                e.preventDefault();
                alert('للاتصال، يرجى استخدام هاتفك المحمول');
            }
        });
    });
});

// ========== WhatsApp Integration ==========
function openWhatsApp() {
    const phoneNumber = '966542464234';
    const message = 'مرحباً، أود الاستفسار عن خدماتكم';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ========== Email Integration ==========
function sendEmail() {
    const email = 'info@m-aldiar.com';
    const subject = 'استفسار عن الخدمات';
    const body = 'مرحباً، أود الاستفسار عن خدماتكم';
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

console.log('Script loaded successfully');

// ========== Interior Gallery Lightbox ==========
function initInteriorLightbox() {
    const overlay = document.getElementById('lightbox');
    if (!overlay) return;
    const imgs = Array.from(document.querySelectorAll('.interior-grid img'));
    const imgEl = overlay.querySelector('.lightbox-image');
    const btnClose = overlay.querySelector('.lightbox-close');
    const btnNext = overlay.querySelector('.lightbox-nav.next');
    const btnPrev = overlay.querySelector('.lightbox-nav.prev');

    let idx = 0;
    function show(n) {
        idx = (n + imgs.length) % imgs.length;
        imgEl.src = imgs[idx].src;
    }
    function open(n=0) {
        show(n);
        overlay.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    function close() {
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
    function next() { show(idx + 1); }
    function prev() { show(idx - 1); }

    imgs.forEach((im, i) => {
        im.style.cursor = 'zoom-in';
        im.addEventListener('click', () => open(i));
    });
    btnClose && btnClose.addEventListener('click', close);
    btnNext && btnNext.addEventListener('click', next);
    btnPrev && btnPrev.addEventListener('click', prev);
    overlay.querySelector('.lightbox-backdrop')?.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('is-open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') next();
        if (e.key === 'ArrowRight') prev();
    });
}

