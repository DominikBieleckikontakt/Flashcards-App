import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar";
import { getCurrentSession } from "@/actions/cookies";
import UserAuthProvider from "@/components/providers/UserStoreProvider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/ui/app-sidebar";

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
  const { user } = await getCurrentSession();

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <UserAuthProvider user={user || null}>
          {/* <Navbar /> */}
          <SidebarProvider className="w-full">
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-sidebar-border">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                </div>
              </header>
              {children}
            </SidebarInset>
          </SidebarProvider>
        </UserAuthProvider>
      </body>
    </html>
  );
}
