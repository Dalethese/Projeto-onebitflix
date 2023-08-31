import Head from "next/head";
import HeaderAuth from "@/src/components/common/headerAuth";
import UserForm from "@/src/components/profile/user";
import { Button, Col, Container, Row } from "reactstrap";
import styles from "@/styles/profile.module.scss";

export default function Profile() {
  return (
    <>
      <Head>
        <title>Onebitflix - Meus Dados</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>

      <header style={{ backgroundColor: "#151515" }}>
        <HeaderAuth />
      </header>

      <main>
        <Container className="py-5 d-flex flex-column gap-4">
          <h1 className={styles.title}>Minha Conta</h1>
          <Row>
            <Col md={4} className={styles.btnColumn}>
              <button className={styles.renderFormBtn}>DADOS PESSOAIS</button>
              <button className={styles.renderFormBtn}>SENHA</button>
            </Col>

            <Col md>
              <UserForm />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}
