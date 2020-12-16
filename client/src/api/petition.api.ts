import axios from "axios";

export const getPetitions = async () => {
  return axios.get("app-299.herokuapp.com/api/petition");
};

export const getPetitionsByStudent = async (email: String) => {
  return axios.get("app-299.herokuapp.com/api/petition/" + email);
};

export const createPetition = async (body: any) => {
  return axios.post("app-299.herokuapp.com/api/petition", body);
};

export const updatePetition = async (body: any, id: String) => {
  return axios.post("app-299.herokuapp.com/api/petition/edit/" + id, body);
};

export const deletePetition = async (id: String) => {
  return axios.get("app-299.herokuapp.com/api/petition/remove/" + id);
};

export const createStudentGrades = async (body: any) => {
  return axios.post("app-299.herokuapp.com/api/transcript", body);
};

export const getStudentGrades = async (id: String) => {
  return axios.get("app-299.herokuapp.com/api/transcript/" + id);
};

export const getRules = async () => {
  return axios.get("app-299.herokuapp.com/api/rules");
};

export const postRule = async (body: any) => {
  return axios.post("app-299.herokuapp.com/api/rules", body);
};
