import React from "react";
import Link from "next/link";
import { NextPage } from "next";

interface ErrorPageProps {
  errorMessage?: string; // Optional prop with default value
  statusCode?: number; // Optional prop with default value
}

const ErrorPage: NextPage<ErrorPageProps> = ({
  errorMessage = "Something went wrong!", // Providing default value
  statusCode = 500, // Providing default value
}) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">{statusCode}</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {errorMessage}
        </h2>
        <p className="text-gray-600 mb-6">
          We&apos;re sorry for the inconvenience. Please try refreshing the
          page, or{" "}
          <Link href="/" className="text-blue-500 hover:underline ml-1">
            go back to the homepage
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
