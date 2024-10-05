// src/pages/index.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Main from "@/components/lm5-writer/main";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { NextPage } from "next";

const Page: NextPage = () => {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);

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
    <>
      <Main />
    </>
  );
};

export default Page;
