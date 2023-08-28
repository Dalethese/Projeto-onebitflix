import { CourseType } from "@/src/services/courseServices";
import { Button, Container } from "reactstrap";
import SlideComponent from "../../common/SlideComponent";
import Link from "next/link";
import styles from "./styles.module.scss";

interface props {
  newestCourses: CourseType[];
}

export default function SlideSection({ newestCourses }: props) {
  return (
    <>
      <Container className={styles.sectionSlide}>
        <p className={styles.sectionTitle}>AULAS JÁ DISPONÍVEIS</p>
        <SlideComponent courses={newestCourses} />
        <Link href="/register">
          <Button outline color="light" className={styles.slideSectionBtn}>
            Se cadastre para acessar!
          </Button>
        </Link>
      </Container>
    </>
  );
}
