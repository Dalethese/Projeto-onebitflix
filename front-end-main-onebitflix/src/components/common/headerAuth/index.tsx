/* eslint-disable @next/next/no-img-element */
import { Container, Form, Input } from "reactstrap";
import Modal from "react-modal";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
Modal.setAppElement("#__next");

const HeaderAuth = function () {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

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
            AB
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
        <Link href="/profile">
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
