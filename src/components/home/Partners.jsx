import { useState } from "react";
import { MotionSection, MotionItem, MotionList } from "../MotionWrappers";

// Mapping of domains to exact verified high-quality logo URLs or local assets
const logoOverrides = {
  // --- Local assets mapping (available in public/images/partners/) ---
  "licindia.in": "/images/partners/12.png",
  "acko.com": "/images/partners/31.png",            // ACKO Life and ACKO General
  "ageasfederal.com": "/images/partners/29.png",
  "maxlifeinsurance.com": "/images/partners/25.png", // Max Life
  "bajajallianzlife.com": "/images/partners/7.png",
  "godigit.com": "/images/partners/30.png",          // Go Digit Life & General
  "hdfclife.com": "/images/partners/34.png",
  "iciciprulife.com": "/images/partners/35.png",
  "kotaklife.com": "/images/partners/17.png",
  "pnbmetlife.com": "/images/partners/19.png",
  "reliancenipponlife.com": "/images/partners/9.png",
  "sbilife.co.in": "/images/partners/18.png",
  "shriramlife.com": "/images/partners/24.png",
  "tataaia.com": "/images/partners/37.png",
  "newindia.co.in": "/images/partners/1.png",
  "icicilombard.com": "/images/partners/2.png",
  "bajajallianz.com": "/images/partners/3.png",
  "orientalinsurance.org.in": "/images/partners/4.png",
  "uiic.co.in": "/images/partners/5.png",
  "tataaig.com": "/images/partners/6.png",
  "nationalinsurance.nic.co.in": "/images/partners/15.png",
  "starhealth.in": "/images/partners/14.png",
  "hdfcergo.com": "/images/partners/13.png",
  "sbigeneral.in": "/images/partners/22.png",
  "reliancegeneral.co.in": "/images/partners/9.png",  // Reliance General uses Reliance logo
  "iffcotokio.co.in": "/images/partners/27.png",
  "careinsurance.com": "/images/partners/26.png",
  "nivabupa.com": "/images/partners/28.png",
  "shriramgi.com": "/images/partners/24.png",          // Shriram General uses Shriram logo
  "magmahdi.com": "/images/partners/23.png",
  "kotakgeneral.com": "/images/partners/21.png",      // Zurich Kotak General
  "manipalcigna.com": "/images/partners/16.png",

  // --- Exact working external web mappings ---
  "bhartiaxa.com": "/assets/logos/bhartiaxa.svg",
  "canarahsbclife.com": "https://www.canarahsbclife.com/content/dam/choice/header/images/logo.png", // Direct logo URL
  "sudlife.in": "https://www.sudlife.in/assets/images/logo.png", // Star Union Dai-ichi Life direct logo URL
  "galaxyhealth.com": "https://www.galaxyhealth.com/_astro/LogoNW1.X876WOf3_Z1B8TGB.webp", // Galaxy Health direct logo URL
  "indiafirstlife.com": "/assets/logos/indiafirst.png",
  "futuregenerali.in": "/assets/logos/generali_life.svg", // Fallback, but overridden in component
  "avivaindia.com": "/assets/logos/aviva.webp",
  "bandhanlife.com": "https://logo.clearbit.com/bandhanbank.com",                 // Bandhan Life uses Bandhan Group logo
  "edelweisslife.in": "/assets/logos/edelweiss.svg",
  "pramericalife.in": "https://logo.clearbit.com/prudential.com",                 // Pramerica uses Prudential rock logo
  "adityabirlacapital.com": "https://logo.clearbit.com/adityabirlacapital.com",   // Aditya Birla Group logo
  "libertyinsurance.in": "/assets/logos/liberty.png",
  "cholainsurance.com": "https://logo.clearbit.com/cholamandalam.com",            // Cholamandalam MS uses Chola logo
  "universalsompo.com": "/assets/logos/universalsompo.png",
  "creditaccesslife.com": "/assets/logos/creditaccess.png",
  "aicofindia.com": "/assets/logos/aic.png",
  "royalsundaram.in": "/assets/logos/royalsundaram.jpg",
  "ecgc.in": "https://logo.clearbit.com/ecgc.in",
  "zuno.in": "/assets/logos/zuno.png",
  "kshema.co": "https://logo.clearbit.com/kshema.co",
  "rahejaqbe.com": "/assets/logos/rahejaqbe.jpg",
  "navi.com": "https://logo.clearbit.com/navi.com",
  "narayanahealthinsurance.com": "/assets/logos/narayana.svg"
};

