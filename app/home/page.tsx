"use client";

import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Main from "@/components/main";
import SignupPopups from "@/components/initial-visit-popups/signup-popups";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { NextPage } from "next";

const Page: NextPage = () => {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true); // Correctly formatted TypeScript generics

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/login");
    }
  }, [isLoaded, userId, router]);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      localStorage.setItem("hasVisited", "true");
    } else {
      setIsFirstVisit(false);
    }
  }, []);

  const handleClose = (): void => {
    setIsFirstVisit(false);
  };

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
      {isFirstVisit && (
        <SignupPopups open={isFirstVisit} handleClose={handleClose} />
      )}
    </>
  );
};

export default Page;
