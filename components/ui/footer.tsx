import Reveal from "@/components/ui/Reveal";
import AnimatedText from "./AnimatedText";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center p-4">
      <Reveal delay={0.1}>
        <div className="w-full max-w-7xl px-6 grid grid-cols-5 gap-10">
          {/* 2/5 Section */}
          <div className="col-span-2">
            <p className="text-sm text-[var(--color-dim)] leading-relaxed font-medium">
              PingMatrix is a powerful and user-friendly tool designed to help
              you monitor and analyze the performance of your network. With its
              intuitive interface and comprehensive features, PingMatrix allows
              you to easily track the latency and uptime of your servers,
              ensuring that your network is running smoothly and efficiently.
            </p>
          </div>

          {/* 3/5 Section */}
          <div className="col-span-3 grid grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-[var(--color-dim)]">
                <li>Home</li>
                <li>Websites</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-[var(--color-dim)]">
                <li>Docs</li>
                <li>API</li>
                <li>Status</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-[var(--color-dim)]">
                <li>About</li>
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="text-center">
          <AnimatedText
            text="PingMatrix"
            className="font-bold text-[14vw] font-brand my-16"
          />
        </div>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="text-center">
          Copyright &copy; {new Date().getFullYear()} PingMatrix. All rights
          reserved.
        </div>
      </Reveal>
    </footer>
  );
};

export default Footer;
