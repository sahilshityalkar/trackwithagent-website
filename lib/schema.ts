import { isSet, site } from "@/site.config";

const orgId = `${site.url}/#organization`;

export function organizationSchema() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    ...(isSet(site.legalName) && { legalName: site.legalName }),
    url: site.url,
    logo: `${site.url}/icon-512.png`,
    ...(isSet(site.contactEmail) && { email: site.contactEmail }),
    ...(site.foundedYear ? { foundingDate: site.foundedYear } : {}),
    ...(isSet(site.address) && {
      address: { "@type": "PostalAddress", streetAddress: site.address, addressCountry: "IN" },
    }),
    ...(sameAs.length > 0 && { sameAs }),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      ...(isSet(site.supportEmail) && { email: site.supportEmail }),
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    publisher: { "@id": orgId },
  };
}

export function financeAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TrackWithAgent Finance",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: site.finance.url,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    softwareVersion: site.finance.version,
    datePublished: site.finance.releaseDateISO,
    inLanguage: "en-IN",
    publisher: { "@id": orgId },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
