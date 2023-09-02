import { getToken } from "../utils/getToken";
import api from "./api";

export type EpisodesType = {
  id: number;
  name: string;
  synopsis: string;
  order: number;
  videoUrl: string;
  secondsLong: number;
};

export type CourseType = {
  id: number;
  name: string;
  synopsis: string;
  thumbnailUrl: string;
  episodes?: EpisodesType[];
};

const courseService = {
  getNewestCourses: async () => {
    const response = await api.get("/courses/newest").catch((err) => {
      console.log(err.response.data.message);
      return err.response;
    });

    return response;
  },

  getFeatured: async () => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .get("/courses/featured", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.message);
        return error.response;
      });

    return res;
  },

  getFav: async () => {
    const token = sessionStorage.getItem("onebitflix-token");
    const res = await api
      .get("/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err.response.data.message);
        return err.response;
      });

    return res;
  },

  addToFav: async (courseId: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .post(
        `/favorites`,
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => {
        console.log(error.response.data.message);
        return error.response;
      });

    return res;
  },

  removeFav: async (courseId: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .delete(`/favorites/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { courseId },
      })
      .catch((error) => {
        console.log(error.response.data.message);
        return error.response;
      });

    return res;
  },

  search: async (name: string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .get(`/courses/search?name=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.message);
        return error.response;
      });

    return res;
  },

  getEpisodes: async (id: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .get(`/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.message);
        return error.response;
      });

    return res;
  },

  like: async (courseId: number | string) => {
    const token = getToken();

    const res = await api
      .post(
        "/likes",
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => {
        console.log(error.response.data.message);
        return error.response;
      });

    return res;
  },

  removeLike: async (courseId: number | string) => {
    const token = getToken();

    const res = await api
      .delete(`/likes/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.message);
        return error.response;
      });

    return res;
  },
};

export default courseService;
