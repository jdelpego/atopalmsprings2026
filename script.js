// Smooth scroll behavior and intersection observer for fade-in animations

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all expectation subsections
    const subsections = document.querySelectorAll('.expectation-subsection');
    subsections.forEach(subsection => {
        observer.observe(subsection);
    });

    // Signup drawer modal
    const signupButtons = document.querySelectorAll('.btn-signup');
    const overlay = document.querySelector('.signup-overlay');
    const drawer = document.querySelector('.signup-drawer');
    const closeButtons = document.querySelectorAll('[data-signup-close]');
    const formContainer = document.getElementById('signup-form-container');
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeJCi4ZoJrNsgYOTsgQn28x9tyV3Yb90y2-5mrUmFYJ3f22TQ/viewform?embedded=true';
    let lastFocusedElement = null;

    const focusableSelector = [
        'a[href]',
        'button:not([disabled])',
        'textarea',
        'input',
        'select',
        'iframe',
        '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    const getFocusableElements = () => Array.from(drawer.querySelectorAll(focusableSelector));

    const ensureFormLoaded = () => {
        if (formContainer && !formContainer.querySelector('iframe')) {
            const iframe = document.createElement('iframe');
            iframe.src = formUrl;
            iframe.title = 'ATO Palm Springs Signup Form';
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('marginheight', '0');
            iframe.setAttribute('marginwidth', '0');
            formContainer.appendChild(iframe);
        }
    };

    const openDrawer = (trigger) => {
        if (!drawer || !overlay) return;
        lastFocusedElement = trigger || document.activeElement;
        ensureFormLoaded();
        document.body.classList.add('signup-open');
        drawer.setAttribute('aria-hidden', 'false');
        overlay.setAttribute('aria-hidden', 'false');

        requestAnimationFrame(() => {
            const focusable = getFocusableElements();
            if (focusable.length) {
                focusable[0].focus();
            }
        });

        document.addEventListener('keydown', handleKeydown);
    };

    const closeDrawer = () => {
        if (!drawer || !overlay) return;
        document.body.classList.remove('signup-open');
        drawer.setAttribute('aria-hidden', 'true');
        overlay.setAttribute('aria-hidden', 'true');
        document.removeEventListener('keydown', handleKeydown);

        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    };

    const trapFocus = (event) => {
        if (event.key !== 'Tab') return;
        const focusable = getFocusableElements();
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    };

    const handleKeydown = (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            closeDrawer();
            return;
        }
        trapFocus(event);
    };

    signupButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openDrawer(button);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            closeDrawer();
        });
    });
});
