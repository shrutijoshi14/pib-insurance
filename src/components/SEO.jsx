import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, canonical, ogType = 'website', ogImage = '/assets/logo.png', noindex = false, schemaData }) => {
    const siteTitle = title ? title : 'PIB Insurance Brokers | Expert Risk Management';
    const siteDescription = description || 'Secure your business and family with India\'s trusted IRDAI registered insurance broker. Expertise in Commercial and Group insurance.';
    const siteKeywords = keywords || 'PIB Insurance, Insurance Broker India, Commercial Insurance, Group Health Insurance, IRDAI Broker';
    
    const robotsContent = noindex 
        ? 'noindex, nofollow' 
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    
    const googlebotContent = noindex 
        ? 'noindex, nofollow' 
        : 'index, follow, max-image-preview:large';

    // Rich Graph Schema for Google Search, Sitelinks & AI Search Engines (SearchGPT, Perplexity, Gemini, Copilot)
    const defaultGraphSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": "https://pibinsurance.in/#website",
                "url": "https://pibinsurance.in/",
                "name": "PIB Insurance Brokers Pvt. Ltd.",
                "description": "IRDAI registered direct insurance broker in India",
                "publisher": { "@id": "https://pibinsurance.in/#organization" }
            },
            {
                "@type": "InsuranceAgency",
                "@id": "https://pibinsurance.in/#organization",
                "name": "PIB Insurance Brokers Pvt. Ltd.",
                "url": "https://pibinsurance.in/",
                "logo": "https://pibinsurance.in/assets/logo.png",
                "description": "IRDAI registered direct insurance broker providing risk management, commercial insurance, and employee benefit solutions across India.",
                "telephone": "+91-98204-19256",
                "email": "info@pibinsurance.in",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "B/3rd Floor, Chintamani Plaza, Chakala, Andheri Kurla Road, Andheri East",
                    "addressLocality": "Mumbai",
                    "addressRegion": "Maharashtra",
                    "postalCode": "400093",
                    "addressCountry": "IN"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 19.1158,
                    "longitude": 72.8679
                },
                "sameAs": [
                    "https://www.linkedin.com/company/pib-insurance-brokers-private-limited/",
                    "https://www.instagram.com/pib_insurancebrokers"
                ]
            },
            {
                "@type": "ItemList",
                "@id": "https://pibinsurance.in/#sitelinks",
                "name": "PIB Insurance Quick Navigation Links",
                "itemListElement": [
                    {
                        "@type": "SiteNavigationElement",
                        "position": 1,
                        "name": "About Us",
                        "description": "Learn about PIB Insurance Brokers, our leadership team, vision, and IRDAI registration.",
                        "url": "https://pibinsurance.in/about"
                    },
                    {
                        "@type": "SiteNavigationElement",
                        "position": 2,
                        "name": "Contact Us",
                        "description": "Get in touch with PIB Insurance experts across 110+ locations in India for risk advice.",
                        "url": "https://pibinsurance.in/contact"
                    },
                    {
                        "@type": "SiteNavigationElement",
                        "position": 3,
                        "name": "Careers",
                        "description": "Explore career opportunities, job openings, and work culture at PIB Insurance Brokers.",
                        "url": "https://pibinsurance.in/careers"
                    },
                    {
                        "@type": "SiteNavigationElement",
                        "position": 4,
                        "name": "Leadership Team",
                        "description": "Meet the experienced executive leaders, board of directors, and advisors at PIB Insurance.",
                        "url": "https://pibinsurance.in/leadership"
                    },
                    {
                        "@type": "SiteNavigationElement",
                        "position": 5,
                        "name": "Submit Claim",
                        "description": "Fast and hassle-free insurance claims support for retail and corporate policyholders.",
                        "url": "https://pibinsurance.in/claim"
                    },
                    {
                        "@type": "SiteNavigationElement",
                        "position": 6,
                        "name": "Industries Served",
                        "description": "Specialized insurance solutions for IT, Manufacturing, Healthcare, Construction, and Logistics.",
                        "url": "https://pibinsurance.in/industries"
                    }
                ]
            }
        ]
    };

    const finalSchema = schemaData || defaultGraphSchema;

    return (
        <Helmet>
            <title>{siteTitle}</title>
            <meta name="description" content={siteDescription} />
            <meta name="keywords" content={siteKeywords} />
            <meta name="robots" content={robotsContent} />
            <meta name="googlebot" content={googlebotContent} />
            <meta name="author" content="PIB Insurance Brokers Pvt. Ltd." />
            {canonical && <link rel="canonical" href={canonical} />}
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={canonical || 'https://pibinsurance.in/'} />
            <meta property="og:site_name" content="PIB Insurance Brokers Pvt. Ltd." />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={siteDescription} />
            <meta name="twitter:image" content={ogImage} />

            {/* AI SEO & Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify(finalSchema)}
            </script>
        </Helmet>
    );
};

export default SEO;
