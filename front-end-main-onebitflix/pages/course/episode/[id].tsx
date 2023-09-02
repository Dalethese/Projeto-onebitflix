/* eslint-disable @next/next/no-img-element */
import HeaderGeneric from "@/src/components/common/HeaderGeneric";
import courseService, { CourseType } from "@/src/services/courseServices";
import { getToken } from "@/src/utils/getToken";
import styles from "@/styles/episodePlayer.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Button, Container } from "reactstrap";

export default function EpisodePlayer() {
  const router = useRouter();
  const [course, setCourse] = useState<CourseType>();
  const episodeOrder = parseFloat(router.query.id?.toString() || "");
  const courseId = router.query.courseId?.toString() || "";

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
    router.push(`/course/episode/${episodeOrder - 1}?courseId=${courseId}`);
  };
  const handleNextEpisode = () => {
    router.push(`/course/episode/${episodeOrder + 1}?courseId=${courseId}`);
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  if (course?.episodes === undefined) return <h1>{"<PageSpinner />"}</h1>;

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
              url={`${process.env.NEXT_PUBLIC_BASEURL}/episodes/stream?videoUrl=${
                course.episodes[episodeOrder].videoUrl
              }&token=${getToken()}`}
              controls
              className={styles.player}
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
