import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",       //URL from env file
  withCredentials: true,                                //cookies allow
}); 

export default instance;