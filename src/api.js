import { API } from "../Axios";

// 🔹 Login API

export const loginUser = async (data) => {
  return await API.post("/auth/signin", data);
  // expected: { emailOrPhone, password }
};

// 🔹 Register API
export const registerUser = async (data) => {
  return await API.post("/auth/signup", data);
  // expected: { name, email, phone, password }
};

export const forgotPassword = async (data) => {
  return await API.post("/auth/forgot-password", data);
  // expected: { emailOrPhone }
};

export const otpVerify = async (data) => {
  return await API.post("/auth/verify-otp", data);
  // expected: { emailOrPhone, otp }
};

export const resetPassword = async (data) => {
  return await API.post("/auth/reset-password", data);
  // expected: { emailOrPhone, newPassword, confirmNewPassword }
};

export const updatePassword = async (data, token) => {
  return await API.post("/auth/update-password", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // expected: { oldPassword, newPassword, confirmNewPassword }
};

export const getUserProfile = async (token) => {
  return await API.get("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserProfileUpdate = async (data, token) => {
  return await API.post("/user/update-profile", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
