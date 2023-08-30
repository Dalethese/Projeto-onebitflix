import HeaderAuth from "@/src/components/common/headerAuth";
import UserForm from "@/src/components/profile/user";
import Head from "next/head";
import { Container } from "reactstrap";
import styles from "@/styles/profile.module.scss";

export default function Profile() {
  return (
    <>
      <Head>
        <title>Onebitflix - Meus Dados</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>

      <header>
        <HeaderAuth />
      </header>

      <main>
        <Container className="py-5">
          <h1 className={styles.title}>Minha Conta</h1>
        </Container>
        <UserForm />
      </main>
    </>
  );
}
