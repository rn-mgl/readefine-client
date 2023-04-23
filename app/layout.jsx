import { Mukta, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../src/components/global/navbar";

export const metadata = {
  title: "Readefine",
  description:
    "An approach to developing the reading comprehension skills of elementary students in the contemporary world.",
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "auto",
  subsets: ["latin"],
  variable: "--font-poppins",
});

const mukta = Mukta({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "auto",
  subsets: ["latin"],
  variable: "--font-mukta",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${mukta.variable} transition-all`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
