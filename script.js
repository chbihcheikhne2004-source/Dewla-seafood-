// script.js — language toggle, animations, form behaviour, mobile menu
document.addEventListener('DOMContentLoaded', function(){
  // simple bilingual content (EN/FR)
  const strings = {
    en: {
      hero_title: "Fresh & Frozen Seafood Exporters",
      hero_sub: "Quality seafood from the Atlantic coast of Mauritania.",
      contact_cta: "Contact Us",
      learn_cta: "Learn More",
      about_title: "About DEWLA SEAFOOD",
      about_text: "DEWLA SEAFOOD specializes in the production and export of frozen seafood products caught on the Atlantic coast of Mauritania. Our mission is to deliver quality and freshness to our partners worldwide.",
      highlight_1: "Premium selection — daily selected catch",
      highlight_2: "Modern freezing — rapid blast freezing",
      highlight_3: "Global delivery — reliable cold chain",
      services_title: "Our Job",
      services_sub: "We select the most beautiful fish every day to offer you products at the best price.",
      svc1_title: "Selection",
      svc1_text: "We hand-pick the freshest seafood each day to guarantee consistent quality.",
      svc2_title: "Freezing",
      svc2_text: "Advanced freezing technology to preserve texture and taste.",
      svc3_title: "Delivery",
      svc3_text: "Efficient logistics with complete cold-chain control.",
      gallery_title: "Gallery",
      gallery_sub: "A snapshot of our facilities and catch.",
      contact_title: "Contact Us",
      contact_text: "If you would like information on a product or have an inquiry, contact us and we will reply promptly.",
      email_label: "Email:",
      phone_label: "Tel:",
      addr_label: "Address:",
      form_name: "Name",
      form_email: "Email",
      form_msg: "Message",
      form_send: "Send Message",
      form_reset: "Reset",
    },
    fr: {
      hero_title: "Exportateurs de produits de la mer frais et surgelés",
      hero_sub: "Produits de qualité de la côte atlantique de la Mauritanie.",
      contact_cta: "Nous contacter",
      learn_cta: "En savoir plus",
      about_title: "À propos de DEWLA SEAFOOD",
      about_text: "DEWLA SEAFOOD est spécialisée dans la production et l'exportation de produits de la mer surgelés pêchés sur la côte atlantique de la Mauritanie. Notre mission est d'offrir qualité et fraîcheur à nos partenaires dans le monde entier.",
      highlight_1: "Sélection premium — prise sélectionnée quotidiennement",
      highlight_2: "Congélation moderne — surgélation rapide",
      highlight_3: "Livraison mondiale — chaîne du froid fiable",
      services_title: "Notre travail",
      services_sub: "Nous sélectionnons les plus beaux poissons chaque jour pour vous offrir des produits au meilleur prix.",
      svc1_title: "Sélection",
      svc1_text: "Nous choisissons à la main les produits les plus frais chaque jour pour garantir une qualité constante.",
      svc2_title: "Congélation",
      svc2_text: "Technologie de congélation avancée pour préserver la texture et le goût.",
      svc3_title: "Livraison",
      svc3_text: "Logistique efficace avec un contrôle complet de la chaîne du froid.",
      gallery_title: "Galerie",
      gallery_sub: "Un aperçu de nos installations et de nos prises.",
      contact_title: "Contactez-nous",
      contact_text: "Si vous souhaitez des informations sur un produit ou avez une question, contactez-nous et nous répondrons rapidement.",
      email_label: "Email :",
      phone_label: "Tél :",
      addr_label: "Adresse :",
      form_name: "Nom",
      form_email: "Email",
      form_msg: "Message",
      form_send: "Envoyer",
      form_reset: "Réinitialiser",
    }
  };

  // initial language state
  let lang = localStorage.getItem('dewla_lang') || 'en';
  const langToggle = document.getElementById('langToggle');
  function applyLang(l){
    document.documentElement.lang = (l==='fr'?'fr':'en');
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(strings[l][key]) el.textContent = strings[l][key];
    });
    langToggle.textContent = (l==='en'?'FR':'EN');
    langToggle.setAttribute('aria-pressed', l==='fr');
    localStorage.setItem('dewla_lang', l);
    lang = l;
  }
  applyLang(lang);

  langToggle.addEventListener('click', ()=>{
    applyLang(lang==='en'?'fr':'en');
  });

  // mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  menuToggle.addEventListener('click', ()=>{
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? '' : 'flex';
  });

  // simple scroll reveal animation
  const animEls = document.querySelectorAll('[data-anim]');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const delay = el.getAttribute('data-anim-delay') || 0;
        el.style.setProperty('--delay', delay + 'ms');
        setTimeout(()=> el.classList.add('in'), Number(delay));
        io.unobserve(el);
      }
    });
  }, {threshold: 0.12});
  animEls.forEach(e=>io.observe(e));

  // contact form (mock) — no backend, so we'll simulate send
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    status.textContent = lang==='fr' ? 'Envoi en cours…' : 'Sending…';
    // simulate network
    setTimeout(()=>{
      status.textContent = lang==='fr' ? 'Merci ! Nous avons bien reçu votre message.' : 'Thanks! We received your message.';
      form.reset();
    }, 900);
  });

  // set year
  document.getElementById('year').textContent = new Date().getFullYear();
});
