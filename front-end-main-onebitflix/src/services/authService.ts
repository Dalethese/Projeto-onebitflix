import { HttpStatusCode } from "axios";
import api from "./api";

interface RegisterParams {
  firstName: string;
  lastName: string;
  phone: string;
  birth: string;
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  status: HttpStatusCode;
}

const authService = {
  register: async (params: RegisterParams) => {
    const res = await api.post("/auth/register", params).catch((error) => {
      if (error.response.status === 400) {
        return error.response;
      }

      return error;
    });

    return res;
  },

  login: async (params: LoginParams): Promise<LoginResponse> => {
    const res = await api.post("/auth/login", params).catch((error) => {
      return error.response;
    });

    if (res.status === 200) {
      sessionStorage.setItem("onebitflix-token", res.data.token);
    }

    return res;
  },
};

export default authService;
