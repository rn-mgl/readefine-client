import Definition from "@/components/landing/Definition";
import Hero from "@/components/landing/Hero";
import LandingNav from "@/components/landing/LandingNav";
import Offers from "@/components/landing/Offers";
import Purpose from "@/components/landing/Purpose";
import Script from "next/script";

export const metadata = {
  title: "Readefine",
  description:
    "An approach to developing the reading comprehension skills of elementary students in the contemporary world.",
};

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col items-center justify-start">
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-0WXLXZD691"></Script>
      <Script id="google-analytics">
        {`  window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        gtag('config', 'G-0WXLXZD691');`}
      </Script>
      <LandingNav />
      <Hero />
      <Definition />
      <Offers />
      <Purpose />
    </main>
  );
}
