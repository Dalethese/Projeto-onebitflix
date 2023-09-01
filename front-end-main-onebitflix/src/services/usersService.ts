import api from "./api";

export interface IUser {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

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

  userUpdate: async (params: IUser) => {
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
};

export default usersService;
