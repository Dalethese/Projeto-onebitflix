import Head from "next/head";
import styles from "@/styles/HomeNoAuth.module.scss";
import PresentationSection from "@/src/components/HomeNoAuth/presentationSection";
import HeaderNoAuth from "@/src/components/HomeNoAuth/headerNoAuth";
import CardsSection from "@/src/components/HomeNoAuth/CardsSection";
import SlideSection from "@/src/components/HomeNoAuth/SlideSection";
import { GetStaticProps } from "next";
import courseService, { CourseType } from "@/src/services/courseServices";
import Footer from "@/src/components/common/footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

interface IndexPageProps {
  children?: React.ReactNode;
  courses: CourseType[];
}

const HomeNoAuth = ({ courses }: IndexPageProps) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <Head>
        <title>Onebitflix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content="Onebitflix" key="title" />
        <meta
          name="description"
          content="Tenha acesso aos melhores conteúdos de programação de uma forma simple e fácil"
        />
      </Head>

      <main>
        <section className={styles.sectionBackground} data-aos="fade-zoom-in">
          <HeaderNoAuth />
          <PresentationSection />
        </section>
        <CardsSection />
        <SlideSection newestCourses={courses} />
      </main>

      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await courseService.getNewestCourses();

  return {
    props: {
      courses: res.data,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default HomeNoAuth;
