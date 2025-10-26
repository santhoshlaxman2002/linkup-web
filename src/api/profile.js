import axiosInstance from "../utils/axiosInstance";

export const getProfile = async () => {
  const res = await axiosInstance.post("/profiles");
  return res.data;
};
