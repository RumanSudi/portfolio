

const typeElement = document.getElementById('typed');

const phrases = [
    'whoami',
    'cat about.txt',
    'ls./skills',
    'nmap -sV localhost',
    'grep -r "vulnerbilities" /',

    
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeWriter() {

    const currentPhrase = phrases[phraseIndex];

    if (!deleting) {

        typeElement.textContent = currentPhrase.slice(0,++ charIndex);

        if (charIndex === currentPhrase.length) {
            deleting = true;
            setTimeout(typeWriter, 1800);
            return;
        }
    } else {
        typeElement.textContent = currentPhrase.slice(0, --charIndex);
        
        if (charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }
    setTimeout(typeWriter, deleting ? 40 : 80);
}
//SATRTER TYPEWRITE NÅR SIDEN LASTES//

typeWriter();



//-------------2. sKILL-Bar Animasjon  Baren fyller seg opp når de kommer til syne-----------------//

const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            
            //Finn alle skill-fyll elememnter og sett bredden. 

            entry.target.querySelectorAll('.ferdighet-fyll').forEach(function(bar) {
                const prosent= bar.getAttribute('data-prosent');
                bar.style.width = prosent+'%';
            });

            //Slutt å observere -animere barer en gang.

            skillObserver.unobserve(entry.target);

        }
    }); 

} , { threshold: 0.2 });

// -- Obserever ferdighetsgrid-en ----//

const ferdighetesGrid = document.querySelector('#ferdigheter> div');

if (ferdighetesGrid) {

    skillObserver.observe(ferdighetesGrid);

}


// ---- 3. AKTIV NAVBAR-LENKE  highlighter riktig lenke mens du scroller----//

const seksjoner = document.querySelectorAll('section[id]');
const navLenker = document.querySelectorAll('nav a');

window.addEventListener('scroll', function() {

    let current='';

    seksjoner.forEach(function(seksjon) {

        if (window.scrollY >= seksjon.offsetTop - 80) {
            current = seksjon.id;
        }
    });

    navLenker.forEach(function(lenke) {

        lenke.classList.remove('aktiv');
        
        if(lenke.getAttribute('href')=== '#'+current) {
            lenke.classList.add('aktiv');
        }
    });
}, { passive: true });


//---- 4.KontaktSKJEMA---//

const skjema = document.getElementById('kontakt-skjema'); 

if (skjema){ 
    skjema.addEventListener ('submit', function(e){
        e.preventDefault(); //hindrer siden fra å refreshe

        const knapp = skjema.querySelector('button'); 
        const status = document.getElementById ('skjema-status');

        //vis "sender.... på knappen"//

        knapp.textContent = 'sender...'
        knapp.disabled = true; 

        // vis Etter 900ms- vis bekreftelse og reset skjema

        setTimeout(function () {
            status.hidden = false;
            knapp.textContent ='Send melding'; 
            knapp.disabled = false
            skjema.reset (); 
        }, 900);

    }); 
}


// Scroll Reveal  Elementer fader inn når de kommer til syne//


const revealObserver = new IntersectionObserver (function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {

            entry.target.classList.add('synlig');
            revealObserver.unobserve(entry.target);
        }
    });
},  { threshold: 0.08 }); 

document.querySelectorAll('.reveal').forEach(function(el) {
    revealObserver.observe(el); 
}); 


// 6.Footer ÅR setter automatisk riktig årstall i footer  

const aarElement = document.getElementById ('aar'); 

if (aarElement) {
    aarElement.textContent= new Date ().getFullYear ()

}
