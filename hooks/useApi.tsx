import axios, {AxiosError, AxiosResponse} from "axios";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setRequestLoading} from "../redux/actions";

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
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>('');

  const responseHandler = (response: AxiosResponse, url: string) => {
    // setApiLoading(false);
    dispatch(setRequestLoading(false, url))
    return response
  }

  const errorHandler = (error: AxiosError) => {
    setApiError(error.message);
    setApiLoading(false);
    throw error
  }

  const getRequest = (url: string, params?: object) => {
      // setApiLoading(true);
      dispatch(setRequestLoading(true, url))

      return api.get(url, {params})
        .then(response => responseHandler(response, url))
        .catch(error => errorHandler(error))
    };

  const postRequest = (url: string, data: any, config?: any) => {
      // setApiLoading(true);
    dispatch(setRequestLoading(true, url))
      return api.post(url, data, config)
        .then(response => responseHandler(response, url))
        .catch(error => errorHandler(error))
    };

  const clearApiError = () => setApiError('');

  return { getRequest, postRequest, apiError, apiLoading, clearApiError, setApiLoading }
}