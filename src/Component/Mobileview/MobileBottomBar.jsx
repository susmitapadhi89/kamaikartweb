// // MobileBottomBar.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   FaHome,
//   FaThList,
//   FaShoppingBag,
//   FaUser,
//   FaSearch,
// } from "react-icons/fa";

// export const MobileBottomBar = ({ onCategoryClick, onAuthOpen }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("isLoggedIn");
//     setIsLoggedIn(!!token);
//   }, []);

//   return (
//     <>
//       {/* Mobile Search Bar */}

//       {/* Mobile Bottom Navigation */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg h-16 flex items-center px-2 pb-safe">
//         <div className="flex justify-around w-full">
//           {/* Home */}
//           <button
//             onClick={() => navigate("/home")}
//             className={`flex flex-col items-center justify-center min-w-[60px]${
//               location.pathname === "/home" ? "text-[#C71F46]" : "text-gray-600"
//             }`}
//           >
//             <FaHome size={20} />
//             <span className="text-xs mt-1">Home</span>
//           </button>

//           {/* Category */}
//           <button
//             onClick={onCategoryClick}
//             className="flex flex-col items-center justify-center min-w-[60px] text-gray-600"
//           >
//             <FaThList size={20} />
//             <span className="text-xs mt-1">Category</span>
//           </button>

//           {/* Cart */}
//           <button
//             onClick={() => navigate("/cart")}
//             className={`flex flex-col items-center justify-center min-w-[60px] relative ${
//               location.pathname === "/cart" ? "text-[#C71F46]" : "text-gray-600"
//             }`}
//           >
//             <FaShoppingBag size={20} />
//             <span className="text-xs mt-1">Cart</span>
//           </button>

//           {/* Account */}
//           <button
//             onClick={() => (isLoggedIn ? navigate("/profile") : onAuthOpen())}
//             className={`flex flex-col items-center justify-center min-w-[60px] ${
//               location.pathname === "/profile"
//                 ? "text-[#C71F46]"
//                 : "text-gray-600"
//             }`}
//           >
//             <FaUser size={20} />
//             <span className="text-xs mt-1">Account</span>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaThList,
  FaShoppingBag,
  FaUser,
  FaSearch,
  FaHeart,
  FaHistory,
  FaCog,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaLock,
  FaChevronDown,
} from "react-icons/fa";

export const MobileBottomBar = ({ onCategoryClick, onAuthOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);

  // Profile menu items
  const profileMenuItems = [
    { name: "Dashboard", icon: <FaUser size={16} />, link: "/dashboard" },
    { name: "Order History", icon: <FaHistory size={16} />, link: "/orders" },
    { name: "Wishlist", icon: <FaHeart size={16} />, link: "/wishlist" },
    { name: "Message", icon: <FaTicketAlt size={16} />, link: "/messages" },
    { name: "My Profile", icon: <FaUser size={16} />, link: "/profile" },
    {
      name: "Manage Address",
      icon: <FaMapMarkerAlt size={16} />,
      link: "/address",
    },
    {
      name: "Support Ticket",
      icon: <FaTicketAlt size={16} />,
      link: "/support",
    },
    {
      name: "Change Password",
      icon: <FaLock size={16} />,
      link: "/change-password",
    },
  ];
  useEffect(() => {
    const token = localStorage.getItem("isLoggedIn");

    setIsLoggedIn(!!token);

    // Set active item based on current path
    const path = location.pathname;
    if (path === "/home") setActiveItem("home");
    else if (path === "/cart") setActiveItem("cart");
    else if (path === "/wishlist") setActiveItem("wishlist");
    else if (path === "/orders") setActiveItem("orders");
    else if (profileMenuItems.some((item) => item.link === path))
      setActiveItem("profile");
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      onAuthOpen();
    } else {
      setShowProfileMenu(!showProfileMenu);
    }
  };

  const handleMenuItemClick = (link) => {
    navigate(link);
    setShowProfileMenu(false);
  };

  const mainMenuItems = [
    {
      id: "home",
      name: "Home",
      icon: <FaHome size={20} />,
      action: () => navigate("/home"),
    },
    {
      id: "categories",
      name: "Category",
      icon: <FaThList size={20} />,
      action: onCategoryClick,
    },
    {
      id: "cart",
      name: "Cart",
      icon: <FaShoppingBag size={20} />,
      action: () => navigate("/cart"),
      showBadge: true,
    },
    {
      id: "wishlist",
      name: "Wishlist",
      icon: <FaHeart size={20} />,
      action: () => navigate("/wishlist"),
    },
  ];

  return (
    <>
      {/* Profile Dropdown Menu */}
      {showProfileMenu && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div
            ref={menuRef}
            className="bg-white rounded-t-2xl w-full max-h-[70vh] overflow-y-auto animate-slide-up"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
              <img
                src="https://demo.readyecommerce.app/default/profile.jpg"
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-900">Demos</h3>
                <p className="text-sm text-gray-500">01000000405</p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              {profileMenuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuItemClick(item.link)}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.link
                      ? "bg-pink-100 text-pink-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-gray-500">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </div>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  setIsLoggedIn(false);
                  setShowProfileMenu(false);
                  navigate("/home");
                }}
                className="w-full bg-red-50 text-red-600 py-3 rounded-lg font-medium text-sm hover:bg-red-100 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg h-16">
        <div className="flex justify-around items-center h-full px-2 pb-safe">
          {mainMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center min-w-[60px] p-2 transition-all duration-200 ${
                activeItem === item.id
                  ? "text-[#C71F46] transform scale-105"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.showBadge && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 font-medium">{item.name}</span>

              {activeItem === item.id && (
                <div className="w-1 h-1 bg-[#C71F46] rounded-full mt-1"></div>
              )}
            </button>
          ))}

          {/* Profile Button with Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={handleProfileClick}
              className={`flex flex-col items-center justify-center min-w-[60px] p-2 transition-all duration-200 ${
                activeItem === "profile" || showProfileMenu
                  ? "text-[#C71F46] transform scale-105"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <div className="relative">
                <FaUser size={20} />
                {showProfileMenu && (
                  <FaChevronDown
                    size={12}
                    className="absolute -bottom-1 -right-1 text-[#C71F46]"
                  />
                )}
              </div>
              <span className="text-xs mt-1 font-medium">Account</span>

              {(activeItem === "profile" || showProfileMenu) && (
                <div className="w-1 h-1 bg-[#C71F46] rounded-full mt-1"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for animation */}
      <style jsx>{`
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
};
