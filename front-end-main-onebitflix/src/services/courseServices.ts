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
};

export default courseService;
