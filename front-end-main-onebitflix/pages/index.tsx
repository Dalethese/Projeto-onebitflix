import Head from "next/head";
import styles from "@/styles/homeNoAuth.module.scss";
import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth";

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
        <HeaderNoAuth />
        <h1>Home</h1>
      </main>
    </>
  );
};

export default HomeNoAuth;
