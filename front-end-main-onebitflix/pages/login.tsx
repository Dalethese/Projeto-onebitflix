import Head from "next/head";
import styles from "../styles/registerLogin.module.scss";
import HeaderGeneric from "@/src/components/common/HeaderGeneric";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import Footer from "@/src/components/common/footer";
import { useRouter } from "next/router";
import { FormEvent, useEffect } from "react";
import { ToastComponent } from "@/src/components/common/Toast";
import authService from "@/src/services/authService";
import useShowToast from "@/src/hooks/useShowToast";

export default function Login() {
  const router = useRouter();
  const { showToast, toastIsOpen, toastColor, toastMessage } = useShowToast();

  const registerSuccess = router.query.registered;

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const params = {
      email,
      password,
    };

    const { status } = await authService.login(params);

    if (status === 200) {
      router.push("/home");
    }

    if (status === 404) {
      showToast({ message: "Email não cadastrado", color: "bg-danger" });
    }

    if (status === 401) {
      showToast({ message: "Email ou senha inválido", color: "bg-danger" });
    }
  };

  useEffect(() => {
    if (registerSuccess) {
      showToast({ color: "bg-success", message: "Cadastro realizado com sucesso!" });
    }
  }, [registerSuccess]);

  return (
    <>
      <Head>
        <title>Onebitflix - Login</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <HeaderGeneric logoUrl="/" btnUrl="/register" btnContent="Quero fazer parte" />

        <Container className="py-5">
          <h1 className={styles.formTitle}>Bem-vindo(a) ao OneBitFlix!</h1>
          <Form className={styles.form} onSubmit={handleLogin}>
            <FormGroup>
              <Label for="email" className={styles.label}>
                E-MAIL
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="johnDoe@email.com"
                required
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className={styles.label}>
                SENHA
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                required
                className={styles.input}
              />
            </FormGroup>
            <Button outline className={styles.formBtn}>
              ENTRAR
            </Button>
          </Form>
        </Container>
      </main>

      <Footer />
      <ToastComponent color={toastColor} message={toastMessage} isOpen={toastIsOpen} />
    </>
  );
}
