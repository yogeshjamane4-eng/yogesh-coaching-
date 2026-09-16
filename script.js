/* =========================================================
   YOGESH ACADEMY
   Main JavaScript
   Vanilla JavaScript only
========================================================= */


/* =========================================================
   1. ELEMENT SELECTORS
========================================================= */

const siteHeader = document.querySelector(".site-header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

const backToTop = document.getElementById("backToTop");

const revealElements = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");

const courseButtons = document.querySelectorAll(".course-details");

const courseModal = document.getElementById("courseModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalFeatures = document.getElementById("modalFeatures");
const modalApply = document.querySelector(".modal-apply");

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxIcon = document.getElementById("lightboxIcon");

const admissionForm = document.getElementById("admissionForm");
const formMessage = document.getElementById("formMessage");

const faqItems = document.querySelectorAll(".faq-item");


/* =========================================================
   2. MOBILE NAVIGATION
========================================================= */

function closeMobileMenu() {
    navMenu.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

function toggleMobileMenu() {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );
}

menuToggle.addEventListener("click", toggleMobileMenu);


/* Close mobile menu after navigation */

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        closeMobileMenu();
    });
});


/* Close mobile menu when clicking outside */

document.addEventListener("click", (event) => {

    const clickedInsideMenu =
        navMenu.contains(event.target);

    const clickedMenuButton =
        menuToggle.contains(event.target);

    if (
        navMenu.classList.contains("open") &&
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {
        closeMobileMenu();
    }
});


/* =========================================================
   3. STICKY NAVBAR + BACK TO TOP
========================================================= */

function handleScroll() {

    if (window.scrollY > 30) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }

    if (window.scrollY > 500) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }

}

window.addEventListener("scroll", handleScroll);

handleScroll();


/* Back to top */

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   4. ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("main section[id]");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.id;
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (target === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);


/* =========================================================
   5. SCROLL REVEAL ANIMATIONS
========================================================= */

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================================
   6. STATISTICS COUNTER ANIMATION
========================================================= */

let countersStarted = false;

function animateCounter(counter) {

    const target =
        Number(counter.dataset.target);

    const duration = 1600;

    const startTime = performance.now();

    function updateCounter(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);

        /*
         * Ease-out effect.
         * Starts quickly and slows down near the final value.
         */
        const easedProgress =
            1 - Math.pow(1 - progress, 3);

        const currentValue =
            Math.floor(target * easedProgress);

        counter.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }

    }

    requestAnimationFrame(updateCounter);
}


const counterSection =
    document.querySelector(".stats-grid");


if (counterSection) {

    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting &&
                        !countersStarted
                    ) {

                        countersStarted = true;

                        counters.forEach(animateCounter);

                        observer.disconnect();
                    }

                });

            },
            {
                threshold: 0.4
            }
        );

    counterObserver.observe(counterSection);
}


/* =========================================================
   7. COURSE DETAILS MODAL
========================================================= */

const courseData = {

    jee: {
        title: "JEE — Main & Advanced",
        description:
            "A structured fictional coaching program focused on building strong concepts and consistent problem-solving skills for engineering entrance preparation.",
        features: [
            "Physics, Chemistry and Mathematics preparation",
            "Chapter-wise concept sessions",
            "Regular practice assignments",
            "Mock examinations",
            "Performance analysis",
            "Revision and exam strategy"
        ]
    },

    neet: {
        title: "NEET — Medical Entrance",
        description:
            "A fictional medical entrance preparation program built around NCERT-focused learning, conceptual clarity and regular testing.",
        features: [
            "NCERT-oriented preparation",
            "Biology concept sessions",
            "Physics and Chemistry practice",
            "Chapter-wise tests",
            "Full-length mock examinations",
            "Performance tracking"
        ]
    },

    school: {
        title: "Class 11 & 12 — Science / Commerce",
        description:
            "Academic support designed to strengthen school-level concepts while helping students prepare systematically for board examinations.",
        features: [
            "Subject-focused classes",
            "Board examination preparation",
            "Concept revision",
            "Regular assessments",
            "Study material",
            "Career guidance"
        ]
    },

    foundation: {
        title: "Foundation — Class 8–10",
        description:
            "A fictional foundation program designed to develop strong academic fundamentals and problem-solving skills at an early stage.",
        features: [
            "Mathematics and Science fundamentals",
            "Concept-building sessions",
            "Problem-solving practice",
            "Regular foundation tests",
            "School academic support",
            "Doubt-solving sessions"
        ]
    }

};


function openCourseModal(courseKey) {

    const course = courseData[courseKey];

    if (!course) {
        return;
    }

    modalTitle.textContent = course.title;

    modalDescription.textContent =
        course.description;

    modalFeatures.innerHTML = "";

    course.features.forEach((feature) => {

        const listItem =
            document.createElement("li");

        listItem.textContent = feature;

        modalFeatures.appendChild(listItem);

    });

    courseModal.classList.add("active");

    courseModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add("modal-open");

    modalClose.focus();

}


function closeCourseModal() {

    courseModal.classList.remove("active");

    courseModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove("modal-open");

}


courseButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const courseKey =
            button.dataset.course;

        openCourseModal(courseKey);

    });

});


modalClose.addEventListener(
    "click",
    closeCourseModal
);


const modalOverlay =
    document.querySelector(".modal-overlay");

if (modalOverlay) {
    modalOverlay.addEventListener(
        "click",
        closeCourseModal
    );
}


/*
 * The modal's Apply Now button closes the modal
 * and sends the user to the admission form.
 */

modalApply.addEventListener("click", () => {

    closeCourseModal();

});


