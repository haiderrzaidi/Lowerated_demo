"use client";

import React, { useState, ReactNode } from "react";
import Sidebar from "./ideasSidebar";
import { ConversationProvider } from "./ConversationContext";

interface IdeasLayoutProps {
  children: ReactNode;
}

const IdeasLayout: React.FC<IdeasLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <ConversationProvider>
      <div className="flex h-screen">
        <main
          className={`flex-1 bg-gray-100 transition-all duration-300 ${
            isSidebarCollapsed ? "mr-16" : "mr-64"
          }`}
        >
          {children}
        </main>
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
      </div>
    </ConversationProvider>
  );
};

export default IdeasLayout;