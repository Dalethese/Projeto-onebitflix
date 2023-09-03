import { FormEvent, useState } from "react";
import usersService from "../services/usersService";
import useShowToast from "./useShowToast";

export default function useRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const { showToast } = useShowToast();

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

  return {
    states: { firstName, lastName, phone, email },
    setters: { setFirstName, setLastName, setPhone, setEmail },
    handlers: { handleSubmit },
    formatter,
  };
}
