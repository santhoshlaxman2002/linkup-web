import axiosInstance from "../utils/axiosInstance";

export const fetchUserProfile = async () => {
  const res = await axiosInstance.get("/profiles");
  return res.data;
};
