// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.8)';
        }
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe download cards
    const downloadCards = document.querySelectorAll('.download-card');
    downloadCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add fade-in effect to promo image
    const promoImage = document.querySelector('.promo-image');
    if (promoImage) {
        promoImage.style.opacity = '0';
        promoImage.style.transform = 'translateY(20px)';
        promoImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            promoImage.style.opacity = '1';
            promoImage.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Download button interactions
    const downloadButtons = document.querySelectorAll('.btn-download');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add download animation
            const originalText = this.textContent;
            this.textContent = 'Загрузка...';
            this.style.background = '#4a5568';
            
            setTimeout(() => {
                this.textContent = 'Скачано!';
                this.style.background = '#38a169';
            }, 1500);
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 3000);
        });
    });
    
    // Mobile menu functionality
    const initMobileMenu = () => {
        const nav = document.querySelector('.nav');
        const mobileOverlay = document.querySelector('.mobile-menu-overlay');
        let mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        // Create mobile toggle if it doesn't exist
        if (!mobileToggle) {
            mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-menu-toggle';
            mobileToggle.innerHTML = '☰';
            mobileToggle.setAttribute('aria-label', 'Открыть меню');
            nav.appendChild(mobileToggle);
        }
        
        // Toggle menu on button click
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileOverlay.classList.contains('active');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Open mobile menu
        const openMobileMenu = () => {
            mobileOverlay.classList.add('active');
            mobileToggle.innerHTML = '✕';
            document.body.style.overflow = 'hidden';
        };
        
        // Close mobile menu
        const closeMobileMenu = () => {
            mobileOverlay.classList.remove('active');
            mobileToggle.innerHTML = '☰';
            document.body.style.overflow = '';
        };
        
        // Close menu when clicking on links in mobile overlay
        const mobileMenuLinks = mobileOverlay.querySelectorAll('.nav-links a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
        
        // Close menu when clicking on overlay background
        mobileOverlay.addEventListener('click', (e) => {
            if (e.target === mobileOverlay) {
                closeMobileMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Close menu on window resize if desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mobileOverlay.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    };
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
});