const partnersList = [
  // --- Life Insurers (25) ---
  { name: "LIC", website: "licindia.in", category: "life" },
  { name: "ACKO Life", website: "acko.com", category: "life" },
  { name: "Aditya Birla Sun Life", website: "adityabirlacapital.com", category: "life" },
  { name: "Ageas Federal Life", website: "ageasfederal.com", category: "life" },
  { name: "Aviva Life Insurance", website: "avivaindia.com", category: "life" },
  { name: "Axis Max Life", website: "maxlifeinsurance.com", category: "life" },
  { name: "Bajaj Allianz Life", website: "bajajallianzlife.com", category: "life" },
  { name: "Bandhan Life", website: "bandhanlife.com", category: "life" },
  { name: "Bharti AXA Life Insurance", website: "bhartiaxa.com", category: "life" },
  { name: "Canara HSBC Life", website: "canarahsbclife.com", category: "life" },
  { name: "CreditAccess Life Insurance", website: "creditaccesslife.com", category: "life" },
  { name: "Edelweiss Life Insurance", website: "edelweisslife.in", category: "life" },
  { name: "Generali India Life Insurance", website: "generali.co.in/life-insurance", category: "life" },
  { name: "Go Digit Life", website: "godigit.com", category: "life" },
  { name: "HDFC Life", website: "hdfclife.com", category: "life" },
  { name: "ICICI Prudential Life", website: "iciciprulife.com", category: "life" },
  { name: "IndiaFirst Life Insurance", website: "indiafirstlife.com", category: "life" },
  { name: "Kotak Life", website: "kotaklife.com", category: "life" },
  { name: "PNB MetLife", website: "pnbmetlife.com", category: "life" },
  { name: "Pramerica Life", website: "pramericalife.in", category: "life" },
  { name: "Reliance Nippon Life", website: "reliancenipponlife.com", category: "life" },
  { name: "SBI Life", website: "sbilife.co.in", category: "life" },
  { name: "Shriram Life", website: "shriramlife.com", category: "life" },
  { name: "Star Union Dai-ichi Life", website: "sudlife.in", category: "life" },
  { name: "Tata AIA Life", website: "tataaia.com", category: "life" },

  // --- General & Health Insurers (34) ---
  { name: "New India Assurance", website: "newindia.co.in", category: "general" },
  { name: "ICICI Lombard", website: "icicilombard.com", category: "general" },
  { name: "Bajaj Allianz General", website: "bajajallianz.com", category: "general" },
  { name: "Oriental Insurance", website: "orientalinsurance.org.in", category: "general" },
  { name: "United India Insurance", website: "uiic.co.in", category: "general" },
  { name: "Tata AIG", website: "tataaig.com", category: "general" },
  { name: "National Insurance", website: "nationalinsurance.nic.co.in", category: "general" },
  { name: "Star Health", website: "starhealth.in", category: "general" },
  { name: "HDFC ERGO", website: "hdfcergo.com", category: "general" },
  { name: "SBI General", website: "sbigeneral.in", category: "general" },
  { name: "Reliance General", website: "reliancegeneral.co.in", category: "general" },
  { name: "Go Digit General", website: "godigit.com", category: "general" },
  { name: "IFFCO Tokio", website: "iffcotokio.co.in", category: "general" },
  { name: "Care Health", website: "careinsurance.com", category: "general" },
  { name: "Cholamandalam MS", website: "cholainsurance.com", category: "general" },
  { name: "Niva Bupa", website: "nivabupa.com", category: "general" },
  { name: "Universal Sompo General Insurance", website: "universalsompo.com", category: "general" },
  { name: "Aditya Birla Health", website: "adityabirlacapital.com", category: "general" },
  { name: "Generali India General Insurance", website: "generali.co.in/general-insurance", category: "general" },
  { name: "Royal Sundaram General Insurance", website: "royalsundaram.in", category: "general" },
  { name: "Shriram General", website: "shriramgi.com", category: "general" },
  { name: "Magma General", website: "magmahdi.com", category: "general" },
  { name: "Liberty General Insurance", website: "libertyinsurance.in", category: "general" },
  { name: "ACKO General", website: "acko.com", category: "general" },
  { name: "Zurich Kotak General", website: "kotakgeneral.com", category: "general" },
  { name: "ManipalCigna", website: "manipalcigna.com", category: "general" },
  { name: "ECGC", website: "ecgc.in", category: "general" },
  { name: "Zuno General Insurance", website: "zuno.in", category: "general" },
  { name: "Kshema General", website: "kshema.co", category: "general" },
  { name: "Raheja QBE General Insurance", website: "rahejaqbe.com", category: "general" },
  { name: "Navi General", website: "navi.com", category: "general" },
  { name: "Galaxy Health", website: "galaxyhealth.com", category: "general" },
  { name: "Narayana Health Insurance", website: "narayanahealthinsurance.com", category: "general" }
];

