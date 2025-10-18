import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaHeart,
  FaShoppingBag,
  FaSearch,
  FaChevronDown,
  FaTachometerAlt,
  FaBoxOpen,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import { AuthModal } from "../Web/AuthModal";
import { Navigation } from "../../Component/Header/CategoryNavigation.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../Redux/Features/AuthenticationServicesSlice.js";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.AuthOpration);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //const [searchQuery, setSearchQuery] = useState("");

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   setIsLoggedIn(false);
  //   setUser(null);
  //   setDropdownOpen(false);
  //   navigate("/");
  // };

  const handleLogout = async () => {
    try {
      await dispatch(Logout()).unwrap();
      setDropdownOpen(false);
      toast.success("Logout SuccessFull");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="w-full sticky top-0 z-40 bg-white">
      {/* Main Header */}
      <div className="bg-white shadow-sm px-4 lg:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 no-underline">
          <img src="/Logo.png" alt="Logo" className="h-8 lg:h-10" />
          <span className="font-bold text-lg lg:text-xl text-gray-800">
            Kamai Kart
          </span>
        </Link>

        {/* Search Bar - Hidden on mobile  only lg screen mate*/}
        <div className="hidden lg:flex flex-1 mx-4 lg:mx-8 max-w-2xl">
          <input
            type="text"
            placeholder="Search product"
            className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:border-[#C71F46]"
          />
          <button className="bg-[#C71F46] text-white px-6 rounded-r-md hover:bg-[#A51A3A] transition-colors">
            <FaSearch />
          </button>
        </div>

        {/* Right section - Different for mobile and desktop */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Wishlist - Hidden on mobile */}
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `relative cursor-pointer  ${
                isActive ? "text-[#C71F46]" : "text-gray-600"
              }`
            }
          >
            <FaHeart size={22} className="lg:size-[22px] text-red-600 " />
          </NavLink>

          {/* Cart - Visible on both */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative cursor-pointer ${
                isActive ? "text-[#C71F46]" : "text-gray-600"
              }`
            }
          >
            <FaShoppingBag
              size={22}
              className="lg:size-[22px] text-grey-600 "
            />
          </NavLink>

          {/* Login / User - Hidden on mobile (will be in bottom bar) */}
          {!isMobile &&
            (!isLoggedIn ? (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="hidden lg:flex items-center gap-2 text-gray-700 hover:text-[#C71F46] transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
              >
                <FaUser size={18} />
                <span className="font-medium">Login</span>
              </button>
            ) : (
              <div className="hidden lg:block relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-[#C71F46] transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
                >
                  <img
                    src={
                      user?.data?.profileImage ||
                      "https://demo.readyecommerce.app/default/profile.jpg"
                    }
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-gray-200"
                  />
                  <span className="font-medium max-w-32 truncate">
                    {user?.name || "User"}
                  </span>
                  <FaChevronDown
                    className={`transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    size={12}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <button
                      onClick={() => {
                        navigate("/dashboard");
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors text-left"
                    >
                      <FaTachometerAlt className="text-gray-500" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        navigate("/orders");
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors text-left"
                    >
                      <FaBoxOpen className="text-gray-500" />
                      Order History
                    </button>
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors text-left"
                    >
                      <FaUser className="text-gray-500" />
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate("/change-password");
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors text-left"
                    >
                      <FaKey className="text-gray-500" />
                      Change Password
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <FaSignOutAlt className="text-red-500" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Navigation - Only on desktop */}
      <div className="hidden lg:block bg-white border-b w-full sticky top-0 z-40">
        <Navigation />
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={() => {
          setIsAuthOpen(false);
        }}
      />
    </header>
  );
};

export default Header;