/* =========================================================
   8. GALLERY LIGHTBOX
========================================================= */


/*
 * Different gallery items get a matching emoji.
 * This keeps the gallery fully functional without
 * requiring external image files.
 */

const galleryIcons = {
    "Modern Classroom": "🏫",
    "Learning Library": "📚",
    "Science Laboratory": "🔬",
    "Study Session": "✏️",
    "Student Event": "🏆",
    "Campus Environment": "🌳"
};


function openLightbox(item) {

    const title =
        item.dataset.title || "Gallery Image";

    lightboxTitle.textContent = title;

    lightboxIcon.textContent =
        galleryIcons[title] || "🏫";

    lightbox.classList.add("active");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add("modal-open");

    lightboxClose.focus();

}


function closeLightbox() {

    lightbox.classList.remove("active");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove("modal-open");

}


galleryItems.forEach((item) => {

    item.addEventListener("click", () => {
        openLightbox(item);
    });

});


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


/* =========================================================
   9. ADMISSION FORM VALIDATION
========================================================= */

function setFieldError(
    field,
    message
) {

    const group =
        field.closest(".form-group");

    const error =
        group.querySelector(".form-error");

    group.classList.add("has-error");

    error.textContent = message;

}


function clearFieldError(field) {

    const group =
        field.closest(".form-group");

    const error =
        group.querySelector(".form-error");

    group.classList.remove("has-error");

    error.textContent = "";

}


function validateName(field, label) {

    const value =
        field.value.trim();

    if (value.length < 2) {

        setFieldError(
            field,
            `${label} must contain at least 2 characters.`
        );

        return false;
    }

    clearFieldError(field);

    return true;
}


function validateSelect(field, label) {

    if (!field.value.trim()) {

        setFieldError(
            field,
            `Please select ${label}.`
        );

        return false;
    }

    clearFieldError(field);

    return true;
}


function validatePhone(field) {

    const value =
        field.value.trim();

    const phonePattern =
        /^[6-9]\d{9}$/;

    if (!phonePattern.test(value)) {

        setFieldError(
            field,
            "Enter a valid 10-digit Indian mobile number."
        );

        return false;
    }

    clearFieldError(field);

    return true;
}


function validateEmail(field) {

    const value =
        field.value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {

        setFieldError(
            field,
            "Enter a valid email address."
        );

        return false;
    }

    clearFieldError(field);

    return true;
}


/*
 * Remove errors as the user edits fields.
 */

const formFields =
    admissionForm.querySelectorAll(
        "input, select, textarea"
    );


formFields.forEach((field) => {

    field.addEventListener("input", () => {
        clearFieldError(field);
    });

    field.addEventListener("change", () => {
        clearFieldError(field);
    });

});


/*
 * Allow only digits inside phone field.
 */

const phoneField =
    document.getElementById("phone");


phoneField.addEventListener("input", () => {

    phoneField.value =
        phoneField.value.replace(/\D/g, "");

});


/*
 * Main form submit handler.
 */

admissionForm.addEventListener(
    "submit",
    (event) => {

        /*
         * Prevent the browser from sending
         * anything to a server.
         */

        event.preventDefault();

        formMessage.className =
            "form-message";

        formMessage.textContent = "";

        const studentName =
            document.getElementById("studentName");

        const parentName =
            document.getElementById("parentName");

        const classSelect =
            document.getElementById("classSelect");

        const courseSelect =
            document.getElementById("courseSelect");

        const email =
            document.getElementById("email");


        const validStudent =
            validateName(
                studentName,
                "Student name"
            );

        const validParent =
            validateName(
                parentName,
                "Parent/Guardian name"
            );

        const validClass =
            validateSelect(
                classSelect,
                "a class"
            );

        const validCourse =
            validateSelect(
                courseSelect,
                "a course"
            );

        const validPhone =
            validatePhone(phoneField);

        const validEmail =
            validateEmail(email);


        const isValid =
            validStudent &&
            validParent &&
            validClass &&
            validCourse &&
            validPhone &&
            validEmail;


        if (!isValid) {

            formMessage.classList.add("error");

            formMessage.textContent =
                "Please correct the highlighted fields.";

            return;
        }


        /*
         * IMPORTANT:
         * No data is sent anywhere.
         * This is only a frontend demo.
         */

        formMessage.classList.add("success");

        formMessage.textContent =
            "Application submitted successfully — Demo Mode.";

        admissionForm.reset();

        formFields.forEach((field) => {
            clearFieldError(field);
        });

    }
);


/* =========================================================
   10. FAQ ACCORDION
========================================================= */

faqItems.forEach((item) => {

    const question =
        item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        const wasOpen =
            item.classList.contains("open");


        /*
         * Close all other FAQ items.
         */

        faqItems.forEach((otherItem) => {

            otherItem.classList.remove("open");

            const button =
                otherItem.querySelector(
                    ".faq-question"
                );

            button.setAttribute(
                "aria-expanded",
                "false"
            );

        });


        /*
         * Toggle the selected item.
         */

        if (!wasOpen) {

            item.classList.add("open");

            question.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    });

});


/* =========================================================
   11. KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        /*
         * Escape closes overlays.
         */

        if (event.key === "Escape") {

            if (courseModal.classList.contains("active")) {
                closeCourseModal();
            }

            if (lightbox.classList.contains("active")) {
                closeLightbox();
            }

            if (navMenu.classList.contains("open")) {
                closeMobileMenu();
            }

        }

    }
);


/* =========================================================
   12. INITIAL SETUP
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
         * Make sure the top navigation starts
         * in the correct state.
         */

        handleScroll();
        updateActiveNavigation();

    }
);