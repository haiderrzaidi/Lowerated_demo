import React from "react";
import ToolCard from "./toolCard";
import { useUser } from "@clerk/nextjs";
import { NextPage } from "next";

const Main: NextPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  // Optional: Adding an explicit check if user object has the necessary property to prevent TypeScript errors.
  if (!user?.firstName) {
    return <p>Loading...</p>; // or any other fallback UI
  }

  return (
    <div className="p-6 pt-24">
      <h1 className="text-2xl font-bold mb-2">Hello, {user.firstName}</h1>

      <p className="text-gray-600 mb-6">
        Which tool would you like to use today?
      </p>

      <h2 className="text-xl font-semibold mb-4">Filmmaking Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <ToolCard
          title="Lowerated Writer"
          description="Give words to your ideas."
          icon="/assets/images/lm5-writer.svg"
          link="/home/lm5-writer/"
        />
      </div>

      <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
      <div className="flex justify-center items-center">
        <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-2xl">📄</span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-gray-500">No Listed Projects</p>
      </div>
    </div>
  );
};

export default Main;
