import { API } from "../../../Axios";

export const AddressService = {
  ADDAddress: async (addressdata) => {
    try {
      const res = await API.post("/web/address", addressdata, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },

  UpdateAddress: async (address_id, addressdata) => {
    try {
      const res = await API.post(
        `/web/address/${address_id}`,
        addressdata,
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  GetAllAddress: async () => {
    try {
      const res = await API.get("/web/address", {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  GetSingleAddress: async (address_id) => {
    try {
      const res = await API.get(`/web/address/${address_id}`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  DeleteAddress: async (address_id) => {
    try {
      const res = await API.delete(`/web/address/${address_id}`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
