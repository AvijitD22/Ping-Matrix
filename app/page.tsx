import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TopSitesTable } from "@/components/TopSitesTable";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-[70vw] text-center space-y-8">
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            Monitor Your Website Uptime Instantly
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Enter your website URL below and start tracking uptime, response
            time, and reliability in seconds. No login required.
          </p>

          {/* Form */}
          <form className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-3xl mx-auto">
            <Input
              type="text"
              placeholder="https://yourwebsite.com"
              className="h-12 text-base"
            />
            <Button type="submit" className="h-12 px-8 text-base font-semibold">
              Start Monitoring
            </Button>
          </form>
        </div>
      </div>
      <TopSitesTable />
      <ContactForm />
    </div>
  );
}
