const langToggle = document.getElementById('langToggle');
let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-en][data-ar]').forEach((element) => {
    element.textContent = element.dataset[lang];
  });
  langToggle.textContent = lang === 'en' ? 'العربية' : 'English';
  langToggle.setAttribute('aria-label', lang === 'en' ? 'Switch to Arabic' : 'Switch to English');
}

langToggle.addEventListener('click', () => setLanguage(currentLang === 'en' ? 'ar' : 'en'));
document.getElementById('year').textContent = new Date().getFullYear();
