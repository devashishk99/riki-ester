// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
        var target = document.querySelector(this.getAttribute('href'));
        if(target){
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Countdown timer to April 11, 2026 09:00 local time
function startCountdown(targetId){
    var targetDate = new Date('2026-04-11T09:00:00');
    function update(){
        var now = new Date();
        var diff = targetDate - now;
        if(diff <= 0){
            var elDone = document.getElementById(targetId);
            if(elDone){ elDone.textContent = 'Oggi è il grande giorno!'; }
            return;
        }
        var days = Math.floor(diff / (1000*60*60*24));
        var hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
        var mins = Math.floor((diff % (1000*60*60)) / (1000*60));
        var secs = Math.floor((diff % (1000*60)) / 1000);
        var el = document.getElementById(targetId);
        if(el){
            el.textContent = days + ' giorni • ' + String(hours).padStart(2,'0') + ':' + String(mins).padStart(2,'0') + ':' + String(secs).padStart(2,'0');
        }
    }
    update();
    return setInterval(update, 1000);
}
startCountdown('countdown');
startCountdown('countdown-mobile');

// Copy IBAN
var copyBtn = document.getElementById('copy-iban');
if(copyBtn){
    copyBtn.addEventListener('click', function(){
        var iban = document.getElementById('iban-text').textContent.trim();
        navigator.clipboard.writeText(iban).then(function(){
            copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copiato';
            setTimeout(function(){ copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copia'; }, 1500);
        });
    });
}

// Init AOS
if(window.AOS){ AOS.init({ once: true, duration: 700, easing: 'ease-out' }); }

// Init Swiper for love story
if(window.Swiper){
    new Swiper('.love-story-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 24,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: { 768: { slidesPerView: 1 } }
    });

    new Swiper('.gallery-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 16,
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });
}

// RSVP form submission (placeholder endpoint)
var rsvpForm = document.getElementById('rsvp-form');
if(rsvpForm){
    rsvpForm.addEventListener('submit', function(e){
        e.preventDefault();
        var status = document.getElementById('rsvp-status');
        var formData = new FormData(rsvpForm);
        status.textContent = 'Invio in corso...';
        status.style.color = '#6b5538';
        var endpoint = rsvpForm.getAttribute('data-endpoint') || 'https://script.google.com/macros/s/YOUR_APPS_SCRIPT_DEPLOYMENT_ID/exec';
        fetch(endpoint, {
            method: 'POST',
            body: formData
        }).then(function(res){
            if(!res.ok) throw new Error('Errore');
            return res.json();
        }).then(function(){
            status.textContent = 'Grazie! La tua conferma è stata registrata.';
            status.style.color = '#2f855a';
            rsvpForm.reset();
        }).catch(function(){
            status.textContent = 'Si è verificato un problema. Riprova più tardi.';
            status.style.color = '#c53030';
        });
    });
}

// Simple i18n support (IT/EN)
var translations = {
    it: {
        hero_title: 'si sposano!',
        hero_date: '15 GIUGNO 2026',
        hero_tagline: "Unitevi a noi per celebrare l'amore sotto il sole toscano",
        nav_home: 'HOME',
        nav_story: 'STORIA',
        nav_details: 'DETTAGLI',
        nav_rsvp: 'RSVP',
        nav_gallery: 'GALLERY',
        gallery_title: 'Galleria'
    },
    en: {
        hero_title: 'are getting married!',
        hero_date: 'JUNE 15, 2026',
        hero_tagline: 'Join us in celebrating love under the Tuscan sun',
        nav_home: 'HOME',
        nav_story: 'STORY',
        nav_details: 'DETAILS',
        nav_rsvp: 'RSVP',
        nav_gallery: 'GALLERY',
        gallery_title: 'Gallery'
    }
};

function applyTranslations(lang){
    var dict = translations[lang] || translations.it;
    document.querySelectorAll('[data-i18n]').forEach(function(node){
        var key = node.getAttribute('data-i18n');
        if(dict[key]){ node.textContent = dict[key]; }
    });
    document.querySelectorAll('.lang-switch button').forEach(function(btn){
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

document.querySelectorAll('.lang-switch button').forEach(function(btn){
    btn.addEventListener('click', function(){
        var lang = btn.getAttribute('data-lang');
        applyTranslations(lang);
        try { localStorage.setItem('lang', lang); } catch(e){}
    });
});

applyTranslations(localStorage.getItem('lang') || 'it');

// Register Service Worker
if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('/service-worker.js').catch(function(){});
    });
}



