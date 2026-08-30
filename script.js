// Punyakart Nepal Flood Relief - Mobile-First Interactive Logic

let selectedDonationAmount = 2500;

document.addEventListener('DOMContentLoaded', () => {
    // Language Toggle Logic
    const langToggle = document.getElementById('langToggle');
    const mobileLangToggle = document.getElementById('mobileLangToggle');
    const textEn = document.getElementById('text-en');
    const textHi = document.getElementById('text-hi');
    const mobileTextEn = document.getElementById('mobile-text-en');
    const mobileTextHi = document.getElementById('mobile-text-hi');

    function toggleLanguage() {
        const currentLang = document.body.getAttribute('data-lang');
        const newLang = currentLang === 'en' ? 'hi' : 'en';
        document.body.setAttribute('data-lang', newLang);

        if (newLang === 'en') {
            if (textEn) textEn.className = 'font-bold text-stone-900';
            if (textHi) textHi.className = 'text-stone-500';
            if (mobileTextEn) mobileTextEn.className = 'font-bold text-stone-900';
            if (mobileTextHi) mobileTextHi.className = 'text-stone-500';
        } else {
            if (textHi) textHi.className = 'font-bold text-stone-900';
            if (textEn) textEn.className = 'text-stone-500';
            if (mobileTextHi) mobileTextHi.className = 'font-bold text-stone-900';
            if (mobileTextEn) mobileTextEn.className = 'text-stone-500';
        }
    }

    if (langToggle) langToggle.addEventListener('click', toggleLanguage);
    if (mobileLangToggle) mobileLangToggle.addEventListener('click', toggleLanguage);

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // ESC Key listener to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeVideoModal();
            closeReceiptModal();
            closeMobileMenu();
        }
    });
});

// Mobile Navigation Drawer Functions
function toggleMobileMenu() {
    const drawer = document.getElementById('mobileMenuDrawer');
    const backdrop = document.getElementById('mobileMenuBackdrop');
    if (!drawer) return;

    const isHidden = drawer.classList.contains('translate-x-full');
    if (isHidden) {
        drawer.classList.remove('translate-x-full');
        drawer.classList.add('translate-x-0');
        if (backdrop) backdrop.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        closeMobileMenu();
    }
}

function closeMobileMenu() {
    const drawer = document.getElementById('mobileMenuDrawer');
    const backdrop = document.getElementById('mobileMenuBackdrop');
    if (drawer) {
        drawer.classList.remove('translate-x-0');
        drawer.classList.add('translate-x-full');
    }
    if (backdrop) {
        backdrop.classList.add('hidden');
    }
    document.body.style.overflow = '';
}

// Interactive Video Modal Player
function openVideoModal(videoSrc, titleEn, titleHi, locationEn, locationHi) {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('modalVideoPlayer');
    const titleEnEl = document.getElementById('videoModalTitleEn');
    const titleHiEl = document.getElementById('videoModalTitleHi');
    const locEnEl = document.getElementById('videoModalLocEn');
    const locHiEl = document.getElementById('videoModalLocHi');

    if (!modal || !player) return;

    // Reset and set video source
    player.pause();
    player.src = videoSrc;
    player.load();

    if (titleEnEl) titleEnEl.innerText = titleEn;
    if (titleHiEl) titleHiEl.innerText = titleHi;
    if (locEnEl) locEnEl.innerText = locationEn;
    if (locHiEl) locHiEl.innerText = locationHi;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Play video with browser policy fallback
    const playPromise = player.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('Video playback started successfully');
        }).catch(err => {
            console.warn('Unmuted playback prevented by browser, playing muted:', err);
            player.muted = true;
            player.play().catch(e => console.error('Video play error:', e));
        });
    }
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('modalVideoPlayer');

    if (player) {
        player.pause();
        player.removeAttribute('src');
        player.load();
    }
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Amount Selection Function
function selectAmount(amount, event) {
    selectedDonationAmount = amount;
    const buttons = document.querySelectorAll('.amount-btn');
    buttons.forEach(btn => btn.classList.remove('active-preset'));

    const clickedBtn = event ? event.currentTarget : window.event.currentTarget;
    if (clickedBtn) {
        clickedBtn.classList.add('active-preset');
    }

    const donorAmountInput = document.getElementById('donorAmount');
    if (donorAmountInput) {
        donorAmountInput.value = amount;
    }
}

// Direct Mobile UPI App Launcher
function payViaUpi(appName) {
    const upiId = 'donate@punyakart';
    const payeeName = encodeURIComponent('Punyakart Relief Trust');
    const note = encodeURIComponent('Nepal Flood Relief Emergency Fund');
    const amount = selectedDonationAmount;

    let upiUrl = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR&tn=${note}`;

    if (appName === 'gpay') {
        upiUrl = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR&tn=${note}`;
    } else if (appName === 'phonepe') {
        upiUrl = `phonepe://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR&tn=${note}`;
    } else if (appName === 'paytm') {
        upiUrl = `paytmmp://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR&tn=${note}`;
    }

    window.location.href = upiUrl;

    setTimeout(() => {
        const isHi = document.body.getAttribute('data-lang') === 'hi';
        alert(isHi ? 
            `UPI ऐप खोलने की कोशिश की जा रही है। आप VPA: ${upiId} का उपयोग करके भी ₹${amount} भेज सकते हैं।` : 
            `Opening UPI Payment App. You can also transfer directly to VPA: ${upiId} for ₹${amount}.`);
    }, 1500);
}

// Copy UPI ID Function with Touch Feedback
function copyUpiId() {
    const upiIdElement = document.getElementById('upiIdText');
    if (!upiIdElement) return;

    const upiId = upiIdElement.innerText.trim();
    navigator.clipboard.writeText(upiId).then(() => {
        const copyBtnTexts = document.querySelectorAll('.copyBtnText');
        const isHi = document.body.getAttribute('data-lang') === 'hi';

        copyBtnTexts.forEach(btn => {
            btn.innerHTML = isHi ? '✓ कॉपी हो गया!' : '✓ COPIED!';
        });

        setTimeout(() => {
            copyBtnTexts.forEach(btn => {
                btn.innerHTML = isHi ? '<span class="lang-hi">UPI कॉपी करें</span>' : '<span class="lang-en">COPY UPI</span>';
            });
        }, 2500);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Interactive FAQ Accordion Toggle
function toggleFaq(element) {
    const faqItem = element.closest('.faq-item');
    if (!faqItem) return;

    const isActive = faqItem.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Receipt Modal Functions
function openReceiptModal() {
    const modal = document.getElementById('receiptModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeReceiptModal() {
    const modal = document.getElementById('receiptModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function generateReceipt(e) {
    e.preventDefault();
    const name = document.getElementById('donorName').value;
    const amount = document.getElementById('donorAmount').value || selectedDonationAmount;
    const txId = document.getElementById('txId').value || 'N/A';
    const isHi = document.body.getAttribute('data-lang') === 'hi';

    if (isHi) {
        alert(`धन्यवाद ${name}!\n₹${amount} की दान रसीद (Txn: ${txId}) सफलतापूर्वक जनरेट हो गई है। 80G टैक्स सर्टिफिकेट आपकी ईमेल पर भेज दिया जाएगा।`);
    } else {
        alert(`Thank you ${name}!\nDonation receipt for ₹${amount} (Txn: ${txId}) generated successfully. 80G Tax certificate will be emailed to you.`);
    }

    closeReceiptModal();
}
