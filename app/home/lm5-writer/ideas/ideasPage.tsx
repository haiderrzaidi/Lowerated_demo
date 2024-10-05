import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { sendMessageToAPI } from "../../../../api/lm5-writer/ideas/new/route";
import { useUser } from "@clerk/nextjs";
import { useConversation } from "./ConversationContext";

const IdeasPage = () => {
  const [textValue, setTextValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { isLoaded, user } = useUser();
  const { selectedConversationId, isDraftGenerating, setIsDraftGenerating } = useConversation();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textValue]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (textValue.trim() === "") return;

    // Update chat history with user message first
    const updatedHistory = [
      ...chatHistory,
      { type: "user", text: textValue }
    ];
    setChatHistory(updatedHistory);

    try {
      // Call API and get bot response
      const botResponse = await sendMessageToAPI(textValue, updatedHistory);

      // Update chat history with bot response
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "bot", text: botResponse }
      ]);
    } catch (error) {
      console.error("Failed to send message to the API:", error);
    }

    // Clear input after sending message
    setTextValue("");
  };

  const formatMessageText = (text) => {
    return text.split("\n").map((line, index) => (
      <p key={index}>
        {line}
      </p>
    ));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-3xl h-full flex flex-col p-6 pt-[6rem]">
          {!chatHistory.length && (
            <div className="text-center max-w-3xl mb-10 mx-auto">
              <Image
                src="/assets/images/lm5-writer/idea.svg"
                alt="Icon"
                width={80}
                height={80}
                className="mb-6 mx-auto"
              />
              <h1 className="text-4xl font-bold mb-4">Welcome to Creative Catalyst</h1>
              <p className="text-xl text-gray-700">
                Hit a wall? We've all been there. Don't worry, we'll be your brainstorming partner,
                offering exciting ideas to help you craft your cinematic vision.
              </p>
            </div>
          )}
          <div
            className="flex-grow overflow-y-auto mb-4 space-y-4 pr-4"
            ref={chatContainerRef}
          >
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`${
                    chat.type === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  } p-4 rounded-lg max-w-[70%] shadow-md whitespace-pre-wrap`}
                >
                  {formatMessageText(chat.text)}
                </div>
              </div>
            ))}
          </div>
          <div className="sticky bottom-4 left-0 right-0 px-6">
            <div className="flex gap-4 items-center justify-center w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md p-2">
              <textarea
                ref={textareaRef}
                value={textValue}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-grow py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none overflow-y-auto max-h-32 w-full rounded-lg"
                rows="1"
              />
              <button
                onClick={handleSendMessage}
                className="bg-purple-600 text-white rounded-full p-3 shadow-lg hover:bg-purple-700 transition-colors flex-shrink-0"
              >
                <Image
                  className="w-6 h-6"
                  src="/assets/images/lm5-writer/send.svg"
                  alt="Send Icon"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeasPage;