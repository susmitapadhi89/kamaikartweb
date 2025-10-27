import { API } from "../../../Axios";

export const BannerService = {
  GetAllBanner: async () => {
    try {
      const res = await API.get("/web/banner", {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
