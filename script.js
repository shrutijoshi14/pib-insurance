const toggle = document.getElementById('menuToggle');
const menu = document.getElementById('mainMenu');
const overlay = document.getElementById('navOverlay');
const closeBtn = document.getElementById('closeBtn');
const menuIcon = document.getElementById('menuIcon');

function openMenu() {
    menu.classList.add('show');
    overlay.classList.add('show');
    toggle.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    menu.classList.remove('show');
    overlay.classList.remove('show');
    toggle.classList.remove('open');
    document.body.style.overflow = '';
}

if (toggle) toggle.addEventListener('click', () => {
    menu.classList.contains('show') ? closeMenu() : openMenu();
});

if (closeBtn) closeBtn.addEventListener('click', closeMenu);
if (overlay) overlay.addEventListener('click', closeMenu);

// Handle Mobile Menu Interaction
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth < 992) {
            const parent = link.parentElement;
            const hasSubmenu = parent.classList.contains('dropdown');

            if (hasSubmenu) {
                // It's a dropdown parent - Toggle Submenu
                e.preventDefault();
                e.stopPropagation();

                const isActive = parent.classList.contains('active');

                // Close other open dropdowns at the same level
                const siblings = parent.parentElement.querySelectorAll(':scope > .dropdown.active');
                siblings.forEach(s => {
                    if (s !== parent) s.classList.remove('active');
                });

                parent.classList.toggle('active', !isActive);

                // Update caret rotation
                const caret = link.querySelector('.caret');
                if (caret) caret.style.transform = !isActive ? 'rotate(180deg)' : 'rotate(0deg)';
            } else {
                // It's a final link - Navigate and Close
                // We don't prevent default here so the link actually works
                closeMenu();
            }
        }
    });
});

// Close on resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) closeMenu();
});

// ESC key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
});

// Insurance Section Tabs
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
    });
});

// Insight Card - Make whole card clickable
document.querySelectorAll('.insight-card').forEach(card => {
    card.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' || e.target.closest('a')) return;
        const mainLink = this.querySelector('.read-more');
        if (mainLink) mainLink.click();
    });
});

// Show success message if coming back from form
const successMsg = document.getElementById("successMessage");
if (window.location.search.includes("submitted=true") && successMsg) {
    successMsg.style.display = "block";
}

// INDUSTRIES MODAL LOGIC
const industryData = {
    it: {
        title: "IT companies",
        icon: '<i class="fa-solid fa-laptop-code"></i>',
        desc: "We provide comprehensive insurance solutions for IT companies, covering everything from professional indemnity and cyber liability to protection for high-value hardware and data infrastructure. Our policies are designed to mitigate the unique risks of the tech industry, ensuring business continuity in a rapidly evolving digital landscape."
    },
    logistics: {
        title: "Logistics",
        icon: '<i class="fa-solid fa-truck-fast"></i>',
        desc: "For the logistics and transport sector, we offer robust protection covering cargo in transit, fleet management risks, warehouse liabilities, and supply chain disruptions. Whether by road, rail, air, or sea, our insurance plans safeguard your operations against unforeseen damages and losses."
    },
    law: {
        title: "Law firms",
        icon: '<i class="fa-solid fa-scale-balanced"></i>',
        desc: "Law firms require specialized professional indemnity insurance to protect against claims of negligence or errors. We also offer coverage for office assets, partner liabilities, and data protection, allowing legal professionals to focus on their practice with full peace of mind."
    },
    realestate: {
        title: "Real Estate",
        icon: '<i class="fa-solid fa-city"></i>',
        desc: "Our real estate insurance solutions cover developers, property managers, and owners. We protect against construction risks, property damage, legal liabilities arising from premises, and natural disasters, ensuring your long-term investments remain secure."
    },
    retail: {
        title: "Retail",
        icon: '<i class="fa-solid fa-cart-shopping"></i>',
        desc: "The retail sector faces risks like inventory loss, fire damage, and public liability. Our customized insurance packages for retailers provide protection for stock, storefronts, and business interruption, helping you bounce back quickly from any setback."
    },
    manufacturing: {
        title: "Manufacturing",
        icon: '<i class="fa-solid fa-industry"></i>',
        desc: "Manufacturing units deal with heavy machinery, industrial hazards, and product liabilities. We offer tailored plans covering plant and machinery breakdown, workmen's compensation, and environmental risks, ensuring smooth and safe industrial operations."
    },
    mining: {
        title: "Mining",
        icon: '<i class="fa-solid fa-helmet-safety"></i>',
        desc: "Mining is a high-risk industry that demands specialized insurance. We provide coverage for equipment breakdown, employee safety, environmental damage, and legal liabilities associated with mineral extraction and processing in challenging terrains."
    },
    infrastructure: {
        title: "Infrastructure",
        icon: '<i class="fa-solid fa-bridge-water"></i>',
        desc: "For large-scale infrastructure projects like bridges, roads, and dams, we provide Contractor All Risk (CAR) and Erection All Risk (EAR) policies. We cover material damage and third-party liabilities, supporting the builders of the nation."
    },
    energy: {
        title: "Energy",
        icon: '<i class="fa-solid fa-bolt-lightning"></i>',
        desc: "The energy sector, including renewable and traditional power plants, requires protection against technical failures and natural perils. We offer specialized risk management solutions for solar, wind, and conventional energy projects."
    },
    hospitality: {
        title: "Hospitality",
        icon: '<i class="fa-solid fa-hotel"></i>',
        desc: "Hotels and restaurants face unique challenges, from guest safety to property maintenance. Our hospitality insurance covers public liability, fire and theft, food spoilage, and business interruption, ensuring your guests always have a safe and pleasant stay."
    },
    food: {
        title: "Food & Beverage",
        icon: '<i class="fa-solid fa-utensils"></i>',
        desc: "In the F&B industry, quality control and supply chain integrity are paramount. We offer coverage for product contamination, spoilage, and operational liabilities, protecting your brand reputation and financial health."
    },
    aviation: {
        title: "Aviation & Space",
        icon: '<i class="fa-solid fa-plane-up"></i>',
        desc: "Aviation and space industries involve high-value assets and extreme risks. Our specialized aviation insurance covers aircraft damage, passenger liabilities, and airport operations, meeting the rigorous safety and financial standards of the aerospace sector."
    }
};

const modal = document.getElementById('industryModal');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.industry-card').forEach(card => {
    card.addEventListener('click', () => {
        const type = card.dataset.industry;
        const data = industryData[type];
        if (data) {
            modalIcon.innerHTML = data.icon;
            modalTitle.innerText = data.title;
            modalDesc.innerText = data.desc;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

if (modalClose) modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

if (modal) modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Auto-active Navbar Links based on URL
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentQuery = window.location.search;
    const fullCurrentUrl = currentPath + currentQuery;

    document.querySelectorAll('.navbar .menu a').forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Match exact URL including parameters
        if (linkHref === fullCurrentUrl) {
            link.classList.add('active');
            
            // If it's in a submenu, make the parent dropdown active too
            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                parentDropdown.classList.add('active');
            }
        }
        // Match base path if no specific parameters are set or matched
        else if (linkHref && linkHref.startsWith(currentPath) && currentPath !== 'index.html') {
             // Avoid double active if parameter version exists
             const siblings = link.closest('ul').querySelectorAll('a');
             let hasExactMatch = false;
             siblings.forEach(s => {
                 if(s.getAttribute('href') === fullCurrentUrl) hasExactMatch = true;
             });
             
             if(!hasExactMatch) {
                 link.classList.add('active');
             }
        }
    });
});