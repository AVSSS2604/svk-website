import { Hero } from "@/components/sections/Hero";
import { ProductLines } from "@/components/sections/ProductLines_ScrollReveal";
import { WhySVK } from "@/components/sections/WhySVK";
import { Results } from "@/components/sections/Results";
import { Partners } from "@/components/sections/Partners";
import { Process } from "@/components/sections/Process";
import { CatalogPreview } from "@/components/sections/CatalogPreview";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductLines />
      <WhySVK />
      <Results />
      <Partners />
      <CatalogPreview />
      <Process />
      <Blog />
      <Contact />
    </>
  );
}
