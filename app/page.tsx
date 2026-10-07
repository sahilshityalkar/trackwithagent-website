import type { Metadata } from "next";
import { faq } from "@/content/faq";
import { CtaBand } from "@/components/cta-band";
import { Faq } from "@/components/faq";
import { FinanceHighlights } from "@/components/finance-highlights";
import { Hero } from "@/components/hero/hero";
import { HowItWorks } from "@/components/how-it-works";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { TrustSection } from "@/components/trust-section";
import { faqSchema, financeAppSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "TrackWithAgent: AI agents that keep track for you" },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />

      <Section
        id="products"
        title="Our agents"
        intro="Each agent does one job well and lives on its own address. Start with Finance today."
      >
        <ul className="grid gap-6 md:grid-cols-2">
          <Reveal as="li" index={0}>
            <ProductCard product="finance" />
          </Reveal>
          <Reveal as="li" index={1}>
            <ProductCard product="replay" />
          </Reveal>
        </ul>
      </Section>

      <HowItWorks />
      <FinanceHighlights />
      <TrustSection />

      <Section id="faq" title="Questions">
        <Reveal className="max-w-3xl">
          <Faq items={faq} />
        </Reveal>
      </Section>

      <CtaBand title="Start with one sentence." />

      <JsonLd data={[financeAppSchema(), faqSchema(faq)]} />
    </>
  );
}
