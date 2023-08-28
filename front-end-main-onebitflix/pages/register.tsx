import Footer from "@/src/components/common/footer";
import styles from "../styles/registerLogin.module.scss";
import Head from "next/head";
import HeaderGeneric from "@/src/components/common/HeaderGeneric";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { FormEvent, useState } from "react";
import authService from "@/src/services/authService";
import { useRouter } from "next/router";
import { ToastComponent } from "@/src/components/common/Toast";

export default function Register() {
  const router = useRouter();
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const birth = formData.get("birth") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const params = {
      firstName,
      lastName,
      phone,
      email,
      birth,
      password,
    };

    if (password !== confirmPassword) {
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage("Senhas não conferem");
      return;
    }

    const res = await authService.register(params);

    if (res.status === 201) {
      console.log(res.data);
      router.push("/login?registered=true");
    } else {
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage(res.data.message);
    }
  };

  return (
    <>
      <Head>
        <title>Onebitflix - Registro</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <script src="https://jsuites.net/v4/jsuites.js" defer></script>
      </Head>

      <main className={styles.main}>
        <HeaderGeneric logoUrl="/" btnUrl="/login" btnContent="Login" />

        <Container className="py-5">
          <h1 className={styles.formTitle}>Bem-vindo(a) ao OneBitFlix!</h1>
          <Form className={styles.form} onSubmit={handleRegister}>
            <FormGroup>
              <Label for="firstName" className={styles.label}>
                NOME
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Qual o seu nome?"
                required
                maxLength={20}
                className={styles.inputName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName" className={styles.label}>
                SOBRENOME
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Qual o seu sobrenome?"
                required
                maxLength={20}
                className={styles.inputName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone" className={styles.label}>
                WHATSAPP / TELEGRAM
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(xx) 9xxxx-xxxx"
                required
                data-mask="[-]+55 (00) 00000-0000"
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email" className={styles.label}>
                E-MAIL
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Digite o seu email"
                required
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="birth" className={styles.label}>
                DATA DE NASCIMENTO
              </Label>
              <Input
                id="birth"
                name="birth"
                type="date"
                min="1930-01-01"
                max="2020-12-31"
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
                placeholder="Digite a sua senha (Min: 6 | Max: 20)"
                required
                minLength={6}
                maxLength={20}
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword" className={styles.label}>
                CONFIRME SUA SENHA
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirme a sua senha"
                required
                minLength={6}
                maxLength={20}
                className={styles.input}
              />
            </FormGroup>
            <Button type="submit" outline className={styles.formBtn}>
              CADASTRAR
            </Button>
          </Form>
        </Container>
      </main>

      <Footer />
      <ToastComponent color="bg-danger" isOpen={toastIsOpen} message={toastMessage} />
    </>
  );
}
