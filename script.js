
const languageToggle = document.getElementById("languageToggle");
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".main-nav");
const typingText = document.getElementById("typingText");

document.getElementById("year").textContent =
  new Date().getFullYear();

/* TERMINAL TYPING */

const phrases = [
  "learning continuously",
  "analyzing the details",
  "building secure habits"
];

let phraseIndex = 0;

if (typingText) {
  setInterval(() => {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingText.textContent = phrases[phraseIndex];
  }, 2600);
}

/* LANGUAGE SWITCHING */

function setLanguage(language) {

  const isArabic = language === "ar";

  document.documentElement.lang =
    isArabic ? "ar" : "en";

  document.body.dir =
    isArabic ? "rtl" : "ltr";

  document.querySelectorAll("[data-en][data-ar]")
    .forEach((element) => {

      element.innerHTML = isArabic
        ? element.dataset.ar
        : element.dataset.en;

    });

  languageToggle.textContent =
    isArabic ? "EN" : "عربي";

  document.title = isArabic
    ? "عبدالله غرايبة | ملف الأمن السيبراني"
    : "Abdallah Gharaibeh | Cybersecurity Specialist";

  localStorage.setItem("portfolio-language", language);
}

/* RESTORE SAVED LANGUAGE */

const savedLanguage =
  localStorage.getItem("portfolio-language");

if (savedLanguage === "ar") {
  setLanguage("ar");
}

/* LANGUAGE BUTTON */

languageToggle.addEventListener("click", () => {

  const nextLanguage =
    document.documentElement.lang === "ar"
      ? "en"
      : "ar";

  setLanguage(nextLanguage);

});

/* MOBILE NAVIGATION */

menuToggle.addEventListener("click", () => {

  const isOpen =
    nav.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );

});

nav.querySelectorAll("a").forEach((link) => {

  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });

});
