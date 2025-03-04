import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProjectSidebar } from "@/components/Sidebar/ProjectSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Manager",
  description: "A modern project management application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          <ProjectSidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
