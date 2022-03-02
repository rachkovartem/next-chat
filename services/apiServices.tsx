import axios from 'axios';
const Compress = require('compress.js');

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
    return api.get('/getUserById', {params: {id},})
      .then(response => response)
      .catch(error => error)
  }

  const findUser = async (option: string, id: string) => {
    return api.get('/findUser', {params: {option, id},})
      .then(response => response)
      .catch(error => error)
  }

  const removeFriend = async (idUser: string, idFriend: string) => {
    return api.post('/removeFriend',  {idUser, idFriend})
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

    const createGroupRoom = async (members: {username: string, id: string}[], idUser: string) => {
      return api.post('/rooms/createGroupRoom', { members, idUser })
        .then(response => response)
        .catch(error => error)
    }

    const getRoomInfo = (id: string) => {
      return api.post('/rooms/getRoomInfo',{ id })
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

    const getRequests = async (friendReqsArr: string[], userId: string) => {
      return api.post('/getRequests', { friendReqsArr, userId })
        .then(response => response)
        .catch(error => error)
    }

    const approveFriendReq = async (idUser: string, idFriend: string, idReq: string) => {
        return api.post('/approveFriendReq', { idUser, idFriend, idReq })
            .then(response => response)
            .catch(error => error)
    }

  const rejectFriendReq = async (idUser: string, idFriend: string, idReq: string) => {
    return api.post('/rejectFriendReq', { idUser, idFriend, idReq })
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
      getRequests,
      approveFriendReq,
      rejectFriendReq,
      findUser,
      removeFriend,
      createGroupRoom,
      getRoomInfo
    }

}

export default apiServices;