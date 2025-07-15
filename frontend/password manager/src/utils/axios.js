import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",        // tumhare backend ka base URL
  withCredentials: true,                       // Yeh line allow karti hai cookies send/receive karna — JWT token backend se frontend me aayega aur frontend se wapas jayega.
});

export default instance;