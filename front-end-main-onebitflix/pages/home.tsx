import FavoriteCourses from "@/src/components/HomeAuth/FavoriteCourses";
import FeaturedCategory from "@/src/components/HomeAuth/FeaturedCategory";
import FeaturedSection from "@/src/components/HomeAuth/FeaturedSection";
import ListCategories from "@/src/components/HomeAuth/ListCategories";
import NewestCategory from "@/src/components/HomeAuth/NewestCategory";
import SpinnerComponent from "@/src/components/common/Spinner";
import Footer from "@/src/components/common/footer";
import useAuth from "@/src/hooks/useAuth";
import Head from "next/head";

export default function HomeAuth() {
  const { loading } = useAuth();

  if (loading) return <SpinnerComponent />;

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

      <Footer />
    </>
  );
}
