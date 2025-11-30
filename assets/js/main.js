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
            mode: 'no-cors',
            body: formData
        }).then(function(){
            // Opaque response (no-cors). Assume success if network didn’t fail.
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
        quote_text: '"L\'amore è la poesia dei sensi."',
        quote_author: '- Honoré de Balzac',
        hero_names: 'Riccardo ed Ester',
        hero_title: 'annunciano il loro matrimonio!',
        hero_date: 'Sabato 11 Aprile, 2026',
        invitation_message: 'Vi invitiamo a celebrare con noi questo giorno speciale',
        ceremony_title: 'Cerimonia Religiosa',
        ceremony_location: 'Chiesa dei Santi Filippo e Giacomo Apostoli',
        ceremony_time: 'ore 11:00',
        ceremony_address: 'Parona, Verona',
        reception_title: 'Ricevimento',
        reception_location: 'Ristorante Serenità',
        reception_time: 'a seguire',
        reception_address: 'Via Venturelli, 46 – Valeggio sul Mincio (Verona)',
        view_map: 'Visualizza Mappa ↗',
        rsvp_title: 'Confermate la vostra presenza',
        form_name: 'Nome Completo',
        form_guests: 'Numero di Ospiti',
        form_submit: 'Conferma Presenza',
        gift_title: 'Regalo di nozze',
        gift_method: 'Bonifico',
        gift_message: 'Se vorrai farci un regalo, potrai farlo lasciando un contributo alle seguenti coordinate.',
        gift_recipient: 'Intestatario:',
        gift_names: 'Riccardo Ester',
        copy_iban: 'Copia',
        closing_message: 'Con amore,'
    },
    en: {
        quote_text: '"Love is the poetry of the senses."',
        quote_author: '- Honoré de Balzac',
        hero_names: 'Riccardo and Ester',
        hero_title: 'are getting married!',
        hero_date: 'Saturday April 11th, 2026',
        invitation_message: 'We invite you to celebrate this special day with us',
        ceremony_title: 'Religious Ceremony',
        ceremony_location: 'Chiesa dei Santi Filippo e Giacomo Apostoli',
        ceremony_time: '11:00 AM',
        ceremony_address: 'Parona, Verona',
        reception_title: 'Reception',
        reception_location: 'Ristorante Serenità',
        reception_time: 'to follow',
        reception_address: 'Via Venturelli, 46 – Valeggio sul Mincio (Verona)',
        view_map: 'View Map ↗',
        rsvp_title: 'Please confirm your attendance',
        form_name: 'Full Name',
        form_guests: 'Number of Guests',
        form_submit: 'Confirm Attendance',
        gift_title: 'Wedding Gift',
        gift_method: 'Bank Transfer',
        gift_message: 'If you would like to give us a gift, you can do so by making a contribution to the following details.',
        gift_recipient: 'Account Holder:',
        gift_names: 'Riccardo Ester',
        copy_iban: 'Copy',
        closing_message: 'With love,'
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





