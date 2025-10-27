import { API } from "../../../Axios";

export const CategoryService = {
  GetAllCategories: async () => {
    try {
      const res = await API.get("/web/megaMenu", {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
