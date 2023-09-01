import Head from "next/head";
import HeaderAuth from "@/src/components/common/headerAuth";
import UserForm from "@/src/components/profile/user";
import { Col, Container, Row } from "reactstrap";
import useSWR from "swr";
import styles from "@/styles/profile.module.scss";
import usersService from "@/src/services/usersService";

export default function Profile() {
  const { data, error } = useSWR("/users/current", usersService.getUser);

  if (error) return <div>Erro ao carregar</div>;
  if (!data) return <div>Carregando...</div>;

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
              <UserForm createdAt={new Date(data.createdAt)} />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}
