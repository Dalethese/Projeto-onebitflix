import Footer from "@/src/components/common/footer";
import styles from "../styles/registerLogin.module.scss";
import Head from "next/head";
import HeaderGeneric from "@/src/components/common/HeaderGeneric";

export default function Register() {
  return (
    <>
      <Head>
        <title>Onebitflix - Registro</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>

      <main>
        <HeaderGeneric logoUrl="/" btnUrl="/login" btnContent="Login" />
      </main>

      <Footer />
    </>
  );
}
