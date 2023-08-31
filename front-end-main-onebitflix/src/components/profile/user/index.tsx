/* eslint-disable @next/next/no-img-element */
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "@/styles/profile.module.scss";

export default function UserForm() {
  return (
    <Form className={styles.form}>
      <div className={styles.formName}>
        <p className={styles.nameAbbreviation}>JD</p>
        <p className={styles.userName}>Jonas</p>
      </div>
      <div className={styles.memberTime}>
        <img
          src="/profile/iconUserAccount.svg"
          alt="iconUserAccount"
          className={styles.memberTimeImg}
        />
        <p className={styles.memberTimeText}>
          Membro desde <br />
          ...
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
            value={"Name"}
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
            value={"Test"}
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
            value={"+55 (21) 99999-9999"}
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
            value={"testeemail@gmail.com"}
          />
        </FormGroup>

        <Button className={styles.formBtn} outline>
          Salvar Alterações
        </Button>
      </div>
    </Form>
  );
}
