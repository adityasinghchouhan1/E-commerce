import axios from "axios";

const API_URL = "http://localhost:8008/api"; // change if deployed

export const createCoupon = async (couponData) => {
  try {
    const res = await axios.post(`${API_URL}/create-coupon`, couponData);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
