import { CourseType, EpisodesType } from "@/src/services/courseServices";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";

interface EpisodeListProps {
  episode: EpisodesType;
  course: CourseType;
}

function EpisodeList({ episode, course }: EpisodeListProps) {
  const router = useRouter();

  const handleSecondsToMin = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const toString = (num: number) => num.toString().padStart(2, "0");

    return `${toString(minutes)}:${toString(seconds)}`;
  };

  const handleEpisodePlayer = () => {
    router.push(
      `/course/episode/${episode.order - 1}?courseId=${course.id}&episodeId=${episode.id}`
    );
  };

  return (
    <>
      <Link
        href={`/course/episode/${episode.order - 1}?courseId=${course.id}&episodeId=${
          episode.id
        }`}
      >
        <div className={styles.episodeCard}>
          <div className={styles.episodeOrderTime}>
            <p className={styles.episodeOrder}>Episódio Nº {episode.order}</p>
            <p className={styles.episodeTime}>
              {handleSecondsToMin(episode.secondsLong)}
            </p>
          </div>
          <div className={styles.episodeTitleDescription}>
            <p className={styles.episodeTitle}>{episode.name}</p>
            <p className={styles.episodeDescription}>{episode.synopsis}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default EpisodeList;
