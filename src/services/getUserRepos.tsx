import api from "../lib/axios/axiosCreate";
import { IGithubRepo } from "../types/IGithubRepo/IGithubRepo";

export const getUserRepos = async (
  username: string | undefined,
  page: number = 1,
  sort: string = "updated",
  order: string = "desc",
  per_page: number = 10
): Promise<IGithubRepo[]> => {
  const response = await api.get(`/users/${username}/repos`, {
    params: {
      sort,
      direction: order,
      per_page,
      page,
    },
  });
  return response.data;
};
