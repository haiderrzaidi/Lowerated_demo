"use client";

import React, { ReactNode } from "react";
import { ConversationProvider } from "./ConversationContext";

interface IdeasLayoutProps {
  children: ReactNode;
}

const IdeasLayout: React.FC<IdeasLayoutProps> = ({ children }) => {
  return (
    <ConversationProvider>
      <div className="flex h-screen bg-white-100">
        <main className="flex-1 bg-white-100">
          {children}
        </main>
      </div>
    </ConversationProvider>
  );
};

export default IdeasLayout;
