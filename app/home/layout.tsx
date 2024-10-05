"use client";

import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Correct import for useRouter
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  layoutType: string;
}

const fontHeading = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({
  children,
  layoutType,
}) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in");
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || !userId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Player
          src="./lottie/reel_loader.json"
          className="player"
          loop
          autoplay
          style={{ height: "var(--loader-size)", width: "var(--loader-size)" }}
        />
      </div>
    );
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div
      className={cn(
        "antialiased min-h-screen flex",
        fontHeading.variable,
        fontBody.variable
      )}
    >
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <Header isCollapsed={isSidebarCollapsed} />
        <main className="bg-gray-100 flex-1 transition-all duration-300">
          <div className={`${layoutType}`}>{children}</div>
        </main>
      </div>
    </div>
  );
};

interface LayoutWrapperProps {
  children: React.ReactNode;
  layoutType?: string;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
  layoutType = "default-container",
}) => {
  return <ProtectedLayout layoutType={layoutType}>{children}</ProtectedLayout>;
};

export default LayoutWrapper;
