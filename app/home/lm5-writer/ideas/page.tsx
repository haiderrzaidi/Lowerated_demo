// Lowerated_Demo/app/home/lm5-writer/ideas/page.tsx
"use client";

import React, { useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import IdeasPage from "./ideasPage";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { NextPage } from "next";

const Page: NextPage = () => {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/login");
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

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <IdeasPage 
      // selectedConversationId={id}
      />
    </div>
  );
};

export default Page;
