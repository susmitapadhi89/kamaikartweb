import { API } from "../../../Axios";

export const ProductService = {
  GetAllProduct: async (page, limit, main, sub, child) => {
    try {
      const res = await API.post(
        `/product/all-products`,
        {
          page: page,
          limit: limit,
          main,
          sub,
          child,
        },
        {
          withCredentials: true,
        }
      );

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  GetProductByID: async (id) => {
    try {
      const res = await API.get(`/product/details/${id}`, {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
