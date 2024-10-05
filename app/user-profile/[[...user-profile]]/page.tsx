"use client";

import { UserProfile } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Corrected import from 'next/navigation' to 'next/router'
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { NextPage } from "next"; // Import NextPage for type definition

const UserProfilePage: NextPage = () => {
  const router = useRouter();

  return (
    <div className=" bg-gray-800 flex flex-col justify-center items-center min-h-screen">
      {/* Back Button as Icon */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 p-2 bg-[#1B1F8A] text-white rounded-full shadow-lg hover:bg-[#1B1E6A] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
      >
        <ArrowLeftIcon className="h-6 w-6" />
      </button>

      {/* User Profile */}
      <div className="rounded-lg shadow-xl w-full max-w-4xl h-auto">
        <UserProfile path="/user-profile" />
      </div>
    </div>
  );
};

export default UserProfilePage;
