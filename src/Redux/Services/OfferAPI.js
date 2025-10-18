import { API } from "../../../Axios";

export const OfferBannerService = {
  // Get all banners
  GetOfferBanner: async () => {
    try {
      const res = await API.get("/offer/web", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
