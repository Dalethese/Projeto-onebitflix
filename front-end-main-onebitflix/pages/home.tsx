import FavoriteCourses from "@/src/components/HomeAuth/FavoriteCourses";
import FeaturedCategory from "@/src/components/HomeAuth/FeaturedCategory";
import FeaturedSection from "@/src/components/HomeAuth/FeaturedSection";
import ListCategories from "@/src/components/HomeAuth/ListCategories";
import NewestCategory from "@/src/components/HomeAuth/NewestCategory";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function HomeAuth() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("onebitflix-token")) {
      router.push("/home");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <FeaturedSection />
        <NewestCategory />
        <FavoriteCourses />
        <FeaturedCategory />
        <ListCategories />
      </main>
    </>
  );
}
