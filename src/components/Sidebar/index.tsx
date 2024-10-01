"use client"
import React, { useState, useCallback, useEffect, useRef } from "react";
import { IoLogoEdge, IoBookmark } from "react-icons/io5";
import {
  BsImageFill,
  BsFillHandbagFill,
  BsFillStarFill,
  BsHouseFill,
  
} from "react-icons/bs";
import { FaSpa ,FaHospital ,FaHotel ,FaSchool , } from "react-icons/fa";

import { MdFoodBank ,MdOutlineCorporateFare  } from "react-icons/md";
import { RiSettings4Fill } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

interface NavigationItem {
  name: string;
  link: string;
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
        return <BsFillHandbagFill />;
      case "Main Fabric Store":
        return <BsFillHandbagFill />;
      case "Lining Fabric Store":
        return <BsFillHandbagFill />;
      case "Saved":
        return <IoBookmark />;
        case "BEAUTY & SPA":
          return <FaSpa />;
          case "HOSPITAL":
            return <FaHospital  />;
            case "HOTEL":
              return <FaHotel   />;
              case "RESTAURANT & BAR":
                return <MdFoodBank    />;
                case "SCHOOL UNIFORMS":
                  return <FaSchool     />;
                  case "COLLEGE UNIFORMS":
                    return <FaSchool     />;
                    case "CORPORATE UNIFORMS":
                      return <MdOutlineCorporateFare      />;
      default:
        return null;
    }
  }, []);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      console.log('Clicked outside');
      setExpanded(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  
  return (
    <nav
    ref={sidebarRef}
    className={classNames([
      "fixed left-0 top-0 bottom-0 z-50 bg-[#f1f5f9] flex flex-col justify-between items-center py-6 rounded-tr-4xl rounded-br-4xl",
      expanded ? "w-40" : "w-14",
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
        <Image src="/images/logo/logo-4u.png" alt="wetailor4u_logo" width={80} height={60} />
      </span>
      <ul className="flex flex-col items-left w-full">
        {navigationData.map((element, index) => (
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
      </ul>
      <div className="flex flex-col justify-between items-center">{/* Bell icon */}</div>
    </nav>
  );
};

export default Sidebar;
