/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.scss";
import useSWR from "swr";
import courseService, { CourseType } from "@/src/services/courseServices";
import HeaderAuth from "../../common/headerAuth";
import { Button, Container } from "reactstrap";
import Link from "next/link";
// import SwrSpinner from '../../common/swrSpinner'

const FeaturedSection = function () {
  const { data, error, isLoading } = useSWR("featured", courseService.getFeatured);

  if (error) {
    console.log(error);
    return <div>Failed to load</div>;
  }
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      {data &&
        data.data?.map((course: CourseType) => (
          <div
            key={course.id}
            style={{
              backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "480px",
            }}
          >
            <HeaderAuth />
            <Container>
              <p className={styles.title}>{course.name}</p>
              <p className={styles.description}>{course.synopsis}</p>
              <Link href={`/courses/${course.id}`}>
                <Button outline color="light" className={styles.button}>
                  ACESSE AGORA!
                  <img
                    src="/buttonPlay.svg"
                    alt="play img"
                    className={styles.buttonImg}
                  />
                </Button>
              </Link>
            </Container>
          </div>
        ))[0]}
    </>
  );
};

export default FeaturedSection;
