import api  from "../lib/axios/axiosCreate";
export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
}


export const getUserRepos = async (
  username: string | undefined,
  page: number = 1,
  sort: string = "updated",
  order: string = "desc",
  per_page: number = 10,
): Promise<GithubRepo[]> => {
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
