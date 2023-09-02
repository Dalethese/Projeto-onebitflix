/* eslint-disable @next/next/no-img-element */
import { CourseType } from "@/src/services/courseServices";
import styles from "./style.module.scss";
import Link from "next/link";

interface props {
  course: CourseType;
}

export default function SlideCard({ course }: props) {
  return (
    <Link href={`/course/${course.id}`}>
      <div className={styles.slide}>
        <img
          src={`${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl}`}
          alt={course.name}
          className={styles.slideImg}
        />
        <p className={styles.slideTitle}>{course.name}</p>
        <p className={styles.slideDescription}> {course.synopsis} </p>
      </div>
    </Link>
  );
}
