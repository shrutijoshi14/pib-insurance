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

// Insight Card - Handle Read More Toggle
document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const card = this.closest('.insight-card');
        const isExpanded = card.classList.contains('expanded');
        
        // Toggle this card
        card.classList.toggle('expanded');
        this.innerHTML = isExpanded ? 'Read More &rarr;' : 'Show Less &larr;';
    });
});

// Insight Card - Make whole card clickable for main action if exists
document.querySelectorAll('.insight-card').forEach(card => {
    card.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
        if (e.target.tagName === 'A' || e.target.closest('a')) return;
        
        // Default action: toggle the card or follow a link if we add one later
        const btn = this.querySelector('.read-more-btn');
        if (btn) btn.click();
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
        desc: `
            <div class="modal-inner-content">
                <h3>Information Technology (IT) Industry Insurance Solutions</h3>
                <p class="section-title">Industry Overview</p>
                <p>The Information Technology (IT) industry has become the backbone of modern economies, driving innovation, efficiency, and growth across all sectors. In India, IT and IT-enabled Services (ITeS) contribute significantly to GDP, exports, and employment, with major hubs like Bengaluru, Hyderabad, Pune, and Gurugram shaping the global digital economy. From software development and cloud computing to IT consulting and data analytics, technology firms form the core of digital transformation worldwide.</p>
                <p>However, the IT industry is also highly vulnerable to risks. Cyber-attacks, intellectual property disputes, professional liability claims, and business interruptions caused by system failures can severely impact both revenue and reputation. In today’s business environment, insurance is not just about compliance—it is a strategic safeguard that ensures business continuity, protects clients, and builds stakeholder confidence.</p>

                <div class="solutions-grid mt-4">
                    <h4>Our Insurance Solutions for the IT Sector</h4>
                    <p>At PIB Insurance Brokers Pvt. Ltd., we design comprehensive, technology-focused solutions tailored to IT businesses of all sizes:</p>
                    <ul class="modal-list">
                        <li><strong>Cyber Liability Insurance:</strong> Covers data breaches, ransomware, phishing, regulatory fines, and forensic investigation costs.</li>
                        <li><strong>Professional Indemnity / Errors & Omissions (E&O) Insurance:</strong> Protects against claims of negligence, service errors, or project failures.</li>
                        <li><strong>Directors & Officers (D&O) Liability Insurance:</strong> Shields company directors and senior executives from personal liability in case of lawsuits.</li>
                        <li><strong>Business Interruption Insurance:</strong> Compensates revenue loss when operations halt due to cyber-attacks, server breakdown, or disasters.</li>
                        <li><strong>Property & Fire Insurance:</strong> Protects office spaces, data centres, and IT equipment from fire, flood, and theft.</li>
                        <li><strong>Employee Benefits & Workmen Compensation:</strong> Covers workplace injuries, health benefits, and legal liabilities toward employees.</li>
                        <li><strong>Fidelity Guarantee Insurance:</strong> Protects against financial loss caused by employee fraud or dishonesty.</li>
                        <li><strong>Intellectual Property Insurance:</strong> Defends against IP infringement claims and legal costs.</li>
                        <li><strong>Group Health Insurance:</strong> Attracts and retains talent by providing medical coverage for employees and their families.</li>
                    </ul>
                </div>
            </div>
        `
    },
    logistics: {
        title: "Logistics",
        icon: '<i class="fa-solid fa-truck-fast"></i>',
        desc: `
            <div class="modal-inner-content">
                <h3>Logistics Industry Insurance Solutions</h3>
                <p class="section-title">Industry Overview</p>
                <p>The logistics sector is the backbone of India’s economy, connecting manufacturers, traders, retailers, and end consumers across domestic and international markets. With the boom in e-commerce, global supply chains, and just-in-time manufacturing, logistics companies have become crucial enablers of economic growth. According to industry reports, India’s logistics market is valued at over USD 250 billion and is projected to cross USD 380 billion by 2025, making it one of the fastest-growing sectors.</p>
                <p>However, this growth comes with high exposure to risks. Goods are constantly in transit, stored in warehouses, or moved across international borders—making them vulnerable to damage, theft, delays, and regulatory penalties. Fleet operators face road accidents, driver negligence, and third-party liability issues. Warehouses, on the other hand, are prone to fires, floods, and burglaries. Additionally, with digital adoption in logistics—IoT-enabled tracking, automated warehouses, and online booking threats are also rising.</p>
                <p>For SMEs and MSMEs in logistics, one uninsured incident can cause crippling financial losses. For example, a cargo theft worth a few lakhs or a warehouse fire can wipe out years of profit and damage customer trust. This makes insurance not just a compliance requirement but a business-critical safeguard that ensures continuity, stability, and reputation.</p>

                <div class="solutions-grid mt-4">
                    <h4>Our Insurance Solutions for the Logistics Sector</h4>
                    <p>At PIB Insurance Brokers Pvt. Ltd., we provide comprehensive insurance solutions customised for logistics players, including SMEs, MSMEs, and large-scale operators.</p>
                    <ul class="modal-list">
                        <li><strong>Marine Cargo Insurance (Domestic & International):</strong> Covers goods in transit against theft, damage, or loss.</li>
                        <li><strong>Fleet & Motor Liability Insurance:</strong> Protects against vehicle damage, accidents, and third-party liability.</li>
                        <li><strong>Warehouse Property & Fire Insurance:</strong> Safeguards stored goods from fire, burglary, and natural calamities.</li>
                        <li><strong>Carrier’s Legal Liability Insurance:</strong> Covers liability for damage to goods while in the custody of the logistics company.</li>
                        <li><strong>Workmen Compensation Insurance:</strong> Ensures employee safety and statutory compliance.</li>
                        <li><strong>Business Interruption Insurance:</strong> Provides income replacement during operational downtime.</li>
                        <li><strong>Cyber Liability Insurance:</strong> Protects against cyber-attacks, data breaches, and digital fraud in tech-driven logistics.</li>
                    </ul>
                </div>
            </div>
        `
    },
    law: {
        title: "Law firms",
        icon: '<i class="fa-solid fa-scale-balanced"></i>',
        desc: `
            <div class="modal-inner-content">
                <h3>Law Firms Insurance Solutions</h3>
                <p class="section-title">Industry Overview</p>
                <p>The legal services industry in India has witnessed significant transformation over the last two decades. With globalization, digitalization, and cross-border disputes, law firms now cater to a wide spectrum of clients—ranging from multinational corporations and financial institutions to start-ups and individuals. Today, India’s legal market is valued at over USD 1.3 billion and continues to expand with growing corporate governance needs and regulatory changes.</p>
                <p>However, law firms operate in a highly sensitive and risk-exposed environment. Their clients trust them with confidential information, complex contracts, litigation strategies, and financial transactions. A single professional error, cyber breach, or regulatory non-compliance can not only lead to huge financial losses but also damage the reputation of the firm beyond repair.</p>
                <p>For small and mid-sized law firms (SMEs/MSMEs), the impact of such risks is even more severe because they often operate on limited margins and rely heavily on client trust. Insurance, therefore, is not just a protective measure—it is a strategic necessity for ensuring business continuity and credibility in the competitive legal services sector.</p>

                <div class="solutions-grid mt-4">
                    <h4>Our Insurance Solutions for the Legal Sector</h4>
                    <p>PIB Insurance Brokers provides tailored insurance packages designed exclusively for law firms, addressing their unique risks:</p>
                    <ul class="modal-list">
                        <li><strong>Professional Indemnity Insurance:</strong> Protects against claims arising from professional errors, omissions, and negligence.</li>
                        <li><strong>Cyber Liability Insurance:</strong> Covers threats like data breaches, hacking, and ransomware attacks.</li>
                        <li><strong>Office Property & Fire Insurance:</strong> Protects your office premises, physical documents, and high-value equipment.</li>
                        <li><strong>Directors & Officers (D&O) Liability Insurance:</strong> Shields managing partners and firm leadership from personal liability.</li>
                        <li><strong>Employee Dishonesty / Fidelity Guarantee Insurance:</strong> Covers losses due to fraud or misappropriation by staff members.</li>
                        <li><strong>Workmen Compensation & Group Health Insurance:</strong> Ensures employee safety and provides comprehensive health welfare.</li>
                        <li><strong>Business Interruption Insurance:</strong> Protects the firm's income during downtime caused by natural disasters or cyber-attacks.</li>
                        <li><strong>Legal Expenses Insurance:</strong> Covers legal defense costs in the event of lawsuits brought against the firm.</li>
                    </ul>
                </div>
            </div>
        `
    },
    realestate: {
        title: "Real Estate",
        icon: '<i class="fa-solid fa-city"></i>',
        desc: `
            <div class="modal-inner-content">
                <h3>Real Estate Industry Insurance Solutions</h3>
                <p class="section-title">Industry Overview</p>
                <p>The real estate industry in India is one of the largest contributors to GDP and employment, with continuous growth in residential, commercial, retail, and infrastructure projects. From luxury apartments in metros to affordable housing schemes in Tier-II and Tier-III cities, the sector has become a backbone of India’s urbanisation and economic development.</p>
                <p>However, the industry is exposed to multiple risks at every stage of its lifecycle—land acquisition, project development, construction, sales, and operations. Delays, accidents, regulatory hurdles, natural calamities, and financial disputes can cause huge setbacks. For developers, investors, brokers, and property managers, even a single uninsured incident can derail projects worth crores of rupees.</p>
                <p>This makes insurance not just a safeguard but a strategic necessity in the real estate business.</p>

                <div class="solutions-grid mt-4">
                    <h4>Our Insurance Solutions for the Real Estate Sector</h4>
                    <p>At PIB Insurance Brokers Pvt. Ltd., we design comprehensive insurance solutions tailored for developers, contractors, brokers, and property managers:</p>
                    <ul class="modal-list">
                        <li><strong>Construction All-Risk (CAR) Insurance:</strong> Covers construction projects against material damage, accidents, and third-party liabilities.</li>
                        <li><strong>Erection All-Risk (EAR) Insurance:</strong> Ideal for projects involving the installation of heavy machinery, elevators, or structural equipment.</li>
                        <li><strong>Property Insurance:</strong> Protection for completed structures against fire, natural calamities, theft, and structural damages.</li>
                        <li><strong>Contractor’s Liability Insurance:</strong> Specifically covers worker injuries and third-party damages occurring at construction sites.</li>
                        <li><strong>Directors & Officers (D&O) Liability Insurance:</strong> Protects company leadership against legal claims, governance issues, and regulatory penalties.</li>
                        <li><strong>Professional Indemnity Insurance:</strong> For architects, engineers, and consultants against design flaws, errors, or negligence claims.</li>
                        <li><strong>Business Interruption Insurance:</strong> Covers loss of income or increased costs due to project delays caused by insured events.</li>
                        <li><strong>Cyber Liability Insurance:</strong> Safeguards against digital risks in real estate portals, payment gateways, and CRM systems.</li>
                    </ul>
                </div>
            </div>
        `
    },
    retail: {
        title: "Retail",
        icon: '<i class="fa-solid fa-cart-shopping"></i>',
        desc: `
            <div class="modal-inner-content">
                <h3>Insurance Solutions for the Retail Industry</h3>
                <p class="section-title">Industry Overview</p>
                <p>The retail industry is one of the most dynamic and consumer-driven sectors of the Indian economy. From small neighbourhood shops to large chains, supermarkets, and e-commerce platforms, retail businesses are at the frontline of customer engagement. While the sector offers immense opportunities, it is also exposed to a wide range of risks—from property damage and theft to supply chain disruptions and customer liability claims.</p>
                <p>At PIB Insurance Brokers, we understand the unique challenges faced by retail businesses and design insurance solutions that protect their financial stability, reputation, and growth.</p>

                <div class="solutions-grid mt-4">
                    <h4>PIB’s Insurance Solutions for the Retail Sector</h4>
                    <p>At PIB Insurance Brokers, we provide a comprehensive range of covers designed specifically for retailers, including:</p>
                    <ul class="modal-list">
                        <li><strong>Property Insurance:</strong> Protection for stores, warehouses, and stock against fire, natural calamities, and accidental damage.</li>
                        <li><strong>Burglary and Theft Insurance:</strong> Coverage for shoplifting, internal theft, and burglary-related losses.</li>
                        <li><strong>Liability Insurance:</strong> Safeguards against claims from customer injuries on premises or product-related liabilities.</li>
                        <li><strong>Employee Benefits and Workmen’s Compensation:</strong> Ensures protection and welfare of employees in case of workplace injuries.</li>
                        <li><strong>Business Interruption Insurance:</strong> Compensation for loss of income due to disruptions such as fire or natural calamities.</li>
                        <li><strong>Cyber Insurance:</strong> Coverage for e-commerce platforms and digital payment risks, including hacking, fraud, and data breaches.</li>
                        <li><strong>Transit Insurance:</strong> Protection for goods during transportation from suppliers to stores, ensuring supply chain continuity.</li>
                    </ul>
                </div>
            </div>
        `
    },
    manufacturing: {
        title: "Manufacturing",
        icon: '<i class="fa-solid fa-industry"></i>',
        desc: `
            <div class="modal-inner-content">
                <h3>Insurance Solutions for the Manufacturing Industry</h3>
                <p class="section-title">Industry Overview</p>
                <p>The manufacturing sector forms the backbone of India’s industrial economy, contributing significantly to employment, exports, and GDP growth. From small-scale factories to large industrial plants, manufacturers operate in a highly competitive environment, balancing efficiency, productivity, and safety. However, the sector is equally exposed to a wide spectrum of risks—equipment breakdown, fire hazards, supply chain disruptions, employee injuries, and regulatory compliance issues.</p>
                <p>At PIB Insurance Brokers, we recognize that manufacturing businesses require robust and specialized risk management strategies. Our insurance solutions are designed to safeguard assets, ensure business continuity, and protect against unforeseen financial losses.</p>

                <div class="solutions-grid mt-4">
                    <h4>PIB’s Insurance Solutions for Manufacturing Businesses</h4>
                    <p>At PIB Insurance Brokers, we provide holistic and customized coverage for manufacturing enterprises, including:</p>
                    <ul class="modal-list">
                        <li><strong>Industrial All-Risk Insurance:</strong> Comprehensive protection against fire, natural calamities, equipment breakdown, and property damage.</li>
                        <li><strong>Machinery Breakdown Insurance:</strong> Covers the high repair or replacement costs in case of critical machinery or equipment failure.</li>
                        <li><strong>Business Interruption Insurance:</strong> Protects against income loss during operational disruptions caused by insured perils.</li>
                        <li><strong>Workmen’s Compensation and Employee Benefits:</strong> Ensures safety and welfare of workers by covering workplace injuries, accidents, and health benefits.</li>
                        <li><strong>Product Liability Insurance:</strong> Shields your business against claims arising from defective or harmful products.</li>
                        <li><strong>Marine and Transit Insurance:</strong> Covers goods in transit, raw material imports, and finished goods distribution.</li>
                        <li><strong>Environmental Liability Insurance:</strong> Protection against pollution-related liabilities and regulatory penalties.</li>
                        <li><strong>Cyber Insurance:</strong> Safeguards manufacturing IT systems and industrial automation against growing cyber risks.</li>
                    </ul>
                </div>
            </div>
        `
    },
    mining: {
        title: "Mining",
        icon: '<i class="fa-solid fa-helmet-safety"></i>',
        desc: `
            <div class="modal-inner-content">
                <h3>Mining Industry Insurance Solutions</h3>
                <p class="section-title">Industry Overview</p>
                <p>The mining sector is one of the most critical contributors to India’s industrial growth, supplying essential raw materials like coal, iron ore, bauxite, and precious minerals that power multiple industries. However, mining operations are also among the riskiest, with high exposure to operational hazards, worker safety issues, environmental concerns, equipment breakdowns, and regulatory pressures. From underground mines to open-pit operations, every stage of the mining value chain involves complex risks that demand specialized insurance protection.</p>
                <p>At PIB Insurance Brokers, we understand the unique challenges of mining businesses. Whether you are a large mining corporation or a mid-sized operator, we design customized risk management solutions to protect your assets, employees, and overall business continuity.</p>

                <div class="solutions-grid mt-4">
                    <h4>PIB’s Insurance Solutions for Mining Industry</h4>
                    <p>PIB Insurance Brokers offers a comprehensive bouquet of insurance products tailored for the mining sector:</p>
                    <ul class="modal-list">
                        <li><strong>Property & Asset Insurance:</strong> Coverage for mines, processing plants, warehouses, and offices against fire, natural disasters, and accidents.</li>
                        <li><strong>Machinery Breakdown Insurance:</strong> Protection for high-value heavy-duty mining equipment, crushers, conveyors, and drilling machines.</li>
                        <li><strong>Employee Safety & Workers’ Compensation:</strong> Essential policies that ensure compensation in case of workplace injuries, disability, or fatalities.</li>
                        <li><strong>Public Liability & Environmental Insurance:</strong> Safeguarding against third-party claims and environmental/pollution-related damages.</li>
                        <li><strong>Transit & Marine Cargo Insurance:</strong> Cover for raw material and finished mineral transport across road, rail, or sea.</li>
                        <li><strong>Business Interruption Insurance:</strong> Compensation for financial losses due to operational stoppages caused by insured perils.</li>
                        <li><strong>Contractors’ Plant & Machinery Insurance:</strong> Specific protection for contractors involved in excavation and site development works.</li>
                    </ul>
                </div>
            </div>
        `
    },
    infrastructure: {
        title: "Infrastructure",
        icon: '<i class="fa-solid fa-bridge-water"></i>',
        desc: `
            <div class="modal-inner-content">
                <h3>Infrastructure Industry Insurance Solutions</h3>
                <p class="section-title">Industry Overview</p>
                <p>Infrastructure is the backbone of economic development in India, covering roads, highways, ports, airports, railways, metro projects, power plants, water supply systems, and smart city initiatives. These projects are often large-scale, capital-intensive, and long-term in nature, requiring collaboration between government agencies, private investors, contractors, and financial institutions.</p>
                <p>While infrastructure projects enable national progress, they also come with multiple risks—ranging from construction delays and equipment damage to regulatory hurdles, workforce safety issues, and financial losses. Ensuring the continuity and resilience of these projects is critical, making specialized insurance solutions a necessity for the sector.</p>
                <p>At PIB Insurance Brokers, we provide tailored insurance programs for infrastructure developers, EPC contractors, and public-private partnerships (PPPs), ensuring smooth execution and financial protection throughout the project lifecycle.</p>

                <div class="solutions-grid mt-4">
                    <h4>Our Insurance Solutions for the Infrastructure Industry</h4>
                    <p>PIB Insurance Brokers offers a comprehensive suite of policies tailored to safeguard infrastructure projects:</p>
                    <ul class="modal-list">
                        <li><strong>Contractors’ All Risk (CAR) Insurance:</strong> Protects against material damage and third-party liability during construction.</li>
                        <li><strong>Erection All Risk (EAR) Insurance:</strong> Designed for power plants, refineries, and industrial installations under erection.</li>
                        <li><strong>Contractors’ Plant & Machinery (CPM) Insurance:</strong> Covers damage to heavy equipment and specialized construction machinery.</li>
                        <li><strong>Workmen’s Compensation & Employee Safety Insurance:</strong> Ensures compliance with labour laws and protects workers.</li>
                        <li><strong>Public Liability & Third-Party Insurance:</strong> Protects against claims arising from injury or property damage to the public.</li>
                        <li><strong>Professional Indemnity Insurance for Architects / Engineers:</strong> Safeguards against design or supervision errors.</li>
                        <li><strong>Delay in Start-Up / Advance Loss of Profits (ALOP):</strong> Covers financial losses due to project delays beyond control.</li>
                        <li><strong>Marine Cargo & Transit Insurance:</strong> Protection for project materials transported from global or domestic suppliers.</li>
                        <li><strong>Environmental Liability Insurance:</strong> Mitigates risks of pollution, spills, and environmental damage.</li>
                    </ul>
                </div>
            </div>
        `
    },
    energy: {
        title: "Energy",
        icon: '<i class="fa-solid fa-bolt-lightning"></i>',
        desc: `
            <div class="modal-inner-content">
                <h3>Energy Industry Insurance Solutions</h3>
                <p class="section-title">Industry Overview</p>
                <p>The energy sector is one of the most critical drivers of economic growth, powering industries, infrastructure, and households across India. It includes diverse segments such as oil & gas, power generation, transmission & distribution, and renewable energy sources like solar, wind, and hydro. The sector is undergoing rapid transformation, with India aiming to become a global leader in renewable energy while balancing its reliance on conventional fuels.</p>
                <p>However, the energy industry faces complex risks due to its scale, volatility, and exposure to natural and man-made hazards. From upstream exploration and drilling to downstream refining and distribution, each stage involves significant investments, high-value assets, and continuous operations—making insurance indispensable for ensuring business continuity and financial security.</p>

                <div class="solutions-grid mt-4">
                    <h4>Our Insurance Solutions for the Energy Industry</h4>
                    <p>PIB Insurance Brokers provides end-to-end risk coverage for the energy sector through the following insurance programs:</p>
                    <ul class="modal-list">
                        <li><strong>Property Damage & Industrial All Risk (IAR) Insurance:</strong> Covers plants, rigs, refineries, and infrastructure against fire, explosion, and natural disasters.</li>
                        <li><strong>Business Interruption Insurance:</strong> Protects revenue in case of shutdowns due to insured perils.</li>
                        <li><strong>Energy Package Insurance (Upstream, Midstream, Downstream):</strong> Comprehensive cover for oil and gas operations across exploration, production, refining, and distribution.</li>
                        <li><strong>Renewable Energy Insurance:</strong> Customized solutions for solar parks, wind farms, and hydro projects, covering equipment, weather risks, and operational liabilities.</li>
                        <li><strong>Contractors’ All Risk (CAR) & Erection All Risk (EAR):</strong> Protection during construction and installation of energy projects.</li>
                        <li><strong>Machinery Breakdown & Boiler Explosion Insurance:</strong> Covers critical plant equipment from breakdown and explosion risks.</li>
                        <li><strong>Marine Cargo & Transit Insurance:</strong> Ensures safe transport of turbines, pipelines, drilling equipment, and project cargo.</li>
                        <li><strong>Workmen’s Compensation & Group Health Insurance:</strong> Safeguards employees working in high-risk environments.</li>
                        <li><strong>Public Liability & Environmental Liability Insurance:</strong> Protects against claims arising from pollution, spills, or third-party damages.</li>
                        <li><strong>Cyber Insurance for Energy Companies:</strong> Shields against data breaches, ransomware, and attacks on control systems.</li>
                    </ul>
                </div>
            </div>
        `
    },
    hospitality: {
        title: "Hospitality",
        icon: '<i class="fa-solid fa-hotel"></i>',
        desc: `
            <div class="modal-inner-content">
                <h3>Insurance Solutions for the Hospitality Industry</h3>
                <p class="section-title">Industry Overview</p>
                <p>The hospitality sector is one of the most dynamic and customer-centric industries, covering hotels, resorts, restaurants, cafes, convention centers, and leisure facilities. In India, the sector is a significant contributor to GDP and employment, driven by rising disposable income, tourism, and changing consumer lifestyles. However, this growth comes with a unique set of risks—from property damage and food safety concerns to guest liability and employee-related issues.</p>
                <p>With intense competition and increasing customer expectations, hospitality businesses cannot afford even a single operational disruption. Insurance plays a vital role in safeguarding assets, protecting guests and employees, and ensuring long-term business continuity.</p>

                <div class="solutions-grid mt-4">
                    <h4>Our Insurance Solutions for the Hospitality Industry</h4>
                    <p>At PIB Insurance Brokers, we design customized insurance programs that address the unique exposures faced by hotels, restaurants, and hospitality service providers. Our solutions include:</p>
                    <ul class="modal-list">
                        <li><strong>Property Insurance:</strong> Covers damage to buildings, kitchens, interiors, and equipment caused by fire, floods, and other perils.</li>
                        <li><strong>Public Liability Insurance:</strong> Protects against third-party claims from guests for accidental injury, illness, or property damage on premises.</li>
                        <li><strong>Product Liability Insurance:</strong> Specifically covers claims related to food and beverage contamination or quality issues.</li>
                        <li><strong>Business Interruption Insurance:</strong> Ensures income protection in case of forced closure due to disasters or unforeseen events.</li>
                        <li><strong>Employee Insurance (Group Health & WC):</strong> Provides comprehensive coverage for employee healthcare, workplace injuries, and related liabilities.</li>
                        <li><strong>Fidelity Guarantee Insurance:</strong> Safeguards against financial losses due to employee fraud or dishonesty.</li>
                        <li><strong>Cyber Insurance:</strong> Protects sensitive guest data, booking platforms, and digital systems from cyber threats.</li>
                        <li><strong>Specialty Covers:</strong> Tailored plans for luxury resorts, boutique hotels, banquet halls, or large chains with multiple properties.</li>
                    </ul>
                </div>
            </div>
        `
    },
    food: {
        title: "Food & Beverage",
        icon: '<i class="fa-solid fa-utensils"></i>',
        desc: `
            <div class="modal-inner-content">
                <h3>Insurance Solutions for the Food & Beverage Industry</h3>
                <p class="section-title">Industry Overview</p>
                <p>The Food & Beverage (F&B) sector in India is one of the fastest-growing industries, encompassing food processing companies, packaged goods manufacturers, restaurants, cafes, breweries, and catering services. With India’s expanding middle class, increasing urbanization, and changing consumption patterns, the sector has seen exponential growth.</p>
                <p>However, this growth also brings complex risks—ranging from contamination and product recalls to supply chain disruptions and regulatory compliance issues. Since consumer safety is at the heart of the F&B industry, even a minor mishap can lead to significant financial loss and reputational damage. Insurance therefore plays a crucial role in protecting businesses and ensuring continuity.</p>

                <div class="solutions-grid mt-4">
                    <h4>Our Insurance Solutions for the Food & Beverage Industry</h4>
                    <p>At PIB Insurance Brokers, we offer comprehensive insurance programs tailored to the unique exposures of food and beverage companies. Our solutions include:</p>
                    <ul class="modal-list">
                        <li><strong>Product Liability Insurance:</strong> Covers claims from customers due to contaminated or defective products.</li>
                        <li><strong>Product Recall Insurance:</strong> Protects against high expenses incurred during large-scale product recalls, including logistics, communication, and disposal.</li>
                        <li><strong>Property & Fire Insurance:</strong> Covers damage to plants, factories, restaurants, warehouses, and specialized equipment.</li>
                        <li><strong>Business Interruption Insurance:</strong> Ensures compensation for loss of income during downtime caused by insured events.</li>
                        <li><strong>Marine & Transit Insurance:</strong> Safeguards raw materials and finished goods during transportation and storage.</li>
                        <li><strong>Employee Insurance (Group Mediclaim & WC):</strong> Provides comprehensive coverage for workplace injuries and employee health needs.</li>
                        <li><strong>Fidelity Guarantee Insurance:</strong> Protects against financial losses caused by employee fraud or dishonesty.</li>
                        <li><strong>Cyber Insurance:</strong> Covers risks related to customer data breaches, payment fraud, and ransomware attacks.</li>
                        <li><strong>Customised Risk Programs:</strong> Special packages for restaurants, food processors, breweries, or FMCG companies depending on their scale.</li>
                    </ul>
                </div>
            </div>
        `
    },
    aviation: {
        title: "Aviation & Space",
        icon: '<i class="fa-solid fa-plane-up"></i>',
        desc: `
            <div class="modal-inner-content">
                <h3>Insurance Solutions for the Aviation & Space Industry</h3>
                <p class="section-title">Industry Overview</p>
                <p>The aviation and space sectors represent some of the most complex, high-risk, and innovation-driven industries in the world. From airlines, airports, cargo handlers, and maintenance companies to aerospace manufacturers, satellite operators, and space technology firms—every stakeholder operates in a high-value, safety-critical environment. These industries face enormous capital investments, rigorous regulatory oversight, and global interdependencies. Even a minor operational failure can lead to significant financial losses, reputational damage, and legal liabilities.</p>
                <p>In recent years, India’s aviation industry has witnessed rapid growth, with increasing air travel demand, cargo expansion, and government initiatives boosting infrastructure. Similarly, the space sector is flourishing with commercial satellite launches, private investments, and new exploration missions. However, with these opportunities come complex risks that require robust, specialized insurance solutions.</p>

                <div class="solutions-grid mt-4">
                    <h4>Our Insurance Solutions for Aviation & Space Industry</h4>
                    <p>At PIB Insurance Brokers, we understand the unique exposures faced by airlines, aerospace firms, and space technology companies. We design comprehensive, tailor-made solutions, which may include:</p>
                    <ul class="modal-list">
                        <li><strong>Aircraft Hull & Liability Insurance:</strong> Protection against physical damage to aircraft and liabilities arising from its operation.</li>
                        <li><strong>Passenger & Crew Liability Insurance:</strong> Coverage for passenger injury, death, and crew compensation claims.</li>
                        <li><strong>Airport & Ground Handling Insurance:</strong> Safeguarding ground operations, maintenance services, and handling activities.</li>
                        <li><strong>Cargo & Transit Insurance:</strong> Protection for goods carried via air cargo against theft, damage, or delay.</li>
                        <li><strong>Satellite & Space Launch Insurance:</strong> Covering satellites, rockets, and launch services against damage, failure, or loss.</li>
                        <li><strong>Business Interruption Coverage:</strong> Compensation for financial losses due to grounding, airspace closure, or launch delays.</li>
                        <li><strong>Cyber Risk Insurance:</strong> Protection against cyber-attacks on critical navigation, communication, and data systems.</li>
                        <li><strong>Product Liability for Aerospace Manufacturing:</strong> Safeguarding manufacturers from claims arising from defective aerospace products or components.</li>
                    </ul>
                </div>
            </div>
        `
    },
    entertainment: {
        title: "Entertainment & Media",
        icon: '<i class="fa-solid fa-film"></i>',
        desc: `
            <div class="modal-inner-content">
                <h3>Insurance Solutions for the Entertainment & Media Industry</h3>
                <p class="section-title">Industry Overview</p>
                <p>The entertainment and media industry is one of the fastest-growing sectors in India, driven by television, OTT platforms, advertising, print, radio, gaming, and live events. With millions of viewers and billions of rupees invested in content creation, this industry is both high-reward and high-risk.</p>
                <p>From film production to broadcasting and event management, stakeholders face challenges such as production delays, content piracy, intellectual property disputes, equipment damage, and liability claims. With the rise of digital media, risks have further expanded to include cyber threats, data breaches, and reputational damage.</p>
                <p>Given its dynamic and unpredictable nature, insurance has become a vital risk management tool for companies, producers, event organizers, broadcasters, and advertisers.</p>

                <div class="solutions-grid mt-4">
                    <h4>Our Insurance Solutions for the Entertainment & Media Industry</h4>
                    <p>At PIB Insurance Brokers, we design comprehensive risk management programs for content creators, producers, broadcasters, and event organizers. Our solutions include:</p>
                    <ul class="modal-list">
                        <li><strong>Production Insurance:</strong> Coverage for delays, cancellations, or interruptions due to accidents, illness, or natural calamities.</li>
                        <li><strong>Event Insurance:</strong> Protecting concerts, festivals, award shows, and exhibitions from accidents, crowd issues, or cancellations.</li>
                        <li><strong>Equipment & Asset Insurance:</strong> Coverage for production equipment, broadcasting systems, and rented stage gear.</li>
                        <li><strong>Errors & Omissions (E&O) Insurance:</strong> Safeguarding against lawsuits related to copyright, trademark, or defamation.</li>
                        <li><strong>Public Liability Insurance:</strong> Protection from third-party claims for injury, loss, or property damage.</li>
                        <li><strong>Cyber Liability Insurance:</strong> Covering piracy, data theft, hacking, and cyber extortion risks for digital platforms.</li>
                        <li><strong>Talent & Key Person Insurance:</strong> Securing investments against sudden illness, accidents, or death of lead performers or anchors.</li>
                        <li><strong>Business Interruption Insurance:</strong> Ensuring financial continuity if operations are disrupted by unforeseen events.</li>
                    </ul>
                </div>
            </div>
        `
    },
    healthcare: {
        title: "Healthcare & Pharma",
        icon: '<i class="fa-solid fa-staff-snake"></i>',
        desc: `
            <div class="modal-inner-content">
                <h3>Insurance Solutions for Healthcare & Pharmaceutical Industry</h3>
                <p class="section-title">Industry Overview</p>
                <p>The healthcare and pharmaceutical industry plays a vital role in safeguarding lives, improving patient outcomes, and driving medical innovation. From multi-specialty hospitals and diagnostic centers to pharmaceutical manufacturers and biotechnology firms, this sector is at the core of national well-being. In India, with increasing healthcare demands, government regulations, and rising investments in research and drug development, the industry continues to expand rapidly.</p>
                <p>However, this growth comes with significant risks. Hospitals face high liability exposure from patient care. Pharmaceutical firms encounter complex challenges ranging from product recalls to regulatory compliance. Even small diagnostic labs or nursing homes are vulnerable to cyber-attacks, malpractice suits, supply chain breakdowns, and natural disasters.</p>
                <p>A single incident—a data breach leaking patient records, a manufacturing batch recall due to contamination, or a professional negligence claim—can result in financial losses running into crores, apart from long-lasting reputational damage.</p>

                <div class="solutions-grid mt-4">
                    <h4>Our Insurance Solutions for the Healthcare & Pharmaceutical Industry</h4>
                    <p>At PIB Insurance Brokers, we understand that no two healthcare organizations or pharmaceutical companies are the same. That is why we customize policies based on the unique risk profile of each client. Our portfolio includes:</p>
                    <ul class="modal-list">
                        <li><strong>Medical Malpractice & Professional Indemnity Insurance:</strong> Protection against negligence claims, legal defense costs, and compensation pay-outs for doctors, hospitals, and diagnostic centers.</li>
                        <li><strong>Product Liability & Recall Insurance:</strong> Covers pharmaceutical and medical device manufacturers against lawsuits, damages, and recall expenses.</li>
                        <li><strong>Cyber Liability Insurance:</strong> Protects hospitals, labs, and pharma firms against data breaches, ransomware attacks, and IT system disruptions.</li>
                        <li><strong>Clinical Trial Liability Insurance:</strong> Covers sponsors, CROs, and researchers for claims arising during clinical trials of new drugs or medical devices.</li>
                        <li><strong>Directors & Officers (D&O) Liability Insurance:</strong> Safeguards leadership teams from personal liability in governance, compliance, or financial mismanagement issues.</li>
                        <li><strong>Property & Fire Insurance:</strong> Protects hospitals, labs, and manufacturing units against fire, floods, earthquakes, and allied risks.</li>
                        <li><strong>Employee Health & Group Insurance:</strong> Comprehensive coverage for doctors, nurses, lab technicians, and other staff including health, accident, and life insurance.</li>
                        <li><strong>Business Interruption Insurance:</strong> Ensures cash flow and operational recovery during unforeseen disruptions.</li>
                    </ul>
                </div>
            </div>
        `
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
            modalDesc.innerHTML = data.desc;
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