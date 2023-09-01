import HeaderAuth from "@/src/components/common/headerAuth";
import courseService, { CourseType } from "@/src/services/courseServices";
import styles from "@/styles/search.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Search() {
  const router = useRouter();
  const searchName = router.query.name;
  const [searchResult, setSearchResult] = useState<CourseType[]>([]);

  const searchCourses = async () => {
    if (typeof searchName === "string") {
      const res = await courseService.search(searchName);
      console.log(res);
      setSearchResult(res.data.courses);
    }
  };

  useEffect(() => {
    console.log(typeof searchName);

    searchCourses();
  }, [searchName]);

  return (
    <>
      <Head>
        <title>Onebitflix - {searchName}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <header className={styles.header}>
        <HeaderAuth />
      </header>
      <main>
        {searchResult.length > 0 ? (
          searchResult.map((course) => (
            <div key={course.id}>
              <h1>{course.name}</h1>
            </div>
          ))
        ) : (
          <h1>Erro</h1>
        )}
      </main>
    </>
  );
}
