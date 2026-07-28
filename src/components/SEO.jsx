import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, canonical, ogType = 'website', ogImage = '/assets/logo.png', schemaData }) => {
    const siteTitle = title ? title : 'PIB Insurance Brokers | Expert Risk Management';
    const siteDescription = description || 'Secure your business and family with India\'s trusted IRDAI registered insurance broker. Expertise in Commercial and Group insurance.';
    const siteKeywords = keywords || 'PIB Insurance, Insurance Broker India, Commercial Insurance, Group Health Insurance, IRDAI Broker';
    
    // Core Organization & Insurance Agency Schema for Google SEO and AI Search Crawlers (ChatGPT, Perplexity, Gemini, Copilot)
    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "InsuranceAgency",
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
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:30",
            "closes": "18:30"
        },
        "sameAs": [
            "https://www.linkedin.com/company/pib-insurance-brokers-private-limited/",
            "https://www.instagram.com/pib_insurancebrokers"
        ]
    };

    const finalSchema = schemaData || defaultSchema;

    return (
        <Helmet>
            <title>{siteTitle}</title>
            <meta name="description" content={siteDescription} />
            <meta name="keywords" content={siteKeywords} />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow, max-image-preview:large" />
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
