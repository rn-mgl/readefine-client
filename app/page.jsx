import LandingFill1 from "../src/components/landing/LandingFill1";
import LandingFill2 from "../src/components/landing/LandingFill2";
import LandingFill3 from "../src/components/landing/LandingFill3";
import LandingHero from "../src/components/landing/LandingHero";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col relative">
      <LandingHero />
      <LandingFill1 />
      <LandingFill2 />
      <LandingFill3 />
    </main>
  );
}
