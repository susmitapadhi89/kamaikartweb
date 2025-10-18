import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthModal } from "../../Pages/Web/AuthModal";

export const ProtectedRoute = () => {
  const isAuth = localStorage.getItem("isLoggedIn") === "true";
  const [showAuthModal, setShowAuthModal] = useState(!isAuth);

  if (!isAuth) {
    return (
      <>
        {showAuthModal && (
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            onLoginSuccess={() => {
              setShowAuthModal(false);
            }}
          />
        )}
        {/* fallback redirect if modal is closed without login */}
        {!showAuthModal && <Navigate to="/home" replace />}
      </>
    );
  }

  return <Outlet />; // ✅ allow access if logged in
};
