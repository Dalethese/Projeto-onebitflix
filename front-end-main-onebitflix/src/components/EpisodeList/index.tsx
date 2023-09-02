import { EpisodesType } from "@/src/services/courseServices";
import styles from "./styles.module.scss";

interface EpisodeListProps {
  episode: EpisodesType;
}

function EpisodeList({ episode }: EpisodeListProps) {
  const handleSecondsToMin = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const toString = (num: number) => num.toString().padStart(2, "0");

    return `${toString(minutes)}:${toString(seconds)}`;
  };

  return (
    <>
      <div className={styles.episodeCard}>
        <div className={styles.episodeOrderTime}>
          <p className={styles.episodeOrder}>Episódio Nº {episode.order}</p>
          <p className={styles.episodeTime}>{handleSecondsToMin(episode.secondsLong)}</p>
        </div>
        <div className={styles.episodeTitleDescription}>
          <p className={styles.episodeTitle}>{episode.name}</p>
          <p className={styles.episodeDescription}>{episode.synopsis}</p>
        </div>
      </div>
    </>
  );
}

export default EpisodeList;
