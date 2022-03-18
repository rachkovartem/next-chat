import axios, {AxiosError, AxiosResponse} from "axios";
import {useDispatch} from "react-redux";
import {setRequestError} from "../redux/actions";

const url = 'http://localhost:8080';
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
  const dispatch = useDispatch();

  const responseHandler = (response: AxiosResponse, url: string) => {
    return response
  }

  const errorHandler = (error: AxiosError) => {
    dispatch(setRequestError(error.message));
    throw error
  }

  const getRequest = (url: string, params?: object) => {
      return api.get(url, {params})
        .then(response => responseHandler(response, url))
        .catch(error => errorHandler(error))
    };

  const postRequest = (url: string, data: any, config?: any) => {
      return api.post(url, data, config)
        .then(response => responseHandler(response, url))
        .catch(error => errorHandler(error))
    };

  const clearApiError = () => dispatch(setRequestError(null));

  return { getRequest, postRequest, clearApiError }
}