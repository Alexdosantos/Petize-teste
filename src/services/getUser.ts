import api from "../lib/axios/axiosCreate";
import { IGithubUserProps } from "../types/IGithubUserProps/IGithubUserProps";

export const getUser = async (username: string | undefined): Promise<IGithubUserProps> => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
