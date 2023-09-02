import { useState } from "react";
import courseService, { CourseType } from "../services/courseServices";

interface useCoursePageProps {
  id: number | string;
}

export default function useCoursePage({ id }: useCoursePageProps) {
  const [course, setCourse] = useState<CourseType>();
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const getCourse = async () => {
    if (typeof id !== "string") return;

    const res = await courseService.getEpisodes(id);

    if (res.status === 200) {
      setCourse(res.data);
      setLiked(res.data.liked);
      setFavorited(res.data.favorited);
    }
  };

  const handleLikeCourse = async () => {
    if (liked === true) {
      await courseService.removeLike(+id!);
      setLiked(false);
    } else {
      await courseService.like(+id!);
      setLiked(true);
    }
  };
  const handleFavCourse = async () => {
    if (favorited === true) {
      await courseService.removeFav(+id!);
      setFavorited(false);
    } else {
      await courseService.addToFav(+id!);
      setFavorited(true);
    }
  };

  return {
    states: { course, liked, favorited },
    functions: {
      getCourse,
      handleLikeCourse,
      handleFavCourse,
    },
  };
}
