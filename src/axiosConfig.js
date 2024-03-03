import axios from "axios";

const user = JSON.parse(localStorage.getItem("loggedUser"));
let token = user ? user.token : '';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`
  }
});

instance.interceptors.request.use(
  (request) => {
    // Edit request config
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // Edit response config
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
