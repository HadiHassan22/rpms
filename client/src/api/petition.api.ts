import axios from "axios";

const url = "";

export const getPetitions = async () => {
  return axios.get(url + "api/petition");
};

export const getPetitionsByStudent = async (email: String) => {
  return axios.get(url + "api/petition/" + email);
};

export const createPetition = async (body: any) => {
  return axios.post(url + "api/petition", body);
};

export const updatePetition = async (body: any, id: String) => {
  return axios.post(url + "api/petition/edit/" + id, body);
};

export const deletePetition = async (id: String) => {
  return axios.get(url + "api/petition/remove/" + id);
};

export const createStudentGrades = async (body: any) => {
  return axios.post(url + "api/transcript", body);
};

export const getStudentGrades = async (id: String) => {
  return axios.get(url + "api/transcript/" + id);
};

export const getRules = async () => {
  return axios.get(url + "api/rules");
};

export const postRule = async (body: any) => {
  return axios.post(url + "api/rules", body);
};

export const editRule = async (id: String, body: any) => {
  return axios.post(url + "api/rules/edit/" + id, body);
};

export const deleteRule = async (id: String) => {
  return axios.get(url + "api/rules/remove/" + id);
};
