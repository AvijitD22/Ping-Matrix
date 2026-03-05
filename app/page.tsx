import { TopSitesTable } from "@/components/TopSitesTable";
import ContactForm from "@/components/ContactForm";
import { HomeHero } from "@/components/HomeHero";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <div>
      <Reveal delay={0.2}>
        <HomeHero />
      </Reveal>
      <Reveal delay={0.2}>
        <TopSitesTable />
      </Reveal>
      <Reveal delay={0.2}>
        <ContactForm />
      </Reveal>
    </div>
  );
}


