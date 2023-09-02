/* eslint-disable @next/next/no-img-element */
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useEffect } from "react";
import usersService from "@/src/services/usersService";
import styles from "@/styles/profile.module.scss";
import useShowToast from "@/src/hooks/useShowToast";
import { ToastComponent } from "../../common/Toast";
import useRegister from "@/src/hooks/useRegister";

interface props {
  createdAt: Date;
}

export default function UserForm({ createdAt }: props) {
  const {
    states: { firstName, lastName, phone, email },
    setters: { setFirstName, setLastName, setPhone, setEmail },
    handlers: { handleSubmit },
    formatter,
  } = useRegister();
  const { toastColor, toastIsOpen, toastMessage } = useShowToast();

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
              data-mask="[-]+55 (00) 00000-0000"
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
