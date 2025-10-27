import { API } from "../../../Axios";

export const OrderService = {
  // Get all banners
  Orderpost: async (orderData) => {
    try {
      const res = await API.post("/web/orderplace", orderData, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  OrderGet: async () => {
    try {
      const res = await API.get("/web/orderhistory", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  OrderGetByID: async (orderid) => {
    try {
      const res = await API.get(`/web/order/${orderid}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  CancleOrder: async (orderData) => {
    try {
      const res = await API.post("/web/ordercancel", orderData, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  CancleOrderReasondata: async () => {
    try {
      const res = await API.get("/web/cancelReason", {
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

      const res = await API.post("/web/orderplace", orderData, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
