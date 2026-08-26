document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('tiltCard');
    const glowOverlay = document.getElementById('glowOverlay');
    const cursorGlow = document.getElementById('cursorGlow');
    const copyBtn = document.getElementById('copyStudentId');
    const studentIdVal = document.getElementById('studentIdValue');
    const toast = document.getElementById('toast');
    const liveTime = document.getElementById('liveTime');
    const typingElement = document.getElementById('typingText');

    // 1. แสงไฟติดตามเคอร์เซอร์ทั้งหน้าเว็บ
    window.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });

    // 2. เอฟเฟกต์ 3D Card Tilt & Spotlight Overlay
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        glowOverlay.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
        glowOverlay.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });

    // 3. คลิกเพื่อคัดลอกรหัสนักศึกษา (Click-to-Copy) พร้อม Toast
    copyBtn.addEventListener('click', () => {
        const idText = studentIdVal.innerText.trim();
        navigator.clipboard.writeText(idText).then(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2500);
        });
    });

    // 4. Typewriter Effect (แอนิเมชันพิมพ์ตัวอักษร)
    const words = ["Computer Engineering", "Software Developer", "Web Systems"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 90;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 1500; // หยุดรอเมื่อพิมพ์เสร็จ
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // 5. แสดงเวลา Real-time
    function updateTime() {
        const now = new Date();
        liveTime.textContent = `Local Time: ${now.toLocaleTimeString('th-TH')}`;
    }
    setInterval(updateTime, 1000);
    updateTime();
});