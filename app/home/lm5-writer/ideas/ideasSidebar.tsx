import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const [isExpanded, setExpanded] = useState(false);
  const { user } = useUser();
  const clerkId = user?.id;

  const toggleExpand = () => setExpanded(!isExpanded);

  const renderConversationItem = (conv, index) => (
    <li
      key={index}
      className="p-2 rounded-md hover:bg-[#1e1e1e] cursor-pointer"
    >
      <div className="font-semibold">{`Conversation ${index + 1}`}</div>
    </li>
  );

  return (
    <div
      className={`pt-[5.5rem] h-full bg-gray-800 text-white p-4 transition-all duration-300 overflow-y-auto fixed right-0 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      style={{ top: 0, bottom: 0, maxHeight: "100vh" }}
    >
      <div className={`mt-5 mb-5 ${isCollapsed ? "hidden" : "block"}`}>
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded-md bg-[#1e1e1e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <div className={`flex flex-col mb-6 ${isCollapsed ? "hidden" : "block"}`}>
        <h2 className="text-sm font-semibold text-gray-400 mb-2">Conversations</h2>
        <ul className="space-y-2 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
          {["Conversation 1", "Conversation 2"].map((conv, index) => renderConversationItem(conv, index))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
