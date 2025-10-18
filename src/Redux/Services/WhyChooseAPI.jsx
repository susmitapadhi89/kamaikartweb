import { API } from "../../../Axios";

export const WHyChooseService = {
  // GetAllWhyChoose
  GetAllWhyChoose: async (token) => {
    try {
      const res = await API.get("/whyChoose", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  AddWhyChoosedata: async (data, token) => {
    try {
      const res = await API.post("/whyChoose", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
