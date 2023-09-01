import Footer from "@/src/components/common/footer";
import HeaderAuth from "@/src/components/common/headerAuth";
import courseService, { CourseType } from "@/src/services/courseServices";
import styles from "@/styles/coursePage.module.scss";
import { link } from "fs";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CoursePage() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState<CourseType>();

  const getCourse = async () => {
    if (typeof id !== "string") return;

    const res = await courseService.getEpisodes(id);

    if (res.status === 200) {
      setCourse(res.data);
    }
  };

  useEffect(() => {
    getCourse();
  }, [id]);

  return (
    <>
      <Head>
        <title>Onebitflix - {course?.name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>

      <header>
        <HeaderAuth />
      </header>

      <main>
        <p>{course?.name}</p>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
