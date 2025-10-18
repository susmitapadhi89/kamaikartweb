import React, { useState } from "react";

import { X } from "lucide-react";
import LoginModal from "./Modal/LoginModal.jsx";
import RegisterModal from "./Modal/RegisterModal.jsx";
import ForgotPasswordModal from "./Modal/ForgotPasswordModal.jsx";
import toast from "react-hot-toast";
import OtpModal from "./Modal/OtpModal.jsx";
import ResetPasswordModal from "./Modal/ResetPasswordModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  Login,
  Register,
} from "../../Redux/Features/AuthenticationServicesSlice.js";

export const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState("login"); // login | register | forgot
  const [form, setForm] = useState({});
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  // const [email, setEmail] = useState("");
  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);

  //     if (mode === "login") {
  //       const res = await loginUser({
  //         identifier: form.emailOrPhone,
  //         password: form.password,
  //       });

  //       localStorage.setItem("token", res.data.data.accessToken);
  //       toast.success("Login successful!");
  //       //alert("Login successful!");
  //       if (onLoginSuccess) {
  //         onLoginSuccess(); // hide login, show profile
  //       } else {
  //         onClose(); // fallback
  //       }
  //     } else if (mode === "register") {
  //       await registerUser({
  //         name: form.name,
  //         email: form.email,
  //         phone: form.phone,
  //         password: form.password,
  //         role_id: 4,
  //       });
  //       toast.success("Register successful!");
  //       //alert("Register successful!");
  //       onClose();
  //     } else if (mode === "forgot") {
  //       const res = await forgotPassword({ email: form.email });
  //       //alert(res.data.message || "OTP sent to your email/phone!");
  //       toast.success(res.data.message || "OTP sent to your email/phone!");
  //       setEmail(res.data.data);
  //       setMode("otp"); // 👉 move to OTP step
  //     } else if (mode === "otp") {
  //       // await verifyOtp({ email: form.email, otp: form.otp });
  //       await otpVerify({ email: email, otp: form.otp });
  //       toast.success("OTP verified!");
  //       setMode("reset"); // 👉 move to Reset step
  //     } else if (mode === "reset") {
  //       // await resetPassword({ email: form.email, password: form.password });
  //       await resetPassword({ email: email, newPassword: form.password });
  //       toast.success("Password changed successfully!");
  //       setMode("login"); // back to login
  //     }

  //     setForm({});
  //   } catch (err) {
  //     console.error(err);
  //     //alert(err.response?.data?.message || "Something went wrong!");
  //     toast.error(err.response?.data?.message || "Something went wrong!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   if (mode === "login") {
    //     await dispatch(
    //       Login({
    //         identifier: form.emailOrPhone,
    //         password: form.password,
    //       })
    //     ).unwrap();
    //     toast.success("Login successful!");
    //     if (onLoginSuccess) {
    //       onLoginSuccess(); // ✅ only close if success
    //     } else {
    //       onClose();
    //     }
    //     setForm({});
    //   } else if (mode === "register") {
    //     await dispatch(Register({ ...form, role_id: 4 })).unwrap();
    //     toast.success("Register successful!");
    //     onClose();

    //     setForm({});
    //   }
    // } catch (err) {
    //   toast.error(err);
    // }

    try {
      setLoading(true);
      if (mode === "login") {
        await dispatch(
          Login({
            identifier: form.emailOrPhone,
            password: form.password,
          })
        ).unwrap();

        toast.success("Login successful!");
        onLoginSuccess?.(); // only call on success
        setForm({});
      } else if (mode === "register") {
        await dispatch(Register({ ...form, role_id: 4 })).unwrap();
        toast.success("Register successful!");
        onClose();
        setForm({});
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Login failed!";
      toast.error(message); // show toast
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-2xl shadow-xl w-[90%] sm:w-full max-w-md sm:max-w-lg md:${
          mode === "login"
            ? "max-w-md"
            : mode === "register"
            ? "max-w-2xl"
            : "max-w-md"
        } p-6 relative`}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === "login" && "Welcome! Please Login"}
          {mode === "register" && "Create an Account"}
          {mode === "forgot" && "Forgot Password"}
          {mode === "otp" && "Enter OTP"}
          {mode === "reset" && "Set New Password"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "login" && (
            <LoginModal
              form={form}
              handleChange={handleChange}
              setMode={setMode}
              loading={loading}
            />
          )}

          {mode === "register" && (
            <RegisterModal
              form={form}
              handleChange={handleChange}
              loading={loading}
            />
          )}

          {mode === "forgot" && (
            <ForgotPasswordModal
              form={form}
              handleChange={handleChange}
              loading={loading}
            />
          )}

          {mode === "otp" && (
            <OtpModal
              form={form}
              handleChange={handleChange}
              loading={loading}
            />
          )}

          {mode === "reset" && (
            <ResetPasswordModal
              form={form}
              handleChange={handleChange}
              loading={loading}
            />
          )}
        </form>

        {/* Toggle link */}
        {mode !== "forgot" && (
          <p className="text-center text-sm text-gray-600 mt-4">
            {mode === "login"
              ? "Don’t have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-blue-600 hover:underline"
            >
              {mode === "login" ? "Sign Up" : "Log In"}
            </button>
          </p>
        )}
        {mode === "forgot" && (
          <p className="text-center text-sm text-gray-600 mt-4">
            Remembered your password?{" "}
            <button
              onClick={() => setMode("login")}
              className="text-blue-600 hover:underline"
            >
              Back to Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
};
