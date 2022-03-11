import axios from "axios";
import {useState} from "react";


export const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const url = 'http://localhost:8080';
  const api = axios.create({
    baseURL: url,
    withCredentials: true,
  });

  const getRequest = async (url: string, params?: object) => {
    return await api.get(url, {params})
      .then(response => response)
      .catch(error => {
        setError(error)
        return error
      })
  }

  const postRequest = async (url: string, data: any) => {
    return api.post(url, data)
      .then(response => response)
      .catch(error => {
        setError(error)
        return error
      })
  }

  return { getRequest, postRequest}
}