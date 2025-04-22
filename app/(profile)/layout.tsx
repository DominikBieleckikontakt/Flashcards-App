import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar";
import { getCurrentSession } from "@/actions/cookies";
import { redirect } from "next/navigation";
import UserAuthProvider from "@/components/providers/UserStoreProvider";

export const metadata: Metadata = {
  title: "Your profile",
  description: "Here you can manage your profile",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <UserAuthProvider user={user}>
          <Navbar />
          {children}
        </UserAuthProvider>
      </body>
    </html>
  );
}
