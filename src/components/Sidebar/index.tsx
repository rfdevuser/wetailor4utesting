"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { IoBookmark } from "react-icons/io5";
import { BsFillHandbagFill, BsHouseFill } from "react-icons/bs";
import { FaSpa, FaHospital, FaHotel, FaSchool } from "react-icons/fa";
import { MdFoodBank, MdOutlineCorporateFare } from "react-icons/md";
import { BsBrilliance } from "react-icons/bs";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

interface NavigationItem {
  name: string;
  link: string;
  category?: string; // Add category to NavigationItem
}

interface SidebarProps {
  navigationData: NavigationItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ navigationData }) => {
  const [currentRoute, setCurrentRoute] = useState("Home");
  const [expanded, setExpanded] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const renderIcon = useCallback((element: NavigationItem) => {
    switch (element.name) {
      case "Home":
        return <BsHouseFill />;
      case "Blouse Designs":
      case "Main Fabric Store":
      case "Lining Fabric Store":
        return <BsFillHandbagFill />;
      case "Saved":
        return <BsFillHandbagFill />;
      case "BEAUTY & SPA":
        return <BsFillHandbagFill />;
      case "HOSPITAL":
        return <BsFillHandbagFill />;
      case "HOTEL":
        return <BsFillHandbagFill />;
      case "RESTAURANT & BAR":
        return <BsFillHandbagFill />;
      case "SCHOOL UNIFORMS":
        return <BsFillHandbagFill/>;
      case "COLLEGE UNIFORMS":
        return <BsFillHandbagFill />;
      case "CORPORATE UNIFORMS":
        return <BsFillHandbagFill />;
        case"My Account":
        return <BsBrilliance />;
        case"Saved Address":
        return <BsBrilliance />;
        case"Order History":
        return <BsBrilliance />;
        case"Terms and Policy":
        return <BsBrilliance />;
        case"Send Your Fabric":
        return <BsBrilliance/>
        case"Custom Room":
        return <BsBrilliance />;
      default:
        return <BsFillHandbagFill />;
    }
  }, []);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Group navigation items by category
  const groupedNavigationData = navigationData.reduce((acc, item) => {
    const category = item.category || "Setting";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, NavigationItem[]>);

  return (
    <nav
      ref={sidebarRef}
      className={classNames([
        "fixed left-0 top-0 bottom-0 z-50 bg-[#f1f5f9] flex flex-col justify-between items-center py-6 rounded-tr-4xl rounded-br-4xl",
        expanded ? "w-60" : "w-14",
        "overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200",
      ])}
    >
      <span
        className="transform transition duration-300 hover:scale-110 hower:shadow-xl text-3xl text-black-800 hover:text-gray-800 cursor-pointer"
        onClick={toggleSidebar}
      >
        ☰
      </span>
      <span className="text-4xl text-gray-800 transform transition duration-300 hover:scale-110 hower:shadow-xl mt-8">
        <Link href='/'>
          <Image src="/images/logo/logo-4u.png" alt="wetailor4u_logo" width={80} height={60} />
        </Link>
      </span>
      <ul className="flex flex-col items-left w-full">
        {Object.entries(groupedNavigationData).map(([category, items]) => (
          <React.Fragment key={category}>
            {/* Show category name only when expanded */}
            {expanded && (
              <h3 className="text-lg font-bold text-red-600 mt-4 ml-2">{category}</h3>
            )}
            {/* Add a visual cue when collapsed */}
            {!expanded && (
              <div className="border-b border-gray-300 w-full my-2"></div>
            )}
            {items.map((element, index) => (
              <li
                key={index}
                className={classNames([
                  "text-black-800 hover:text-gray-800 text-xl py-5 cursor-pointer",
                  currentRoute === element.name && "text-blue-600 hover:text-blue-700",
                ])}
              >
                <Link href={element.link}
                  onClick={() => setCurrentRoute(element.name)}
                  className={classNames([
                    "relative flex items-center",
                    expanded ? "justify-left pl-6" : "justify-center",
                  ])}
                >
                  {renderIcon(element)}
                  <span
                    className={classNames([
                      "text-base font-medium transition duration-100 hover:scale-110 hower:shadow-xl",
                      expanded ? "ml-2" : "hidden",
                    ])}
                  >
                    {element.name}
                  </span>
                </Link>
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <div className="flex flex-col justify-between items-center">{/* Bell icon */}</div>
    </nav>
  );
};

export default Sidebar;
