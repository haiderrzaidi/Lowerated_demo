// IdeasPage.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { sendMessageToAPI } from "../../../../api/lm5-writer/ideas/new/route";
import { useUser } from "@clerk/nextjs";
import { useConversation } from "./ConversationContext";
import { Loader2 } from "lucide-react";
import LoadingMessage from './LoadingMessage'; // Adjust the path as necessary

const IdeasPage: React.FC = () => {
  const [textValue, setTextValue] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<{ type: string; text: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const { isLoaded, user } = useUser();
  const { selectedConversationId, isDraftGenerating, setIsDraftGenerating } = useConversation();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textValue]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (textValue.trim() === "" || isSubmitting) return;

    setIsSubmitting(true);

    // Update chat history with user message
    const updatedHistory = [
      ...chatHistory,
      { type: "user", text: textValue },
      { type: "loading", text: "Thinking..." } // Loading message
    ];
    setChatHistory(updatedHistory);
    setTextValue(""); // Clear input immediately

    try {
      // Call API and get bot response
      const botResponse = await sendMessageToAPI(textValue, updatedHistory.slice(0, -1));

      // Add bot response to chat history
      setChatHistory(prev => [
        ...prev.slice(0, -1), // Remove loading message
        { type: "bot", text: botResponse }
      ]);
    } catch (error) {
      console.error("Failed to send message to the API:", error);
      // Handle error
      setChatHistory(prev => [
        ...prev.slice(0, -1), // Remove loading message
        { type: "bot", text: "Sorry, I encountered an error. Please try again." }
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white-100">
      <div className="flex-grow flex justify-center w-full">
        <div className="w-full max-w-3xl h-full flex flex-col p-4 sm:p-6 pt-[4rem] sm:pt-[6rem] bg-white-100">
          {/* Chat Input */}
          <div className="flex-grow overflow-y-auto mb-4 space-y-3 sm:space-y-4" ref={chatContainerRef}>
            {chatHistory.map((chat, index) => (
              <div className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`} key={index}>
                <div
                  className={`
                    ${chat.type === "user"
                      ? "bg-purple-600 text-white ml-4 sm:ml-8"
                      : "bg-gray-200 text-gray-800 mr-4 sm:mr-8"
                    }
                    p-3 sm:p-4 rounded-lg max-w-[85%] sm:max-w-[80%] shadow-md break-words
                  `}
                >
                  {chat.type === "loading" ? (
                    <LoadingMessage />
                  ) : (
                    chat.text.split("\n").map((line, idx) => (
                      <p key={idx} className="min-h-[1em]">
                        {line}
                      </p>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 left-0 right-0 px-2 sm:px-6 pb-4 bg-gradient-to-t from-gray-100 pt-2">
            {/* Textarea and Send Button */}
            <div className="flex gap-2 sm:gap-4 items-end justify-center w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md p-2 sm:p-3">
              <textarea
                ref={textareaRef}
                value={textValue}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={isSubmitting}
                className="flex-grow py-2 px-3 sm:px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none overflow-y-auto max-h-32 w-full rounded-lg text-base sm:text-lg"
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={isSubmitting}
                className={`
                  bg-purple-600 text-white rounded-full p-2 sm:p-3 shadow-lg 
                  hover:bg-purple-700 transition-colors flex-shrink-0
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                ) : (
                  <Image
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    src="/assets/images/lm5-writer/send.svg"
                    alt="Send"
                    width={24}
                    height={24}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeasPage;
