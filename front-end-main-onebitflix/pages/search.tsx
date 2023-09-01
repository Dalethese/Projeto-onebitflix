import { SearchCard } from "@/src/components/SearchCard";
import Footer from "@/src/components/common/footer";
import HeaderAuth from "@/src/components/common/headerAuth";
import courseService, { CourseType } from "@/src/services/courseServices";
import styles from "@/styles/search.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";

export default function Search() {
  const router = useRouter();
  const searchName = router.query.name;
  const [searchResult, setSearchResult] = useState<CourseType[]>([]);

  const searchCourses = async () => {
    if (typeof searchName === "string") {
      const res = await courseService.search(searchName);
      setSearchResult(res.data.courses);
    }
  };

  useEffect(() => {
    searchCourses();
  }, [searchName]);

  return (
    <>
      <Head>
        <title>Onebitflix - {searchName}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <header className="bg-black">
        <HeaderAuth />
      </header>
      <main className="d-flex flex-column justify-content-center">
        <Container className="d-flex flex-wrap justify-content-center gap-5 py-4">
          {searchResult.length > 0 ? (
            searchResult.map((course) => <SearchCard course={course} key={course.id} />)
          ) : (
            <h1 className={styles.noResult}>Nenhum curso encontrado</h1>
          )}
        </Container>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
