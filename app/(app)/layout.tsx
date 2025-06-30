import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/landing-page/navbar";
import Footer from "@/components/landing-page/footer";

export const metadata: Metadata = {
  title: "NextFlash",
  description:
    "Web application for flashcards! Create, study, and share flashcards with ease.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
