// Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Pages/Layout/Header";
import Footer from "./Pages/Layout/Footer";
import { ScrollToTop } from "./ScrollToTop";
import { useState, useEffect } from "react";

// Mobile Components
import { MobileBottomBar } from "./Component/Mobileview/MobileBottomBar";
import { MobileCategoryModal } from "./Component/Mobileview/MobileCategoryModel";
import { AuthModal } from "./Pages/Web/AuthModal";

export const Layout = () => {
  const location = useLocation();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Pages jahan bottom bar nahi chahiye
  const hideBottomBarPaths = ["/login", "/signup"];

  const showBottomBar =
    isMobile && !hideBottomBarPaths.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      <Header />

      <Outlet />

      <Footer />

      {showBottomBar && (
        <>
          <MobileBottomBar
            onCategoryClick={() => setShowCategoryModal(true)}
            onAuthOpen={() => setShowAuthModal(true)}
          />
          <MobileCategoryModal
            isOpen={showCategoryModal}
            onClose={() => setShowCategoryModal(false)}
          />
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            onLoginSuccess={() => window.location.reload()}
          />
        </>
      )}
    </>
  );
};
