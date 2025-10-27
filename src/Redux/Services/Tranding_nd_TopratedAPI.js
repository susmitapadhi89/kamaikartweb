import { API } from "../../../Axios";

export const Tranding_nd_TopratedService = {
  // GetAllRolevalue
  GetAllTrandingProduct: async () => {
    try {
      const res = await API.get("/web/trending-product");

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  GetAllTopratedProduct: async () => {
    try {
      const res = await API.get("/web/top-rated");

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
