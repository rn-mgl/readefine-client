import HeadNav from "@/src/head/global/HeadNav";

export const metadata = {
  title: "Readefine | Archives",
  definition: "Readefine's archives.",
};

export default function RootLayout({ children }) {
  return (
    <main>
      <HeadNav />
      {children}
    </main>
  );
}
