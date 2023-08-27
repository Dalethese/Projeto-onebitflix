/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./styles.module.scss";
import { Button, Container } from "reactstrap";

export default function HeaderNoAuth() {
  return (
    <>
      <div className={styles.ctaSection}>
        <img src="/homeNoAuth/logoCta.png" alt="logoCta" className={styles.imgCta} />
        <p>Se cadastre para ter acesso aos cursos</p>
        <img src="/homeNoAuth/logoCta.png" alt="logoCta" className={styles.imgCta} />
      </div>
      <Container className={styles.nav}>
        <img
          className={styles.imgLogoNav}
          src="/logoOnebitflix.svg"
          alt="logo Onebitflix"
        />
        <div>
          <Link href="/login">
            <Button className={styles.navBtn} outline>
              Entrar
            </Button>
          </Link>
          <Link href="/register">
            <Button className={styles.navBtn} outline>
              Quero fazer parte
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
