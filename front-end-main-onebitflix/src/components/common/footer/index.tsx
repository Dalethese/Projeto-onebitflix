import { Container } from "reactstrap";
import styles from "./styles.module.scss";

export default function Footer() {
  return (
    <footer>
      <Container fluid className={styles.footer}>
        <img src="/logoOnebitcode.svg" alt="logo footer" className={styles.logoFooter} />
        <a
          href="http://onebitcode.com"
          target="_blank"
          rel="noreferrer"
          className={styles.footerLink}
        >
          OneBitCode.com
        </a>
      </Container>
    </footer>
  );
}
