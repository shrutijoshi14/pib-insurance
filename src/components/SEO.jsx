import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, canonical, ogType = 'website', ogImage = '/assets/logo.png' }) => {
    const siteTitle = title ? title : 'PIB Insurance Brokers | Expert Risk Management';
    const siteDescription = description || 'Secure your business and family with India\'s trusted IRDAI registered insurance broker. Expertise in Commercial and Group insurance.';
    const siteKeywords = keywords || 'PIB Insurance, Insurance Broker India, Commercial Insurance, Group Health Insurance';
    
    return (
        <Helmet>
            <title>{siteTitle}</title>
            <meta name="description" content={siteDescription} />
            <meta name="keywords" content={siteKeywords} />
            {canonical && <link rel="canonical" href={canonical} />}
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={canonical || 'https://pibinsurance.in/'} />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={siteDescription} />
            <meta name="twitter:image" content={ogImage} />
        </Helmet>
    );
};

export default SEO;
