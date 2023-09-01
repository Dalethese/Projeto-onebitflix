/* eslint-disable @next/next/no-img-element */
import { Container, Form, Input } from "reactstrap";
import Modal from "react-modal";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import usersService from "@/src/services/usersService";
Modal.setAppElement("#__next");

const HeaderAuth = function () {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [initials, setInitials] = useState("");

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("onebitflix-token");
    router.push("/");
  };

  useEffect(() => {
    usersService.getUser().then((user) => {
      const firstName = user.firstName.slice(0, 1);
      const lastName = user.lastName.slice(0, 1);
      setInitials(firstName + lastName);
    });
  }, [initials]);

  return (
    <>
      <Container fluid className={styles.nav}>
        <Link href="/home">
          <img
            src="/logoOnebitflix.svg"
            alt="logoOnebitflix"
            className={styles.imgLogoNav}
          />
        </Link>
        <div className="d-flex align-items-center">
          <div className="position-relative">
            <Form>
              <Input
                name="search"
                type="search"
                placeholder="Pesquisar"
                className={styles.input}
              />
            </Form>
            <img
              src="/homeAuth/iconSearch.svg"
              alt="lupaHeader"
              className={styles.searchImg}
            />
          </div>
          <p className={styles.userProfile} onClick={handleOpenModal}>
            {initials}
          </p>
        </div>
      </Container>

      <Modal
        isOpen={modalOpen}
        onRequestClose={handleCloseModal}
        shouldCloseOnEsc={true}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <Link href="/profile" className="text-decoration-none">
          <p className={styles.modalLink}>Meus Dados</p>
        </Link>
        <p className={styles.modalLink} onClick={handleLogout}>
          Sair
        </p>
      </Modal>
    </>
  );
};

export default HeaderAuth;
