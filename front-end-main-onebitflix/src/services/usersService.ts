import { HttpStatusCode } from "axios";
import { getToken } from "../utils/getToken";
import api from "./api";

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birth: string;
  password: string;
  role: "admin" | "user";
  createdAt: string;
}

interface PasswordParams {
  currentPassword: string;
  newPassword: string;
}

type UpdateUserProps = Pick<IUser, "firstName" | "lastName" | "email" | "phone">;

const usersService = {
  getUser: async (): Promise<IUser> => {
    const token = sessionStorage.getItem("onebitflix-token");

    const response = await api
      .get("/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .catch((error) => {
        console.log(error.response.data.message);
        return error.response;
      });

    return response.data;
  },

  userUpdate: async (params: UpdateUserProps) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const response = await api
      .put("/users/current", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 401) {
          return error.response;
        }
      });

    return response;
  },

  passwordUpdate: async (params: PasswordParams): Promise<HttpStatusCode> => {
    const token = getToken();

    const res = await api
      .put("users/current/password", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 400) {
          return error.response;
        }
      });

    return res.status;
  },
};

export default usersService;
