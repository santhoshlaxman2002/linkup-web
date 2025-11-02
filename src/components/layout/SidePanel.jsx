import React, { useState, useEffect, useCallback } from "react";
import { Layout, Menu, Avatar } from "antd";
import {
  AiFillHome,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineHeart,
} from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import LinkUpLogo from "../../assets/logo-erased.png";

const { Sider } = Layout;

// Define the screen width below which the sidebar should collapse
const RESPONSIVE_COLLAPSE_BREAKPOINT = 1300; // px

export default function SidePanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(window.innerWidth < RESPONSIVE_COLLAPSE_BREAKPOINT);

  // Collapse/expand automatically on window resize based on breakpoint
  const handleResize = useCallback(() => {
    if (window.innerWidth < RESPONSIVE_COLLAPSE_BREAKPOINT) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // set initial state as well, in case window size changes after mount
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const { user } = useSelector((state) => state.profile);

  const menuItems = [
    { key: "/home", icon: <AiFillHome size={24} />, label: "Home" },
    { key: "/search", icon: <AiOutlineSearch size={24} />, label: "Search" },
    {
      key: "/messages",
      icon: <AiOutlineMessage size={24} />,
      label: "Message",
    },
    {
      key: "/notifications",
      icon: <AiOutlineHeart size={24} />,
      label: "Notification",
    },
  ];

  const profileItem = {
    key: "/profile",
    icon: (
      <Avatar size={30} src={user?.profile_image_url} className="bg-blue-500" />
    ),
    label: "Profile Section",
  };

  return (
    <Sider
      width={280}
      collapsedWidth={80}
      collapsed={collapsed}
      className="bg-white border-r border-gray-200 shadow-lg transition-all duration-300"
      theme="light"
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1000,
        boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
      }}
    >
      {/* Collapse Toggle */}
      <div
        className={`flex p-4 cursor-pointer hover:text-blue-600 ${
          collapsed ? "justify-center" : "justify-end"
        }`}
        onClick={() => setCollapsed((prev) => !prev)}
      >
        {collapsed ? <HiOutlineMenu size={20} /> : <HiOutlineX size={24} />}
      </div>

      {/* Logo Section */}
      <div className="flex items-center justify-center p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300">
        {!collapsed ? (
          <div
            className="text-gray-900 text-2xl font-bold hover:text-blue-600 transition-colors duration-300"
            style={{ fontFamily: "cursive" }}
          >
            LinkUp
          </div>
        ) : (
          <div className="flex justify-center">
            <img src={LinkUpLogo} alt="LinkUp Logo" className="w-[30px] h-[24px]" />
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-4 pb-32">
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          className="bg-transparent border-none"
          style={{ background: "transparent" }}
          theme="light"
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
            onClick: () => navigate(item.key),
            style: {
              color: location.pathname === item.key ? "#1f2937" : "#6b7280",
              backgroundColor:
                location.pathname === item.key
                  ? "rgba(59, 130, 246, 0.12)"
                  : "transparent",
              fontWeight: location.pathname === item.key ? "600" : "normal",
              marginBottom: "2px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              transition: "all 0.25s ease-in-out",
              cursor: "pointer",
              width: "95%",
            },
            className:
              "text-start hover:bg-gray-100 hover:bg-opacity-70 hover:translate-x-[2px] hover:shadow-sm hover:scale-[1.02]",
          }))}
        />
      </div>

      {/* Profile Section */}
      <div className="absolute bottom-0 left-0 right-0 pb-6">
        <div
          onClick={() => navigate(profileItem.key)}
          className={`
        flex items-center gap-3 px-5 py-4 hover:bg-gray-100 hover:bg-opacity-70 hover:translate-x-1 hover:shadow-sm cursor-pointer transition-all duration-300
        ${
          location.pathname === profileItem.key
            ? "bg-blue-100 text-gray-900 font-semibold"
            : "text-gray-500"
        }
      `}
          style={{
            width: "95%",
            borderRadius: "10px",
          }}
        >
          {profileItem.icon}
          {!collapsed && <span>{profileItem.label}</span>}
        </div>
      </div>
    </Sider>
  );
}
