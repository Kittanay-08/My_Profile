document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursor Glow
    const cursorGlow = document.getElementById('cursorGlow');
    window.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });

    // 2. Dark / Light Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlTag = document.documentElement;

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlTag.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            htmlTag.setAttribute('data-theme', 'light');
            themeIcon.textContent = '🌙';
        } else {
            htmlTag.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️';
        }
    });

    // 3. Tab Switching System (การศึกษา / ความชอบ)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 4. Click to Copy Student ID
    const copyBtn = document.getElementById('copyStudentId');
    const idVal = document.getElementById('studentIdValue');
    const toast = document.getElementById('toast');

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(idVal.innerText.trim()).then(() => {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        });
    });

    // 5. Typewriter Effect
    const words = ["Computer Engineering", "Software Developer", "Web Systems"];
    const typingElement = document.getElementById('typingText');
    let wordIdx = 0, charIdx = 0, isDeleting = false;

    function type() {
        const word = words[wordIdx];
        typingElement.textContent = isDeleting ? word.substring(0, charIdx--) : word.substring(0, charIdx++);
        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIdx === word.length + 1) {
            speed = 1400;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            speed = 300;
        }
        setTimeout(type, speed);
    }
    type();

    // 6. Real-time Clock
    const liveTime = document.getElementById('liveTime');
    function updateClock() {
        const now = new Date();
        liveTime.textContent = `Local Time: ${now.toLocaleTimeString('th-TH')}`;
    }
    setInterval(updateClock, 1000);
    updateClock();
});