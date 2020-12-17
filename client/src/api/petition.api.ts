import axios from "axios";

export const getPetitions = async () => {
  return axios.get("api/petition");
};

export const getPetitionsByStudent = async (email: String) => {
  return axios.get("api/petition/" + email);
};

export const createPetition = async (body: any) => {
  return axios.post("api/petition", body);
};

export const updatePetition = async (body: any, id: String) => {
  return axios.post("api/petition/edit/" + id, body);
};

export const deletePetition = async (id: String) => {
  return axios.get("api/petition/remove/" + id);
};

export const createStudentGrades = async (body: any) => {
  return axios.post("api/transcript", body);
};

export const getStudentGrades = async (id: String) => {
  return axios.get("api/transcript/" + id);
};

export const getRules = async () => {
  return axios.get("api/rules");
};

export const postRule = async (body: any) => {
  return axios.post("api/rules", body);
};
