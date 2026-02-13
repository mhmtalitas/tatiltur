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
            hamburger.classList.remove('active');
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

    if (document.getElementById("booking-date")) {
        flatpickr("#booking-date", {
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

    // Pax Dropdown Logic (Tour Detail Page) - Improved Incremental Picker
    const paxInput = document.getElementById('pax-input');
    const paxDropdown = document.getElementById('pax-dropdown');
    const paxConfirmBtn = document.getElementById('pax-confirm');

    if (paxInput && paxDropdown) {
        let counts = { adult: 1, child: 0, baby: 0 };

        const updatePaxDisplay = () => {
            let parts = [];
            if (counts.adult > 0) parts.push(`${counts.adult} Yetişkin`);
            if (counts.child > 0) parts.push(`${counts.child} Çocuk`);
            if (counts.baby > 0) parts.push(`${counts.baby} Bebek`);

            paxInput.value = parts.join(', ');

            // Sync with actual counts in dropdown
            document.getElementById('count-adult').innerText = counts.adult;
            document.getElementById('count-child').innerText = counts.child;
            document.getElementById('count-baby').innerText = counts.baby;
        };

        paxInput.addEventListener('click', (e) => {
            e.stopPropagation();
            paxDropdown.classList.toggle('active');
        });

        paxDropdown.addEventListener('click', (e) => {
            e.stopPropagation(); // Dropdown içi tıklamalarda kapanmasın
        });

        const controlBtns = paxDropdown.querySelectorAll('.pax-btn');
        controlBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.getAttribute('data-type');
                const isPlus = btn.classList.contains('btn-plus');

                if (isPlus) {
                    counts[type]++;
                } else if (counts[type] > 0) {
                    // Adult can't be less than 1 if needed, but 0 is also fine for some cases
                    if (type === 'adult' && counts[type] === 1) return;
                    counts[type]--;
                }
                updatePaxDisplay();
            });
        });

        if (paxConfirmBtn) {
            paxConfirmBtn.addEventListener('click', () => {
                paxDropdown.classList.remove('active');
            });
        }

        document.addEventListener('click', (e) => {
            if (!paxInput.contains(e.target) && !paxDropdown.contains(e.target)) {
                paxDropdown.classList.remove('active');
            }
        });

        // Initial sync
        updatePaxDisplay();
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
