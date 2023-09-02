import { getToken } from "../utils/getToken";
import api from "./api";

interface watchTimeParams {
  episodeId: number;
  seconds: number;
}

const watchEpisodeService = {
  getWatchTime: async (episodeId: number) => {
    const token = getToken();

    const res = await api
      .get(`/episodes/${episodeId}/watchTime`, {
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
  setWatchTime: async ({ episodeId, seconds }: watchTimeParams) => {
    const token = getToken();

    const res = await api
      .post(
        `/episodes/${episodeId}/watchTime`,
        { seconds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        console.log(err.response);
        return err.response;
      });

    return res;
  },
};

export default watchEpisodeService;
