import Definition from "@/components/landing/Definition";
import Hero from "@/components/landing/Hero";
import LandingNav from "@/components/landing/LandingNav";
import Offers from "@/components/landing/Offers";
import Purpose from "@/components/landing/Purpose";

export const metadata = {
  title: "Readefine",
  description:
    "An approach to developing the reading comprehension skills of elementary students in the contemporary world.",
};

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col items-center justify-start">
      <LandingNav />
      <Hero />
      <Definition />
      <Offers />
      <Purpose />
    </main>
  );
}
