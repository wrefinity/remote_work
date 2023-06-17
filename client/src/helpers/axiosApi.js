import axios from "axios";

const axiosRequest = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

export default axiosRequest;