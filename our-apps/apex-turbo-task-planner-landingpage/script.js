/* ============================================================
   Apex Turbo Task Planner — Promotional Website Scripts
   Interactive Demo, Theme Switcher, Tour Tabs, Video Controls, FAQ
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initClock();
    initInteractiveMockup();
    initTourTabs();
    initFaqAccordion();
    initCopyButtons();
    initVideoControls();
    initMobileNav();
    initGlobalKeyboardShortcuts();
});

// ============================================================
// 1. THEME SWITCHER (Warm Ivory <-> Deep Charcoal)
// ============================================================
function initTheme() {
    const themeBtn = document.getElementById('themeSwitchBtn');
    if (!themeBtn) return;

    // Check system preference or saved preference
    const savedTheme = localStorage.getItem('apex_landing_theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }

    themeBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('apex_landing_theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
        showToast(isDark ? 'Switched to Deep Charcoal theme' : 'Switched to Warm Ivory theme');
    });
}

function updateThemeIcon(isDark) {
    const iconContainer = document.getElementById('themeIconContainer');
    if (!iconContainer) return;

    if (isDark) {
        // Sun icon
        iconContainer.innerHTML = `
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
        `;
    } else {
        // Moon icon
        iconContainer.innerHTML = `
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
        `;
    }
}

// ============================================================
// 2. LIVE DATE & TIME IN MOCKUP
// ============================================================
function initClock() {
    function update() {
        const now = new Date();
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const day = days[now.getDay()];
        const month = months[now.getMonth()];
        const date = now.getDate();

        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedHours = String(hours).padStart(2, '0');

        const dateStr = `${day}, ${month} ${date}`;
        const timeStr = `${formattedHours}:${minutes} ${ampm}`;

        const dateEl = document.getElementById('mockupLiveDate');
        const timeEl = document.getElementById('mockupLiveTime');

        if (dateEl) dateEl.textContent = dateStr;
        if (timeEl) timeEl.textContent = timeStr;
    }

    update();
    setInterval(update, 1000);
}

// ============================================================
// 3. INTERACTIVE SIMULATED EXTENSION MOCKUP
// ============================================================
function initInteractiveMockup() {
    const frame = document.getElementById('interactivePopupFrame');
    const input = document.getElementById('demoTaskInput');
    const addBtn = document.getElementById('demoAddBtn');
    const list = document.getElementById('demoTaskList');
    const progressStatus = document.getElementById('demoProgressStatus');
    const progressBar = document.getElementById('demoProgressBar');
    const progressPercent = document.getElementById('demoProgressPercent');
    const switchPlannerBtn = document.getElementById('switchPlannerBtn');
    const switchFocusBtn = document.getElementById('switchFocusBtn');
    const focusDockTrigger = document.getElementById('demoFocusDockTrigger');

    if (!frame || !list) return;

    // Initial demo tasks state
    let demoTasks = [
        { id: 1, text: 'Review product launch checklist', tag: 'Launch', completed: true },
        { id: 2, text: 'Refine editorial typography tokens', tag: 'Design', completed: false },
        { id: 3, text: '25-minute Pomodoro focus session', tag: 'Focus', completed: false }
    ];

    function renderTasks() {
        list.innerHTML = '';
        demoTasks.forEach(task => {
            const card = document.createElement('div');
            card.className = `demo-task-card ${task.completed ? 'completed' : ''}`;
            card.innerHTML = `
                <div class="demo-checkbox ${task.completed ? 'checked' : ''}" data-id="${task.id}">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#FFFFFF" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                </div>
                <span class="demo-task-title">${escapeHtml(task.text)}</span>
                <span class="demo-task-tag">${escapeHtml(task.tag)}</span>
            `;

            // Checkbox event
            const checkbox = card.querySelector('.demo-checkbox');
            checkbox.addEventListener('click', () => {
                task.completed = !task.completed;
                renderTasks();
                updateProgress();
            });

            list.appendChild(card);
        });

        updateProgress();
    }

    function updateProgress() {
        const total = demoTasks.length;
        const completed = demoTasks.filter(t => t.completed).length;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

        if (progressStatus) progressStatus.textContent = `${completed} of ${total} complete`;
        if (progressBar) progressBar.style.width = `${percent}%`;
        if (progressPercent) progressPercent.textContent = `${percent}%`;
    }

    function addTask() {
        if (!input) return;
        const val = input.value.trim();
        if (!val) return;

        demoTasks.push({
            id: Date.now(),
            text: val,
            tag: 'Work',
            completed: false
        });

        input.value = '';
        renderTasks();
        showToast('Task added to preview planner!');
    }

    if (addBtn) addBtn.addEventListener('click', addTask);
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') addTask();
        });
    }

    // View Switcher (Planner <-> Focus Mode)
    function setMockupMode(mode) {
        if (mode === 'focus') {
            frame.classList.add('mode-focus');
            if (switchFocusBtn) switchFocusBtn.classList.add('active');
            if (switchPlannerBtn) switchPlannerBtn.classList.remove('active');
            // Change hero text
            const hero = document.getElementById('demoHeroHeading');
            if (hero) hero.textContent = 'Focus on what matters.';
        } else {
            frame.classList.remove('mode-focus');
            if (switchPlannerBtn) switchPlannerBtn.classList.add('active');
            if (switchFocusBtn) switchFocusBtn.classList.remove('active');
            const hero = document.getElementById('demoHeroHeading');
            if (hero) hero.textContent = 'Your day, in order.';
        }
    }

    if (switchPlannerBtn) switchPlannerBtn.addEventListener('click', () => setMockupMode('planner'));
    if (switchFocusBtn) switchFocusBtn.addEventListener('click', () => setMockupMode('focus'));
    if (focusDockTrigger) focusDockTrigger.addEventListener('click', () => setMockupMode('focus'));

    // Demo Tabs (Today / Notes / History)
    const demoTabs = document.querySelectorAll('.demo-tab-item');
    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            demoTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const tabName = tab.getAttribute('data-tab');
            if (tabName === 'notes') {
                showToast('Notes scratchpad preview');
            } else if (tabName === 'history') {
                showToast('Saved days archive preview');
            }
        });
    });

    renderTasks();
}

// ============================================================
// 4. DEEP DIVE TOUR TABS
// ============================================================
function initTourTabs() {
    const tabBtns = document.querySelectorAll('.feature-tab-btn');
    const contents = document.querySelectorAll('.feature-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tour');

            tabBtns.forEach(b => b.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add('active');
        });
    });
}

// ============================================================
// 5. FAQ ACCORDION
// ============================================================
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (!questionBtn) return;

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close other items
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ============================================================
// 6. COPY TO CLIPBOARD BUTTONS
// ============================================================
function initCopyButtons() {
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`Copied "${textToCopy}" to clipboard!`);
            }).catch(() => {
                showToast('Copied to clipboard!');
            });
        });
    });
}

// ============================================================
// 7. VIDEO CONTROLS & TIMESTAMPS
// ============================================================
function initVideoControls() {
    const video = document.getElementById('demoVideoPlayer');
    const timestampChips = document.querySelectorAll('.video-jump-chip');
    const soundToggleBtn = document.getElementById('videoSoundToggleBtn');
    const soundMutedIcon = soundToggleBtn ? soundToggleBtn.querySelector('.sound-icon-muted') : null;
    const soundUnmutedIcon = soundToggleBtn ? soundToggleBtn.querySelector('.sound-icon-unmuted') : null;
    const soundLabel = document.getElementById('soundToggleLabel');

    if (!video) return;

    // Enforce muted loop autoplay
    video.muted = true;
    video.loop = true;

    // Attempt autoplay with browser policy handling
    const startAutoplay = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay blocked by browser until user gesture; add gentle retry on first click
                const retryOnGesture = () => {
                    video.play();
                    window.removeEventListener('click', retryOnGesture);
                    window.removeEventListener('keydown', retryOnGesture);
                };
                window.addEventListener('click', retryOnGesture, { once: true });
                window.addEventListener('keydown', retryOnGesture, { once: true });
            });
        }
    };

    if (document.readyState === 'complete') {
        startAutoplay();
    } else {
        window.addEventListener('load', startAutoplay, { once: true });
    }

    // Synchronize Mute/Unmute UI with video state (both button clicks and native controls)
    function updateSoundUI() {
        const isMuted = video.muted || video.volume === 0;
        if (soundMutedIcon) soundMutedIcon.style.display = isMuted ? 'block' : 'none';
        if (soundUnmutedIcon) soundUnmutedIcon.style.display = isMuted ? 'none' : 'block';
        if (soundLabel) soundLabel.textContent = isMuted ? 'Turn Sound On' : 'Mute Sound';
        if (soundToggleBtn) {
            soundToggleBtn.classList.toggle('unmuted', !isMuted);
            soundToggleBtn.setAttribute('title', isMuted ? 'Turn sound on' : 'Turn sound off');
        }
    }

    video.addEventListener('volumechange', updateSoundUI);
    updateSoundUI();

    // Floating sound toggle button interaction
    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (video.muted || video.volume === 0) {
                video.muted = false;
                if (video.volume === 0) video.volume = 1;
                if (video.paused) video.play();
                showToast('🔊 Sound enabled');
            } else {
                video.muted = true;
                showToast('🔇 Video muted');
            }
            updateSoundUI();
        });
    }

    // Video Jump Chips
    timestampChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const seconds = parseFloat(chip.getAttribute('data-time') || '0');
            video.currentTime = seconds;
            video.play();
            timestampChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            showToast(`Jumped to ${chip.textContent.trim()}`);
        });
    });
}

// ============================================================
// 8. MOBILE NAVIGATION
// ============================================================
function initMobileNav() {
    const toggle = document.getElementById('mobileNavToggle');
    const navLinks = document.querySelector('.nav-links');

    if (!toggle || !navLinks) return;

    const hamburgerSvg = `
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
    `;

    const closeSvg = `
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
    `;

    function closeNav() {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = hamburgerSvg;
    }

    function toggleNav(e) {
        if (e) e.stopPropagation();
        const isOpen = navLinks.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        toggle.innerHTML = isOpen ? closeSvg : hamburgerSvg;
    }

    toggle.addEventListener('click', toggleNav);

    // Auto-close on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeNav();
        });
    });

    // Auto-close on click outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !toggle.contains(e.target)) {
            closeNav();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
            closeNav();
        }
    });

    // Reset when resizing window above mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && navLinks.classList.contains('open')) {
            closeNav();
        }
    });
}

// ============================================================
// 9. TOAST NOTIFICATIONS
// ============================================================
let toastTimeout = null;
function showToast(message) {
    let toast = document.getElementById('siteToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'siteToast';
        toast.className = 'toast-notice';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

// ============================================================
// 10. UTILITIES
// ============================================================
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ============================================================
// 11. KEYBOARD SHORTCUTS INTERACTION
// ============================================================
function initGlobalKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
        if (e.altKey && e.shiftKey && (e.key === 't' || e.key === 'T')) {
            e.preventDefault();
            const isMac = (typeof navigator !== 'undefined') &&
                (navigator.platform.toUpperCase().includes('MAC') || navigator.userAgent.includes('Mac'));
            showToast(`⚡ Quick Launch (${isMac ? 'Option' : 'Alt'} + Shift + T): Opens Apex Turbo anywhere in Chrome!`);
        }
    });
}
