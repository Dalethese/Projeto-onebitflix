/* eslint-disable @next/next/no-img-element */
import EpisodeList from "@/src/components/EpisodeList";
import Footer from "@/src/components/common/footer";
import HeaderAuth from "@/src/components/common/headerAuth";
import useCoursePage from "@/src/hooks/useCoursePage";
import courseService, { CourseType } from "@/src/services/courseServices";
import styles from "@/styles/coursePage.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Button } from "reactstrap";

export default function CoursePage() {
  const router = useRouter();
  const id = router.query.id;
  const {
    states: { course, liked, favorited },
    functions: { getCourse, handleFavCourse, handleLikeCourse },
  } = useCoursePage({ id: id as string });

  useEffect(() => {
    getCourse();
  }, [id]);

  return (
    <>
      <Head>
        <title>Onebitflix - {course && course.name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>

      <main>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #6666661a, #151515),
	  url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "450px",
          }}
        >
          <HeaderAuth />

          <Container className={styles.courseInfo}>
            <p className={styles.courseTitle}>{course?.name}</p>
            <p className={styles.courseDescription}>{course?.synopsis}</p>
            <Button
              className={styles.courseBtn}
              outline
              disabled={course?.episodes?.length === 0 ? true : false}
            >
              ASSISTIR AGORA!
              <img src="/buttonPlay.svg" alt="buttonImg" className={styles.buttonImg} />
            </Button>

            <div className={styles.interactions}>
              {liked === false ? (
                <img
                  src="/course/iconLike.svg"
                  alt="likeImage"
                  className={styles.interactionImages}
                  onClick={handleLikeCourse}
                />
              ) : (
                <img
                  src="/course/iconLiked.svg"
                  alt="likedImage"
                  className={styles.interactionImages}
                  onClick={handleLikeCourse}
                />
              )}

              {favorited === false ? (
                <img
                  onClick={handleFavCourse}
                  src="/course/iconAddFav.svg"
                  alt="addFav"
                  className={styles.interactionImages}
                />
              ) : (
                <img
                  onClick={handleFavCourse}
                  src="/course/iconFavorited.svg"
                  alt="Favorited"
                  className={styles.interactionImages}
                />
              )}
            </div>
          </Container>
        </div>

        <Container className={styles.episodeInfo}>
          <p className={styles.episodeDivision}>Episódios</p>
          <p className={styles.episodeLength}>
            {course?.episodes && course?.episodes.length}
          </p>

          {course?.episodes?.length === 0 ? (
            <p>
              <strong>
                Não temos episódios ainda, volte outra hora! &#x1F606;&#x1F918;
              </strong>
            </p>
          ) : (
            course?.episodes?.map((episode) => (
              <EpisodeList key={episode.id} episode={episode} />
            ))
          )}
        </Container>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
