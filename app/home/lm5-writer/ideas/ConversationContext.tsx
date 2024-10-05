// ConversationContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ConversationContextType {
  selectedConversationId: string | null;
  setSelectedConversationId: (id: string | null) => void;
  isDraftGenerating: boolean;
  setIsDraftGenerating: (status: boolean) => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [isDraftGenerating, setIsDraftGenerating] = useState<boolean>(false);

  return (
    <ConversationContext.Provider
      value={{ selectedConversationId, setSelectedConversationId, isDraftGenerating, setIsDraftGenerating }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
};
