import { API } from "../../../Axios";

export const CartService = {
  ADDCart: async (product_id, variant_id) => {
    try {
      const res = await API.post(
        "web/cart",
        { product_id, variant_id },
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
      const res = await API.delete(`/web/cart/${product_index}`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  GetCart: async () => {
    try {
      const res = await API.get("/web/cart", {
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
        `/web/cart/${product_id}`,
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
