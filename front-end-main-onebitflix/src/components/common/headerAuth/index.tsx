/* eslint-disable @next/next/no-img-element */
import { Button, Container, Form, Input } from "reactstrap";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import Link from "next/link";
import usersService from "@/src/services/usersService";
import styles from "./styles.module.scss";
Modal.setAppElement("#__next");

const HeaderAuth = function () {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [initials, setInitials] = useState("");
  const [searchName, setSearchName] = useState("");

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

  const handleSearch = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    router.push(`/search?name=${searchName}`);
    setSearchName("");
  };

  const handleSearchClick = () => {
    router.push(`/search?name=${searchName}`);
    setSearchName("");
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
            <Form onSubmit={handleSearch}>
              <Input
                name="search"
                type="text"
                placeholder="Pesquisar"
                className={styles.input}
                onChange={(e) => setSearchName(e.target.value.toLowerCase())}
              />
              <Button className={styles.buttonSearch} type="submit">
                <img
                  src="/homeAuth/iconSearch.svg"
                  alt="lupaHeader"
                  className={styles.searchImg}
                  onChange={handleSearchClick}
                />
              </Button>
            </Form>
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
