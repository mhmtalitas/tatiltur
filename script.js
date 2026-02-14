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

    // Reusable Pax Picker Function
    function initPaxPicker(inputId, dropdownId, confirmBtnId, countIds) {
        const input = document.getElementById(inputId);
        const dropdown = document.getElementById(dropdownId);
        const confirmBtn = document.getElementById(confirmBtnId);

        if (!input || !dropdown) return;

        let counts = { adult: 1, child: 0, baby: 0 };

        const updateDisplay = () => {
            let parts = [];
            if (counts.adult > 0) parts.push(`${counts.adult} Yetişkin`);
            if (counts.child > 0) parts.push(`${counts.child} Çocuk`);
            if (counts.baby > 0) parts.push(`${counts.baby} Bebek`);

            input.value = parts.join(', ');

            // Sync with elements
            if (countIds.adult) document.getElementById(countIds.adult).innerText = counts.adult;
            if (countIds.child) document.getElementById(countIds.child).innerText = counts.child;
            if (countIds.baby) document.getElementById(countIds.baby).innerText = counts.baby;
        };

        input.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        const controlBtns = dropdown.querySelectorAll('.pax-btn');
        controlBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.getAttribute('data-type');
                const isPlus = btn.classList.contains('btn-plus');

                if (isPlus) {
                    counts[type]++;
                } else if (counts[type] > 0) {
                    if (type === 'adult' && counts[type] === 1) return;
                    counts[type]--;
                }
                updateDisplay();
            });
        });

        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                dropdown.classList.remove('active');
            });
        }

        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });

        updateDisplay();
    }

    // Home Page Guest Picker
    initPaxPicker('guest-input', 'guest-dropdown', 'guest-pax-confirm', {
        adult: 'guest-count-adult',
        child: 'guest-count-child',
        baby: 'guest-count-baby'
    });

    // Tour Detail Page Pax Picker
    initPaxPicker('pax-input', 'pax-dropdown', 'pax-confirm', {
        adult: 'count-adult',
        child: 'count-child',
        baby: 'count-baby'
    });

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
