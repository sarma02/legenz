// DOM Elements
const mobileMenu = document.getElementById('mobile-menu');
const hamburgerBtn = document.getElementById('hamburger-btn');
const nav = document.querySelector('nav');
const counters = document.querySelectorAll('.count-up');
const revealElements = document.querySelectorAll('.reveal');
const contactForm = document.getElementById('contact-form');

// Mobile Menu Toggle
function toggleMenu() {
    document.body.classList.toggle('mobile-menu-open');
}

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMenu);
}

// Sticky Navbar Effect and ScrollSpy
window.addEventListener('scroll', () => {
    // Sticky Navbar
    if (window.scrollY > 50) {
        nav.classList.add('navbar-scrolled');
    } else {
        nav.classList.remove('navbar-scrolled');
    }

    // ScrollSpy
    const sections = ['home', 'about', 'services', 'blog', 'contact'];
    let current = '';

    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            const sectionTop = element.offsetTop;
            if (scrollY >= (sectionTop - 150)) { // Offset for trigger point
                current = section;
            }
        }
    });

    const navLinks = document.querySelectorAll('.nav-links-desktop a');
    navLinks.forEach(link => {
        link.classList.remove('text-brand-primary');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('text-brand-primary');
        }
    });
});

// Scroll Reveal Animation
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => revealObserver.observe(el));

// Number Counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = +entry.target.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    entry.target.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    entry.target.innerText = target;
                }
            };

            updateCounter();
            entry.target.classList.add('counted');
        }
    });
}, {
    threshold: 0.5
});

counters.forEach(counter => counterObserver.observe(counter));

// Testimonials Slider
const testimonials = [
    {
        text: "Spent RS.500 on Ads & generated ₹5,670 in Revenue in Day 1 itself. Establishing a profitable ad spend from the get-go.",
        name: "Laptop Sales Business",
        role: "Business Owner",
        img: "https://i.pravatar.cc/150?img=12",
        stars: 5
    },
    {
        text: "Generated 100+ Leads in just 14 Days, Building a strong Sales Pipeline. The quality of leads has been exceptional.",
        name: "Real Estate Client",
        role: "Managing Director",
        img: "https://i.pravatar.cc/150?img=33",
        stars: 5
    },
    {
        text: "Your expertise doubled our lead flow in just three months.",
        name: "Prema",
        role: "Tech Startup CEO",
        img: "https://i.pravatar.cc/150?img=5",
        stars: 5
    },
    {
        text: "Exceptional data-driven approach that continuously delivered results.",
        name: "Murali",
        role: "Marketing Director",
        img: "https://i.pravatar.cc/150?img=11",
        stars: 5
    },
    {
        text: "The Meta Ads campaigns transformed our demo bookings + pipeline quality.",
        name: "Kumar",
        role: "SaaS Growth Manager",
        img: "https://i.pravatar.cc/150?img=59",
        stars: 5
    }
];

let currentTestimonial = 0;
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
const testimonialContainer = document.getElementById('testimonial-container');
const testimonialDots = document.querySelectorAll('.flex.justify-center.gap-2 div');

function updateTestimonial(index) {
    const data = testimonials[index];
    const pText = testimonialContainer.querySelector('p.italic');
    const hName = testimonialContainer.querySelector('h4');
    const pRole = testimonialContainer.querySelector('.text-left p');
    const imgObj = testimonialContainer.querySelector('img');

    testimonialContainer.classList.add('opacity-50');

    if (testimonialDots.length) {
        testimonialDots.forEach((dot, idx) => {
            if (idx === index) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-brand-primary');
            } else {
                dot.classList.add('bg-gray-300');
                dot.classList.remove('bg-brand-primary');
            }
        });
    }

    setTimeout(() => {
        if (pText) pText.innerText = `"${data.text}"`;
        if (hName) hName.innerText = data.name;
        if (pRole) pRole.innerText = data.role;
        if (imgObj) imgObj.src = data.img;

        testimonialContainer.classList.remove('opacity-50');
    }, 300);
}

if (prevBtn && nextBtn && testimonialContainer) {
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonial(currentTestimonial);
    });

    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial(currentTestimonial);
    });
}

if (testimonialDots.length > 0) {
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            updateTestimonial(currentTestimonial);
        });
    });
}

