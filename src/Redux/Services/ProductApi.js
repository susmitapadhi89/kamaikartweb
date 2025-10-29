import { API } from "../../../Axios";

export const ProductService = {
  GetAllProduct: async (page, limit, main, sub, child, search) => {
    console.log(page, limit, main, sub, child, search);

    try {
      const res = await API.post(
        `/web/all-products`,
        {
          page: page,
          limit: limit,
          main,
          sub,
          child,
          search,
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
      const res = await API.get(`/web/details/${id}`, {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
