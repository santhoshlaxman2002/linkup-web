import axiosInstance from "../utils/axiosInstance";

export const generateUsername = async (firstName, lastName) => {
  const res = await axiosInstance.post("/auth/generate-username", {
    firstName,
    lastName,
  });
  return res.data;
};

export const validateUsername = async (username) => {
  const res = await axiosInstance.post("/auth/validate-username", { username });
  return res.data;
};
