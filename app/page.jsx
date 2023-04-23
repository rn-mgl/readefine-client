import Definition from "../src/components/landing/Definition";
import Hero from "../src/components/landing/Hero";
import Offers from "../src/components/landing/Offers";
import Purpose from "../src/components/landing/Purpose";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col relative">
      <Hero />
      <Definition />
      <Offers />
      <Purpose />
    </main>
  );
}
