import axios from "axios";
import { loadState } from "./storage";

const request = axios.create({ baseURL: import.meta.env.VITE_URL });

request.interceptors.request.use((req) => {
  const token = loadState("AccessToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token.accessToken}`;
  }
  return req;
});

export { request };
