import Definition from "../src/components/landing/Definition";
import Hero from "../src/components/landing/Hero";
import Offers from "../src/components/landing/Offers";
import Purpose from "../src/components/landing/Purpose";
import LandingLogo from "../src/components/global/LandingLogo";

export const metadata = {
  title: "Readefine",
  description:
    "An approach to developing the reading comprehension skills of elementary students in the contemporary world.",
};

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col relative">
      <div className="text-accntColor">
        <LandingLogo />
      </div>
      <Hero />
      <Definition />
      <Offers />
      <Purpose />
    </main>
  );
}
