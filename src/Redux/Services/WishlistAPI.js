import { API } from "../../../Axios";

export const WishlistService = {
  AddtoWishlist: async (product_id) => {
    try {
      const res = await API.post(
        `/web/wishlist/`,
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
      const res = await API.get(`/web/wishlist`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  DeleteWishlist: async (productid) => {
    try {
      const res = await API.delete(`/web/wishlist/${productid}`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
