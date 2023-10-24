import LandingLogoHead from "@/components/global/LandingLogoHead";

export const metadata = {
  title: "Readefine | Sign Up",
  description: "Readefine Sign Up",
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
