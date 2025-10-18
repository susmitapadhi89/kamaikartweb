import { API } from "../../../Axios";

export const PaymentService = {
  // Get all banners
  PaymentList: async () => {
    try {
      const res = await API.get("/paymentMethod/web", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
