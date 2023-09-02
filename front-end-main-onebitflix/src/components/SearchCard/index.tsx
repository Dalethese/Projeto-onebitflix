/* eslint-disable @next/next/no-img-element */
import { CourseType } from "@/src/services/courseServices";
import styles from "./styles.module.scss";
import Link from "next/link";

interface props {
  course: CourseType;
}

export const SearchCard = ({ course }: props) => {
  return (
    <>
      <Link href={`/course/${course.id}`}>
        <div className={styles.searchCard}>
          <img
            src={`${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl}`}
            alt={course.name}
            className={styles.searchCardImg}
          />
          <p className={styles.searchCardTitle}>{course.name}</p>
          <p className={styles.searchCardDescription}>{course.synopsis}</p>
        </div>
      </Link>
    </>
  );
};
