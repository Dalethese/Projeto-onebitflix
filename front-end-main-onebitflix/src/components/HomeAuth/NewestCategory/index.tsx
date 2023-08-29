import useSWR from "swr";
import { ReactNode } from "react";

import styles from "../../../../styles/slideCategory.module.scss";
import SlideComponent from "../../common/SlideComponent";
import courseService from "@/src/services/courseServices";

interface NewestCategoryProps {
  children: ReactNode;
}

export default function NewestCategory() {
  const { data, error } = useSWR("/newest", courseService.getNewestCourses);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <p className={styles.titleCategory}>LANÇAMENTOS</p>
      <SlideComponent courses={data.data} />
    </>
  );
}
