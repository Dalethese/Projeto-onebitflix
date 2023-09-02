import Head from "next/head";
import HeaderAuth from "@/src/components/common/headerAuth";
import UserForm from "@/src/components/profile/user";
import { Col, Container, Row } from "reactstrap";
import useSWR from "swr";
import styles from "@/styles/profile.module.scss";
import usersService from "@/src/services/usersService";
import { useState } from "react";
import PasswordForm from "@/src/components/profile/password";
import SpinnerComponent from "@/src/components/common/Spinner";

export default function Profile() {
  const { data, error } = useSWR("/users/current", usersService.getUser);
  const [form, setForm] = useState("userForm");

  if (error) return <div>Erro ao carregar</div>;
  if (!data) return <SpinnerComponent />;

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
              <button
                className={styles.renderFormBtn}
                style={{
                  color: form === "userForm" ? "#FF0044" : "#fff",
                }}
                onClick={() => setForm("userForm")}
              >
                DADOS PESSOAIS
              </button>
              <button
                className={styles.renderFormBtn}
                style={{
                  color: form === "passwordForm" ? "#FF0044" : "#fff",
                }}
                onClick={() => setForm("passwordForm")}
              >
                SENHA
              </button>
            </Col>

            <Col md>
              {form === "userForm" ? (
                <UserForm createdAt={new Date(data.createdAt)} />
              ) : (
                <PasswordForm />
              )}
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}
