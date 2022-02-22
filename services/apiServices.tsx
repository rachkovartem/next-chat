import axios from 'axios';
import {appendFile} from "fs";

const apiServices = () => {
    const url = 'http://localhost:8080';

    const api = axios.create({
        baseURL: url,
        withCredentials: true,
    });

    const refreshAccessToken = async ():Promise<any> => {
      return await api.get(`/auth/refresh`)
        .then(response => response)
        .catch(error => error)
    }

    const login = (email: string, password: string) => api.post(`/auth/login`, { email, password })
      .then((response) => {
        return response.data;
      })
      .catch(error => error)

    const register = (email: string, password: string, username: string) =>
      api.post(
        `/register`,
        { email, password, username }
      )
      .then((response) => {
        return response.data;
      })
      .catch(error => error)

    const check = () => api.get('/check')
      .then(response => response)
      .catch(error => error)

    const getUserById = async (id: string) => {
      return api.get('/profile', {params: {id},})
        .then(response => response)
        .catch(error => error)
    }

    const getAllUsers = async () => {
      return api.get('/allUsers')
        .then(response => response)
        .catch(error => error)
    }

    const createRoom = async (participants: string[]) => {
      return api.post('/rooms/createRoom', { participants })
        .then(response => response)
        .catch(error => error)
    }

    const friendRequest = async (idUser: string, idFriend: string) => {
      return api.post('/friendRequest', { idUser, idFriend })
        .then(response => response)
        .catch(error => error)
    }

    const uploadImage = async (file: any, id: string) => {
      let data = new FormData();
      data.append('file', file);
      data.append('id', id);
      return api.post('/uploadImage', data, { headers: { 'Content-Type': 'multipart/form-data' }})
        .then(response => response)
        .catch(error => error)
    }

    const getRequests = async (idsArr: string[], id: string) => {
      return api.post('/getRequests', { idsArr, id })
        .then(response => response)
        .catch(error => error)
    }

    api.interceptors.response.use(
      response => Promise.resolve(response),
      async (error) => {
        if (error.response.status === 401) {
          const res = await refreshAccessToken();
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

    return {
      login,
      register,
      check,
      getUserById,
      getAllUsers,
      createRoom,
      uploadImage,
      friendRequest,
      getRequests
    }

}

export default apiServices;