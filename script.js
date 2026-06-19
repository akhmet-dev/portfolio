// JavaScript for akhmet.dev - Interactive features

document.addEventListener("DOMContentLoaded", () => {
    
    // ── TOAST HELPER ──────────────────────────────────────────────
    const toastEl = document.getElementById("toastNotification");
    const toastMsg = document.getElementById("toastMessage");
    let toastTimer = null;

    function showToast(message, duration = 3000) {
        if (!toastEl || !toastMsg) return;
        toastMsg.textContent = message;
        toastEl.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toastEl.classList.remove("show");
        }, duration);
    }

    // 1. Mobile Menu Hamburger Toggle ─────────────────────────────
    const hamburger = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".mobile-nav");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    if (hamburger && mobileNav) {
        hamburger.addEventListener("click", () => {
            mobileNav.classList.toggle("open");
            const icon = hamburger.querySelector("i");
            icon.className = mobileNav.classList.contains("open")
                ? "fa-solid fa-xmark"
                : "fa-solid fa-bars";
        });

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileNav.classList.remove("open");
                hamburger.querySelector("i").className = "fa-solid fa-bars";
            });
        });
    }

    // 2. Skills Tab Switcher ───────────────────────────────────────
    const skillsData = {
        "html-css": {
            title: "HTML & CSS",
            desc: "Веб-әзірлеудің ең негізгі базалық деңгейі (оқу және қарапайым құрылымдар құру).",
            count: "1"
        },
        "esp32": {
            title: "Hardware (ESP32)",
            desc: "Микроконтроллерлермен жұмыс, сенсорлар, сымсыз желілер (Wi-Fi, Bluetooth) және IoT жобаларын құру.",
            count: "1"
        },
        "git-deploy": {
            title: "Git & Deployment",
            desc: "Нұсқаларды басқару жүйесімен (Git) жұмыс және дайын сайттарды Vercel, Netlify немесе GitHub Pages-ке орналастыру (deployment).",
            count: "2"
        },
        "python-js": {
            title: "Python & JS",
            desc: "Бағдарламалау тілдерінің негіздерін меңгеру, шағын сценарийлер (scripts), интерактивтілік және алгоритмдік есептер шығару.",
            count: "1"
        }
    };

    const tabButtons = document.querySelectorAll(".skill-tab-btn");
    const cardTitle = document.getElementById("skillCardTitle");
    const cardDesc = document.getElementById("skillCardDesc");
    const cardCount = document.getElementById("skillCardCount");
    const skillCard = document.getElementById("skillCard");

    if (tabButtons && cardTitle && cardDesc && cardCount && skillCard) {
        skillCard.style.transition = "opacity 0.2s ease, transform 0.2s ease";

        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                tabButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                const data = skillsData[button.getAttribute("data-skill")];
                if (data) {
                    skillCard.style.opacity = "0";
                    skillCard.style.transform = "translateY(5px)";
                    setTimeout(() => {
                        cardTitle.textContent = data.title;
                        cardDesc.textContent = data.desc;
                        cardCount.textContent = data.count;
                        skillCard.style.opacity = "1";
                        skillCard.style.transform = "translateY(0)";
                    }, 200);
                }
            });
        });
    }

    // 3. Projects Filter ──────────────────────────────────────────
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterButtons && projectCards) {
        projectCards.forEach(card => {
            card.style.transition = "opacity 0.25s ease, transform 0.25s ease";
        });

        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                const filterValue = button.getAttribute("data-filter");

                projectCards.forEach(card => {
                    const category = card.getAttribute("data-category");
                    if (filterValue === "all" || category === filterValue) {
                        card.style.display = "flex";
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "scale(1)";
                        }, 50);
                    } else {
                        card.style.opacity = "0";
                        card.style.transform = "scale(0.95)";
                        setTimeout(() => { card.style.display = "none"; }, 250);
                    }
                });
            });
        });
    }

    // 4. Copy Email ───────────────────────────────────────────────
    const copyEmailBtn = document.getElementById("copyEmailBtn");
    const emailText = document.getElementById("emailText");

    if (copyEmailBtn && emailText) {
        copyEmailBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(emailText.textContent).then(() => {
                const orig = copyEmailBtn.textContent;
                copyEmailBtn.textContent = "Көшірілді! ✅";
                copyEmailBtn.style.backgroundColor = "#006bff";
                copyEmailBtn.style.color = "#fff";
                setTimeout(() => {
                    copyEmailBtn.textContent = orig;
                    copyEmailBtn.style.backgroundColor = "";
                    copyEmailBtn.style.color = "";
                }, 2000);
            }).catch(err => console.error("Поштаны көшіру мүмкін болмады:", err));
        });
    }

    // 5. Active Nav on Scroll ─────────────────────────────────────
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            if (pageYOffset >= section.offsetTop - 150) {
                current = section.getAttribute("id");
            }
        });
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // 6. Resume Modal ─────────────────────────────────────────────
    const resumeModal = document.getElementById("resumeModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const openModalBtnMobile = document.getElementById("openModalBtnMobile");
    const closeModalBtn = document.getElementById("closeModalBtn");

    const openModal = () => {
        if (!resumeModal) return;
        resumeModal.classList.add("open");
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        if (!resumeModal) return;
        resumeModal.classList.remove("open");
        document.body.style.overflow = "";
    };

    if (openModalBtn) {
        openModalBtn.addEventListener("click", e => { e.preventDefault(); openModal(); });
    }
    if (openModalBtnMobile) {
        openModalBtnMobile.addEventListener("click", e => {
            e.preventDefault();
            openModal();
            if (mobileNav) mobileNav.classList.remove("open");
            if (hamburger) hamburger.querySelector("i").className = "fa-solid fa-bars";
        });
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeModal);
    }
    if (resumeModal) {
        resumeModal.addEventListener("click", e => {
            if (e.target === resumeModal) closeModal();
        });
    }
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && resumeModal?.classList.contains("open")) closeModal();
    });

    // 7. Download CV Button — opens resume page with auto print ──
    const downloadCvBtn = document.getElementById("downloadCvBtn");
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener("click", () => {
            window.open("resume.html?print=1", "_blank");
        });
    }
});
