import type { Metadata } from "next";
import "../globals.css";

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
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
