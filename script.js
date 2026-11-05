document.addEventListener("DOMContentLoaded", () => {
    const slides = [...document.querySelectorAll(".slide")];
    const navButtons = [...document.querySelectorAll("[data-section]")];
    const goButtons = [...document.querySelectorAll("[data-go]")];
    const dots = [...document.querySelectorAll(".slide-dot")];

    const currentPage = document.getElementById("current-page");
    const sectionHeading = document.getElementById("section-heading");
    const slideCurrent = document.getElementById("slide-current");
    const previousButton = document.getElementById("previous-slide");
    const nextButton = document.getElementById("next-slide");
    const deck = document.getElementById("deck");

    const headings = {
        home: "Welcome to my <span>digital space.</span>",
        profile: "A little <span>about me.</span>",
        expertise: "Technical skills &amp; <span>expertise.</span>",
        education: "My academic <span>background.</span>",
        work: "Practical security <span>experience.</span>",
        links: "Find me <span>online.</span>",
        contact: "Let's <span>connect.</span>"
    };

    const sectionNames = slides.map(slide => slide.id);
    let activeIndex = 0;
    let isAnimating = false;
    let touchStartX = 0;

    function updateNavigation(sectionId) {
        navButtons.forEach(button => {
            const isActive = button.dataset.section === sectionId;
            button.classList.toggle("active", isActive);
            if (isActive) button.setAttribute("aria-current", "page");
            else button.removeAttribute("aria-current");
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === activeIndex);
        });
    }

    function showSlide(index, direction = "next") {
        if (isAnimating) return;

        const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
        if (nextIndex === activeIndex) return;

        isAnimating = true;

        const currentSlide = slides[activeIndex];
        const nextSlide = slides[nextIndex];

        currentSlide.classList.remove("active");
        currentSlide.classList.add(
            direction === "next" ? "leaving-next" : "leaving-prev"
        );

        window.setTimeout(() => {
            currentSlide.classList.remove("leaving-next", "leaving-prev");

            slides.forEach(slide => {
                slide.classList.remove("active");
            });

            activeIndex = nextIndex;
            nextSlide.classList.add("active");

            const sectionId = nextSlide.id;
            const title = nextSlide.dataset.title || sectionId.toUpperCase();

            currentPage.textContent = title;
            sectionHeading.innerHTML = headings[sectionId] || title;
            slideCurrent.textContent = String(activeIndex + 1).padStart(2, "0");

            updateNavigation(sectionId);
            isAnimating = false;

            if (window.location.hash !== `#${sectionId}`) {
                history.replaceState(null, "", `#${sectionId}`);
            }

            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 260);
    }

    function goToSection(sectionId) {
        const index = sectionNames.indexOf(sectionId);
        if (index === -1 || index === activeIndex) return;

        showSlide(index, index > activeIndex ? "next" : "prev");
    }

    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            goToSection(button.dataset.section);
        });
    });

    goButtons.forEach(button => {
        button.addEventListener("click", () => {
            goToSection(button.dataset.go);
        });
    });

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const index = Number(dot.dataset.index);
            showSlide(index, index > activeIndex ? "next" : "prev");
        });
    });

    previousButton.addEventListener("click", () => {
        showSlide((activeIndex - 1 + slides.length) % slides.length, "prev");
    });

    nextButton.addEventListener("click", () => {
        showSlide((activeIndex + 1) % slides.length, "next");
    });

    document.addEventListener("keydown", event => {
        const tag = event.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

        if (event.key === "ArrowRight") {
            showSlide((activeIndex + 1) % slides.length, "next");
        }

        if (event.key === "ArrowLeft") {
            showSlide((activeIndex - 1 + slides.length) % slides.length, "prev");
        }
    });

    deck.addEventListener("touchstart", event => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    deck.addEventListener("touchend", event => {
        const touchEndX = event.changedTouches[0].screenX;
        const difference = touchEndX - touchStartX;

        if (Math.abs(difference) < 65) return;

        if (difference < 0) {
            showSlide((activeIndex + 1) % slides.length, "next");
        } else {
            showSlide((activeIndex - 1 + slides.length) % slides.length, "prev");
        }
    }, { passive: true });

    // Open the section requested by a URL hash, if it exists.
    const initialSection = window.location.hash.replace("#", "");
    const initialIndex = sectionNames.indexOf(initialSection);

    if (initialIndex > 0) {
        slides.forEach(slide => slide.classList.remove("active"));
        activeIndex = initialIndex;
        slides[activeIndex].classList.add("active");

        currentPage.textContent = slides[activeIndex].dataset.title;
        sectionHeading.innerHTML = headings[initialSection];
        slideCurrent.textContent = String(activeIndex + 1).padStart(2, "0");
        updateNavigation(initialSection);
    }

    // Keep the copyright year current.
    document.getElementById("year").textContent = new Date().getFullYear();
});
