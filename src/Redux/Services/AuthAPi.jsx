import { API } from "../../../Axios";

export const AuthServices = {
  // Add

  Login: async (data) => {
    try {
      const res = await API.post("/auth/signin", data, {
        credentials: "include",
      });
      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  //Logout

  LogOut: async () => {
    try {
      const res = await API.post("/auth/logout", {
        withCredentials: true,
      });
      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  Register: async (data) => {
    try {
      const res = await API.post("/auth/signup", data);
      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getUserProfile: async () => {
    try {
      const res = await API.get("/auth/profile", {
        withCredentials: true,
      });
      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
