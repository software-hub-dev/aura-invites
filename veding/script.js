document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Preloader Handling
    const preloader = document.getElementById("preloader");
    window.addEventListener("load", () => {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.6,
            onComplete: () => preloader.style.display = "none"
        });
        
        // Trigger GSAP Entrance Animations for Hero Section
        initHeroAnimations();
    });

    // In case window load triggered before script mount evaluation
    setTimeout(() => {
        if(preloader.style.display !== "none") {
            preloader.style.opacity = "0";
            setTimeout(() => preloader.style.display = "none", 500);
            initHeroAnimations();
        }
    }, 2500);

    // 2. GSAP Entrance Animations
    function initHeroAnimations() {
        gsap.from("#hero-bg", {
            scale: 1.2,
            duration: 2,
            ease: "power2.out"
        });
        gsap.from("#hero-text h1", {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "power3.out"
        });
        gsap.from("#hero-text p, #hero-text span", {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.6,
            ease: "power3.out"
        });
        gsap.from("#hero-text div", {
            y: 20,
            opacity: 0,
            duration: 1,
            delay: 0.9,
            ease: "power3.out"
        });
    }

    // 3. Sticky Navbar Configuration & Scroll States
    const navbar = document.getElementById("navbar");
    const backToTop = document.getElementById("back-to-top");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("py-2", "shadow-xl", "bg-white/95", "dark:bg-stone-950/95");
            navbar.classList.remove("py-4", "bg-white/70", "dark:bg-stone-950/70");
        } else {
            navbar.classList.add("py-4", "bg-white/70", "dark:bg-stone-950/70");
            navbar.classList.remove("py-2", "shadow-xl", "bg-white/95", "dark:bg-stone-950/95");
        }

        // Back to top opacity toggle state logic
        if (window.scrollY > 500) {
            backToTop.classList.remove("opacity-0", "translate-y-10", "pointer-events-none");
            backToTop.classList.add("opacity-100", "translate-y-0");
        } else {
            backToTop.classList.add("opacity-0", "translate-y-10", "pointer-events-none");
            backToTop.classList.remove("opacity-100", "translate-y-0");
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 4. Dark/Light Mode Architecture Mechanics
    const themeToggleBtn = document.getElementById("theme-toggle");
    
    // Evaluate explicit storage preferences or system defaults
    if (localStorage.getItem("theme") === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }

    themeToggleBtn.addEventListener("click", () => {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    });

    // 5. Mobile Drawer Menu Functions
    const menuBtn = document.getElementById("menu-btn");
    const closeMenu = document.getElementById("close-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    function openMobileDrawer() {
        mobileMenu.classList.remove("translate-x-full");
    }
    function closeMobileDrawer() {
        mobileMenu.classList.add("translate-x-full");
    }

    menuBtn.addEventListener("click", openMobileDrawer);
    closeMenu.addEventListener("click", closeMobileDrawer);
    mobileLinks.forEach(link => link.addEventListener("click", closeMobileDrawer));

    // 6. AOS (Animate on Scroll) Engine Trigger Setup
    AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        mirror: false
    });

    // 7. Swiper Carousel Integration Layout
    new Swiper(".testimonials-slider", {
        loop: true,
        spaceBetween: 30,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    // 8. Gallery Portfolio Filter System
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove previous focus color state indicators
            filterButtons.forEach(b => b.classList.remove("bg-amber-500", "text-white"));
            btn.classList.add("bg-amber-500", "text-white");

            const filterValue = btn.getAttribute("data-filter");

            galleryItems.forEach(item => {
                const categories = item.getAttribute("data-category").split(" ");
                if (filterValue === "all" || categories.includes(filterValue)) {
                    item.classList.remove("hidden-item");
                } else {
                    item.classList.add("hidden-item");
                }
            });
            // Refresh AOS bounds since positions shifted
            AOS.refresh();
        });
    });

    // 9. Lightbox Modal Preview System Engine
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");
    const triggers = document.querySelectorAll(".lightbox-trigger");

    triggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const imgSrc = trigger.getAttribute("data-src");
            lightboxImg.setAttribute("src", imgSrc);
            lightbox.classList.remove("hidden");
            lightbox.classList.add("flex");
        });
    });

    lightboxClose.addEventListener("click", () => {
        lightbox.classList.add("hidden");
        lightbox.classList.remove("flex");
    });
    lightbox.addEventListener("click", (e) => {
        if(e.target === lightbox) {
            lightbox.classList.add("hidden");
            lightbox.classList.remove("flex");
        }
    });

    // 10. FAQ Accordion Open Close Logic Engine
    const faqToggles = document.querySelectorAll(".faq-toggle");

    faqToggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const container = toggle.nextElementSibling;
            const icon = toggle.querySelector("i");

            if (container.style.maxHeight && container.style.maxHeight !== "0px") {
                container.style.maxHeight = "0px";
                icon.classList.remove("rotate-180");
            } else {
                // Close other open tabs first for clean presentation UI
                document.querySelectorAll(".faq-content").forEach(c => c.style.maxHeight = "0px");
                document.querySelectorAll(".faq-toggle i").forEach(i => i.classList.remove("rotate-180"));
                
                container.style.maxHeight = container.scrollHeight + "px";
                icon.classList.add("rotate-180");
            }
        });
    });

    // 11. Live Interactive Order Price Configuration Calculator 
    const eventType = document.getElementById("eventType");
    const cardFormat = document.getElementById("cardFormat");
    const orderQuantity = document.getElementById("orderQuantity");
    
    const summaryPackageText = document.getElementById("summaryPackageText");
    const summaryBasePrice = document.getElementById("summaryBasePrice");
    const summaryTotal = document.getElementById("summaryTotal");

    function updateLiveCalculationPrice() {
        let baseCost = 149;
        let selectionName = "Digital Smart E-Invite Base";

        if(cardFormat.value === "printed") {
            baseCost = 499;
            selectionName = "Luxury Premium Printed Base Pack (100 Qty)";
        } else if(cardFormat.value === "both") {
            baseCost = 599;
            selectionName = "Hybrid Combo Pack Premium Base";
        }

        const quantity = parseInt(orderQuantity.value) || 1;
        let calculatedGrandTotal = baseCost;

        // If client increases printed quantity above standard baseline multiplier sets
        if(cardFormat.value !== "digital" && quantity > 100) {
            const extraCount = quantity - 100;
            calculatedGrandTotal += (extraCount * 4); // add 4 dollars per extra premium card printed
        } else if(cardFormat.value === "digital" && quantity > 1) {
            calculatedGrandTotal += (quantity - 1) * 25; // add 25 dollars for additional license distributions
        }

        summaryPackageText.textContent = selectionName;
        summaryBasePrice.textContent = `$${baseCost}`;
        summaryTotal.textContent = `$${calculatedGrandTotal}`;
    }

    cardFormat.addEventListener("change", updateLiveCalculationPrice);
    orderQuantity.addEventListener("input", updateLiveCalculationPrice);

    // Initial load sync
    updateLiveCalculationPrice();

    // 12. Animated Counters Engine Logic
    const counters = document.querySelectorAll(".counter");
    const counterSpeed = 150; 

    const startCounterAnimation = (counter) => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const increment = Math.ceil(target / counterSpeed);

        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.textContent = count.toLocaleString() + (target > 100 ? "+" : "");
                setTimeout(updateCount, 15);
            } else {
                counter.textContent = target.toLocaleString() + (target > 100 ? "+" : "");
            }
        };
        updateCount();
    };

    // Intersection Observer to run counters only when scrolled into view viewport
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                startCounterAnimation(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // 13. Form Submission Interceptions Prevent Reload Visual Feedback
    document.getElementById("orderForm").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you! Your luxury configuration specifications has been saved. Our structural layout concierge desk will approach you via email within 2 hours.");
    });

    document.getElementById("contactForm").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Your custom project message has been dispatched successfully to our design workshop studio.");
    });
});