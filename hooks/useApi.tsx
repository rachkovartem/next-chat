import axios, {AxiosRequestHeaders, AxiosRequestConfig} from "axios";

const url = process.env.NEXT_PUBLIC_SERVER_URL ? process.env.NEXT_PUBLIC_SERVER_URL : process.env.SERVER_URL;

const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

api.interceptors.response.use(
  response => Promise.resolve(response),
  async (error) => {
    if (error.response.status === 401) {
      const res = await useApi().getRequest(`/auth/refresh`);
      if ('data' in res && 'access_token' in res.data) {
        localStorage.setItem('access_token', res.data.access_token);
      }
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
      const headers: AxiosRequestHeaders = {};
      headers['Authorization'] = `${localStorage.getItem('access_token')}`;
      return api.get(url, {params, headers})
        .then(response => response)
        .catch(error => error)
    };

  const postRequest = (url: string, data: any, config?: any) => {
      const headers: AxiosRequestHeaders = {};
      headers['Authorization'] = `${localStorage.getItem('access_token')}`;
      const axiosConfig: AxiosRequestConfig = {...config, headers};
      return api.post(url, data, axiosConfig)
        .then(response => response)
        .catch(error => error)
    };

  return { getRequest, postRequest }
}