// Contact Form Handling
if (contactForm) {
    const handleFormSubmit = (e) => {
        if (e) e.preventDefault();

        const btn = contactForm.querySelector('button');
        if (!btn) return;

        const originalText = btn.innerHTML;

        // Loading state
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        btn.classList.add('opacity-75', 'cursor-not-allowed');

        // Simulate API call
        setTimeout(() => {
            // Success state
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.classList.remove('btn-gradient', 'opacity-75', 'cursor-not-allowed');
            btn.classList.add('bg-green-500', 'text-white');

            contactForm.reset();

            // Reset button
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.add('btn-gradient');
                btn.classList.remove('bg-green-500', 'text-white');
                btn.disabled = false;
            }, 3000);
        }, 1500);
    };

    contactForm.addEventListener('submit', handleFormSubmit);

    // Also bind to click just in case
    const submitBtn = contactForm.querySelector('button');
    if (submitBtn) {
        submitBtn.addEventListener('click', handleFormSubmit);
    }
}

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.remove('opacity-0', 'invisible');
        } else {
            scrollTopBtn.classList.add('opacity-0', 'invisible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Dynamic Year Update
document.addEventListener('DOMContentLoaded', () => {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
});

// Search Functionality
const searchBtn = document.getElementById('search-btn');
const searchModal = document.getElementById('search-modal');
const closeSearch = document.getElementById('close-search');
const searchInput = document.getElementById('search-input');
const searchResultsContainer = document.getElementById('search-results-container');
const searchResults = document.getElementById('search-results');
const searchPlaceholder = document.getElementById('search-placeholder');
const searchPanel = document.getElementById('search-panel');

function openSearch() {
    if (searchModal) {
        searchModal.classList.remove('hidden');
        // Small delay for transition
        setTimeout(() => {
            searchModal.classList.remove('opacity-0');
            searchPanel.classList.remove('scale-95');
            searchInput.focus();
        }, 10);
    }
}

function closeSearchModal() {
    if (searchModal) {
        searchModal.classList.add('opacity-0');
        searchPanel.classList.add('scale-95');
        setTimeout(() => {
            searchModal.classList.add('hidden');
            searchInput.value = '';
            searchResultsContainer.classList.add('hidden');
            searchPlaceholder.classList.remove('hidden');
        }, 300);
    }
}

if (searchBtn) searchBtn.addEventListener('click', openSearch);
if (closeSearch) closeSearch.addEventListener('click', closeSearchModal);

// Close on click outside
if (searchModal) {
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) closeSearchModal();
    });
}

// Search Logic
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length < 2) {
            searchResultsContainer.classList.add('hidden');
            searchPlaceholder.classList.remove('hidden');
            return;
        }

        searchPlaceholder.classList.add('hidden');
        searchResultsContainer.classList.remove('hidden');
        searchResults.innerHTML = '';

        // Search in content
        const searchableElements = document.querySelectorAll('h1, h2, h3, h4, p, .scroller-item');
        let matches = [];

        searchableElements.forEach((el, index) => {
            if (el.innerText.toLowerCase().includes(query) && el.innerText.trim().length > 0) {
                // Avoid redundant parent/child matches if possible, but for simple site, just add all
                // Get context snippet
                const text = el.innerText;
                const matchIndex = text.toLowerCase().indexOf(query);
                const snippet = text.substring(Math.max(0, matchIndex - 20), Math.min(text.length, matchIndex + query.length + 20));

                matches.push({
                    element: el,
                    text: text,
                    snippet: snippet
                });
            }
        });

        if (matches.length === 0) {
            searchResults.innerHTML = '<div class="text-center text-gray-500 py-4">No results found</div>';
        } else {
            // Limit to top 10 results
            matches.slice(0, 10).forEach(match => {
                const resultItem = document.createElement('div');
                resultItem.className = 'p-3 bg-white rounded-lg hover:bg-blue-50 cursor-pointer transition border border-gray-100 group';
                // Determine friendly label
                let label = 'Content';
                const tag = match.element.tagName;
                if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(tag)) {
                    label = 'Section Heading';
                } else if (match.element.classList.contains('scroller-item')) {
                    label = 'Topic';
                }

                resultItem.innerHTML = `
                    <div class="font-medium text-gray-800 text-sm truncate group-hover:text-brand-primary">Found in: "${match.snippet}..."</div>
                    <div class="text-xs text-gray-400 mt-1 uppercase tracking-wide">${label}</div>
                `;

                resultItem.addEventListener('click', () => {
                    closeSearchModal();
                    match.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Highlight effect
                    match.element.classList.add('bg-yellow-100', 'transition', 'duration-500');
                    setTimeout(() => match.element.classList.remove('bg-yellow-100'), 2000);
                });

                searchResults.appendChild(resultItem);
            });
        }
    });
}

// Loader Logic
document.addEventListener('DOMContentLoaded', () => {
    // Simulate progress while simulating load or waiting for actual load
    const loaderProgress = document.getElementById('loader-progress');
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 90) {
            clearInterval(interval);
        } else {
            width += Math.random() * 10; // Random increment
            if (width > 90) width = 90;
            if (loaderProgress) loaderProgress.style.width = width + '%';
        }
    }, 100);
});

window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const loaderProgress = document.getElementById('loader-progress');

    // Complete progress bar
    if (loaderProgress) {
        loaderProgress.style.width = '100%';
    }

    if (loader) {
        // Delay slightly to let user see 100%
        setTimeout(() => {
            // Fade out
            loader.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';

            // Remove from DOM
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 500); // Wait 500ms at 100%
    }
});

// Scroll Progress Bar Logic
window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('scroll-progress-bar');
    if (progressBar) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
});
