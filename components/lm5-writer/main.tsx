import React from "react";
import ToolCard from "./toolCard";
import { useUser } from "@clerk/nextjs";
import { NextPage } from "next";

// Assuming the ToolCard component has been properly converted to TypeScript
// Here we use it assuming it expects these props
interface ToolCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

const Main: NextPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn || !user) {
    return null;
  }

  return (
    <div className="p-4 pt-24">
      {/* Welcome Message */}
      <h1 className="text-2xl font-bold mb-2">Hello, {user.firstName}</h1>
      <p className="text-gray-600 mb-6">
        Which tool would you like to use today?
      </p>

      {/* Write Your Movie Section */}
      <h2 className="text-xl font-semibold mb-4">Write Your Movie</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <ToolCard
          title="Explore Ideas"
          description="Spark your next story idea in seconds."
          icon="/assets/images/lm5-writer/idea.svg"
          link="/home/lm5-writer/ideas"
        />
        <ToolCard
          title="Book Writer"
          description="Turn your idea into a book with AI writing & outlining."
          icon="/assets/images/lm5-writer/book.svg"
          link="" // Assuming this will be filled later or should be handled if left empty
        />
        <ToolCard
          title="Screenplay Writer"
          description="Start creating characters and dialogue today!"
          icon="/assets/images/lm5-writer/screenplay.svg"
          link="" // Assuming this will be filled later or should be handled if left empty
        />
        <ToolCard
          title="Storyline Converter"
          description="Transform your book into a gripping screenplay."
          icon="/assets/images/lm5-writer/book-to-screenplay.svg"
          link="" // Assuming this will be filled later or should be handled if left empty
        />
      </div>

      {/* Recent Projects Section */}
      <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
      <div className="flex justify-center items-center mb-4">
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
