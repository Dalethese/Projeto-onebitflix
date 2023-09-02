/* eslint-disable @next/next/no-img-element */
import HeaderGeneric from "@/src/components/common/HeaderGeneric";
import SpinnerComponent from "@/src/components/common/Spinner";
import useAuth from "@/src/hooks/useAuth";
import courseService, { CourseType } from "@/src/services/courseServices";
import watchEpisodeService from "@/src/services/episodeService";
import { getToken } from "@/src/utils/getToken";
import styles from "@/styles/episodePlayer.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Button, Container } from "reactstrap";

export default function EpisodePlayer() {
  const router = useRouter();
  const [course, setCourse] = useState<CourseType>();
  const [isReady, setIsReady] = useState(false);
  const [getEpisodeTime, setGetEpisodeTime] = useState(0);
  const [episodeTime, setEpisodeTime] = useState(0);
  const { loading } = useAuth();

  const episodeOrder = parseFloat(router.query.id?.toString() || "");
  const episodeId = parseFloat(router.query.episodeId?.toString() || "");
  const courseId = router.query.courseId?.toString() || "";

  const playerRef = useRef<ReactPlayer>(null);

  const handleGetEpisodeTime = async () => {
    const res = await watchEpisodeService.getWatchTime(episodeId);

    if (res.data !== null) {
      setGetEpisodeTime(res.data.seconds);
    }
  };

  const handleSetEpisodeTime = async () => {
    await watchEpisodeService.setWatchTime({
      episodeId,
      seconds: Math.round(episodeTime),
    });
  };

  useEffect(() => {
    handleGetEpisodeTime();
  }, [router]);

  const handlePlayerTime = () => {
    playerRef.current?.seekTo(getEpisodeTime);
    setIsReady(true);
  };

  if (isReady === true) {
    setTimeout(() => {
      handleSetEpisodeTime();
    }, 3000);
  }

  const getCourse = async () => {
    if (typeof courseId !== "string") return;

    const res = await courseService.getEpisodes(courseId);

    if (res.status === 200) {
      setCourse(res.data);
    }
    console.log(res.data);
    console.log(episodeOrder);
  };

  const handlePreviousEpisode = () => {
    router.push(
      `/course/episode/${episodeOrder - 1}?courseId=${courseId}&episodeId=${
        episodeId - 1
      }`
    );
  };
  const handleNextEpisode = () => {
    router.push(
      `/course/episode/${episodeOrder + 1}?courseId=${courseId}&episodeId=${
        episodeId + 1
      }`
    );
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  if (course?.episodes === undefined) return <SpinnerComponent />;

  if (episodeOrder + 1 < course?.episodes?.length) {
    if (Math.round(episodeTime) === course.episodes[episodeOrder].secondsLong) {
      handleNextEpisode();
    }
  }

  if (loading) return <SpinnerComponent />;

  return (
    <>
      <Head>
        <title>Onebitflix - {course.episodes[episodeOrder].name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>

      <main>
        <HeaderGeneric
          logoUrl="/home"
          btnContent="Voltar para o curso"
          btnUrl={`/course/${courseId}`}
        />

        <Container className="d-flex flex-column align-items-center gap-3 pt3">
          <h1 className={styles.episodeTitle}>{course.episodes[episodeOrder].name}</h1>
          {typeof window === "undefined" ? null : (
            <ReactPlayer
              className={styles.player}
              url={`${process.env.NEXT_PUBLIC_BASEURL}/episodes/stream?videoUrl=${
                course.episodes[episodeOrder].videoUrl
              }&token=${getToken()}`}
              controls
              ref={playerRef}
              onStart={handlePlayerTime}
              onProgress={(progress) => {
                setEpisodeTime(progress.playedSeconds);
              }}
            />
          )}

          <div className={styles.episodeButtonsGroup}>
            <Button
              className={styles.episodeButton}
              disabled={episodeOrder === 0 ? true : false}
              onClick={handlePreviousEpisode}
            >
              <img
                src="/episode/iconArrowLeft.svg"
                alt="seta pra esquerda"
                className={styles.arrowImg}
              />
            </Button>
            <Button
              className={styles.episodeButton}
              disabled={episodeOrder + 1 === course.episodes.length ? true : false}
              onClick={handleNextEpisode}
            >
              <img
                src="/episode/iconArrowRight.svg"
                alt="seta pra direita"
                className={styles.arrowImg}
              />
            </Button>
          </div>

          <p className="text-center py-4">{course.episodes[episodeOrder].synopsis}</p>
        </Container>
      </main>
    </>
  );
}
