import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "./AnimatedText";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 m-auto px-16 fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
<Reveal>
  <p className="font-bold text-3xl font-brand tracking-tight">
    <Link href="/">
      <AnimatedText text="PingMatrix" className="font-bold font-brand" />
    </Link>
  </p>
</Reveal>
      <Reveal delay={0.1}>
        <ul className="flex gap-4 font-medium">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </Reveal>
    </nav>
  );
};

export default Navbar;
