"use client";

import { SignUp } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useUser } from "@clerk/nextjs"; // Correct import of useUser

export function Signup() {
  const { user, isSignedIn, isLoaded } = useUser(); // Use the useUser hook to access user information
  const router = useRouter();

  useEffect(() => {
    const saveUserData = async () => {
      if (user && isSignedIn) {
        try {
          const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clerkId: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              firstName: user.firstName,
              lastName: user.lastName,
              profileImage: user.imageUrl,
            }),
          });

          if (response.ok) {
            console.log("User data saved successfully.");
            router.push("/dashboard");
          } else {
            console.error("Failed to save user data.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        console.log("User is not yet available or not signed in.");
      }
    };

    if (isLoaded) {
      saveUserData();
    }
  }, [user, isSignedIn, isLoaded, router]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:flex flex-1 items-center justify-center bg-gray-300">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Image
            src="/assets/images/signup-screen-image.svg"
            alt="Illustration"
            width={450}
            height={450}
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-white p-4 md:p-8 relative z-10">
        <div className="absolute inset-0 bg-white rounded-l-[100px] md:rounded-none"></div>
        <div className="w-full max-w-md relative z-20">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex items-center justify-center">
              <Image
                src="/assets/logo/svgs/logo_black.svg"
                alt="logo-black"
                width={128}
                height={128}
                className="object-cover rounded-full"
              />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-center mt-4">
              Welcome to Lowerated Writer
            </h1>
            <p className="text-center text-muted-foreground mt-2">
              Let's Turn Your Ideas into Stories
            </p>
            <div className="pt-6">
              <SignUp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
