import LandingLogoHead from "@/components/global/LandingLogoHead";

export const metadata = {
  title: "Readefine | Admittance",
  description: "Readefine Admittance",
};

const RootLayout = ({ children }) => {
  return (
    <main>
      <div className="text-prmColor">
        <LandingLogoHead />
      </div>
      {children}
    </main>
  );
};

export default RootLayout;
