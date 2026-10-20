import axios, { type AxiosError } from "axios";

import type { ApiErrorBody } from "../types";
import { ApiError } from "./errors";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

http.interceptors.response.use(undefined, (err: AxiosError<ApiErrorBody>) => {
  if (!err.response) {
    return Promise.reject(
      new ApiError(0, "NETWORK", "No se pudo conectar con el servidor"),
    );
  }

  const { status, data } = err.response;

  return Promise.reject(
    new ApiError(
      status,
      data?.error?.code ?? "UNKNOWN",
      data?.error?.message ?? "Error inesperado",
    ),
  );
});

export { http };
