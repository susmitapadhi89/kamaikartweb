import { API } from "../../../Axios";

export const WishlistService = {
  AddtoWishlist: async (product_id) => {
    try {
      const res = await API.post(
        `/product/wishlistweb/`,
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

  GetAllWishlist: async () => {
    try {
      const res = await API.get(`/product/wishlistweb`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  DeleteWishlist: async (productid) => {
    try {
      const res = await API.delete(`/product/wishlistweb/${productid}`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
