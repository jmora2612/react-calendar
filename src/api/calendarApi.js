import axios from "axios";
import { getEnv } from "../helpers";

const { VITE_API_URL } = getEnv();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

/// interceptores

calendarApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`

  return config;
});

export default calendarApi;
