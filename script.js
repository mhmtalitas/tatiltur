document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    // Toggle Mobile Menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Mobile Dropdown Toggle
    if (window.innerWidth <= 768) {
        navItems.forEach(item => {
            if (item.querySelector('.dropdown')) {
                item.addEventListener('click', (e) => {
                    // Prevent closing if clicking on dropdown parent
                    if (e.target.parentElement === item || e.target === item) {
                        // e.preventDefault(); // Link'e gitmesini engellemek isterseniz açın
                    }
                    item.classList.toggle('active');
                });
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Filter Accordion Logic
    const filterTitles = document.querySelectorAll('.filter-title');
    filterTitles.forEach(title => {
        title.addEventListener('click', () => {
            const group = title.parentElement;
            const options = title.nextElementSibling;

            group.classList.toggle('active');

            if (!options) return;

            if (group.classList.contains('active')) {
                options.style.display = 'block';
            } else {
                options.style.display = 'none';
            }
        });
    });
});
