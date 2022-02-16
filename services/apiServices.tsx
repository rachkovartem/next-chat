import axios from 'axios';
import * as bcrypt from 'bcrypt';

const apiServices = () => {
    let email: string | null = null;
    if (typeof window !== "undefined") {
        email = localStorage.getItem('email');
    }

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

    const getData = (id: string) => api.get(`/todo?id=${id}`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      })

    const addItemOnServer = (data: Object) => api.post(`/add`, data)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      })

    const deleteItemOnServer = (id: string) => api.delete(`/delete`, { data: { email, id } })
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      })

    const updateItemOnServer = (id: string, ready: boolean) => api.put(`/update`, { email, id, ready })
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      })

    const changeTextOnServer = (id: string, text: string) => api.put(`/change`, { email, id, text })
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      })

    const getFilteredList = (filter: string): any => api.post(`/filter`, { filter })
      .then((response) => {
        if (!('status' in response)) return response
        if (response.status === 201 ) {
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('id', response.data.id);
          return response.data.list;
        }
        return response
      })
      .catch(async error => {
        console.log('getFilteredListError', error);
        if (error.status === 401 ) {
          return await getFilteredList(filter)
        }
        return error;
      })

    const login = (email: string, password: string) => api.post(`/auth/login`, { email, password })
      .then((response) => {
        return response.data;
      })
      .catch(error => error)

    const register = (email: string, password: string) => api.post(`/register`, { email, password })
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

  const getAllTasks = async (id: string) => {
    return api.get('/getAllTasks', {params: {id},})
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

    return { getData,
      addItemOnServer,
      deleteItemOnServer,
      updateItemOnServer,
      changeTextOnServer,
      getFilteredList,
      login,
      register,
      check,
      getUserById,
      getAllTasks
    }
}

export default apiServices;