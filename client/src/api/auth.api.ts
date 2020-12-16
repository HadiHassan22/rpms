import axios from "axios";

export const register = async (body: any) => {
  return axios.post("api-299.herokuapp.com/api/register", body);
};

export const login = async (body: any) => {
  return axios.post("api-299.herokuapp.com/api/login", body);
};

export const getUsers = async () => {
  return axios.get("api-299.herokuapp.com/api/users");
};

export const updateUser = async (id: String, body: any) => {
  return axios.post("api-299.herokuapp.com/api/users/edit/" + id, body);
};
