import { API } from "../../../Axios";

export const OrderService = {
  // Get all banners
  Orderpost: async (orderData) => {
    try {
      const res = await API.post("/order/place", orderData, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  OrderGet: async () => {
    try {
      const res = await API.get("/order/history", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  OrderGetByID: async (orderid) => {
    try {
      const res = await API.get(`/order/${orderid}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  CancleOrder: async (orderData) => {
    try {
      const res = await API.post("/order/cancel", orderData, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  CancleOrderReasondata: async () => {
    try {
      const res = await API.get("/cancelReason/web", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  Reorder: async (orderData) => {
    try {
      console.log(orderData, "orderapi");

      const res = await API.post("/order/place", orderData, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
