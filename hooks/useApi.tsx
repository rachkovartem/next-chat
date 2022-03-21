import axios from "axios";

const url = process.env.NEXT_PUBLIC_SERVER_URL ? process.env.NEXT_PUBLIC_SERVER_URL : process.env.SERVER_URL;

console.log('process.env', process.env)

const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

api.interceptors.response.use(
  response => Promise.resolve(response),
  async (error) => {
    if (error.response.status === 401) {
      const res = await useApi().getRequest(`/auth/refresh`);
      if (res.status === 403) {
        return Promise.reject(res);
      }
      return Promise.reject(error.response)
    }
    if (error.response.status === 403) {
      return Promise.reject(error.response);
    }
    return Promise.reject(error);
  });

export const useApi = () => {

  const getRequest = (url: string, params?: object) => {
      return api.get(url, {params})
        .then(response => response)
        .catch(error => error)
    };

  const postRequest = (url: string, data: any, config?: any) => {
      return api.post(url, data, config)
        .then(response => response)
        .catch(error => error)
    };


  return { getRequest, postRequest }
}