const PartnerCard = ({ partner }) => {
  const { name, website } = partner;
  
  // Resolve primary logo URL: check override map first, otherwise construct clearbit URL
  let primaryUrl = logoOverrides[website] || `https://logo.clearbit.com/${website}`;
  
  // Direct shared domains to their correct separate local assets
  if (name === "Generali India Life Insurance") {
    primaryUrl = "/assets/logos/generali_life.svg";
  } else if (name === "Generali India General Insurance") {
    primaryUrl = "/assets/logos/generali_general.svg";
  }
  
  // Custom fallback resolver to handle redirected subdomains and avoid generic globes
  const getFallbackUrl = () => {
    if (name === "Generali India General Insurance") {
      return "https://www.google.com/s2/favicons?sz=128&domain=generalicentralinsurance.com";
    }
    if (name === "Generali India Life Insurance") {
      return "https://www.google.com/s2/favicons?sz=128&domain=generalicentrallife.com";
    }
    return `https://www.google.com/s2/favicons?sz=128&domain=${website}`;
  };

  const [imgSrc, setImgSrc] = useState(primaryUrl);
  const [loadStage, setLoadStage] = useState(0); // 0 = override/clearbit, 1 = google favicon fallback, 2 = initials text badge
  
  const handleError = () => {
    if (loadStage === 0) {
      // If primary logo failed, try the custom Google Favicon URL
      setImgSrc(getFallbackUrl());
      setLoadStage(1);
    } else if (loadStage === 1) {
      // If fallback failed, display initials badge
      setLoadStage(2);
    }
  };

  const getInitials = (str) => {
    if (!str) return "?";
    const words = str.split(" ").filter(w => w.length > 0);
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    // Handle short initials like LIC, ECGC, ACKO
    if (words[0].toUpperCase() === "LIC" || words[0].toUpperCase() === "ECGC" || words[0].toUpperCase() === "ACKO") {
      return words[0].substring(0, 3).toUpperCase();
    }
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const getFullSrc = (src) => {
    if (!src) return "";
    if (src.startsWith("/")) {
      const base = import.meta.env.BASE_URL || "/";
      return `${base.replace(/\/$/, "")}${src}`;
    }
    return src;
  };

  const cleanUrl = website.startsWith("http") ? website : `https://www.${website}`;

  return (
    <a
      href={cleanUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="partner-logo-item"
      title={`Visit ${name} website`}
    >
      {loadStage === 2 ? (
        <div className="partner-logo-badge">
          {getInitials(name)}
        </div>
      ) : (
        <img
          src={getFullSrc(imgSrc)}
          alt={`${name} Logo`}
          className="partner-logo-image"
          loading="lazy"
          onError={handleError}
        />
      )}
    </a>
  );
};

export default function Partners() {
  // Duplicate list to create a seamless infinite scroll effect
  const duplicatedList = [...partnersList, ...partnersList];

  return (
    <section className="partners-carousel-section">
      <div className="container">
        <MotionSection className="partners-header">
          <h2 className="partners-title">Our Trusted Partners</h2>
          <p className="partners-subtitle">
            Partnering with leading insurers to bring you the best coverage and value.
          </p>
        </MotionSection>
      </div>

      <div className="partners-carousel-wrapper">
        <div className="partners-carousel-track">
          {duplicatedList.map((partner, index) => (
            <PartnerCard key={`${partner.name}-${index}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
