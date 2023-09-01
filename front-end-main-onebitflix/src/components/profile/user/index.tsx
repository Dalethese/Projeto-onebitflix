/* eslint-disable @next/next/no-img-element */
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { FormEvent, useEffect, useState } from "react";
import usersService from "@/src/services/usersService";
import styles from "@/styles/profile.module.scss";
import useShowToast from "@/src/hooks/useShowToast";
import { ToastComponent } from "../../common/Toast";

interface props {
  createdAt: Date;
}

export default function UserForm({ createdAt }: props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const { showToast, toastColor, toastIsOpen, toastMessage } = useShowToast();

  const formatter = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await usersService.userUpdate({
      firstName,
      lastName,
      phone,
      email,
    });

    console.log(res);

    if (res.status === 200) {
      showToast({
        message: "Atualizado com sucesso",
        color: "bg-success",
      });
    } else {
      showToast({
        message: "Você não pode alterar para esse email",
        color: "bg-danger",
      });
    }
  };

  useEffect(() => {
    usersService
      .getUser()
      .then((user) => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setPhone(user.phone);
        setEmail(user.email);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  return (
    <>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formName}>
          <p className={styles.nameAbbreviation}>
            {firstName.slice(0, 1)}
            {lastName.slice(0, 1)}
          </p>
          <p className={styles.userName}>
            {firstName} {lastName}
          </p>
        </div>
        <div className={styles.memberTime}>
          <img
            src="/profile/iconUserAccount.svg"
            alt="iconUserAccount"
            className={styles.memberTimeImg}
          />
          <p className={styles.memberTimeText}>
            Membro desde <br />
            {formatter.format(createdAt)}
          </p>
        </div>
        <hr />
        <div className={styles.inputFlexDiv}>
          <FormGroup className={styles.formGroup}>
            <Label className={styles.label} for="firstName">
              NOME
            </Label>
            <Input
              name="firstName"
              type="text"
              id="firstName"
              placeholder="Digite seu nome"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={firstName}
              onChange={(ev) => setFirstName(ev.target.value)}
            />
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <Label className={styles.label} for="lastName">
              SOBRENOME
            </Label>
            <Input
              name="lastName"
              type="text"
              id="lastName"
              placeholder="Digite seu sobrenome"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={lastName}
              onChange={(ev) => setLastName(ev.target.value)}
            />
          </FormGroup>
        </div>

        <div className={styles.inputNormalDiv}>
          <FormGroup className={styles.formGroup}>
            <Label className={styles.label} for="phone">
              WHATSAPP / TELEGRAM
            </Label>
            <Input
              name="phone"
              type="tel"
              id="phone"
              placeholder="(xx) 9xxxx-xxxx"
              required
              className={styles.input}
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <Label className={styles.label} for="email">
              E-MAIL
            </Label>
            <Input
              name="email"
              type="email"
              id="email"
              placeholder="Coloque o seu email"
              required
              className={styles.input}
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </FormGroup>

          <Button type="submit" className={styles.formBtn} outline>
            Salvar Alterações
          </Button>
        </div>
      </Form>

      <ToastComponent color={toastColor} message={toastMessage} isOpen={toastIsOpen} />
    </>
  );
}
