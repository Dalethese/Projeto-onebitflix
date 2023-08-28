import { ReactNode } from "react";
import { Toast, ToastBody } from "reactstrap";

interface ToastProps {
  isOpen: boolean;
  message: string;
  color: string;
}

export function ToastComponent({ isOpen, color, message }: ToastProps) {
  return (
    <>
      <Toast className={`${color} text-white fixed-top ms-auto mt-3`} isOpen={isOpen}>
        <ToastBody className="text-center"> {message} </ToastBody>
      </Toast>
    </>
  );
}
