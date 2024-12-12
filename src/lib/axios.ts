import { NEXT_PUBLIC_BASE_URL_API } from "@/config";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_BASE_URL_API,
});
