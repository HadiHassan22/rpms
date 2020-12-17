import axios from "axios";

export const register = async (body: any) => {
  return axios.post("api/register", body);
};

export const login = async (body: any) => {
  return axios.post("api/login", body);
};

export const getUsers = async () => {
  return axios.get("api/users");
};

export const updateUser = async (id: String, body: any) => {
  return axios.post("api/users/edit/" + id, body);
};
