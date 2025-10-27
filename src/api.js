import { API } from "../Axios";

// 🔹 Login API

export const loginUser = async (data) => {
  return await API.post("/web/signin", data);
  // expected: { emailOrPhone, password }
};

// 🔹 Register API
export const registerUser = async (data) => {
  return await API.post("/web/signup", data);
  // expected: { name, email, phone, password }
};

export const forgotPassword = async (data) => {
  return await API.post("/web/forgot-password", data);
  // expected: { emailOrPhone }
};

export const otpVerify = async (data) => {
  return await API.post("/web/verify-otp", data);
  // expected: { emailOrPhone, otp }
};

export const resetPassword = async (data) => {
  return await API.post("/web/reset-password", data);
  // expected: { emailOrPhone, newPassword, confirmNewPassword }
};

export const updatePassword = async (data, token) => {
  return await API.post("/web/update-password", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // expected: { oldPassword, newPassword, confirmNewPassword }
};

export const getUserProfile = async (token) => {
  return await API.get("/web/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserProfileUpdate = async (data, token) => {
  return await API.post("/web/update-profile", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
