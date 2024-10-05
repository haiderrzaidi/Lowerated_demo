import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { NextPage } from "next";

interface HeaderProps {
  isCollapsed: boolean;
}

const Header: NextPage<HeaderProps> = ({ isCollapsed }) => {
  const { signOut } = useClerk();
  const { isLoaded, user } = useUser();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      drawerRef.current &&
      !drawerRef.current.contains(event.target as Node)
    ) {
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 ${
        isCollapsed ? "left-16" : "left-64"
      } right-0 z-20 flex justify-between items-center p-4 bg-white shadow-md transition-all duration-300`}
    >
      <input
        type="text"
        placeholder="Search"
        className="p-2 border border-gray-300 rounded w-1/3"
      />
      <div className="flex items-center space-x-4">
        <Link
          href="/upgrade"
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Upgrade
        </Link>
        <SignedOut>
          <Link
            href="/sign-in"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </Link>
        </SignedOut>
        <SignedIn>
          {isLoaded && user ? (
            <div className="relative">
              <button
                className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={toggleDrawer}
              >
                <Image
                  src={user.imageUrl || "/default-avatar.png"} // Fallback for missing imageUrl
                  alt="Profile"
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </button>
              {isDrawerOpen && (
                <div
                  ref={drawerRef}
                  className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200"
                >
                  <div className="flex items-center p-4 border-b border-gray-200">
                    <Image
                      src={user.imageUrl || "/default-avatar.png"} // Fallback for missing imageUrl
                      alt="Profile"
                      className="w-12 h-12 rounded-full mb-2 object-cover mr-3"
                      layout="intrinsic"
                      width={48}
                      height={48}
                    />
                    <div className="flex flex-col">
                      <p className="font-bold text-gray-800">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-500 break-all">
                        {user.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                  </div>
                  <ul className="p-2">
                    <li>
                      <Link
                        href={`/user-profile`}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        Account Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/community-profile/${user.username}`}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <FontAwesomeIcon
                          icon={faProjectDiagram}
                          className="mr-2"
                        />
                        Community Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/pricing"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <CurrencyExchangeIcon className="mr-2" />
                        Plans & Payments
                      </Link>
                    </li>
                    <hr className="my-2 border-gray-200" />
                    <li>
                      <button
                        onClick={() => signOut()}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left transition-colors duration-200"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
