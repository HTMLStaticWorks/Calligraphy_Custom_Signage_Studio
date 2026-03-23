/* 
 * Alexandra Sterling Studio - Main JS
 * Handles: Loader, Theme Toggle (dual), Header scroll, Reveal animations, Back to top, Smooth scroll
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. LOADER
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 0.5s ease';
                setTimeout(() => { loader.style.display = 'none'; }, 500);
            }, 800);
        });
    }

    // 2. THEME TOGGLE (handles both desktop + mobile buttons)
    const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    const body = document.body;
    const saved = localStorage.getItem('theme') || 'light';

    if (saved === 'dark') {
        body.setAttribute('data-theme', 'dark');
        setIcons('dark');
    }

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const isDark = body.getAttribute('data-theme') === 'dark';
            if (isDark) {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                setIcons('light');
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                setIcons('dark');
            }
        });
    });

    function setIcons(theme) {
        themeToggles.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
        });
    }

    // 3. HEADER SCROLL EFFECT
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // 4. REVEAL ON SCROLL
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    reveals.forEach(el => revealObserver.observe(el));

    // 5. BACK TO TOP
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('show', window.scrollY > 300);
        });
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // 6. SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            if (this.hash) {
                e.preventDefault();
                const t = document.querySelector(this.hash);
                if (t) window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // 7. HOME DROPDOWN — click toggle (not hover)
    document.querySelectorAll('.header-dropdown').forEach(dropdown => {
        const trigger = dropdown.querySelector('.nav-link');
        const menu    = dropdown.querySelector('.header-dropdown-menu');
        if (!trigger || !menu) return;

        // Toggle on click
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = menu.classList.contains('open');
            // Close all other open dropdowns first
            document.querySelectorAll('.header-dropdown-menu.open').forEach(m => m.classList.remove('open'));
            if (!isOpen) menu.classList.add('open');
        });

        // Close when clicking a menu item
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => menu.classList.remove('open'));
        });
    });

    // Close dropdown when clicking anywhere outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.header-dropdown-menu.open').forEach(m => m.classList.remove('open'));
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.header-dropdown-menu.open').forEach(m => m.classList.remove('open'));
        }
    });

    // 8. RTL TOGGLE
    const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
    const html = document.documentElement;
    const bsLink = document.querySelector('link[href*="bootstrap.min.css"]') || document.querySelector('link[href*="bootstrap.rtl.min.css"]');
    const savedRtl = localStorage.getItem('rtlMode') === 'true';

    function setRTL(isRTL) {
        if (isRTL) {
            html.setAttribute('dir', 'rtl');
            if (bsLink && bsLink.href.includes('bootstrap.min.css')) {
                bsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css';
            }
        } else {
            html.removeAttribute('dir');
            if (bsLink && bsLink.href.includes('bootstrap.rtl.min.css')) {
                bsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
            }
        }
        rtlToggles.forEach(btn => {
            btn.innerHTML = isRTL ? '<span style="font-size:0.8rem;font-weight:bold;">LTR</span>' : '<span style="font-size:0.8rem;font-weight:bold;">RTL</span>';
        });
    }

    if (savedRtl) {
        setRTL(true);
    }

    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const isRTL = html.getAttribute('dir') === 'rtl';
            setRTL(!isRTL);
            localStorage.setItem('rtlMode', (!isRTL).toString());
        });
    });

});
