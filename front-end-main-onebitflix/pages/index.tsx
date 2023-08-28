import Head from "next/head";
import styles from "@/styles/HomeNoAuth.module.scss";
import PresentationSection from "@/src/components/HomeNoAuth/presentationSection";
import HeaderNoAuth from "@/src/components/HomeNoAuth/headerNoAuth";
import CardsSection from "@/src/components/HomeNoAuth/CardsSection";

const HomeNoAuth = () => {
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
        <section className={styles.sectionBackground}>
          <HeaderNoAuth />
          <PresentationSection />
        </section>
        <CardsSection />
      </main>
    </>
  );
};

export default HomeNoAuth;
