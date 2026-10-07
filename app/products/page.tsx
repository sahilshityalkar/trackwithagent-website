import { pageMetadata } from "@/lib/metadata";
import { site } from "@/site.config";
import { EmailLink } from "@/components/email";
import { PageHeader } from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";

export const metadata = pageMetadata({
  title: "Products",
  description:
    "TrackWithAgent builds focused AI agents. Finance, our money tracker for India, is live. Replay, our next agent, is on the way. The agent proposes, you decide.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Products"
        intro="TrackWithAgent builds focused AI agents. Each one does a single job, lives on its own subdomain and shares one simple rule: the agent proposes, you decide."
      />
      <section aria-label="Our products" className="container-page pb-20 sm:pb-28">
        <ul className="grid gap-6 lg:grid-cols-2">
          <Reveal as="li">
            <ProductCard product="finance" size="lg" headingLevel="h2" />
          </Reveal>
          <Reveal as="li" index={1}>
            <ProductCard product="replay" size="lg" headingLevel="h2" />
          </Reveal>
        </ul>
        <p className="mt-10 text-muted-foreground">
          Have an idea for an agent we should build? Tell us at <EmailLink email={site.contactEmail} />.
        </p>
      </section>
    </>
  );
}
