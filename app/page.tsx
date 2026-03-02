import { TopSitesTable } from "@/components/TopSitesTable";
import ContactForm from "@/components/ContactForm";
import { HomeHero } from "@/components/HomeHero";

export default function Home() {

  return (
    <div>
      <HomeHero />
      <TopSitesTable />
      <ContactForm />
    </div>
  );
}
