import { API } from "../../../Axios";

export const CartService = {
  ADDCart: async (product_id) => {
    try {
      const res = await API.post(
        "/cart/add",
        { product_id },
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  DeleteCart: async (product_index) => {
    try {
      const res = await API.delete(`/cart/${product_index}`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  GetCart: async () => {
    try {
      const res = await API.get("/cart", {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  UpdateCartQuentity: async (product_id, quantity) => {
    try {
      const res = await API.put(
        `/cart/${product_id}`,
        { quantity },
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
