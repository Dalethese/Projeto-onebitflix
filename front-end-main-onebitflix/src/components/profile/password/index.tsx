import useShowToast from "@/src/hooks/useShowToast";
import usersService from "@/src/services/usersService";
import styles from "@/styles/profile.module.scss";
import { FormEvent, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { ToastComponent } from "../../common/Toast";

export default function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const { showToast, toastColor, toastIsOpen, toastMessage } = useShowToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      showToast({
        message: "As senhas não coincidem",
        color: "bg-danger",
      });

      return;
    }

    if (currentPassword === newPassword) {
      showToast({
        message: "A nova senha deve ser diferente da atual",
        color: "bg-danger",
      });

      return;
    }

    const status = await usersService.passwordUpdate({ currentPassword, newPassword });

    if (status === 400) {
      showToast({
        message: "Senha atual incorreta",
        color: "bg-danger",
      });

      return;
    }

    if (status === 204) {
      showToast({
        message: "Senha atualizada com sucesso",
        color: "bg-success",
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label className={styles.label} for="currentPassword">
              Senha atual
            </Label>
            <Input
              type="password"
              name="currentPassword"
              id="currentPassword"
              placeholder="******"
              required
              minLength={6}
              maxLength={12}
              className={styles.input}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
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
              value={newPassword}
              onChange={(ev) => setNewPassword(ev.target.value)}
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
              value={confirmNewPassword}
              onChange={(ev) => setConfirmNewPassword(ev.target.value)}
            />
          </FormGroup>
        </div>

        <Button outline type="submit" className={styles.renderFormBtn}>
          Salvar Alterações
        </Button>
      </Form>

      <ToastComponent isOpen={toastIsOpen} color={toastColor} message={toastMessage} />
    </>
  );
}
