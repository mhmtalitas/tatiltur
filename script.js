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

    // Flatpickr Initialization
    if (document.getElementById("checkin-date")) {
        flatpickr("#checkin-date", {
            locale: "tr",
            dateFormat: "d.m.Y",
            minDate: "today",
            disableMobile: "true"
        });
    }

    // Search Functionality
    const searchBtn = document.getElementById('search-btn');

    // Tour Search Logic
    const searchInput = document.getElementById('tour-search-input');
    const searchDropdown = document.getElementById('search-dropdown');

    if (searchInput && searchDropdown) {
        searchInput.addEventListener('focus', () => {
            searchDropdown.classList.add('active');
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
                searchDropdown.classList.remove('active');
            }
        });

        const tourItems = searchDropdown.querySelectorAll('li');
        tourItems.forEach(item => {
            item.addEventListener('click', () => {
                const value = item.getAttribute('data-value');
                searchInput.value = value;
                searchDropdown.classList.remove('active');
            });
        });
    }

    // Guest Dropdown Logic
    const guestInput = document.getElementById('guest-input');
    const guestDropdown = document.getElementById('guest-dropdown');

    if (guestInput && guestDropdown) {
        guestInput.addEventListener('click', () => {
            guestDropdown.classList.add('active');
        });

        guestInput.addEventListener('focus', () => {
            guestDropdown.classList.add('active');
        });

        document.addEventListener('click', (e) => {
            if (!guestInput.contains(e.target) && !guestDropdown.contains(e.target)) {
                guestDropdown.classList.remove('active');
            }
        });

        const guestItems = guestDropdown.querySelectorAll('li');
        guestItems.forEach(item => {
            item.addEventListener('click', () => {
                const value = item.getAttribute('data-value');
                guestInput.value = value;
                guestDropdown.classList.remove('active');
            });
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const locationInput = document.getElementById('tour-search-input');
            const dateInput = document.getElementById('checkin-date');
            const guestInputEl = document.getElementById('guest-input');

            const params = new URLSearchParams();

            if (locationInput && locationInput.value.trim() !== "") {
                params.append('search', locationInput.value.trim());
            }

            if (dateInput && dateInput.value.trim() !== "") {
                params.append('date', dateInput.value.trim());
            }

            if (guestInputEl && guestInputEl.value.trim() !== "") {
                params.append('guests', guestInputEl.value.trim());
            }

            window.location.href = `tours.html?${params.toString()}`;
        });
    }
});
