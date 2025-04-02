import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Your profile",
  description: "Here you can manage your profile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
