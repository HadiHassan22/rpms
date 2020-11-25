import axios from "axios";

export const getPetitions = async () => {
  return axios.get("api/petition");
};

export const createPetition = async (body: any) => {
  return axios.post("api/petition", body);
};

export const updatePetition = async (body: any, id: String) => {
  return axios.post("api/petition/edit/" + id, body);
};

export const createStudentGrades = async (body: any) => {
  return axios.post("api/transcript", body);
};

export const getRules = async () => {
  return axios.get("api/rules");
};

export const postRule = async (body: any) => {
  return axios.post("api/rules", body);
};
