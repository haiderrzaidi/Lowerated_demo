import React, { useState, useCallback } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import {
  Home as HomeIcon,
  Folder as FolderIcon,
  ExpandLess,
  ExpandMore,
  Create as CreateIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Lightbulb as LightbulbIcon,
  Book as BookIcon,
  Movie as MovieIcon,
  SwapHoriz as SwapHorizIcon,
} from "@mui/icons-material";
import Image from "next/image";
import { NextPage } from "next";

type NavItem = {
  name: string;
  icon: JSX.Element;
  href: string;
};

const navItems: NavItem[] = [
  { name: "Home", icon: <HomeIcon />, href: "/" },
  { name: "Projects", icon: <FolderIcon />, href: "/projects" },
  { name: "Community", icon: <FolderIcon />, href: "/community" },
];

const planAndWriteItems: NavItem[] = [
  {
    name: "Creative Catalyst",
    icon: <LightbulbIcon className="text-white" />,
    href: "/home/lm5-writer/ideas",
  },
  { name: "Book Writer", icon: <BookIcon />, href: "/book-writing" },
  {
    name: "Screenplay Writer",
    icon: <MovieIcon className="text-white" />,
    href: "/screenplay-writing",
  },
  {
    name: "Storyline Converter",
    icon: <SwapHorizIcon className="text-white" />,
    href: "/home/lm5-writer/ideas",
  },
];

type SidebarToggleProps = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

const SidebarToggle: React.FC<SidebarToggleProps> = ({
  isCollapsed,
  toggleSidebar,
}) => (
  <button
    className={`absolute top-4 left-4 transform transition-transform duration-300 ${
      isCollapsed ? "translate-x-0" : "translate-x-48"
    } bg-[#1e1e1e] text-white p-2 rounded-full focus:outline-none hover:bg-gray-700`}
    onClick={toggleSidebar}
    aria-label="Toggle Sidebar"
  >
    {isCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
  </button>
);

type SidebarItemProps = {
  item: NavItem;
  isCollapsed: boolean;
  selectedItem: string;
  handleItemClick: (name: string) => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isCollapsed,
  selectedItem,
  handleItemClick,
}) => (
  <Link href={item.href} passHref>
    <div
      className={`flex items-center p-3 transition-all duration-300 cursor-pointer ${
        isCollapsed ? "justify-center" : "justify-start"
      } ${
        selectedItem === item.name
          ? "bg-[#1e1e1e] text-white"
          : "hover:bg-[#1e1e1e]"
      }`}
      onClick={() => handleItemClick(item.name)}
    >
      <div
        className={`flex items-center justify-center ${
          isCollapsed ? "w-full" : "w-14"
        }`}
      >
        {item.icon}
      </div>
      {!isCollapsed && <span className="ml-4">{item.name}</span>}
    </div>
  </Link>
);

type SidebarProps = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const [selectedItem, setSelectedItem] = useState<string>("Home");
  const [isPlanAndWriteOpen, setIsPlanAndWriteOpen] = useState<boolean>(false);

  const togglePlanAndWrite = useCallback(() => {
    setIsPlanAndWriteOpen((prev) => !prev);
  }, []);

  const handleItemClick = useCallback((item: string) => {
    setSelectedItem(item);
    if (planAndWriteItems.some((i) => i.name === item)) {
      setIsPlanAndWriteOpen(true);
    }
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 h-full transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } bg-gray-800 text-white overflow-y-auto`}
    >
      <SidebarToggle isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col items-center mt-14">
        <Image
          src="/assets/logo/removebg-preview.png"
          alt="Lowerated Logo"
          className="w-12 h-12 rounded-full"
          width={48}
          height={48}
        />
        {!isCollapsed && (
          <h6 className="mt-3 font-semibold tracking-wide">LOWERATED</h6>
        )}
      </div>
      {!isCollapsed && (
        <button className="items-center mt-4 mx-9 py-2 px-4 bg-[#1B1F8A] hover:bg-[#1B1E6A] transition-all duration-300 rounded-full text-white shadow-md focus:outline-none">
          Start a New Project
        </button>
      )}
      <hr className="my-4 border-gray-700" />

      <nav className="mt-4">
        {navItems.map((item) => (
          <SidebarItem
            key={item.name}
            item={item}
            isCollapsed={isCollapsed}
            selectedItem={selectedItem}
            handleItemClick={handleItemClick}
          />
        ))}
        <hr className="my-2 border-gray-700" />
        <div
          className={`flex items-center p-3 transition-all duration-300 cursor-pointer ${
            isCollapsed ? "justify-center" : "justify-start"
          } ${
            isPlanAndWriteOpen
              ? "bg-[#1e1e1e] text-white"
              : "hover:bg-[#1e1e1e]"
          }`}
          onClick={togglePlanAndWrite}
        >
          <div
            className={`flex items-center justify-center ${
              isCollapsed ? "w-full" : "w-14"
            }`}
          >
            <CreateIcon className="text-white" />
          </div>
          {!isCollapsed && (
            <>
              <span className="ml-4">Plan and Write</span>
              <div className="ml-auto">
                {isPlanAndWriteOpen ? <ExpandLess /> : <ExpandMore />}
              </div>
            </>
          )}
        </div>
        <div
          className={`transition-all duration-300 ${
            isPlanAndWriteOpen ? "h-auto" : "h-0"
          } overflow-hidden`}
        >
          {planAndWriteItems.map((item) => (
            <SidebarItem
              key={item.name}
              item={item}
              isCollapsed={isCollapsed}
              selectedItem={selectedItem}
              handleItemClick={handleItemClick}
            />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
