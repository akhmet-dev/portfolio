// JavaScript for akhmet.dev - Interactive features

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Mobile Menu Hamburger Toggle
    const hamburger = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".mobile-nav");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    if (hamburger && mobileNav) {
        hamburger.addEventListener("click", () => {
            mobileNav.classList.toggle("open");
            const icon = hamburger.querySelector("i");
            if (mobileNav.classList.contains("open")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars";
            }
        });

        // Close mobile nav when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileNav.classList.remove("open");
                hamburger.querySelector("i").className = "fa-solid fa-bars";
            });
        });
    }

    // 2. Interactive Skills Tab Switcher
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
    const card = document.getElementById("skillCard");

    if (tabButtons && cardTitle && cardDesc && cardCount) {
        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                // Remove active class from all tabs
                tabButtons.forEach(btn => btn.classList.remove("active"));
                // Add active class to clicked tab
                button.classList.add("active");

                // Get selected skill identifier
                const skillKey = button.getAttribute("data-skill");
                const data = skillsData[skillKey];

                if (data) {
                    // Add fade out animation effect
                    card.style.opacity = "0";
                    card.style.transform = "translateY(5px)";
                    
                    setTimeout(() => {
                        // Update text
                        cardTitle.textContent = data.title;
                        cardDesc.textContent = data.desc;
                        cardCount.textContent = data.count;
                        
                        // Fade back in
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 200);
                }
            });
        });
        
        // CSS transitions for smooth card change
        card.style.transition = "opacity 0.2s ease, transform 0.2s ease";
    }

    // 3. Projects Filter Functionality
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterButtons && projectCards) {
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                // Remove active class from buttons
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
                        setTimeout(() => {
                            card.style.display = "none";
                        }, 250);
                    }
                });
            });
        });
        
        // Ensure smooth transitions for cards
        projectCards.forEach(card => {
            card.style.transition = "opacity 0.25s ease, transform 0.25s ease, border-color 0.3s ease";
        });
    }

    // 4. Copy Email to Clipboard
    const copyEmailBtn = document.getElementById("copyEmailBtn");
    const emailText = document.getElementById("emailText");

    if (copyEmailBtn && emailText) {
        copyEmailBtn.addEventListener("click", () => {
            const email = emailText.textContent;
            navigator.clipboard.writeText(email).then(() => {
                // Change button text temporarily
                const originalText = copyEmailBtn.textContent;
                copyEmailBtn.textContent = "Көшірілді! ✅";
                copyEmailBtn.style.backgroundColor = "#006bff";
                copyEmailBtn.style.color = "#fff";
                
                setTimeout(() => {
                    copyEmailBtn.textContent = originalText;
                    copyEmailBtn.style.backgroundColor = "#fff";
                    copyEmailBtn.style.color = "#000";
                }, 2000);
            }).catch(err => {
                console.error("Поштаны көшіру мүмкін болмады: ", err);
            });
        });
    }
    
    // 5. Active Link Highlight on Scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    // 6. Resume Modal Functionality
    const resumeModal = document.getElementById("resumeModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const openModalBtnMobile = document.getElementById("openModalBtnMobile");
    const closeModalBtn = document.getElementById("closeModalBtn");

    const openModal = () => {
        if (resumeModal) {
            resumeModal.classList.add("open");
            document.body.style.overflow = "hidden"; // Disable background scrolling
        }
    };

    const closeModal = () => {
        if (resumeModal) {
            resumeModal.classList.remove("open");
            document.body.style.overflow = ""; // Enable background scrolling
        }
    };

    if (openModalBtn) {
        openModalBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal();
        });
    }
    
    if (openModalBtnMobile) {
        openModalBtnMobile.addEventListener("click", (e) => {
            e.preventDefault();
            openModal();
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeModal);
    }

    // Close modal when clicking outside the card (on the blurred background overlay)
    if (resumeModal) {
        resumeModal.addEventListener("click", (e) => {
            if (e.target === resumeModal) {
                closeModal();
            }
        });
    }
});
