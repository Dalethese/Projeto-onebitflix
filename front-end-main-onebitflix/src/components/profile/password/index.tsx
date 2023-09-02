import styles from "@/styles/profile.module.scss";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export default function PasswordForm() {
  return (
    <>
      <Form className={styles.form}>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label className={styles.label} for="currentPassword">
              Senha atual
            </Label>
            <Input
              type="password"
              name="currentPassword"
              id="currentPasswod"
              placeholder="******"
              required
              minLength={6}
              maxLength={12}
              className={styles.input}
            />
          </FormGroup>
        </div>

        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label className={styles.label} for="newPassword">
              Nova senha
            </Label>
            <Input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="******"
              required
              minLength={6}
              maxLength={12}
              className={styles.inputFlex}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="confirmNewPassword">
              Confirmar Nova senha
            </Label>
            <Input
              type="password"
              name="confirmNewPassword"
              id="confirmNewPassword"
              placeholder="******"
              required
              minLength={6}
              maxLength={12}
              className={styles.inputFlex}
            />
          </FormGroup>
        </div>

        <Button outline type="submit" className={styles.renderFormBtn}>
          Salvar Alterações
        </Button>
      </Form>
    </>
  );
}
