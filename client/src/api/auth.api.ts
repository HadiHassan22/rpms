import axios from "axios";

export const register = async (body: any) => {
  return axios.post("api/register", body);
};

export const login = async (body: any) => {
  return axios.post("api/login", body);
};
