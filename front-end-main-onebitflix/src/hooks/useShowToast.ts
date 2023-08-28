import { FormEvent, useState } from "react";
import authService from "../services/authService";
import { useRouter } from "next/router";

interface showToastProps {
  message: string;
  color?: string;
}

export default function useShowToast() {
  const router = useRouter();
  const [toastColor, setToastColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = ({ message, color }: showToastProps) => {
    setToastIsOpen(true);
    if (color) {
      setToastColor(color);
    }
    setTimeout(() => {
      setToastIsOpen(false);
    }, 1000 * 3);
    setToastMessage(message);
  };

  return { showToast, toastColor, toastIsOpen, toastMessage };
}
